import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RequestDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage {

  requestDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController
  ) {
  }
  ngOnInit(){
    this.requestDetails=this.navParams.data.requestDetails;
    console.log(this.requestDetails);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  

}
