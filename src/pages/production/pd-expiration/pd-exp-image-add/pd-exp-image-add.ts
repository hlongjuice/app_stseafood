import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';
import { DateService } from "../../../../services/date.service";
import { ProductionExpService } from "../../../../services/production/expiration.service";
import { Camera, CameraOptions } from "@ionic-native/camera";
/**
 * Generated class for the PdExpImageAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-exp-image-add',
  templateUrl: 'pd-exp-image-add.html',
})
export class PdExpImageAddPage {
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
    this._submit_status = false;
    this.date = this.dateService.getDate();
    this.p_exp_id = this.navParams.data.p_exp_id;
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
          this.imgOutSideInput = outSide
        }).catch(err => { console.log(err);this.showAlert(err) })
    }
    else if (type == 'inside') {
      this.cameraCtrl.getPicture(options)
        .then(result => {
          this.inSideImage = 'data:image/jpeg;base64,' + result;
          let inSide = {
            'type': type,
            'data': this.inSideImage
          }
          this.imgInSideInput = inSide;
        }).catch(err => { console.log(err);this.showAlert(err) })
    }
    else if (type == 'sticker') {
      this.cameraCtrl.getPicture(options)
        .then(result => {
          this.stickerImage = 'data:image/jpeg;base64,' + result;
          let sticker = {
            'type': type,
            'data': this.stickerImage
          }
          this.imgStickerInput = sticker
        }).catch(err => { console.log(err);this.showAlert(err) })
    }
  }

  //Add Supply
  addExpImage() {

    let imageInputs = [];
    if (this.imgOutSideInput == null) {
      this.showAlert('ยังไม่ได้อัพโหลดรูปกล่องนอก')
    } else {
      imageInputs.push(this.imgOutSideInput)
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
      this.productionExpService.addExpImage(formInputs)
        .then(result => {
          this._submit_status = true
          this.dismissLoader();
          this.showToast('การบันทึกเสร็จสมบูรณ์')
          this.viewCtrl.dismiss(this._submit_status);
        }).catch(err => {
          console.log(err)
          this.dismissLoader();
          this.showAlert(err)
        })
    }
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
