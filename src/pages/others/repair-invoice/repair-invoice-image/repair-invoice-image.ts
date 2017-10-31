import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RepairInvoiceImagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-invoice-image',
  templateUrl: 'repair-invoice-image.html',
})
export class RepairInvoiceImagePage {

  repair_image: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController
  ) {
  }

  ngOnInit() {
    this.repair_image="";
  }

}
