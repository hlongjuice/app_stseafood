import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EngineerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-engineer',
  templateUrl: 'engineer.html',
})
export class EngineerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(page){
    this.navCtrl.setRoot(page);
  }

}
