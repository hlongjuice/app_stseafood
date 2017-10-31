import { WebUrlService } from './../../../../../services/weburl.service';
// import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { RepairInvoiceService } from '../../../../../services/other/repair-invoice.service';

/**
 * Generated class for the RepairInvoiceResponseEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-invoice-response-edit',
  templateUrl: 'repair-invoice-response-edit.html',
})
export class RepairInvoiceResponseEditPage {

  _loader: any
  _toast: any
  _alert: any
  _submit_status: boolean;

  recorder: any;
  user: any;
  statuses: any;
  sender_name: any;
  approver_name: any;
  item_image:any;
  old_image:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public repairInvoiceService: RepairInvoiceService,
    // public cameraCtrl: Camera,
    public webUrlService:WebUrlService
  ) {
  }

  ngOnInit() {
    this.approver_name = null;
    this._submit_status = false;
    this.recorder = this.navParams.data.recorder;
    this.user = this.navParams.data.user;
    this.statuses = this.repairInvoiceService.getStatus();
    this.sender_name = this.recorder.sender.name + ' ' + (this.recorder.sender.lastname || "");
    if (this.recorder.approver) {
      this.approver_name = this.recorder.approver.name + ' ' + this.recorder.approver.lastname
    }
    this.old_image=this.webUrlService.getUrl()+'/'+this.recorder.image;
    console.log(this.recorder)
    console.log(this.navParams.data)
  }


  //Approve Request
  approveRequest() {
    this._submit_status = false;
    let inputs = {
      'id': this.recorder.id,
      'user_id': this.user.id
    }
    this.showLoader()
    this.repairInvoiceService.approveRequest(inputs)
      .then(result => {
        this._submit_status = true;
        this.dismissLoader();
        this.showToast('แก้ไขเสร็จสมบูรณ์')
        this.viewCtrl.dismiss(this._submit_status)
      }).catch(err => {
        console.log(err)
        this.dismissLoader();
        this.showAlert(err)
      })
  }
  canCelApproved() {
    this._submit_status = false;
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการยกเลิก',
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
            this.repairInvoiceService.cancelApproved(this.recorder.id)
              .then(result => {
                this._submit_status = true;
                this.dismissLoader();
                this.viewCtrl.dismiss(this._submit_status)
                this.showToast('ขั้นตอนเสร็จสิ้น')
              }).catch(err => { this.dismissLoader(); this.showAlert(err); })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    confirm.present();
  }

  //Reject Request
  rejectRequest() {
    this._submit_status = false;
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการปฏิเสธ',
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
            this.repairInvoiceService.rejectRequest(this.recorder.id)
              .then(result => {
                this._submit_status = true;
                this.dismissLoader();
                this.viewCtrl.dismiss(this._submit_status)
                this.showToast('ขั้นตอนเสร็จสิ้น')
              }).catch(err => { this.dismissLoader(); this.showAlert(err); })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    confirm.present();
  }
  //Dismiss
  dismiss() {
    this.viewCtrl.dismiss(this._submit_status);
  }
  //Loader
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  //disMiss Loader
  dismissLoader() {
    this._loader.dismiss()
  }
  //Alert
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  //Toast
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000, position: 'top' })
    this._toast.present()
  }

}
