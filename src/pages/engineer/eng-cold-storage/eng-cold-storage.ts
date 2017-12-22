import { EngDefrostTimeService } from './../../../services/eng/defrost-time.service';
import { DateService } from './../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { EngColdStorageService } from "../../../services/eng/cold-storage.service";
import { AuthService } from '../../../services/auth.service';

/**
 * Generated class for the EngColdStoragePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-cold-storage',
  templateUrl: 'eng-cold-storage.html',
})
export class EngColdStoragePage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  time_records: any[];
  defrost_time: any;
  yesterday_meter: any;
  result_date: any;
  user_types: any;
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engColdStorageService: EngColdStorageService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public engDefrostTimeService: EngDefrostTimeService,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.getUserDetails()
      .then(result => {
        this.user = result
        this.user_types = this.authService.getUserTypes();
        this.defrost_time = [];
        this.engDefrostTimeService.getRecord('all')
          .then((result: any[]) => {
            this.defrost_time = result;
            console.log(this.defrost_time)
          })
        this.date = this.dateService.getDate();
        this.month = this.dateService.getCurrentDateTime().MM;
        this.year = this.dateService.getCurrentDateTime().YY;
        this.getRecords();
      })
  }

  //Get Supply
  getRecords() {
    this.showLoader()
    this.engColdStorageService.getRecordByDate(this.date)
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
    let modal = this.modalCtrl.create('EngColdStorageAddPage', {
      'all_recorders': this.recorders,
      'defrost_time': this.defrost_time
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
    let modal = this.modalCtrl.create('EngColdStorageEditPage', {
      'all_recorders': this.recorders,
      'recorder': recorder,
      'defrost_time': this.defrost_time
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
            this.engColdStorageService.deleteRecord(recorder.id)
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
