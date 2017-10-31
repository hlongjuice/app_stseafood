import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the RequestEmployeeListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request-employee-list',
  templateUrl: 'request-employee-list.html',
})
export class RequestEmployeeListPage {

  employees: any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController) {
  }

  ngOnInit() {
    this.employees = this.navParams.data.employees;
  }
  initializeItems() {
    this.employees = this.navParams.data.employees
  }

  /* Get Passenger */
  getEmployees(event: any) {
    // set val to the value of the searchbar
    this.initializeItems();
    let val = event.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.employees = this.employees.filter((item) => {
        // return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        return item.name.indexOf(val) > -1
      })
    }
  }

  /* Set Passenger to Input */
  setEmployeeInput(employee) {
    this.viewCtrl.dismiss(employee);
  }

}
