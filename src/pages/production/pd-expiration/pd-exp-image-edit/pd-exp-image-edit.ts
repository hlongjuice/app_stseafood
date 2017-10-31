import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { ProductionExpService } from "../../../../services/production/expiration.service";
import { DateService } from "../../../../services/date.service";

/**
 * Generated class for the PdExpImageEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-exp-image-edit',
  templateUrl: 'pd-exp-image-edit.html',
})
export class PdExpImageEditPage {

  _loader: any
  _toast: any
  _alert: any
  _submit_status: boolean;
  /* Date Time */
  date: any;
  outSideImage: any;
  inSideImage: any;
  stickerImage: any;
  imgOutSideInput: any;
  imgInSideInput: any;
  imgStickerInput: any;
  p_exp_id: any
  oldOutSideImage: any;
  oldInSideImage: any;
  oldStickerImage: any;

  /* End Date Time */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public productionExpService: ProductionExpService,
    public dateService: DateService,
    public cameraCtrl: Camera
  ) {
  }

  ngOnInit() {
    this.imgOutSideInput=null;
    this.imgInSideInput=null;
    this.imgStickerInput=null;
    this._submit_status = false;
    this.date = this.dateService.getDate();
    this.p_exp_id = this.navParams.data.p_exp_id;
    this.oldOutSideImage = this.navParams.data.outSideImage;
    this.oldInSideImage = this.navParams.data.inSideImage;
    this.oldStickerImage = this.navParams.data.stickerImage;
    console.log(this.navParams.data)

  }

  takePhoto(type) {
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.cameraCtrl.DestinationType.DATA_URL,
      encodingType: this.cameraCtrl.EncodingType.JPEG,
      mediaType: this.cameraCtrl.MediaType.PICTURE,
      allowEdit:true
    }
    if (type == 'outside') {
      this.cameraCtrl.getPicture(options)
        .then(result => {
          this.outSideImage = 'data:image/jpeg;base64,' + result;
          let outSide = {
            'type': type,
            'data': this.outSideImage
          }
          this.oldOutSideImage = 'data:image/jpeg;base64,' + result;
          this.imgOutSideInput = outSide
        }).catch(err => { console.log(err); this.showAlert(err) })
    }
    else if (type == 'inside') {
      this.cameraCtrl.getPicture(options)
        .then(result => {
          this.inSideImage = 'data:image/jpeg;base64,' + result;
          let inSide = {
            'type': type,
            'data': this.inSideImage
          }
          this.oldInSideImage = 'data:image/jpeg;base64,' + result;
          this.imgInSideInput = inSide;
        }).catch(err => { console.log(err); this.showAlert(err) })
    }
    else if (type == 'sticker') {
      this.cameraCtrl.getPicture(options)
        .then(result => {
          this.stickerImage = 'data:image/jpeg;base64,' + result;
          let sticker = {
            'type': type,
            'data': this.stickerImage
          }
          this.oldStickerImage = 'data:image/jpeg;base64,' + result;
          this.imgStickerInput = sticker
        }).catch(err => { console.log(err); this.showAlert(err) })
    }
  }

  //Add Supply
  updateExpImage() {

    if (this.imgInSideInput || this.imgOutSideInput || this.stickerImage) {
      let imageInputs = [];
      if (this.imgOutSideInput) {
        imageInputs.push(this.imgOutSideInput)
      }
      if (this.imgInSideInput) {
        imageInputs.push(this.imgInSideInput);
      }
      if (this.imgStickerInput) {
        imageInputs.push(this.imgStickerInput)
      }
      let formInputs = {
        'p_exp_id': this.p_exp_id,
        'images': imageInputs
      }
      console.log(formInputs);
      this._submit_status = false
      this.showLoader()
      this.productionExpService.updateExpImage(formInputs)
        .then(result => {
          console.log(result)
          this._submit_status = true
          this.dismissLoader();
          this.showToast('การบันทึกเสร็จสมบูรณ์')
          this.viewCtrl.dismiss(this._submit_status)
        }).catch(err => {
          console.log(err)
          this.dismissLoader();
          this.showAlert(err)
        })
    }else{
      this.viewCtrl.dismiss();
    }

  }

  //Delete Photo
  deletePhoto(type) {
    console.log('Yo!!')
    this._submit_status = false
    let imageInputs = null;
    let image = null;
    if (type == 'outside') {
      image = this.oldOutSideImage
    } else if (type == 'inside') {
      image = this.oldInSideImage
    } else if (type == 'sticker') {
      image = this.oldStickerImage
    }
    imageInputs = {
      'type': type,
      'data': image
    }
    let formInputs = {
      'p_exp_id': this.p_exp_id,
      'images': imageInputs
    }
    console.log(formInputs)
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
            this.productionExpService.deleteExpImage(formInputs)
              .then(result => {
                this.showLoader();
                console.log(result)
                this._submit_status = true;
                this.dismissLoader();
                if (type == 'outside') {
                  this.oldOutSideImage = null;
                } else if (type == 'inside') {
                  this.oldInSideImage = null;
                } else if (type == 'sticker') {
                  this.oldStickerImage = null
                }

              }).catch(err => { console.log(err); this.dismissLoader(); this.showAlert(err.text()) })
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
  //disMiss
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
