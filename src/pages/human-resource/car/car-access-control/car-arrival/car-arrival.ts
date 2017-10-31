import { DateService } from './../../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { CarResponseService } from "../../../../../services/human-resource/car/car-response.service";
import { CarAccessService } from "../../../../../services/human-resource/car/car-access.service";

/**
 * Generated class for the CarArrivalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-arrival',
  templateUrl: 'car-arrival.html',
})
export class CarArrivalPage {

  _loader: any;
  _alert: any;
  _toast: any;
  _status_id = 2;
  car_response: any;
  user: any;
  date_arrival:string;
  time_arrival:string;
  record:any;
  date:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public carAccessService: CarAccessService,
    public carResponseService: CarResponseService,
    public toastCtrl: ToastController,
    public dateService:DateService
  ) {
  }

  /* ngOnInit */
  ngOnInit() {
    this.date_arrival = this.dateService.getDate();
    this.time_arrival = this.dateService.getTime().currentTime;
    this.car_response = this.navParams.data.car_response
    this.user = this.navParams.data.user
    this.record=this.car_response.car_usage;
    this.date=this.navParams.data.date;
    console.log(this.car_response)
  }

  /* Submit Departure */
  submitArrival(formInputs) {
    /* Gas Unit Price */
    let gas_unit_price=formInputs.gas_total_price/formInputs.gas_fill
    console.log(formInputs)
    this.showLoader()
    this.carAccessService.addCarArrival(this.car_response.id
      , formInputs.date_arrival, formInputs.time_arrival, formInputs.mile_end
      ,formInputs.gas_fill,gas_unit_price,formInputs.gas_total_price,formInputs.gas_station, this.user.id)
      .then(result => {
        this.carAccessService.getCars(this._status_id,this.date)
          .then(result => {
            this.dismissLoader();
            this.viewCtrl.dismiss(result)
            this.showToast();
          }).catch(err => { console.log(err); this.dismissLoader(); })
      }).catch(err=>{console.log(err); this.dismissLoader();this.showAlert('ไม่สามารถบันทึกได้โปรดลองอีกครั้ง')})
  }
  dismiss() {
    this.viewCtrl.dismiss();
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
  /* Toast */
  showToast() {
    this._toast = this.toastCtrl.create({
      message: 'การบันสำเร็จ',
      duration: 2000,
      position: 'top'
    });
    this._toast.present();
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({
      title: textInput
    })
    setTimeout(this._alert.present(), 2000)
  }

}
