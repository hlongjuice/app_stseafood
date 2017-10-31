import { ProductionEmployeeService } from './../../../services/production/employee.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the ProductionEmployeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-employee',
  templateUrl: 'production-employee.html',
})
export class ProductionEmployeePage {

  divisionID: number;
  chkEmployee: any[];

  currentPage: number;
  nextPageUrl: string;
  em_groups: any;
  groupTab: string;//Type of group that you seleced in radio button
  group: any;
  isHighlightVisible: boolean[];


  /*Employee Varibles*/
  /*All Employee*/
  allEmployee: any;
  allEmployees: any;
  allEmployeesState: boolean;
  allEmployeeNext: any;
  /*Non Group Employee*/
  nonGroupEmployees: any;
  nonGroupEmployeesState: boolean;
  nonGroupNext: any;
  /*In Group Employee*/
  inGroup: any;
  inGroupEmployees: any;
  inGroupEmployeesState: boolean;
  inGroupNext: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productionEmployeeService: ProductionEmployeeService,
    public alertCtrl: AlertController
  ) {
    this.divisionID = 9;
  }
  /*ngOnInit*/
  ngOnInit() {
    this.isHighlightVisible = [];
    this.allEmployeesState = false;
    this.nonGroupEmployeesState = false;
    this.inGroupEmployeesState = false;
    this.divisionID = 9;
    this.chkEmployee = [];
    /*Get Groups*/
    this.productionEmployeeService.getGroups()
      .then(
      result => {
        console.log(result);
        this.em_groups = result;
      }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionEmployeePage');
  }

  /*ionChange Get employee*/
  getEmployee() {
    this.isHighlightVisible=[];
    if (this.groupTab == 'all') {
      if (this.allEmployees == null) {
        this.productionEmployeeService.getAllDivisionEmployee(this.divisionID)
          .then(
          result => {
            this.allEmployees = result['data'];
            this.allEmployeeNext = result;
          })
      }
    }
    else if (this.groupTab == 'nonGroup') {
      if (this.nonGroupEmployees == null) {
        this.productionEmployeeService.getNonGroupEmployee(this.divisionID)
          .then(
          result => {
            this.nonGroupEmployees = result['data'];
            this.nonGroupNext = result;
          })
      }
    }
    else if (this.groupTab == 'inGroup') {

    }
  }

  /*Get In Group Employee*/
  getInGroupEmployee() {
    console.log(this.group);
    this.productionEmployeeService.getGroupEmployee(this.group)
      .then(
      result => {
        console.log(result);
        this.inGroupEmployees = result;
      }
      )
  }

  /*Do Infinite Scroll*/
  doInfinite(infiniteScroll) {
    let nextPage: string;
    if (this.groupTab == 'all') {
      nextPage = this.allEmployeeNext.next_page_url;
    }
    else if (this.groupTab == 'nonGroup') {
      nextPage = this.nonGroupNext.next_page_url;
    }
    else if (this.groupTab == 'inGroup') {
      // nextPage = this.inGroupNext.next_page_url;
    }
    if (nextPage != null && this.groupTab != "inGroup") {
      this.productionEmployeeService.goNextPage(nextPage)
        .then(
        result => {
          setTimeout(() => {
            if (this.groupTab == 'all') {
              this.allEmployees = this.allEmployees.concat(result['data']);
              this.allEmployeeNext = result;
              console.log(this.allEmployeeNext);
            }
            else if (this.groupTab == 'nonGroup') {
              this.nonGroupEmployees = this.nonGroupEmployees.concat(result['data']);
              this.nonGroupNext = result;
            }
            else if (this.groupTab == 'inGroup') {
              this.inGroupEmployees = this.inGroupEmployees.concat(result['data']);
              this.inGroupNext = result;
            }
          }, 50)
          infiniteScroll.complete();
        }
        ).catch(err => { infiniteScroll.complete() });
    }
    else {
      infiniteScroll.complete();
    }
  }

  /*Set Check Employee*/
  setCheckedEmployee(event, em_id,i) {
    let index;
    
    if (event.checked) {
      this.chkEmployee.push(em_id);
      this.isHighlightVisible[i] = true;
    }
    else {
      index = this.chkEmployee.indexOf(em_id)
      this.chkEmployee.splice(index, 1);
      this.isHighlightVisible[i] = false;
    }
    console.log(this.chkEmployee);
  }

  /*Add Group Member*/
  addGroupMember() {
    let alert = this.alertCtrl.create({
      title: 'เลือกกลุ่ม',
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel',
        handler: () => {

        },
        cssClass: 'alertDanger'
      },
      {
        text: 'บันทึก',
        handler: group => {
          this.productionEmployeeService.addGroupMember(group, this.chkEmployee)
            .then(result => {
              console.log(result);
              this.allEmployees = null;
              this.nonGroupEmployees = null;
              this.inGroupEmployees = null;
              this.getEmployee();
            })
        },
        cssClass: 'alertConfirm'
      }
      ]
    });
    this.em_groups.forEach(group => {
      alert.addInput({
        type: 'radio',
        label: group.name,
        value: group.name
      });
    });
    alert.present();
  }
  /*Change Group Member*/
  changeGroupMember() {
    let alert = this.alertCtrl.create({
      title: 'เลือกกลุ่ม',
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel',
        handler: () => {

        },
        cssClass: 'alertDanger'
      },
      {
        text: 'ตกลง',
        handler: group => {
          this.productionEmployeeService.changeGroupMember(group, this.chkEmployee)
            .then(result => {
              console.log(result);
              this.allEmployees = null;
              this.nonGroupEmployees = null;
              this.inGroupEmployees = null;
              this.getEmployee();
            })
        },
        cssClass: 'alertConfirm'
      }
      ]
    });
    this.em_groups.forEach(group => {
      alert.addInput({
        type: 'radio',
        label: group.name,
        value: group.name
      });
    });
    alert.present();
    alert.onDidDismiss(() => {
      if (this.groupTab == 'inGroup')
        this.getInGroupEmployee();
    });
  }
  /*Delete Group Member*/
  deleteGroupMember() {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel',
        handler: () => {

        },
        cssClass: 'alertDanger'
      },
      {
        text: 'ยืนยัน',
        handler: group => {
          this.productionEmployeeService.deleteGroupMember(this.chkEmployee)
            .then(result => {
              console.log(result);
              this.allEmployees = null;
              this.nonGroupEmployees = null;
              this.inGroupEmployees = null;
              this.getEmployee();
            })
        },
        cssClass: 'alertConfirm'
      }
      ]
    })
    alert.present();
    alert.onDidDismiss(() => {
      if (this.groupTab == 'inGroup')
        this.getInGroupEmployee();
    });
  }

  /*Set Row Highlight*/
  setHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
  }
}
