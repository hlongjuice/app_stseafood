import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, ViewController } from 'ionic-angular';

/**
 * Generated class for the PdProductModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-product-modal',
  templateUrl: 'pd-product-modal.html',
})
export class PdProductModalPage {
  _loader:any
  _toast:any
  _alert:any
  products:any;
  allProducts:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl:ToastController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController
  ) {
  }

  ngOnInit(){
    this.allProducts=this.navParams.data.products;
    this.products=this.navParams.data.products;
  }
  initializeItems(){
    this.products=this.allProducts;
  }
  /* Search Employee */
  searchEmployees(event: any) {
    // set val to the value of the searchbar
    this.initializeItems();
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.products = this.products.filter((item) => {
        console.log(item)
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
      })
    }
  }

  /* SelectedProduct */
  selectedProduct(product){
    this.viewCtrl.dismiss(product)
  }
  /* Dismiss */
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
