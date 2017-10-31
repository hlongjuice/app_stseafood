import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PassengerListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-passenger-list',
  templateUrl: 'passenger-list.html',
})
export class PassengerListPage {

  passengers: any[];
  selectedPassenger: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl:ViewController) {
  }

  ngOnInit() {
    this.passengers = this.navParams.data.passengers
    console.log(this.navParams.data);
  }
  initializeItems() {
    this.passengers = this.navParams.data.passengers
  }

  /* Get Passenger */
  getPassenger(event: any) {
    // set val to the value of the searchbar
    this.initializeItems();
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.passengers = this.passengers.filter((item) => {
        // return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return item.name.indexOf(val) > -1
      })
    }
  }

  /* Set Passenger to Input */
  setPassengerInput(passenger){
    this.viewCtrl.dismiss(passenger);
  }

}
