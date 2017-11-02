import { QcShrimpReceivingService } from './../../../../services/qc/shrimp_receiving.service';
import { DateService } from './../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the QcAddReceivingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-add-receiving',
  templateUrl: 'qc-add-receiving.html',
})
export class QcAddReceivingPage {

  _loader: any;
  _alert: any;
  _toast: any;
  supplier_id: number;
  supplier_name: string;
  waterTemps: any[];
  date: string;
  time: string;
  shrimp_uf: string;
  car_release_start: string;
  car_release_end:string;
  user: any;
  isSubmit: boolean;
  car_waiting_time:number;
  sp_pond:any;
  sp_code:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public qcShrimpReceivingService: QcShrimpReceivingService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController
  ) {
  }

  ngOnInit() {
    // this.car_waiting_time=0;
    this.isSubmit = false;
    this.waterTemps = [{
      water_temp: null
    }];
    this.date = this.dateService.getDate();
    this.car_release_start = this.dateService.getTime().currentTime;
    this.car_release_end=this.dateService.getTime().currentTime;
    this.user = this.navParams.data.user
    console.log(this.navParams);
    if(this.navParams.data.recorder){
      // this.supplier_id=this.navParams.data.recorder.supplier_id
      console.log(this.navParams.data.recorder);
      this.supplier_name=this.navParams.data.recorder.supplier.name
      this.supplier_id=this.navParams.data.recorder.supplier_id
      this.sp_code=this.navParams.data.recorder.code;
      this.sp_pond=this.navParams.data.recorder.pond;
      this.date=this.navParams.data.recorder.date;
    }
  }

  /* Add Receiving */
  addReceiving(formInputs,data) {
    if(formInputs.car_waiting_time==null){
      formInputs.car_waiting_time=0;
    }
    // formInputs.car_release=this.car_release_start+'-'+this.car_release_end;
    formInputs.user_id = this.user.id;
    formInputs.shrimp_uf = this.shrimp_uf;
    formInputs.water_temp = this.waterTemps;
    formInputs.water_temp = this.waterTemps.filter(item=>{
      return item.water_temp!=""
    })
    if (formInputs!=null&&formInputs.water_temp[0].water_temp != null) {
      this.showLoader()
      this.qcShrimpReceivingService.addReceiving(formInputs)
        .then(result => {
          this.isSubmit = true;
          this.dismissLoader()
          data.form.reset();
          // this.viewCtrl.dismiss({'result':result,'submit':this.isSubmit})
          console.log(result)
          this.showToast('เพิ่มข้อมูลสำเร็จ')
        }).catch(err => { console.log(err.json()); this.dismissLoader(); this.showAlert(err.json()) })
    } else {
      this.showAlert('ยังไม่ได้ระบุอุณหภูมิ')
    }
  }
  /* Dismiss */
  dismiss() {
    this.viewCtrl.dismiss(this.isSubmit);
  }

  /* Get Suppliers */
  getSuppliers() {
    let modal = this.modalCtrl.create('SupplierInputPage')
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.supplier_id = result.id
        this.supplier_name = result.name
      }
    })
  }

  /* Set UF*/
  setUF(big, small) {
    if (small > 0 && small != null) {
      this.shrimp_uf = (big / small).toFixed(2);
    }
    console.log('In Changed')
  }
  addWaterTemp() {
    let temp = {
      water_temp: ''
    }
    this.waterTemps.push(temp)
    console.log(this.waterTemps)
  }
  /* Remove Water Temp */
  removeWaterTemp(index) {
    this.waterTemps.splice(index, 1)
  }
  /* Loader */
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  /* Dismiss Loader */
  dismissLoader() {
    this._loader.dismiss()
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  /* Toast */
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000, position: 'top' })
    this._toast.present()
  }


}
