import { QcShrimpReceivingService } from './../../../../services/qc/shrimp_receiving.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';

/**
 * Generated class for the QcRecorderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-recorder-details',
  templateUrl: 'qc-recorder-details.html',
})
export class QcRecorderDetailsPage {

  _loader: any
  _toast: any
  _alert: any
  details: any;
  supplier_details: any;
  shrimp_uf: any;
  waterTemps: any[];
  user: any;
  weight:any;
  /* Defect */
  df_s_dead_percent: any;
  df_s_semi_soft_percent: any;
  df_s_soft_shell: any;
  df_s_scar: any;
  df_s_bk_line: any;
  df_s_disabled: any;
  /* end Defect */
  real_shrimp_dead_percent: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public qcShrimpReceivingService: QcShrimpReceivingService,
    public viewCtrl: ViewController,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public eventCtrl: Events
  ) {
  }

  ngOnInit() {
    this.waterTemps = []
    this.details = this.navParams.data.details;
    this.supplier_details = this.navParams.data.supplier_details
    this.user = this.navParams.data.user;
    this.convertResultToPercent(this.details)
    this.details.water_temp.forEach(item => {
      let temp = {
        'water_temp': item.value
      }
      this.waterTemps.push(temp)
    })
    this.shrimp_uf = this.details.shrimp_uf
    console.log(this.details)
    console.log(this.waterTemps)
  }

  updateReceiving(formInputs) {
    formInputs.qc_supplier_receiving_id=this.details.qc_supplier_receiving_id;
    formInputs.shrimp_receiving_id = this.details.id
    formInputs.water_temp = this.waterTemps
    formInputs.user_id = this.user.id
    formInputs.shrimp_uf = this.shrimp_uf
    console.log(formInputs)
    this.qcShrimpReceivingService.updateShrimpReceiving(formInputs)
      .then(result => {
        this.viewCtrl.dismiss(result)
      }).catch(err => { 
        console.log(err.json()); 
        this.showAlert(err.json()) }
      )
  }

  /* Remove Water Temp */
  removeWaterTemp(index) {
    this.waterTemps.splice(index, 1)
  }

  /* Convert Result to Percent */
  convertResultToPercent(details) {
    this.df_s_dead_percent=this.toDfPercent(details.df_shrimp_dead)
    this.df_s_semi_soft_percent=this.toDfPercent(details.df_shrimp_semi_soft)
    this.df_s_soft_shell=this.toDfPercent( details.df_shrimp_soft_shell)
    this.df_s_scar=this.toDfPercent(details.df_shrimp_scar)
    this.df_s_bk_line=this.toDfPercent(details.df_shrimp_bk_line)
    this.df_s_disabled=this.toDfPercent(details.df_shrimp_disabled)

    this.real_shrimp_dead_percent=this.toRealShrimpDeadPercent(details.real_shrimp_dead)
  }
  toDfPercent(input){
    return (input/2000)*100
  }
  toRealShrimpDeadPercent(input){
    if(this.weight!=0)
    return (input/this.weight)*100
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
  //dismiss
  dismiss() {
    this.viewCtrl.dismiss();
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
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000 })
    this._toast.present()
  }



}
