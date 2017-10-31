import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CarAccessService } from "../../../../../services/human-resource/car/car-access.service";
import { CarResponseService } from "../../../../../services/human-resource/car/car-response.service";
import { DateService } from "../../../../../services/date.service";

/**
 * Generated class for the CarAccessEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-access-edit',
  templateUrl: 'car-access-edit.html',
})
export class CarAccessEditPage {
  _loader: any;
  _alert: any;
  _toast: any;
  _status_id = 3;
  car_response: any;
  user: any;
  date_arrival: string;
  time_arrival: string;
  date_departure: string;
  time_departure: string;
  mile_start:number;
  mile_end:number;
  gas_station:string;
  gas_fill:number;
  gas_total_price:number;
  date:any;

  car_usage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public carAccessService: CarAccessService,
    public carResponseService: CarResponseService,
    public toastCtrl: ToastController,
    public dateService: DateService
  ) {
  }

  /* ngOnInit */
  ngOnInit() {
    console.log(this.navParams.data)
    this.car_response = this.navParams.data.car_response
    this.user = this.navParams.data.user
    this.car_usage = this.car_response.car_usage;
    this.date_arrival=this.car_usage.date_arrival;
    this.date_departure=this.car_usage.date_departure;
    this.time_arrival=this.car_usage.time_arrival;
    this.time_departure=this.car_usage.time_departure;
    this.mile_start=this.car_usage.mile_start;
    this.mile_end=this.car_usage.mile_end;
    this.gas_fill=this.car_usage.gas_fill;
    this.gas_total_price=this.car_usage.gas_total_price;
    this.gas_station=this.car_usage.gas_station;
    this.date=this.navParams.data.date;

    console.log(this.car_response)
  }

  /* Submit Departure */
  submitEdit(formInputs) {
    /* Gas Unit Price */
    let gas_unit_price=0;
    if(formInputs.gas_fill!=0){
       gas_unit_price = formInputs.gas_total_price / formInputs.gas_fill
    }
   
    console.log(formInputs)
    this.showLoader()
    this.carAccessService.updateCarAccess(this.car_response.id,formInputs.date_departure
      ,formInputs.time_departure,formInputs.mile_start
      , formInputs.date_arrival, formInputs.time_arrival, formInputs.mile_end
      , formInputs.gas_fill, gas_unit_price, formInputs.gas_total_price, formInputs.gas_station, this.user.id)
      .then(result => {
        this.carAccessService.getCars(this._status_id,this.date)
          .then(result => {
            this.dismissLoader();
            this.viewCtrl.dismiss(result)
            this.showToast();
          }).catch(err => { console.log(err); this.dismissLoader(); })
      }).catch(err => { console.log(err); this.dismissLoader(); this.showAlert('ไม่สามารถบันทึกได้โปรดลองอีกครั้ง') })
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
