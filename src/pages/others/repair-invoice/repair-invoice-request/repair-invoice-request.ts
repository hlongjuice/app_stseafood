import { AuthService } from './../../../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { DateService } from "../../../../services/date.service";
import { RepairInvoiceService } from "../../../../services/other/repair-invoice.service";

/**
 * Generated class for the RepairInvoiceRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-invoice-request',
  templateUrl: 'repair-invoice-request.html',
})
export class RepairInvoiceRequestPage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  time_records: any[];
  daily_used: any;
  user:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public repairInvoiceService: RepairInvoiceService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public authService:AuthService
  ) {
  }

  ngOnInit() {
    this.user=null;
    this.authService.getUserDetails()
    .then(result=>{
      this.user=result;
      console.log(this.user)
      this.getRecords();
    }).catch(err=>{console.log(err);})
    this.daily_used = [];
    this.date = this.dateService.getDate();
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
  }

  //Show Details
  showDetails(recorder){

  }
  //Get Supply
  getRecords() {
    this.showLoader()
    this.repairInvoiceService.getRecordByDate(this.date)
      .then((result: any) => {
        console.log(result)
        this.recorders = result;
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err.text())
        this.dismissLoader();
      })

  }

  //Add Supply
  addRecord() {
    let modal = this.modalCtrl.create('RepairInvoiceRequestAddPage', {
      'user':this.user
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
    console.log(recorder)
    let modal = this.modalCtrl.create('RepairInvoiceRequestEditPage', {
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
    console.log(recorder)
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
            this.repairInvoiceService.deleteRequest(recorder.id)
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
