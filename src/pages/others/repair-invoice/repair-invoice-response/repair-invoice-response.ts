import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { RepairInvoiceService } from '../../../../services/other/repair-invoice.service';
import { DateService } from '../../../../services/date.service';
import { AuthService } from '../../../../services/auth.service';

/**
 * Generated class for the RepairInvoiceResponsePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-invoice-response',
  templateUrl: 'repair-invoice-response.html',
})
export class RepairInvoiceResponsePage {

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
  statusTabs:any;
  status:any;
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
    this.status=this.repairInvoiceService.getStatus();
    this.user=null;
    this.authService.getUserDetails()
    .then(result=>{
      this.user=result;
      console.log(this.user);
      this.getRecords();
    }).catch(err=>{
      console.log(err)
    })

    this.daily_used = [];
    this.date = this.dateService.getDate();
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
  }

  //Get Supply
  getRecords() {
    console.log(this.date,this.statusTabs);
    let loader=this.loaderCtrl.create({content:"กำลังโหลดข้อมูล..."})
    loader.present();
    this.repairInvoiceService.getResponseByDate(this.date,this.statusTabs)
      .then((result: any) => {
        console.log(result)
        this.recorders = result;
        loader.dismiss();
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        loader.dismiss();
      })

  }


  //Approve Request
  showDetails(recorder_input) {
    let recorder = Object.create(recorder_input);
    console.log(recorder)
    let modal = this.modalCtrl.create('RepairInvoiceResponseEditPage', {
      'recorder': recorder,
      'user':this.user
    }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
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
