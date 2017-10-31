import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { DivisionService } from "../../../../services/division.service";
// import { NgForm } from '@angular/forms'

/**
 * Generated class for the DivisionEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-division-edit',
  templateUrl: 'division-edit.html',
})
export class DivisionEditPage {

  divisionNameInput: string;
  divisionID: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
    public divisionService: DivisionService) {
  }

  ngOnInit() {
    this.divisionNameInput = this.navParams.get('divisionName');
    this.divisionID = this.navParams.get('divisionID');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionEditPage');
  }

  onClosed() {
    this.viewCtrl.dismiss();
  }

  onSubmit(formInput) {
    this.divisionService.editDivsion(formInput.value.divisionName, this.divisionID)
      .then(
      (result) => {
        console.log(result);
        this.viewCtrl.dismiss();
      }
      ).catch(
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Err',
          message: err,
          buttons: ['Dissmiss']
        });
        alert.present().then(
          () => {
            this.viewCtrl.dismiss();
          }

        );
      }
      )
  }


}
