import { DateService } from './../../../services/date.service';
import { QcShrimpReceivingService } from './../../../services/qc/shrimp_receiving.service';
import { AuthService } from './../../../services/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, Events, ToastController } from 'ionic-angular';
/**
 * Generated class for the QcShrimpRecorderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-shrimp-recorder',
  templateUrl: 'qc-shrimp-recorder.html',
})
export class QcShrimpRecorderPage {
  _loader: any;
  _alert: any;
  user: any;
  recorders: any[];
  date: string
  // test:any;
  @ViewChild('test') el: ElementRef
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public authService: AuthService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public shrimpReceivingService: QcShrimpReceivingService,
    public dateService: DateService,
    public eventCtrl: Events,
    public tostCtrl:ToastController
  ) {
    eventCtrl.subscribe('receiving:update', () => {
      this.getReceiving()
    })
    eventCtrl.subscribe('receiving:delete', () => {
      this.getReceiving();
    })
  }
  ngOnInit() {
    this.date = this.dateService.getDate();
    this.showLoader();
    Promise.all([
      this.authService.getUser()
        .then(result => {
          this.user = result;
        }).catch(err => { console.log(err); this.dismissLoader(); this.showAlert('ไม่สามารโหลดข้อมูลได้') }),
      /* Shrimp Receiving */
      this.shrimpReceivingService.showReceiving(this.date)
        .then(result => {
          this.recorders = result
        }).catch(err => { console.log(err) })
    ]).then(result => {
      this.dismissLoader();
    }).catch(err => { console.log(err); this.dismissLoader() })
  }

  //Get Receiving
  getReceiving() {
    let modal = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    modal.present();
    this.recorders = [];
    this.shrimpReceivingService.showReceiving(this.date)
      .then(result => {
        console.log(result)
        this.recorders = result
        modal.dismiss()
      }).catch(err => { console.log(err); modal.dismiss() })
  }

  /* Add New Receiving */
  addNewReceiving() {
    let modal = this.modalCtrl.create('QcAddReceivingPage', { 'user': this.user },{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(result => {
      console.log(result)
      if (result==true) {
          this.getReceiving()
      }
    })
    // this.navCtrl.push(this.qcAddReceivingPage, { 'user': this.user })

  }
  /* Add Extra Receiving */
  addExtraReceiving(recorder) {
    let modal = this.modalCtrl.create('QcAddExtraReceivingPage', {
      'last_five_round_status': recorder.last_five_round_status,
      'real_shrimp_soft': recorder.real_shrimp_soft,
      'receiving_id': recorder.id,
      'date': this.date
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getReceiving();
      }
    })
  }

  /* Edit Supplier Receiving */
  editSupplierReceiving(recorder) {
    let modal = this.modalCtrl.create('QcEditSupplierReceivingPage', {
      'pond': recorder.pond,
      'code': recorder.code,
      'supplier': recorder.supplier,
      'date': recorder.date,
      'supplier_receiving_id': recorder.id
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getReceiving();
      }
    })
  }
  /* Show Details */
  showRecorderList(recorder) {
    let supplier_details = {
      'supplier': recorder.supplier,
      'supplier_id': recorder.supplier_id
    }
    this.navCtrl.push('QcRecorderListPage', {
      'recorder': recorder,
      'supplier': supplier_details,
      'user': this.user,
      'date': this.date
    });
  }

  /* Delete Supplier */
  deleteSupplierReceiving(recorder) {
    let loader=this.loaderCtrl.create({content:'กำลังลบข้อมูล'});
    console.log(recorder)
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel'
        }, {
          text: 'ยืนยัน',
          handler: () => {
            loader.present();
            this.shrimpReceivingService.deleteSupplierReceiving(recorder.id)
              .then(result => {
                loader.dismiss();
                this.getReceiving();
                console.log(result);
              }).catch(err => { console.log(err); this.showAlert('ไม่สามารถลบข้อมูลได้') })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    alert.present();
  }

  /* Pop up */
  /* Loader */
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  /* dismiss Loader */
  dismissLoader() {
    this._loader.dismiss()
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }

  /* Add Checker */
  addChecker(recorder){
    let modal =this.modalCtrl.create('QcAddCheckerPage',{
      'receiving_id':recorder.id,
      'recorder':recorder.recorder,
      'checker':recorder.checker,
      'approver':recorder.approver,
      'report_number':recorder.report_number
    })
    modal.present();
    modal.onDidDismiss(result=>{
      if(result){
        let toast=this.tostCtrl.create({message:'บันทึกเสร็จสมบูรฯ์',duration:2000})
        toast.present();
        this.getReceiving();
      }
    })
  }

}
