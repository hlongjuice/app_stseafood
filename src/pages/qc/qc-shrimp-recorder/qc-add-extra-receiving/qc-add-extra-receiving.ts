import { QcShrimpReceivingService } from './../../../../services/qc/shrimp_receiving.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the QcAddExtraReceivingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-add-extra-receiving',
  templateUrl: 'qc-add-extra-receiving.html',
})
export class QcAddExtraReceivingPage {

  last_five_round_status:any;
  real_shrimp_soft:any;
  small_shrimp_b:any;
  avl:any;
  waiting_list:any;
  receiving_id:number
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public qcShrimpReceivingService:QcShrimpReceivingService
  ) {
  }

  ngOnInit(){
    this.last_five_round_status=this.navParams.data.last_five_round_status;
    this.last_five_round_status=(this.last_five_round_status==1)?true:false;
    this.real_shrimp_soft=this.navParams.data.real_shrimp_soft
    this.receiving_id=this.navParams.data.receiving_id;
    this.avl=(this.navParams.data.avl==1)?true:false;
    this.waiting_list=(this.navParams.data.waiting_list==1)?true:false;
    this.small_shrimp_b=this.navParams.data.small_shrimp_b;
    console.log(this.navParams.data)
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  addExtraReceiving(formInputs){
    // console.log(formInputs)
    formInputs.receiving_id=this.receiving_id;
    this.qcShrimpReceivingService.addExtraReceiving(formInputs)
    .then(result=>{
      this.viewCtrl.dismiss(result);
    }).catch(err=>{console.log(err)})
  }

}
