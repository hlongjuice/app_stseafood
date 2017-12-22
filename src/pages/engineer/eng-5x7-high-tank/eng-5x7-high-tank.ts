import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { DateService } from '../../../services/date.service';
import { AuthService } from '../../../services/auth.service';
import { Eng_5x7HighTankService } from '../../../services/eng/_5x7-high-tank.service';

/**
 * Generated class for the Eng_5x7HighTankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eng-5x7-high-tank',
  templateUrl: 'eng-5x7-high-tank.html',
})
export class Eng_5x7HighTankPage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  yesterday_meter: any;
  result_date: any;
  user_types: any;
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eng_5x7HighTankService: Eng_5x7HighTankService,
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
        this.user = result
        this.user_types = this.authService.getUserTypes();
        console.log(this.user, this.user_types);
        this.date = this.dateService.getDate();
        this.month = this.dateService.getCurrentDateTime().MM;
        this.year = this.dateService.getCurrentDateTime().YY;
        this.getRecords();
      })
  }

  //Get Supply
  getRecords() {
    this.showLoader()
    this.eng_5x7HighTankService.getRecordByDate(this.date)
      .then((result: any) => {
        console.log(result)
        this.recorders = result.data;
        this.result_date = result.date;
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
    let modal = this.modalCtrl.create('Eng_5x7HighTankAddPage', {
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
    let modal = this.modalCtrl.create('Eng_5x7HighTankEditPage', {
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
            this.eng_5x7HighTankService.deleteRecord(recorder.id)
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
