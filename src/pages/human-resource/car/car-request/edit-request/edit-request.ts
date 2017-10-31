import { CarRequestService } from './../../../../../services/human-resource/car/car-request.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-request',
  templateUrl: 'edit-request.html',
})
export class EditRequestPage {

  _status:boolean;
  user:any;
  employees:any;
  divisions:any;
  carTypes:any;
  request:any;
  allEmployees:any;
  selectedDivision:any;
  requestEmployees:any;
  requestEmployee:any;
  requestEmployeeID:any;
  rank:any;
  rankID:any;
  passengers:any;
  passengerInputs:any;
  selectedPassengers:any;
  passengerNumber:any;
  hasPassenger:boolean;
  selectedCarType:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public carRequest:CarRequestService
  ) {
  }

  ngOnInit(){
    this._status=false;
    this.hasPassenger = false;
    this.passengerNumber = 0;
    this.passengers = [];
    this.passengerInputs=[];
    this.selectedPassengers=[];
    this.requestEmployees=[];
    this.user=this.navParams.data.user;
    this.request=this.navParams.data.request;
    // this.employees=this.navParams.data.employees;
    this.carTypes=this.navParams.data.carTypes;
    this.divisions=this.navParams.data.divisions;
    this.allEmployees=this.navParams.data.employees;

    this.requestEmployee=this.request.employee.name;
    this.requestEmployeeID=this.request.employee.em_id;
    this.rank=this.request.rank.name;
    this.rankID=this.request.rank.id;
    this.selectedDivision=this.request.division_id;
    this.selectedCarType=this.request.car_type_id;

    this.request.passenger.forEach(item=>{
      let passenger ={
        'division':item.employee.division_id,
        'divisions':this.divisions,
        'employee':item.employee.name+' '+item.employee.lastname,
        'employeeID':item.employee.em_id
      }
      this.passengerInputs.push(passenger);
    })
    this.passengerNumber=this.request.passenger_number;
    console.log(this.request)
    console.log(this.passengerInputs);
  }

  /* Update Request */
  updateRequest(formInputs){
    console.log(formInputs)
    formInputs.id=this.request.id;
    formInputs.passengers=this.passengerInputs;
    formInputs.requested_by_user_id=this.user.id;
    let loader =this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    loader.present();
    let tost=this.toastCtrl.create({message:'อัพเดทเสร็จสมบูรณ์',duration:1500})
    this.carRequest.updateCarRequest(formInputs)
    .then(result=>{
      this._status=true;
      loader.dismiss();
      tost.present();
      this.viewCtrl.dismiss(this._status)
    }).catch(err=>{
      loader.dismiss();
      console.log(err);
      let alert=this.alertCtrl.create(err)
      alert.present();
    })
  }
  /* Get Employee who can request */
  getRequestEmployees() {
    this.requestEmployees = this.allEmployees.filter(item => {
      return item.division_id == this.selectedDivision && item.salary_type_id == 1 //1 is monthly
    });
    let modal = this.modalCtrl.create('RequestEmployeeListPage', {
      'employees': this.requestEmployees
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.requestEmployee = result.name + ' ' + result.lastname;//recieve employee from modal
        this.requestEmployeeID = result.em_id;
        this.rank = result.rank.name;
        this.rankID=result.rank.id;
        console.log(result);
      }
    })
  }

  /***** Passenger ********/
  /* Set To Passenger Input */
  setPassengerInput(event, index) {
    console.log(event)
    let modal = this.modalCtrl.create('PassengerListPage', {
      'passengers': this.passengers
    })
    console.log('Modal Present')
    modal.present();
    console.log('after Present')
    modal.onDidDismiss(result => {
      if (result) {
        console.log('dismiss')
        this.passengerInputs[index].employee = result.name + ' ' + result.lastname;
        this.passengerInputs[index].employeeID= result.em_id;
      }
    })
  }

  /* Get Division Employee */
  getDivisionPassengers(index: number) {
    console.log(index);
    let divisionPassenger = new Promise((resolve, reject) => {
      this.passengers = this.allEmployees.filter(item => {
        return item.division_id == this.passengerInputs[index].division;
      })
      resolve(this.passengers);
    });
    divisionPassenger.then((result) => {
      let modal = this.modalCtrl.create('PassengerListPage', { 'passengers': result })
      modal.present();
      modal.onDidDismiss(result => {
        if (result) {
          console.log(index)
          this.passengerInputs[index].employee = result.name + ' ' + result.lastname;
          this.passengerInputs[index].employeeID= result.em_id;
        }
      })
    })
  }

  /* Set Passengers */
  setPassengers() {
    let newInput = {
      'divisions': this.divisions,
      'employee': '',
      'employeeID':''
    }
    this.passengerInputs.push(newInput);
    this.passengerNumber++;
    console.log(this.passengerInputs)
  }

  /* deletePassenger */
  deletePassenger(index) {
    this.passengerInputs.splice(index, 1);
    this.passengerNumber--;
  }
  
  /* Dismiss */
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
