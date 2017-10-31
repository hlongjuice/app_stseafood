import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { DateService } from "../../../../../services/date.service";
import { ProductionProductService } from "../../../../../services/production/product.service";

/**
 * Generated class for the PdProductAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-product-add',
  templateUrl: 'pd-product-add.html',
})
export class PdProductAddPage {

  _loader:any
  _toast:any
  _alert:any
  _submit_status:boolean;
  /* Date Time */
  date:any;
  real_time_record:any;
  /* End Date Time */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public productionProductService:ProductionProductService,
    public dateService:DateService
  ) {
  }

  ngOnInit(){
    this._submit_status=false;
    this.date=this.dateService.getDate();
    this.real_time_record=this.dateService.getTime().currentTime
  }

  //Add Supply
  addRecord(formInputs){
    this._submit_status=false
    console.log(formInputs);
    this.showLoader()
    this.productionProductService.addRecord(formInputs)
    .then(result=>{
      this._submit_status=true
      this.dismissLoader();
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
