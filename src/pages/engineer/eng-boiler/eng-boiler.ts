import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { DateService } from "../../../services/date.service";
import { EngBoilerService } from "../../../services/eng/boiler.service";
import { AuthService } from '../../../services/auth.service';

/**
 * Generated class for the EngBoilerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-boiler',
  templateUrl: 'eng-boiler.html',
})
export class EngBoilerPage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  time_records:any[];
  daily_used:any;
  yesterday_meter:any;
  result_date:any;
  user_types: any;
  user: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engBoilerService: EngBoilerService,
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
    .then(result=>{
      this.user=result
      this.user_types=this.authService.getUserTypes();
      this.daily_used=[];
      this.date = this.dateService.getDate();
      this.month = this.dateService.getCurrentDateTime().MM;
      this.year = this.dateService.getCurrentDateTime().YY;
      this.getRecords();
    });
  }

  //Get Supply
  getRecords() {
    this.showLoader()
    this.engBoilerService.getRecordByDate(this.date)
      .then((result:any) => {
        console.log(result)
        this.recorders = result.data;
        this.result_date=result.date;
        this.yesterday_meter=result.yesterday_meter
        this.daily_used=result;
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        this.dismissLoader();
      })
      
  }

  //Add Supply
  addRecord() {
    let modal = this.modalCtrl.create('EngBoilerAddPage', {'all_recorders':this.recorders}, { enableBackdropDismiss: false })
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
    let modal = this.modalCtrl.create('EngBoilerEditPage', {
      'all_recorders':this.recorders,
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
            this.engBoilerService.deleteRecord(recorder.id)
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
