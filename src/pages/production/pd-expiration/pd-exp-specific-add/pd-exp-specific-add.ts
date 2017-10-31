import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { ProductionExpService } from "../../../../services/production/expiration.service";
import { ProductionProductService } from "../../../../services/production/product.service";
import { DateService } from "../../../../services/date.service";

/**
 * Generated class for the PdExpSpecificAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-exp-specific-add',
  templateUrl: 'pd-exp-specific-add.html',
})
export class PdExpSpecificAddPage {

  _loader:any
  _toast:any
  _alert:any
  _submit_status:boolean;
  /* Date Time */
  product:any;
  product_code:any;
  product_id:any;
  mfd:any;
  /* End Date Time */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public productionExpService:ProductionExpService,
    public productionProductService:ProductionProductService,
    public dateService:DateService
  ) {
  }

  ngOnInit(){
    this.product=this.navParams.data.product;
    this.product_code=this.navParams.data.product_code;
    this.mfd=this.navParams.data.mfd;
    this.product_id=this.navParams.data.product_id;
    console.log(this.navParams.data)
  }

  //Add Supply
  addExp(formInputs){
    formInputs.product_id=this.product_id;
    formInputs.code=this.product_code;
    formInputs.mfd=this.mfd;
    this._submit_status=false
    console.log(formInputs);
    this.showLoader()
    this.productionExpService.addExp(formInputs)
    .then(result=>{
      this._submit_status=true
      this.dismissLoader();
      this.viewCtrl.dismiss(this._submit_status)
      this.showToast('การบันทึกเสร็จสมบูรณ์')
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
