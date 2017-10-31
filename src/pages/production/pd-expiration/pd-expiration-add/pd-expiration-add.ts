import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { ProductionExpService } from "../../../../services/production/expiration.service";
import { ProductionProductService } from "../../../../services/production/product.service";
import { DateService } from "../../../../services/date.service";

/**
 * Generated class for the PdExpirationAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-expiration-add',
  templateUrl: 'pd-expiration-add.html',
})
export class PdExpirationAddPage {

  _loader:any
  _toast:any
  _alert:any
  _submit_status:boolean;
  /* Date Time */
  date:any;
  real_time_record:any;
  products:any;
  product:any;
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
    this.mfd=this.dateService.getDate();
    this.product=[];
    this.product.name=null;
    this.product.id=null;
    this.showLoader()
    this._submit_status=false;
    this.date=this.dateService.getDate();
    this.real_time_record=this.dateService.getTime().currentTime
    this.productionProductService.getAll()
    .then(result=>{
      console.log(result);
      this.products=result;
      this.dismissLoader();
    }).catch(err=>{console.log(err);this.showAlert(err.text());this.dismissLoader()})
  }

    //Get Product
    getProduct(){
      let modal=this.modalCtrl.create('PdProductModalPage',{
        'products':this.products
      },{enableBackdropDismiss:false})
      modal.present();
      modal.onDidDismiss(result=>{
        if(result){
          this.product=result;
        }
      })
    }

  //Add Supply
  addExp(formInputs){
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
