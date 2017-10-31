import { SupplierService } from './../../../../services/supplier.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the QcSupplierAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-supplier-add',
  templateUrl: 'qc-supplier-add.html',
})
export class QcSupplierAddPage {

  _loader: any
  _toast: any
  _alert: any
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public supplierService: SupplierService,
    public viewCtrl: ViewController,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {
  }

  ngOnInit() {

  }

  addSupplier(formInputs) {
    this.showLoader();
    this.supplierService.addSupplier(formInputs)
      .then(result => {
        this.supplierService.getSupplier()
          .then(result => {
            this.dismissLoader();
            this.viewCtrl.dismiss(result)
            this.showToast('บันทึกสำเร็จ')
          }).catch(err => { console.log(err); this.dismissLoader() })
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
