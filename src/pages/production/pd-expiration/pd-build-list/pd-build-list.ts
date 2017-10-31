import { ProductionExpService } from './../../../../services/production/expiration.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';

/**
 * Generated class for the PdBuildListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-build-list',
  templateUrl: 'pd-build-list.html',
})
export class PdBuildListPage {
 _stat:boolean;
  _loader:any
  _toast:any
  _alert:any
  builds:any;
  product:any;
  code:any;
  round:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController,
    public productionExpService:ProductionExpService
  ) {
  }

  ngOnInit(){
    this._stat=false;
    this.builds=this.navParams.data.data;
    this.product=this.navParams.data.product;
    this.code=this.navParams.data.code;
    this.round=this.navParams.data.round
    console.log(this.navParams.data);
  }
  dismiss(){
    this.viewCtrl.dismiss(this._stat);
  }

  //deleteRecord
  deleteRecord(build,index){
    let confirm = this.alertCtrl.create({
      title:'ยืนยันการลบ',
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
            this.productionExpService.deleteExpBuild(build.id)
            .then(()=>{
              this.dismissLoader()
              this._stat=true;
              this.builds.splice(index,1)
            }).catch(err => { this.dismissLoader();this.showAlert(err);  })
          },
          cssClass:'alertConfirm'
        }
      ]
    })

    confirm.present();
  }

  //Loader
  showLoader(){
    this._loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    this._loader.present()
  }
  //disMiss Loader
  dismissLoader(){
    this._loader.dismiss(this._stat);
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
