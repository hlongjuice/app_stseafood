import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EngWaterUsagePopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-water-usage-pop',
  templateUrl: 'eng-water-usage-pop.html',
})
export class EngWaterUsagePopPage {

  date:any;
  data:any;
  type:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.date=this.navParams.data.date;
    this.data=this.navParams.data.data;
    this.type=this.navParams.data.type;
    console.log(this.type)
  }

}
