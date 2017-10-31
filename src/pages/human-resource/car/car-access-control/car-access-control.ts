import { DateService } from './../../../../services/date.service';
import { AuthService } from './../../../../services/auth.service';
import { CarAccessService } from './../../../../services/human-resource/car/car-access.service';
import { CarResponseService } from './../../../../services/human-resource/car/car-response.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';

/**
 * Generated class for the CarAccessControlPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-access-control',
  templateUrl: 'car-access-control.html',
})
export class CarAccessControlPage {

  _loader: any;
  _departure_status = '1';
  _alert: any;
  allCars:any;
  cars: any[];
  pages: any;
  selectedStatus: any;
  user: any;
  date:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carResponseService: CarResponseService,
    public carAccessService: CarAccessService,
    public authService: AuthService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public dateService:DateService
  ) {
  }

  ngOnInit() {
    this.date=this.dateService.getDate();
    this.selectedStatus = this._departure_status
    this.showLoader()
    Promise.all([
      /* Get User */
      this.authService.getUser()
        .then(result => {
          this.user = result
        }).catch(err => { console.log(err) }),
      /* Get Car Departure */
      this.carAccessService.getCars(this.selectedStatus,this.date)
        .then(result => {
          console.log(result)
          this.allCars=result.data
          this.cars = result.data
          this.pages = result;
        }).catch(err => { console.log(err); })
    ])
      .then(() => {
        this.dismissLoader()
      }).catch(err => {
        this.showAlert('ไม่สารถใช้งานข้อมูลได้')
        this.dismissLoader()
      })
  }

  initializeItems(){
    this.cars=this.allCars;
  }

  /* Cancel Status */
  cancelStatus(car_response) {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการยกเลิก',
      buttons: [
        {
          text: 'ปิด',
          role: 'cancel',
          cssClass: 'alertCancel'
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.carAccessService.cancelStatus(car_response.id)
              .then(result => {
                this.getCarItems()
              }).catch(err => { console.log(err) })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    confirm.present();
  }


  /* Loader */
  showLoader() {
    this._loader = this.loaderCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    this._loader.present();
  }
  dismissLoader() {
    this._loader.dismiss();
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({
      title: textInput
    })
    setTimeout(this._alert.present(), 2000)
  }

  /* Get Cars Items*/
  getCarItems() {
    this.cars=[];
    this.showLoader()
    this.carAccessService.getCars(this.selectedStatus,this.date)
      .then(result => {
        console.log(result)
        this.allCars=result.data
        this.cars = result.data
        this.pages = result;
        this.dismissLoader()
      }).catch(err => { console.log(err); this.dismissLoader() })
  }


  /* Submit Car Departure */
  submitDeparture(car) {
    let modal = this.modalCtrl.create('CarDeparturePage', {
      'car_response': car,
      'user': this.user,
      'date':this.date
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.allCars=result.data;
        this.cars = result.data;
        this.pages = result;
      }
    })
  }
  //Edit Departure
  editCarDeparture(car){
    let modal = this.modalCtrl.create('CarDepartureEditPage', {
      'car_response': car,
      'user': this.user,
      'date':this.date
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.allCars=result.data;
        this.cars = result.data;
        this.pages = result;
      }
    })
  }
  /* Submit Car Arrival */
  submitArrival(car) {
    let modal = this.modalCtrl.create('CarArrivalPage', {
      'car_response': car,
      'user': this.user,
      'date':this.date
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.allCars=result.data;
        this.cars = result.data;
        this.pages = result;
      }
    })
  }

  /* Update CarAccess */
  editCarAccess(car_response) {
    let modal = this.modalCtrl.create('CarAccessEditPage', {
      'car_response': car_response,
      'user': this.user,
      'date':this.date
    })
    modal.present()
    modal.onDidDismiss(result => {
      if (result) {
        this.allCars=result.data;
        this.cars = result.data;
        this.pages = result
      }
    })
  }

    /* Search Employee */
    searchCars(event: any) {
      // set val to the value of the searchbar
      this.initializeItems();
      let val = event.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.cars = this.cars.filter((item) => {
          console.log(item)
          return (item.driver.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
          item.car.plate_number.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.destination.toLowerCase().indexOf(val.toLowerCase()) > -1)
         
        })
      }
    }



}
