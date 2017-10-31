import { Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { DateService } from "../../../../services/date.service";
import { Eng_5x7Service } from "../../../../services/eng/_5x7.service";


/**
 * Generated class for the EngTank_210AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-5x7-add',
  templateUrl: 'eng-5x7-add.html',
})
export class Eng_5x7AddPage {

  _loader: any
  _toast: any
  _alert: any
  _submit_status: boolean;
  /* Date Time */
  date: any;
  real_time_record: any;
  time_records: any[];
  all_recorders: any;
  rest_time_records;
  old_date:any;
  /* End Date Time */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public eng_5x7Service: Eng_5x7Service,
    public dateService: DateService,
    public eventCtrl: Events
  ) {
  }

  ngOnInit() {
    this.time_records = [];
    for (let i = 1; i <= 24; i++) {
      this.time_records.push(i + ':00')
    }
    console.log(this.time_records);
    this._submit_status = false;
    this.date = this.dateService.getDate();
    this.real_time_record = this.dateService.getTime().currentTime

  }

  //getRecords
  getRecords() {
    console.log('inGet')
    let loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    loader.present();
    this.eng_5x7Service.getRecordByDate(this.date)
      .then((result: any) => {
        console.log(result)
        this.all_recorders = result.data;
        this.timeRecordFilter();
        loader.dismiss();
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        loader.dismiss();
      })
  }
  //Time Record Filter
  timeRecordFilter() {
    this.time_records = [];
    for (let i = 1; i <= 24; i++) {
      this.time_records.push(i + ':00')
    }
    //Remove already time
    this.all_recorders.forEach(record => {
      let index = this.time_records.indexOf(record.time_record)
      this.time_records.splice(index, 1)
    })
  }
  //Add Supply
  addRecord(formInputs, data) {
    this.old_date=this.date;
    this._submit_status = false
    console.log(formInputs);
    let loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    loader.present();
    this.eng_5x7Service.addRecord(formInputs)
      .then(result => {
        this._submit_status = true
        //Update
        data.form.reset();
        setTimeout(() =>{
          this.date = this.old_date
          loader.dismiss();
          this.showToast('การบันทึกเสร็จสมบูรณ์')
          console.log('success')
        }, 100);
        //End Update
      }).catch(err => {
        console.log(err)
        loader.dismiss();
        this.showAlert(err)
      })
  }
  //Dismiss
  dismiss() {
    this.viewCtrl.dismiss(this._submit_status);
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
