import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { CarResponseService } from "../../../../../services/human-resource/car/car-response.service";

/**
 * Generated class for the EditResponsePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-response',
  templateUrl: 'edit-response.html',
})
export class EditResponsePage {

carAssigner: any;
  carApprover:any;
  approveDate: string;
  approveTime: string;
  selectedCarType: any;
  carTypes: any[];
  carID: number;
  carNumber: string;
  plateNumber: string;
  destination: string;
  details: string;
  cars: any[];
  drivers: any[];
  selectedDriver: any;
  user: any;
  selectedStatus: string;

  response: any;
  requests: any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public carResponseService: CarResponseService,
    public loaderCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
  }

  ngOnInit() {
    this.user = this.navParams.data.user
    console.log(this.user)
    this.selectedStatus = this.navParams.data.selectedStatus
    this.response = this.navParams.data.response
    console.log(this.response)
    this.approveDate = this.response.date
    this.approveTime = this.response.time
    this.carAssigner = this.response.assigner.name
    this.carApprover=this.response.approver?this.response.approver.name:''
    /* Car */
    this.cars = this.navParams.data.cars
    this.carTypes = this.navParams.data.carTypes
    this.selectedCarType = this.response.car ? this.response.car.car_type_id : ''
    this.carID = this.response.car_id
    this.carNumber = this.response.car ? this.response.car.car_number : ''
    this.plateNumber = this.response.car ? this.response.car.plate_number : ''
    this.selectedDriver = this.response.driver_id
    this.destination = this.response.destination
    this.details = this.response.details
    this.requests = this.response.car_request
    this.selectedDriver = this.response.driver ? this.response.driver.em_id : ''
    this.drivers = this.navParams.data.drivers
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
  /* Dismiss */
  dismiss() {
    this.viewCtrl.dismiss()
  }

  /* Approve Request */
  updateResponse(formInputs) {
    let loader = this.loaderCtrl.create({
      content: 'กำลังอัพเดทข้อมูล...'
    })
    let toast = this.toastCtrl.create({
      message: 'การแก้ไขเสร็จสิ้น',
      duration: 2000
    })
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถแก้ไขข้อมูลได้'
    })
    loader.present();
    this.carResponseService.updateResponse(this.response.id,formInputs.date,
      formInputs.time,formInputs.selectedDriver,formInputs.carID,
      formInputs.destination,formInputs.details)
      .then(result => {
        this.carResponseService.getResponse(this.selectedStatus)
          .then(result => {
            loader.dismiss();
            this.viewCtrl.dismiss(result)
            toast.present()
          })
      })
      .catch(err => {
        console.log(err)
        setTimeout(alert.present(), 2000)
      })
  }

}
