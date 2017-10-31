import { DateService } from './../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { EngDefrostTimeService } from "../../../services/eng/defrost-time.service";

/**
 * Generated class for the EngDefrostTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-defrost-time',
  templateUrl: 'eng-defrost-time.html',
})
export class EngDefrostTimePage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  storageID:any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engDefrostTimeService: EngDefrostTimeService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService
  ) {
  }

  ngOnInit() {
    this.storageID='1';
    this.date = this.dateService.getDate();
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
    this.getRecords();
  }

  //Get Supply
  getRecords() {
    console.log(this.storageID)
    this.recorders=[];
    this.showLoader()
    this.engDefrostTimeService.getRecord(this.storageID)
      .then(result => {
        console.log(result)
        this.recorders = result;
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        this.dismissLoader();
      })
  }

  //Add Supply
  addRecord() {
    let modal = this.modalCtrl.create('EngDefrostTimeAddPage', null, { enableBackdropDismiss: false })
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
    let modal = this.modalCtrl.create('EngDefrostTimeEditPage', {
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
      title:'ยืนยันการลบ',
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
            this.engDefrostTimeService.deleteRecord(recorder.id)
              .then(result => {
                this.dismissLoader();
                this.getRecords();
                this.showToast('ลบข้อมูลเสร็จสิ้น')
              }).catch(err => { this.dismissLoader();this.showAlert(err);  })
          },
          cssClass:'alertConfirm'
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
