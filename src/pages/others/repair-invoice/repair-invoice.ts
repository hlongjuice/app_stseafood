import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepairInvoicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repair-invoice',
  templateUrl: 'repair-invoice.html',
})
export class RepairInvoicePage {

  user:any;
  user_types:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService:AuthService
  ) {
  }

  ngOnInit(){
    this.authService.getUserDetails()
    .then(result=>{
      this.user=result
      this.user_types=this.authService.getUserTypes();
    })
  }
  openPage(page){
    this.navCtrl.setRoot(page);
  }

}
