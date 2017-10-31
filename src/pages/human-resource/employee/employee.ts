import { NextPageService } from './../../../services/next-page.service';
import { AuthService } from './../../../services/auth.service';
import { RankService } from './../../../services/rank.service';
// import { EmployeeModel } from './../../../models/human-resource/employee';
import { DepartmentService } from './../../../services/department.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, PopoverController, LoadingController } from 'ionic-angular';
import { DivisionService } from "../../../services/division.service";
import { EmployeeService } from "../../../services/employee.service";

/**
 * Generated class for the EmployeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {
  employees: any[];
  allEmployee: any[];
  monthlyEmployee: any[];
  dailyEmployee: any[];
  groupTab: string;
  isHighlightVisible: boolean[];
  chkEmployee: any[];
  divisions: any[];
  departments: any[];
  ranks: any[];
  selectedDivision: string;
  nextPageUrl = "";
  user: any;
  page: any;
  /*Contructor*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public divisionService: DivisionService,
    public employeeService: EmployeeService,
    public alertCtrl: AlertController,
    public editPopOver: PopoverController,
    public loaderCtrl: LoadingController,
    public rankService: RankService,
    public authService: AuthService,
    public departmentService: DepartmentService,
    public newPageService: NextPageService

  ) {
  }
  ngOnInit() {
    let loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    loader.present();
    this.selectedDivision = 'allEmployee';
    this.divisions = [];
    this.allEmployee = [];
    this.monthlyEmployee = [];
    this.dailyEmployee = [];
    this.chkEmployee = [];
    this.isHighlightVisible = [];
    this.groupTab = 'all';

    /*Get divisions*/
    Promise.all([
      /* Get User */
      this.authService.getUser()
        .then(result => {
          this.user = result
        }).catch(err => { console.log(err) }),
      /*Get Department*/
      this.departmentService.getDepartment()
        .then(result => {
          this.departments = result;
        }).catch(err => { console.log(err) }),
      /*Get Employee*/
      this.employeeService.getAllEmployees()
        .then(result => {
          console.log(result)

          /*All Employee*/
          this.allEmployee = result.data;
          this.page = result;
          /*Monthly Employee*/
          this.allEmployee.forEach(employee => {
            //1 is monthly
            if (employee.salary_type.id == 1) {
              this.monthlyEmployee.push(employee)
            }
            /*Else is 2 as daily*/
            else {
              this.dailyEmployee.push(employee)
            }
          })
          this.employees = this.allEmployee;
          /* Add Zero Number */
          this.addZeroNumber();
        }).catch(err => { console.log(err) }),
      /* Get Divisions */
      this.divisionService.getDivision()
        .then(result => {
          this.divisions = result;
        }).catch(err => { console.log(err) }),
      /* Get Ranks */
      this.rankService.getAllRank()
        .then(result => {
          this.ranks = result;
        }).catch(err => { console.log(err) })
    ]).then(() => { loader.dismiss() })
      .catch(err => { console.log(err); loader.dismiss() })
  }


  /* Add New Employee */
  addNewEmployee() {
    console.log('Add new')
    let modal = this.modalCtrl.create('EmployeeAddPage', {
      'divisions': this.divisions,
      'departments': this.departments,
      'ranks': this.ranks,
      'user': this.user
    })
    modal.present();
    modal.onDidDismiss((result) => {
      if (result) {
        this.getEmployees();
      }
    })
  }
  /*Set Check Employee*/
  setCheckedEmployee(event, em_id, i) {
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

  /*doInfinite*/
  doInfinite($event) {
    this.employeeService.goNextPage(this.nextPageUrl)
      .then(result => {
        if (this.nextPageUrl != null) {
          this.nextPageUrl = result.next_page_url;
          this.setEmployee(result);
        }
      }).catch(err => { console.log(err) });
  }
  /*Selected Division*/
  getEmployees() {
    let loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...', duration: 2000 })
    loader.present();
    console.log(this.selectedDivision);
    this.allEmployee = [];
    this.monthlyEmployee = [];
    this.dailyEmployee = [];
    this.nextPageUrl = "";
    this.chkEmployee = [];
    this.isHighlightVisible = [];
    if (this.selectedDivision == 'allEmployee') {
      this.employeeService.getAllEmployees()
        .then(result => {
          /*set Next Page*/
          this.nextPageUrl = result.next_page_url;
          this.page = result;
          /*Set Employee*/
          this.setEmployee(result);

        }).catch(err => { console.log(err) })
    } else {
      this.employeeService.getDivisionEmployee(this.selectedDivision)
        .then(result => {
          this.page = result;
          this.setEmployee(result);
        }).catch(err => { console.log(err) })
    }
  }

  /*Set Employee*/
  setEmployee(employees) {

    this.allEmployee.push.apply(this.allEmployee, employees.data);
    this.addZeroNumber();
    /*Monthly Employee*/
    this.allEmployee.forEach(employee => {
      //1 is monthly
      if (employee.salary_type.id == 1) {
        this.monthlyEmployee.push(employee)
      }
      /*Else is 2 as daily*/
      else {
        this.dailyEmployee.push(employee)
      }
    })
    this.setEmployeeTab();
  }
  /*Set Employee Tab*/
  setEmployeeTab() {
    if (this.groupTab == 'all') {
      this.employees = this.allEmployee
    } else if (this.groupTab == 'monthly') {
      this.employees = this.monthlyEmployee;
    } else if (this.groupTab == 'daily') {
      this.employees = this.dailyEmployee;
    }
  }
  /*Edit Employee*/
  editEmployee(event, index) {

    let editPop = this.editPopOver.create('EmployeeEditPage', {
      'em_id': this.employees[index].em_id,
      'name': this.employees[index].name,
      'lastname': this.employees[index].lastname,
      'salary_type_id': this.employees[index].salary_type.id,
      'division_id': this.employees[index].division.id,
      'divisions': this.divisions,
      'departments': this.departments ? this.departments : null,
      'department_id': this.employees[index].department ? this.employees[index].department.id : null
    }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    editPop.present();
    editPop.onDidDismiss(result => {
      if (result) {
        this.getEmployees();
      }
    })
  }
  /*Change Division Department*/
  changeDivisionDepartment() {
    let popUp = this.editPopOver.create(
      'PopUpDivisionDepartmentPage',
      {
        'divisions': this.divisions,
        'departments': this.departments,
        'employees': this.chkEmployee
      }, {
        showBackdrop: true,
        enableBackdropDismiss: false
      });
    popUp.present();
    popUp.onDidDismiss(result => {
      if (result) {
        this.getEmployees();
      }
    })
  }
  /*Change Salary Type*/
  changeSalaryType() {
    let alert = this.alertCtrl.create({
      title: 'เปลี่ยนการรับเงิน',
      inputs: [
        {
          label: 'รายเดือน',
          type: 'radio',
          value: '1'
        },
        {
          label: 'รายวัน',
          type: 'radio',
          value: '2'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel'
        },
        {
          text: 'บันทึก',
          handler: (data) => {
            this.employeeService.changeSalaryType(data, this.chkEmployee)
              .then(result => {
                let success = this.alertCtrl.create({ title: 'การบันทึกเสร็จสิ้น', cssClass: 'alertSuccess' })
                success.present();
                this.getEmployees();
              }).catch(err => {
                let alert = this.alertCtrl.create({ title: 'ไม่สารถมารถแก้ไขข้อมูลได้' });
                alert.present();
                console.log(err)
              })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    alert.present();
  }
  /*Delete Employee*/
  deleteEmployee(index) {
    let emID = [this.employees[index].em_id];
    let errAlert = this.alertCtrl.create({
      title: 'ไม่สามารถลบข้อมูลได้'
    })
    let confirmAlert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'alertCancel'
      }, {
        text: 'ยืนยัน',
        handler: () => {
          this.employeeService.deleteEmployee(emID)
            .then(result => {
              this.getEmployees();
            }).catch(err => {
              errAlert.present();
              console.log(err)
            });
        },
        cssClass: 'alertConfirm'
      }]
    })
    confirmAlert.present();
  }
  /* Next Page */
  moreEmployees() {
    let loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    loader.present();
    this.newPageService.nextPage(this.page.next_page_url)
      .then(result => {
        this.page = result
        loader.dismiss();
        this.setEmployee(result);
      }).catch(err => { console.log(err); loader.dismiss(); })
  }

  /* Add Zero Number */
  addZeroNumber() {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].em_id.toString().length < 4) {
        if (this.employees[i].em_id < 10) {
          this.employees[i].em_id = "000" + this.employees[i].em_id
        } else if (this.employees[i].em_id < 100) {
          this.employees[i].em_id = "00" + this.employees[i].em_id
        } else if (this.employees[i].em_id < 1000) {
          this.employees[i].em_id = "0" + this.employees[i].em_id
        }
      }

    }
  }

  initializeItems() {
    switch (this.groupTab) {
      case 'all': {
        this.employees = this.allEmployee
      } break;
      case 'monthly': {
        this.employees = this.monthlyEmployee
      } break;
      case 'daily': {
        this.employees = this.dailyEmployee
      } break;
      default: break;
    }
  }
  /* Search Employee */
  searchEmployees(event: any) {
    // set val to the value of the searchbar
    this.initializeItems();
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.employees = this.employees.filter((item) => {
        console.log(item)
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
        item.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        item.em_id.toString().indexOf(val) > -1)
      })
    }
  }

}
