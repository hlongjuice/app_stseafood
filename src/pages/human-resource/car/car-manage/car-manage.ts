
import { CarManageService } from './../../../../services/human-resource/car/car-manage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { CarUsagePage } from "../car-usage/car-usage";

/**
 * Generated class for the CarManagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-manage',
  templateUrl: 'car-manage.html',
})
export class CarManagePage {

  selectedType: string;
  carTypes: any[];
  cars: any[];
  carUsagePage=CarUsagePage
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public carService: CarManageService,
    public modalCtrl:ModalController,
    public loaderCtrl:LoadingController,
    public alertCtrl:AlertController
  ) {
  }

  ngOnInit() {
    let loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    let alert=this.alertCtrl.create({title:'ไม่สามารถใช้งานได้'})
    loader.present();
    this.carTypes=[];
    this.cars = [];
    this.selectedType = 'all';
    this.carService.getCarType()
      .then(
      result => {
        this.carTypes = result;
        console.log(result);
        /*Get All Cars*/
        this.carService.getCar(this.selectedType)
          .then(result => {
            this.cars = result;
            loader.dismiss();
          }).catch(err => { console.log(err);loader.dismiss();alert.present();  })
      }
      ).catch(err => { console.log(err); loader.dismiss(); alert.present() });
  }

  /*Get Car*/
  getCar() {
    this.carService.getCar(this.selectedType)
      .then(
      result => {
        this.cars = result;
      }
      ).catch(err => { console.log(err) })
  }

  /*Add Car*/
  addCar(){
    let modal=this.modalCtrl.create('CarAddPage',{'carTypes':this.carTypes},{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(()=>{
      this.getCar()
    });
  }
  /* Show Usage */
  showUsage(car){
    this.navCtrl.push(this.carUsagePage,{'car':car});
  }

}
