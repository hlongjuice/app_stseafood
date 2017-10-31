import { CarResponseService } from './../../../../../services/human-resource/car/car-response.service';
import { DateService } from './../../../../../services/date.service';
import { Component } from '@angular/core';
import { ToastController, IonicPage, NavController, NavParams, ModalController, ViewController, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AssignCarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-assign-car',
  templateUrl: 'assign-car.html',
})
export class AssignCarPage {

  LOADER: any;
  requests: any[];
  selectedRequestIDs: any[];
  selectedRequests: any[];
  selectedStatus: any;
  cars: any[];
  carTypes: any[];
  drivers: any;
  carNumber: string;
  plateNumber: string;
  carID: string;
  selectedCarType: string;
  approveDate: string;
  approveTime: string;
  destination: string;
  details
  user: any;
  passengers:any[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public viewCtrl: ViewController,
    public carResponseService: CarResponseService,
    public alertCtrl: AlertController,
    public loaderCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.passengers=[];
    this.approveDate = this.dateService.getDate();
    this.approveTime = this.dateService.getTime().currentTime;
    this.selectedRequests = [];
    let request = null;
    this.selectedRequestIDs = this.navParams.data.selectedRequestIDs
    /* Get Selected Car */
    for (let i = 0; i < this.selectedRequestIDs.length; i++) {
      request = this.navParams.data.requests.filter(item => {
        return item.id == this.selectedRequestIDs[i];
      })
      this.selectedRequests.push(request)
    }
    /* Get Car ,Car Types and Driver*/
    this.cars = this.navParams.data.cars;
    this.carTypes = this.navParams.data.carTypes;
    this.drivers = this.navParams.data.drivers;
    /* Get Selected Request */
    this.requests = this.navParams.data.selectedRequests
    console.log(this.requests);
    /* Set Destination */
    this.destination = this.requests[0].destination;
    this.details=this.requests[0].destination;
    this.requests.forEach(item=>{
      // let passenger
      this.passengers.push.apply(this.passengers,item.passenger)
    })
    console.log(this.passengers)
    
    /* Get user */
    this.user = this.navParams.data.user;
    /* Get Seleted Status */
    this.selectedStatus = this.navParams.data.selectedStatus;

  }
  /* Loader */
  showLoader(textInput) {
    this.LOADER = this.loaderCtrl.create({
      content: textInput
    })
    this.LOADER.present();
  }
  dismissLoader() {
    this.LOADER.dismiss();
  }

  /* Get Car */
  getCars() {
    let carType = this.carTypes.filter(item => {
      return item.id == this.selectedCarType
    })
    let subCars = this.cars.filter(car => {
      return car.car_type_id == this.selectedCarType
    })
    let modal = this.modalCtrl.create('CarListPage', {
      'cars': subCars,
      'car_type': carType
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        console.log(result);
        this.carNumber = result.car_number;
        this.plateNumber = result.plate_number;
        this.carID = result.id;
      }
    })
  }
  /* Dissmiss */
  dismiss() {
    this.viewCtrl.dismiss();
  }
  /* Assign CAr */
  assignCar(formInputs) {
    this.showLoader('กำลังเพิ่มข้อมูล');
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถเพิ่มข้อมูลได้'
    })
    let request_ids = [];
    for (let i = 0; i < this.requests.length; i++) {
      request_ids.push(this.requests[i].id)
    }
    console.log(request_ids)
    /* Assign Car */
    this.carResponseService.assignCar(request_ids
      , formInputs.approveDate,formInputs.approveTime, formInputs.selectedCarType, formInputs.carID, formInputs.destination
      , formInputs.details, this.user.id, formInputs.selectedDriver
    ).then(() => {
      this.carResponseService.getRequest(this.selectedStatus)
        .then(result => {
          this.viewCtrl.dismiss(result);
          this.showToast('การจัดรถเสร็จสิ้น')
          this.dismissLoader();
        }).catch(err => { console.log(err) })
    }).catch(err => {
      console.log(err)
      this.dismissLoader()
      alert.present()
    })
  }

  /* Show Toast */
  showToast(textInput) {
    let toast = this.toastCtrl.create({
      message: textInput,
      duration: 2000
    })
    toast.present();
  }

}
