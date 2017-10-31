import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { CarAccessService } from '../../../../../services/human-resource/car/car-access.service';
import { CarResponseService } from '../../../../../services/human-resource/car/car-response.service';
import { DateService } from '../../../../../services/date.service';

/**
 * Generated class for the CarAccessUsagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-access-usage',
  templateUrl: 'car-access-usage.html',
})
export class CarAccessUsagePage {

  _loader: any;
  _alert: any;
  _toast: any;
  _status_id = 3;
  records: any;
  user: any;
  date_arrival:string;
  time_arrival:string;
  record:any;
  date:any;
  selectedStatus:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public carAccessService: CarAccessService,
    public carResponseService: CarResponseService,
    public toastCtrl: ToastController,
    public dateService:DateService,
    public modalCtrl:ModalController
  ) {
  }

  /* ngOnInit */
  ngOnInit() {
    this.date=this.dateService.getDate();
    this.selectedStatus='0';
    this.date=this.dateService.getDate();
   this.getCarArrivalByDate();
  }

  getCarArrivalByDate(){
    this.showLoader();
    this.carAccessService.getCarArrivalByDate(this.date,this.selectedStatus)
    .then(result=>{
      this.records=result;
      console.log(result);
      this.dismissLoader();
    }).catch(err=>{
      console.log(err);
      this.dismissLoader();
    })
  }

  //Add Gas Fill
  addGasFill(record){
    let modal =this.modalCtrl.create('CarAccessUsageAddPage',{
      'record':record
    },{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(result=>{
      if(result){
        this.getCarArrivalByDate();
      }
    })
  }
   //Edit Gas Fill
   editGasFill(record){
    let modal =this.modalCtrl.create('CarAccessUsageEditPage',{
      'record':record
    },{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(result=>{
      if(result){
        this.getCarArrivalByDate();
      }
    })
  }
  deleteGasFill(record){
    // let errAlert = this.alertCtrl.create({
      // title: 'ไม่สามารถลบข้อมูลได้'
    // })
    let confirmAlert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [{
        text: 'ยกเลิก',
        role: 'cancel',
        cssClass: 'alertCancel'
      }, {
        text: 'ยืนยัน',
        handler: () => {
          this.carAccessService.deleteGasFill(record.id)
          .then(result=>{
            this.getCarArrivalByDate();
          }).catch(err=>{
            this.showAlert(err)
          })
        },
        cssClass: 'alertConfirm'
      }]
    })
    confirmAlert.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
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
