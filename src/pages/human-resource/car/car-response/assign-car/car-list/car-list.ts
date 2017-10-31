import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CarListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-list',
  templateUrl: 'car-list.html',
})
export class CarListPage {

  cars: any[];
  car_type:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.cars = this.navParams.data.cars
    this.car_type=this.navParams.data.car_type[0].name
  }

  /* Set Car */
  setCar(car) {
    this.viewCtrl.dismiss(car);
  }
  /* Dismiss */
  dismiss(){
    this.viewCtrl.dismiss();
  }

}
