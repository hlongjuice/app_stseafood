import { SupplierService } from './../../../services/supplier.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the SupplierInputPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-supplier-input',
  templateUrl: 'supplier-input.html',
})
export class SupplierInputPage {

  _loader: any;
  _alert: any;
  suppliers: any[];
  allSuppliers:any[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public supplierService: SupplierService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) {
  }

  ngOnInit() {
    this.showLoader();
    Promise.all([
      this.supplierService.getSupplier()
        .then(result => {
          console.log(result)
          this.allSuppliers = result;
          this.suppliers=this.allSuppliers;
        }).catch(err => { console.log(err) })
    ]).then(result => {
      this.dismissLoader();
    }).catch(err => { console.log(err) })
  }
  initializeItems() {
    this.suppliers = this.allSuppliers
  }

  /* Get Passenger */
  getSupplier(event: any) {
    // set val to the value of the searchbar
    this.initializeItems();
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.suppliers = this.suppliers.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        // return item.name.indexOf(val) > -1
      })
    }
  }

  /* Set Passenger to Input */
  setSupplierInput(supplier) {
    this.viewCtrl.dismiss(supplier);
  }
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present();
  }
  dismissLoader() {
    this._loader.dismiss();
  }
  showAlert() {
    this._alert = this.alertCtrl.create({ title: 'ไม่สามารถใช้งานได้ลองใหม่อีกครั้ง' })
    this._alert.present();
  }

}
