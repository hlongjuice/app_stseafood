import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { EngColdStorageService } from "../../../../services/eng/cold-storage.service";

/**
 * Generated class for the EngColdStorageEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-cold-storage-edit',
  templateUrl: 'eng-cold-storage-edit.html',
})
export class EngColdStorageEditPage {

  _loader: any
  _toast: any
  _alert: any
  _submit_status: boolean;
  time_records: any[];
  defrosts: any[];
  all_recorders: any;
  date: any;
  count: any;

  recorder: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public engColdStorageService: EngColdStorageService
  ) {
  }

  ngOnInit() {
    this.defrosts = this.navParams.data.defrost_time
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
      this.engColdStorageService.getRecordByDate(this.date)
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

    /* Defrost Time */
    isDefrostTime(time_record,storageID){
      let hasDefrost=this.defrosts.filter(item=>{
        return item.time_record==time_record && item.storage_id==storageID
      })
      if(hasDefrost.length>0){
        return true
      }
      return false;
    }

  //Update Supply
  updateRecord(formInputs) {
    formInputs.id = this.recorder.id;
    this.showLoader()
    this.engColdStorageService.updateRecord(formInputs)
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