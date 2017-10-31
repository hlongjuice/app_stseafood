import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EngResultsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-results',
  templateUrl: 'eng-results.html',
})
export class EngResultsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(page){
    this.navCtrl.setRoot(page);
  }

}
