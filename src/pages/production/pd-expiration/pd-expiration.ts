import { WebUrlService } from './../../../services/weburl.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { DateService } from "../../../services/date.service";
// import * as moment from 'moment';
import { ProductionExpService } from "../../../services/production/expiration.service";

/**
 * Generated class for the PdExpirationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-expiration',
  templateUrl: 'pd-expiration.html',
})
export class PdExpirationPage {

  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  recorder:any;
  items: any;
  rounds: any;
  codes: any;
  selectedCode: any;
  mfd: any;
  product_date_format: any;
  exp_date: any;
  product_code: any;
  product: any;
  product_id: any;
  p_exp_id: any;
  imgOutSide: any;
  imgInSide: any;
  imgSticker: any;
  isHighlightVisible: boolean[];

  //checker
  pd_checker:any;
  qc_checker:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productionExpService: ProductionExpService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public webUrlService: WebUrlService
  ) {
  }

  ngOnInit() {
    this.imgOutSide = null
    this.imgInSide = null
    this.imgSticker = null
    this.isHighlightVisible = [];
    this.p_exp_id = null;
    this.product_code = null;
    this.mfd = null;
    this.product_date_format = null;
    this.exp_date = null;
    this.rounds = [];
    this.recorders = [];
    this.date = this.dateService.getDate();
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
    this.getRecords();
  }

  /* Reset Data */
  resetData() {
    this.p_exp_id = null;
    this.product_code = null;
    this.mfd = null;
    this.product_date_format = null;
    this.exp_date = null;
    this.rounds = [];
    this.mfd = null
    this.product_date_format = null
    this.exp_date = null
    this.product_code = null
    this.p_exp_id = null
    this.imgOutSide = null
    this.imgInSide = null
    this.imgSticker = null
    this.product = null;
    this.product_id
    this.selectedCode = null;
    this.isHighlightVisible = [];
    this.pd_checker=null;
    this.qc_checker=null;
  }

  //Get Supply
  getRecords() {
    this.resetData();
    console.log(this.date)
    this.recorders=[];
    this.recorder=null;
    this.codes = [];
    // let month = moment(this.date).format('MM');
    // let year = moment(this.date).format('YYYY');
    this.showLoader()
    this.productionExpService.getRecordByDate(this.date)
      .then((result: any) => {
        console.log(result)
        this.recorders = result;
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        this.dismissLoader();
      })
  }
  //Show Details
  showDetails(recorder) {
    this.resetData()
    console.log(recorder)
    if(recorder){
      this.codes = recorder.data;
    }
  }
  //Show Image
  showImage(image,img_title){
    let modal = this.modalCtrl.create('PdExpImageShowPage',{
      'img_title':img_title,
      'image':image
    },{enableBackdropDismiss:false})
    modal.present();
  }
  //Show Round
  showRounds(item, index) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[index] = true;
    console.log(this.isHighlightVisible)
    this.selectedCode = item;
    let url = this.webUrlService.getUrl();
    console.log(item)
    this.rounds = item.rounds;
    this.mfd = item.mfd;
    this.product_date_format = item.date_format;
    this.exp_date = item.exp_date;
    this.product_code = item.code;
    this.product = item.product.name;
    this.product_id = item.product.id;
    this.pd_checker=item.pd_checker;
    this.qc_checker=item.qc_checker;

    this.p_exp_id = item.id;
    //Check if has image
    if (item.image) {
      if(item.image.image_outside){
        this.imgOutSide = url + '/' + item.image.image_outside;
      }
      if(item.image.image_inside){
        this.imgInSide = url + '/' + item.image.image_inside;
      }
      if(item.image.image_sticker){
        this.imgSticker = url + '/' + item.image.image_sticker;
      }
    }
  }

    /* Upadte Checker */
    updateChecker(pd,qc){
      let loader=this.loaderCtrl.create({content:'กำลังบันทึกข้อมูล...'})
      let formInputs={
        'id':this.p_exp_id,
        'pd_checker':pd,
        'qc_checker':qc
      }
      loader.present()
      this.productionExpService.pdQcChecker(formInputs)
      .then(result=>{
        let tost=this.toastCtrl.create({message:'บันทึกเสร็จสมบูณ์',duration:1000})
        loader.dismiss()
        tost.present();
        this.getRecords();
      }).catch(err=>{
        let alert=this.alertCtrl.create({message:'ไม่สามารถบันทึกข้อมูลได้'})
        loader.dismiss();
        alert.present();
        console.log(err)
      })
    }

  //Add Supply
  addRecord() {
    let modal = this.modalCtrl.create('PdExpirationAddPage', null, { enableBackdropDismiss: false })
    modal.present()
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }
  addExpSpecific() {
    let modal = this.modalCtrl.create('PdExpSpecificAddPage', {
      'product_id': this.product_id,
      'product': this.product,
      'product_code': this.product_code,
      'mfd': this.mfd
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }

  //Edit Exp
  editExp(code) {
    console.log(code);
    let recorder = Object.create(code);
    let modal = this.modalCtrl.create('PdExpirationEditPage', {
      'recorder': recorder
    }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }
  //Delete Exp
  deleteExp(code) {
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
            this.showLoader();
            this.productionExpService.deleteExp(code.id)
              .then(result => {
                this.dismissLoader();
                this.getRecords();
                this.showToast('ลบข้อมูลเสร็จสิ้น')
              }).catch(err => { this.dismissLoader(); this.showAlert(err); })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    confirm.present();
  }
  //Add Image
  addImage() {
    console.log(this.p_exp_id)
    let modal = this.modalCtrl.create('PdExpImageAddPage',
      {
        'p_exp_id': this.p_exp_id
      }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }
  //Update Image
  editImage() {
    console.log(this.p_exp_id)
    let modal = this.modalCtrl.create('PdExpImageEditPage',
      {
        'p_exp_id': this.p_exp_id,
        'outSideImage': this.imgOutSide,
        'inSideImage': this.imgInSide,
        'stickerImage': this.imgSticker
      }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
  }
  //Edit Exp Round
  editExpRound() {

  }
  //Delete Exp Round
  deleteExpRound() {

  }
  //Edit Exp Build
  editExpBuild(round, product) {
    let modal = this.modalCtrl.create('PdBuildListPage', {
      'product': product,
      'code': this.product_code,
      'round': round.round,
      'data': round.data
    }, { enableBackdropDismiss: false })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getRecords();
      }
    })
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
