import { WebUrlService } from './../../../../../services/weburl.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { RepairInvoiceService } from "../../../../../services/other/repair-invoice.service";

/**
 * Generated class for the RepairInvoiceRequestEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-invoice-request-edit',
  templateUrl: 'repair-invoice-request-edit.html',
})
export class RepairInvoiceRequestEditPage {

  _loader:any
  _toast:any
  _alert:any
  _submit_status:boolean;
  time_records:any[];
  item_image:any;
  selectedReceiver:any;
  old_image:any;
  repair_receivers:any;
  recorder:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public repairInvoiceService:RepairInvoiceService,
    public cameraCtrl:Camera,
    public webUrlService:WebUrlService
  ) {
  }

  ngOnInit(){
    this.item_image=null;
    this.time_records=[];
    this._submit_status=false;
    this.recorder=this.navParams.data.recorder;
    this.selectedReceiver=this.recorder.repair_receiver_id;
    if(this.recorder.image!=null && this.recorder.image!=""){
      this.old_image=this.webUrlService.getUrl()+'/'+this.recorder.image;
    }else{
      this.old_image=null;
    }
    this.repair_receivers=this.repairInvoiceService.getReceiver();
    console.log(this.recorder)
    console.log(this.navParams.data)
    console.log(this.selectedReceiver);
    console.log('Receiver',this.repair_receivers)
  }

  //Take Photo
  takePhoto() {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.cameraCtrl.DestinationType.DATA_URL,
      encodingType: this.cameraCtrl.EncodingType.JPEG,
      mediaType: this.cameraCtrl.MediaType.PICTURE,
      allowEdit:true
    }
    this.cameraCtrl.getPicture(options)
      .then(result => {
        this.item_image = 'data:image/jpeg;base64,' + result;
        this.old_image='data:image/jpeg;base64,' + result;
      }).catch(err => { console.log(err); this.showAlert(err) })
  }
  //Delete Photo
  deletePhoto(){
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel'
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.showLoader();
            this.repairInvoiceService.deletePhoto(this.recorder.id)
            .then(result=>{
              this.old_image=null;
              this.item_image=null;
              this.dismissLoader();
            }).catch(err=>{
              console.log(err)
              this.showAlert(err.text())
              this.dismissLoader();
            })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    confirm.present();
  }

  //Update Supply
  updateRequest(formInputs){
    formInputs.id=this.recorder.id;
    formInputs.image=this.item_image;
    console.log(formInputs);
    this.showLoader()
    this.repairInvoiceService.updateRequest(formInputs)
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
