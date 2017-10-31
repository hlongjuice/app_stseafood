import { CarRequestService } from './../../../../../services/human-resource/car/car-request.service';
// import { NgForm } from '@angular/forms';
import { DateService } from './../../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequestPage {

  items: string[];
  allEmployees: any[];
  requestEmployees: any[];
  requestEmployee: any;
  requestEmployeeID: any;
  divisions: any[];
  selectedDivision: number;
  selectedEmployee: number;
  selectedCarType: number;
  carTypes:any[];
  rank: string;
  rankID: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hasPassenger: boolean;
  passengers: any[];
  passengerNumber: number;
  passengerInputs: any[];
  selectedPassengers: any[];
  user:any;
  row: number;
  date:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dateService: DateService,
    public modalCtrl: ModalController,
    public viewCtrl:ViewController,
    public alertCtrl:AlertController,
    public carRequestService:CarRequestService,
    public loader:LoadingController
  ) {
  }

  ngOnInit() {
    this.hasPassenger = false;
    this.passengerNumber = 0;
    this.passengers = [];
    this.selectedPassengers=[];
    this.startDate = this.dateService.getDate();
    this.endDate = this.dateService.getDate();
    this.startTime = this.dateService.getTime().currentTime;
    this.endTime = this.dateService.getTime().currentTime;
    this.allEmployees = this.navParams.data.employees;
    this.divisions = this.navParams.data.divisions;
    this.carTypes=this.navParams.data.carTypes;
    this.user=this.navParams.data.user;
    this.passengerInputs=[];
    this.date=this.navParams.data.date;
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

  /* Add Request */
  addRequest(inputs){
    let loader=this.loader.create({
      content:'กำลังส่งคำขอ...'
    })
    console.log(this.passengerInputs);
    loader.present();
    this.carRequestService.addCarRequest(inputs.startDate,inputs.startTime,inputs.endDate,inputs.endTime,
    inputs.selectedCarType,inputs.selectedDivision,inputs.requestEmployeeID,
    inputs.rankID,inputs.destination,
    inputs.details,this.user.id,this.passengerInputs,this.passengerNumber)
    .then(result=>{
      console.log(result)
      console.log(this.date);
      this.carRequestService.getCarRequest(this.user.id,this.date)
      .then(result=>{
          loader.dismiss();
         this.viewCtrl.dismiss(result);
      }).catch(err=>{console.log(err); loader.dismiss()})
    })
    .catch(err=>{console.log(err); loader.dismiss()})
  }

  /* Dismiss */
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
