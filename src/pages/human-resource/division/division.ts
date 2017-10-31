import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DivisionService } from "../../../services/division.service";
// import { NgForm } from "@angular/forms";
import { DivisionModel } from "../../../models/human-resource/division";

/**
 * Generated class for the DivisionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-division',
  templateUrl: 'division.html',
})
export class DivisionPage {

  public divisions: DivisionModel[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public divisionService: DivisionService) {
  }

  ngOnInit() {
    this.divisionService.getDivision()
      .then(
      (result: DivisionModel[]) => {
        this.divisions = result;
      }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DivisionPage');
  }
  addDivision() {
    let modal = this.modalCtrl.create('DivisionAddPage');
    modal.present();
    modal.onDidDismiss(
      () => {
        this.divisionService.getDivision()
          .then(
          (result: DivisionModel[]) => {
            this.divisions = result;
            console.log(this.divisions);
          }
          )
      }
    )
  }

  /*Edit Divsion*/
  editDivision(division:any) {
    let modal = this.modalCtrl.create('DivisionEditPage', {
      divisionID:division.id,
      divisionName: division.name
    });
    console.log(division);
    modal.present();
    modal.onDidDismiss(
      () => {
        this.divisionService.getDivision()
          .then(
          (result: DivisionModel[]) => {
            this.divisions = result;
            console.log(this.divisions);
          }
          )
      }
    )
  }
  /*Delete Division*/
  deleteDivision(id: number) {
    this.divisionService.deleteDivision(id)
      .then(result => {
        console.log(result)
        this.divisionService.getDivision()
          .then(
          (result: DivisionModel[]) => {
            this.divisions = result;
          }
          );
      })
      .catch(err => { console.log(err) });
  }


}
