import { DateService } from './../../../../services/date.service';
import { EngWsOutsideService } from './../../../../services/eng/ws-outside.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';

/**
 * Generated class for the EngWsAddSupplyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-ws-add-supply',
  templateUrl: 'eng-ws-add-supply.html',
})
export class EngWsAddSupplyPage {
  _loader: any
  _toast: any
  _alert: any
  _submit_status: boolean;
  /* Date Time */
  date: any;
  real_time_record: any;
  time_records: any[];
  all_recorders:any;
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
    public engWsOutsideService: EngWsOutsideService,
    public dateService: DateService
  ) {
  }

  ngOnInit() {
    this.time_records = [];
    for (let i = 1; i <= 24; i++) {
      this.time_records.push(i + ':00')
    }
    this._submit_status = false;
    this.date = this.dateService.getDate();
    this.real_time_record = this.dateService.getTime().currentTime
    //Remove already time
    this.all_recorders = this.navParams.data.all_recorders
    this.all_recorders.forEach(record => {
      let index = this.time_records.indexOf(record.time_record)
      this.time_records.splice(index, 1)
    })
  }

    //getRecords
    getRecords() {
      console.log('inGet')
      let loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
      loader.present();
      this.engWsOutsideService.getSupplyByDate(this.date)
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
  addSupply(formInputs,data) {
    this.old_date=this.date;
    this._submit_status = false
    console.log(formInputs);
    let loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    loader.present();
    this.engWsOutsideService.addSupply(formInputs)
      .then(result => {
        this._submit_status = true
        //Update
        data.form.reset();
        setTimeout(()=>{
          this.date = this.old_date;
          loader.dismiss();
          this.showToast('การบันทึกเสร็จสมบูรณ์')
        },50)
        //End Update
      }).catch(err => {
        console.log(err)
        loader.dismiss();
        this.showAlert((err.json()))
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
