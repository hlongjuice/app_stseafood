import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ApproveRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-approve-request',
  templateUrl: 'approve-request.html',
})
export class ApproveRequestPage {

  requests: any[];
  selectedRequestIDs: any[];
  selectedRequests: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.selectedRequests=[];
    let request=null;
    this.selectedRequestIDs = this.navParams.data.selectedRequestIDs
    for (let i = 0; i < this.selectedRequestIDs.length; i++) {
      request=this.navParams.data.requests.filter(item => {
        return item.id==this.selectedRequestIDs[i];
      })
      console.log(request);
      this.selectedRequests.push(request)
    }

    console.log(this.navParams.data);
    console.log(this.selectedRequests);
  }



}
