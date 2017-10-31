import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HumanResourcePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-human-resource',
  templateUrl: 'human-resource.html',
})
export class HumanResourcePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  openDivisionPage(){
    this.navCtrl.push('DivisionPage');
  }
  openEmployeePage(){
    this.navCtrl.push('EmployeePage');
  }

}
