import { QcShrimpReceivingService } from './../../../../services/qc/shrimp_receiving.service';
// import { DateService } from './../../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the QcEditSupplierReceivingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-edit-supplier-receiving',
  templateUrl: 'qc-edit-supplier-receiving.html',
})
export class QcEditSupplierReceivingPage {

  _loader:any
  _toast:any
  _alert:any
  supplier_receiving_id:number;
  supplier_id:number;
  supplier_name:string;
  date:string;
  code:any;
  pond:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public qcShrimpReceivingService:QcShrimpReceivingService
  ) {
  }

  ngOnInit(){
    this.supplier_id=this.navParams.data.supplier.id
    this.supplier_name=this.navParams.data.supplier.name
    this.date=this.navParams.data.date
    this.pond=this.navParams.data.pond
    this.code=this.navParams.data.code;
    this.supplier_receiving_id=this.navParams.data.supplier_receiving_id
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

  /* Update Supplier Receiving */
  updateSupplierReceiving(formInputs){
    let loader=this.loaderCtrl.create({content:'กำลังอัพเดทข้อมูล...'})
    loader.present()
    formInputs.supplier_receiving_id=this.supplier_receiving_id
    console.log(formInputs)
    this.qcShrimpReceivingService.updateSupplierReceiving(formInputs)
    .then(result=>{
      loader.dismiss();
      this.viewCtrl.dismiss(result)
      this.showToast('การอัพเดทเสร็จสิน')
    }).catch(err=>{console.log(err.json());loader.dismiss();this.showAlert('ไม่สารถอัพเดทข้อมูลได้')})
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
