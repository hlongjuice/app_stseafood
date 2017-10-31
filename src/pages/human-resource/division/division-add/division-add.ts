import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { NgForm } from "@angular/forms";
import { DivisionService } from "../../../../services/division.service";

/**
 * Generated class for the DivisionAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-division-add',
  templateUrl: 'division-add.html',
})
export class DivisionAddPage {

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public divisionService:DivisionService,
   public viewCtrl:ViewController,
   public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionAddPage');
  }

  onClosed(){
    this.viewCtrl.dismiss();
  }
  
  onSubmit(formInput:NgForm){
    console.log(formInput.value.divisionName);
    this.divisionService.addDivision(formInput)
    .then(
      (result)=>{
        console.log(result);
        this.viewCtrl.dismiss();
        // this.viewCtrl.dismiss();
      }
    ).catch(
      (err)=>{
        let alert= this.alertCtrl.create({
          title:'Err',
          message:err,
          buttons:['Dissmiss']
        });
        alert.present().then(
          ()=>{
             this.viewCtrl.dismiss();
          }
         
        );
      }
    )

  }
}
