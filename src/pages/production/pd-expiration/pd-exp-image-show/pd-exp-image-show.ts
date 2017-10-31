import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PdExpImageShowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pd-exp-image-show',
  templateUrl: 'pd-exp-image-show.html',
})
export class PdExpImageShowPage {

  image:any;
  img_title:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl:ViewController
  ) {
  }

  ngOnInit(){
    this.image=this.navParams.data.image;
    this.img_title=this.navParams.data.img_title;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
