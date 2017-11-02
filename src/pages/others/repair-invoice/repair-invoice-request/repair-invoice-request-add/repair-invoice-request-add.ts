import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { DateService } from "../../../../../services/date.service";
import { RepairInvoiceService } from "../../../../../services/other/repair-invoice.service";

/**
 * Generated class for the RepairInvoiceRequestAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-invoice-request-add',
  templateUrl: 'repair-invoice-request-add.html',
})
export class RepairInvoiceRequestAddPage {

  _loader:any
  _toast:any
  _alert:any
  _submit_status:boolean;
  /* Date Time */
  date:any;
  time:any;
  real_time_record:any;
  time_records:any[];
  user:any;
  repair_receivers:any;
  selected_receiver:any;
  item_image:any;
  /* End Date Time */
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public repairInvoiceService:RepairInvoiceService,
    public dateService:DateService,
    public cameraCtrl: Camera
  ) {
  }

  ngOnInit(){
    this.item_image=null;
    this.time=this.dateService.getTime().currentTime;
    this._submit_status=false;
    this.date=this.dateService.getDate();
    this.real_time_record=this.dateService.getTime().currentTime
    this.user=this.navParams.data.user;
    this.repair_receivers=this.repairInvoiceService.getReceiver();
    console.log(this.navParams.data)
  }

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
      }).catch(err => { console.log(err); this.showAlert(err) })
  }
  //Add Supply
  addRequest(formInputs){
    console.log(this.selected_receiver.id);
    formInputs.repair_receiver_id=this.selected_receiver.id;
    formInputs.division_id=this.user.division_id;
    formInputs.image=this.item_image;
    console.log(this.user);
    formInputs.sender_id=this.user.id;
    this._submit_status=false
    console.log(formInputs);
    this.showLoader()
    this.repairInvoiceService.addRequest(formInputs)
    .then(result=>{
      this._submit_status=true
      this.viewCtrl.dismiss(this._submit_status);
      this.dismissLoader();
      this.showToast('การบันทึกเสร็จสมบูรณ์')
    }).catch(err=>{
      console.log(err)
      this.dismissLoader();
      this.showAlert(err)
    })
  }
  //Delete Photo
  deletePhoto(){
    this.item_image="";
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
