import { DateService } from './../../../../../services/date.service';
import { CarResponseService } from './../../../../../services/human-resource/car/car-response.service';
import { CarAccessService } from './../../../../../services/human-resource/car/car-access.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the CarDeparturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-departure',
  templateUrl: 'car-departure.html',
})
export class CarDeparturePage {

  _loader: any;
  _alert: any;
  _toast: any;
  _status_id = 1;
  car_response:any;
  user: any;
  date_departure:string;
  time_departure:string;
  date:any;
  constructor(
    public navCtrl: NavController,
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
    this.date_departure=this.dateService.getDate();
    this.time_departure=this.dateService.getTime().currentTime;
    this.car_response = this.navParams.data.car_response
    this.user = this.navParams.data.user
    this.date=this.navParams.data.date;
  }

  /* Submit Departure */
  submitDeparture(formInputs) {
    this.showLoader()
    this.carAccessService.addCarDeparture(this.car_response.car_id, this.car_response.id
      , formInputs.date_departure, formInputs.time_departure, formInputs.mile_start, this.user.id)
      .then(result => {
        this.carAccessService.getCars(this._status_id,this.date)
          .then(result => {
            this.dismissLoader();
            this.viewCtrl.dismiss(result)
            this.showToast();
          }).catch(err => { console.log(err);this.dismissLoader(); })
      }).catch(err=>{console.log(err);this.dismissLoader();this.showAlert('ไม่สามารถบันทึกได้โปรดลองอีกครั้ง')})
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
      position:'top'
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
