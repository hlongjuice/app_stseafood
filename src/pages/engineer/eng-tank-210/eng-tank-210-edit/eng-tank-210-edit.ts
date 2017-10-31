import { EngTank210Service } from './../../../../services/eng/tank-210.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-eng-tank-210-edit',
  templateUrl: 'eng-tank-210-edit.html',
})
export class EngTank_210EditPage {

  _loader: any
  _toast: any
  _alert: any
  _submit_status: boolean;
  time_records: any[];

  recorder: any;
  all_recorders: any
  count: any;
  date: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public engTank210Service: EngTank210Service
  ) {
  }

  ngOnInit() {
    this.count = 0;
    this.time_records = [];
    for (let i = 1; i <= 24; i++) {
      this.time_records.push(i + ':00')
    }
    this._submit_status = false;
    this.recorder = this.navParams.data.recorder;
    //Remove already time
    this.all_recorders = this.navParams.data.all_recorders
    this.all_recorders.forEach(record => {
      if (record.time_record != this.recorder.time_record) {
        let index = this.time_records.indexOf(record.time_record)
        this.time_records.splice(index, 1)
      }
    })
    this.date = this.recorder.date;
  }

  //getRecords
  getRecords() {
    console.log(this.date);
    if (this.count > 0) {
      console.log('In get Records')
      this.showLoader()
      console.log()
      this.engTank210Service.getRecordByDate(this.date)
        .then((result: any) => {
          console.log(result)
          this.all_recorders = result.data;
          this.timeRecordFilter();
          this.dismissLoader()
        }).catch(err => {
          console.log(err)
          this.showAlert(err)
          this.dismissLoader();
        })
    }
    this.count++;
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

  //Update Supply
  updateRecord(formInputs) {
    formInputs.id = this.recorder.id;
    this.showLoader()
    this.engTank210Service.updateRecord(formInputs)
      .then(result => {
        this._submit_status = true;
        this.dismissLoader();
        this.showToast('แก้ไขเสร็จสมบูรณ์')
        this.viewCtrl.dismiss(this._submit_status)
      }).catch(err => {
        console.log(err)
        this.dismissLoader();
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
  //disMiss Loader
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
