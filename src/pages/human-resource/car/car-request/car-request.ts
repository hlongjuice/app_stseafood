import { CarRequestService } from './../../../../services/human-resource/car/car-request.service';
import { AuthService } from './../../../../services/auth.service';
import { CarManageService } from './../../../../services/human-resource/car/car-manage.service';
import { DivisionService } from './../../../../services/division.service';
import { EmployeeService } from './../../../../services/employee.service';
import { DateService } from './../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the CarRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-request',
  templateUrl: 'car-request.html',
})
export class CarRequestPage {


  allEmployees: any;
  divisions: any;
  carTypes: any;
  chkStatus: boolean[];
  user: any;
  allRequests: any;
  chkRequest: any[];
  isHighlightVisible: any[]
  date:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateService: DateService,
    public modalCtrl: ModalController,
    public employeeService: EmployeeService,
    public divisionService: DivisionService,
    public loaderCtrl: LoadingController,
    public carManageService: CarManageService,
    public authService: AuthService,
    public carRequestService: CarRequestService,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.date=this.dateService.getDate();
    this.chkStatus = [];
    this.chkRequest = [];
    this.isHighlightVisible = [];
    let loader = this.loaderCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    loader.present();
    Promise.all([
      /* Get User */
      this.authService.getUser()
        .then(result => {
          this.user = result
          return this.carRequestService.getCarRequest(this.user.id,this.date)
            .then(result => {
              this.allRequests = result.data
            }).catch(err => { console.log(err) })
        }),
      /* Get All Employee */
      this.employeeService.getAllEmployeeWithOutPage()
        .then(result => {
          this.allEmployees = result
        }).catch(err => { console.log(err) }),
      /* Division */
      this.divisionService.getDivision()
        .then(result => {
          this.divisions = result
        }).catch(err => { console.log(err) }),
      /* Car Type */
      this.carManageService.getCarType()
        .then(result => {
          this.carTypes = result
        }).catch(err => { console.log(err) })
    ]).then(()=>{
      loader.dismiss()
    }).catch(err=>{console.log(err);loader.dismiss()})
  }

  /* Get Car Request */
  getCarRequest(): Promise<any> {
    console.log(this.date)
    return new Promise((resolve, reject) => {
      this.carRequestService.getCarRequest(this.user.id,this.date)
        .then(result => {
          this.allRequests = result.data;
          resolve(result);
          console.log(result)
        }).catch(err => { console.log(err); reject(err) })
    })
  }

  /*Get Details*/
  getDetails(index) {
    // console.log(this.allRequests[index]);
    let modal = this.modalCtrl.create('RequestDetailsPage', {
      'requestDetails': this.allRequests[index]
    })
    modal.present();
  }

  /*Add Request*/
  addRequest() {
    let addModal = this.modalCtrl.create('AddRequestPage'
      , {
        'employees': this.allEmployees,
        'divisions': this.divisions,
        'carTypes': this.carTypes,
        'user': this.user,
        'date':this.date
      },{enableBackdropDismiss:false}
    );
    addModal.present();
    addModal.onDidDismiss(result => {
      if (result) {
        this.allRequests = result.data;
      }
    })
  }

  /* Set Check Box */
  setCheckBox(event, request_id, i) {
    let index
    if (event.checked) {
      this.chkStatus[i] = true;
      this.chkRequest.push(request_id);
      this.isHighlightVisible[i] = true;
    }
    else {
      this.chkStatus[i] = false;
      index = this.chkRequest.indexOf(request_id)
      this.chkRequest.splice(index, 1);
      this.isHighlightVisible[i] = false;
    }
  }

  /* Single Delete */
  singleDelete(request_id, index) {
    this.chkStatus.fill(false);
    this.chkRequest = [];
    this.chkRequest.push(request_id);
    this.deleteRequest()
  }
  /* Delete Request */
  deleteRequest() {
    let loader = this.loaderCtrl.create({
      content: 'กำลังลบข้อมูล...'
    })
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel',
        handler: () => {

        },
        cssClass: 'alertCancel'
      },
      /* Delete Confirm */
      {
        text: 'ยืนยัน',
        handler: () => {
          loader.present();
          this.carRequestService.deleteRequest(this.chkRequest)
            .then(result => {
              console.log('After Confirm')
              this.getCarRequest().then(() => {
                loader.dismiss();//dismiss after delete complete
              }).catch(err => { console.log(err); loader.dismiss() })
            }).catch(err => { console.log(err); loader.dismiss() })
        },
        cssClass: 'alertConfirm'
      }]
    })
    alert.present();
  }

  //Edit Request
  editRequest(request){
    let modal =this.modalCtrl.create('EditRequestPage',{
      'request':request,
      'employees': this.allEmployees,
      'divisions': this.divisions,
      'carTypes': this.carTypes,
      'user': this.user,
      'date':this.date
    },{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(result=>{
      if(result){
        this.getCarRequest();
      }
    })
  }


}
