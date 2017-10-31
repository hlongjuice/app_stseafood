import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MoreCarUsageDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-more-car-usage-details',
  templateUrl: 'more-car-usage-details.html',
})
export class MoreCarUsageDetailsPage {

  carUsage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.carUsage=this.navParams.data.carUsage;
  }

}
