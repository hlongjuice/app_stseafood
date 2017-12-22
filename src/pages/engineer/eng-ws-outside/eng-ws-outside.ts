import { AuthService } from './../../../services/auth.service';
import { DateService } from './../../../services/date.service';
import { EngWsOutsideService } from './../../../services/eng/ws-outside.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';

/**
 * Generated class for the EngWsOutsidePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-ws-outside',
  templateUrl: 'eng-ws-outside.html',
})
export class EngWsOutsidePage {
  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  daily_used: any;
  yesterday_meter:any;
  result_date:any;
  user:any;
  user_types:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engWsOutSideService: EngWsOutsideService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public authService:AuthService
  ) {
  }

  ngOnInit() {
    this.authService.getUserDetails()
    .then(result=>{
      this.user=result;
      this.user_types=this.authService.getUserTypes();
      this.daily_used = [];
      this.date = this.dateService.getDate();
      this.month = this.dateService.getCurrentDateTime().MM;
      this.year = this.dateService.getCurrentDateTime().YY;
      this.getSupply();
    })
  }

  //Get Supply
  getSupply() {
    this.showLoader()
    this.engWsOutSideService.getSupplyByDate(this.date)
      .then((result: any) => {
        console.log(result)
        this.recorders = result.data;
        this.result_date=result.date;
        this.yesterday_meter=result.yesterday_meter
        this.daily_used = result;
        this.dismissLoader()
      }).catch(err => {
        this.showAlert(err.text())
        this.dismissLoader();
      })
  }

  //Add Supply
  addSupply() {
    let modal = this.modalCtrl.create('EngWsAddSupplyPage', {
      'all_recorders':this.recorders
    }, { enableBackdropDismiss: false })
    modal.present()
    modal.onDidDismiss(result => {
      if (result) {
        this.getSupply();
      }
    })
  }

  //Edit Supply
  editSupply(recorder_input) {
    let recorder = Object.create(recorder_input);
    let modal = this.modalCtrl.create('EngWsEditSupplyPage', {
      'all_recorders':this.recorders,
      'recorder': recorder
    }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getSupply();
      }
    })
  }
  //Delete Supply
  deleteSupply(recorder) {
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
            this.engWsOutSideService.deleteSupply(recorder.id)
              .then(result => {
                this.dismissLoader();
                this.getSupply();
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
