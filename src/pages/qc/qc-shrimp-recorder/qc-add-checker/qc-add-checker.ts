
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { QcShrimpReceivingService } from '../../../../services/qc/shrimp_receiving.service';

/**
 * Generated class for the QcAddCheckerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qc-add-checker',
  templateUrl: 'qc-add-checker.html',
})
export class QcAddCheckerPage {

  recorder:any;
  checker:any;
  approver:any;
  receivingID:any;
  add_status:boolean;
  report_number:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public qcShrimpReceivingService:QcShrimpReceivingService,
    public loaderCtrl:LoadingController,
    public altCtrl:AlertController,
    public toastCtrl:ToastController,
    public viewCtrl:ViewController,
    public alertCtrl:AlertController
  ) {
  }

  ngOnInit(){
    this.add_status=false;
    this.recorder=this.navParams.data.recorder;
    this.checker=this.navParams.data.checker;
    this.approver=this.navParams.data.approver;
    this.receivingID=this.navParams.data.receiving_id;
    this.report_number=this.navParams.data.report_number;

  }

  addChecker(formInputs){
    let loader=this.loaderCtrl.create({content:'กำลังบันทึกข้อมูล'})
    loader.present();
    formInputs.receiving_id=this.receivingID;
    this.qcShrimpReceivingService.addChecker(formInputs)
    .then(result=>{
      this.add_status=true;
      loader.dismiss();
      this.viewCtrl.dismiss(this.add_status);
    }).catch(err=>{
      let alert=this.alertCtrl.create({message:'ไม่สามารถบันทึกข้อมูลได้'})
      alert.present();
      console.log(err);
    })
  }

  //Dismiss
  dismiss(){
    this.viewCtrl.dismiss(this.add_status);
  }

}
