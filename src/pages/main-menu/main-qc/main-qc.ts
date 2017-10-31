import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainQcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main-qc',
  templateUrl: 'main-qc.html',
})
export class MainQcPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(page){
    this.navCtrl.setRoot(page);
  }

}
