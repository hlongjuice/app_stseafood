import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CarAccessService } from '../../../../../../services/human-resource/car/car-access.service';
import { CarResponseService } from '../../../../../../services/human-resource/car/car-response.service';
import { DateService } from '../../../../../../services/date.service';

/**
 * Generated class for the CarAccessUsageAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-access-usage-add',
  templateUrl: 'car-access-usage-add.html',
})
export class CarAccessUsageAddPage {

  _submit_status:boolean
  _loader: any;
  _alert: any;
  _toast: any;
  record:any;
  date:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public carAccessService: CarAccessService,
    public carResponseService: CarResponseService,
    public toastCtrl: ToastController,
    public dateService:DateService
  ) {
  }

  /* ngOnInit */
  ngOnInit() {
    this._submit_status=false;
    this.record=this.navParams.data.record;
    this.date=this.dateService.getTime().currentTime;
  }

  addGasFill(formInputs){
    this.showLoader();
    formInputs.id=this.record.id;
    this.carAccessService.updateGasFill(formInputs)
    .then(result=>{
      this.dismissLoader();
      this.showToast();
      this._submit_status=true;
      this.viewCtrl.dismiss(this._submit_status)  
    }).catch(err=>{
      console.log(err)
      this.showAlert(err.text())
    })
  }

  dismiss() {
    this.viewCtrl.dismiss(this._submit_status);
  }

  /* Loader */
  showLoader() {
    this._loader = this.loaderCtrl.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    this._loader.present();
  }
  dismissLoader() {
    this._loader.dismiss();
  }
  /* Toast */
  showToast() {
    this._toast = this.toastCtrl.create({
      message: 'การบันสำเร็จ',
      duration: 2000,
      position: 'top'
    });
    this._toast.present();
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({
      title: textInput
    })
    setTimeout(this._alert.present(), 2000)
  }


}
