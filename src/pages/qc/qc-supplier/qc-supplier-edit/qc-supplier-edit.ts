import { SupplierService } from './../../../../services/supplier.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';

/**
 * Generated class for the QcSupplierEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-supplier-edit',
  templateUrl: 'qc-supplier-edit.html',
})
export class QcSupplierEditPage {

  _loader:any
  _toast:any
  _alert:any
  supplier:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public viewCtrl:ViewController,
    public supplerService:SupplierService
  ) {
  }
  
  ngOnInit(){
    this.supplier=this.navParams.data.supplier
  }

  /* update */
  updateSupplier(formInputs){
    formInputs.id=this.supplier.id
    this.showLoader()
    this.supplerService.updateSupplier(formInputs)
    .then(result=>{
      this.dismissLoader()
      this.viewCtrl.dismiss(result)
      this.showToast('อัพเดทเสร็จสิ้น')
    }).catch(err=>{console.log(err);this.dismissLoader(); this.showAlert('ไม่สามารถอัพเดทข้อมูลได้ โปรดลองใหม่อีกครั้ง')})
  }
  /* dismiss */
  dismiss(){
    this.viewCtrl.dismiss();
  }

  //Loader
  showLoader(){
    this._loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    this._loader.present()
  }
  //disMiss
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
