import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { ProductionProductService } from "../../../../../services/production/product.service";

/**
 * Generated class for the PdProductEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-product-edit',
  templateUrl: 'pd-product-edit.html',
})
export class PdProductEditPage {

  _loader:any
  _toast:any
  _alert:any
  _submit_status:boolean;
  time_records:any[];

  recorder:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public productionProductService:ProductionProductService
  ) {
  }

  ngOnInit(){
    this._submit_status=false;
    this.recorder=this.navParams.data.recorder;
  }

  //Update Supply
  updateRecord(formInputs){
    formInputs.id=this.recorder.id;
    this.showLoader()
    this.productionProductService.updateRecord(formInputs)
    .then(result=>{
      this._submit_status=true;
      this.dismissLoader();
      this.showToast('แก้ไขเสร็จสมบูรณ์')
      this.viewCtrl.dismiss(this._submit_status)
    }).catch(err=>{
      console.log(err)
      this.dismissLoader();
      this.showAlert(err)
    })
  }
  //Dismiss
  dismiss(){
    this.viewCtrl.dismiss(this._submit_status);
  }
  //Loader
  showLoader(){
    this._loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    this._loader.present()
  }
  //disMiss Loader
  dismissLoader(){
    this._loader.dismiss()
  }
  //Alert
  showAlert(textInput){
    this._alert=this.alertCtrl.create({title:textInput})
    this._alert.present()
  }
  //Toast
  showToast(textInput){
    this._toast=this.toastCtrl.create({message:textInput,duration:2000,position:'top'})
    this._toast.present()
  }

}
