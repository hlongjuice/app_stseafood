import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { EngWaterMeterService } from "../../../services/eng/water-meter.service";
import { DateService } from "../../../services/date.service";

/**
 * Generated class for the EngWaterMeterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-water-meter',
  templateUrl: 'eng-water-meter.html',
})
export class EngWaterMeterPage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  daily_used: any;
  yesterday_meter: any;
  result_date: any;
  user: any;
  user_types: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engWaterMeterService: EngWaterMeterService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.getUserDetails()
      .then(result => {
        this.user = result;
        this.user_types = this.authService.getUserTypes();
        this.date = this.dateService.getDate();
        this.month = this.dateService.getCurrentDateTime().MM;
        this.year = this.dateService.getCurrentDateTime().YY;
        this.getRecords();
      })
  }

  //Get Supply
  getRecords() {
    this.showLoader()
    this.engWaterMeterService.getRecordByDate(this.date)
      .then((result: any) => {
        console.log(result)
        this.recorders = result.data;
        this.result_date = result.date;
        this.daily_used = result;
        this.yesterday_meter = result.yesterday_meter
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        this.dismissLoader();
      })
  }

  //Add Supply
  addRecord() {
    let modal = this.modalCtrl.create('EngWaterMeterAddPage', {
      'all_recorders': this.recorders
    }, { enableBackdropDismiss: false })
    modal.present()
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }

  //Edit Supply
  editRecord(recorder_input) {
    let recorder = Object.create(recorder_input);
    let modal = this.modalCtrl.create('EngWaterMeterEditPage', {
      'all_recorders': this.recorders,
      'recorder': recorder
    }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }
  //Delete Supply
  deleteRecord(recorder) {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel'
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.showLoader();
            this.engWaterMeterService.deleteRecord(recorder.id)
              .then(result => {
                this.dismissLoader();
                this.getRecords();
                this.showToast('ลบข้อมูลเสร็จสิ้น')
              }).catch(err => { this.dismissLoader(); this.showAlert(err); })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    confirm.present();
  }
  //Loader
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  //disMiss
  dismissLoader() {
    this._loader.dismiss()
  }
  //Alert
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  //Toast
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000, position: 'top' })
    this._toast.present()
  }

}
