import { SupplierService } from './../../../services/supplier.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the QcSupplierPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-supplier',
  templateUrl: 'qc-supplier.html',
})
export class QcSupplierPage {

  _loader: any
  _toast: any
  _alert: any
  suppliers: any[];
  allSuppliers:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public supplierService: SupplierService

  ) {
  }

  ngOnInit() {
    this.showLoader()
    this.supplierService.getSupplier()
      .then(result => {
        this.allSuppliers=result;
        this.suppliers = this.allSuppliers
        this.dismissLoader()
      }).catch(err => { console.log(err); this.dismissLoader(); this.showAlert('ไม่สามารถใช้งานได้โปรดลองอีกครั้ง') })
  }

  /* Get Supplier */
  getSupplier() {
    this.showLoader();
    this.supplierService.getSupplier()
      .then(result => {
        this.suppliers = result
        this.dismissLoader();
      }).catch(err => { console.log(err); this.dismissLoader(); this.showAlert('ไม่สามารถดึงข้อมูลได้ โปรดลองใหม่อีกครั้ง') })
  }

  /* Add */
  addSupplier() {
    let modal = this.modalCtrl.create('QcSupplierAddPage')
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.suppliers = result
      }
    })
  }
  /* Edit */
  editSupplier(supplier) {
    let modal = this.modalCtrl.create('QcSupplierEditPage', {
      'supplier': supplier
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.getSupplier();
      }
    })
  }

  initializeItems() {
    this.suppliers = this.allSuppliers
  }

  /* Get Passenger */
  searchSupplier(event: any) {
    // set val to the value of the searchbar
    this.initializeItems();
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.suppliers = this.suppliers.filter((item) => {
        // return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    }
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
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000 })
    this._toast.present()
  }

}
