import { NgForm } from '@angular/forms';
import { CarManageService } from './../../../../../services/human-resource/car/car-manage.service';

import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the CarAddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-add',
  templateUrl: 'car-add.html',
})
export class CarAddPage {
  quantity=0;
  carTypes: any[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public loaderCtr:LoadingController,
    public carManageService:CarManageService,
    public alertCtrl:AlertController
  ) {
  }

  ngOnInit() {
    this.carTypes = [];
    this.carTypes=this.navParams.data.carTypes;
    console.log(this.navParams)
  }

  /*Add Car*/
  addCar(newCar:NgForm){
    let loader=this.loaderCtr.create({
      content:'กำลังอัพโหลด'
    })
    let errAlert=this.alertCtrl.create({
      title:'ไม่สามารถเพิ่มข้อมูลได้ ลองใหม่อีกครั้ง'
    })
    loader.present();
    console.log(newCar.value)
    this.carManageService.addCar(newCar.value.car_number,newCar.value.selectedCarType,
    newCar.value.plate_number)
    .then(
      result=>{
        loader.dismiss();
        this.viewCtrl.dismiss();
      }
    ).catch(
     err=>{
       loader.dismiss();
       errAlert.present();
     } 
    )
  }

  /*Closed Modal*/
  closed(){
    this.viewCtrl.dismiss();
  }
  /*Get Car Type*/
  getTypes(){
    if(this.carTypes.length<1){
      console.log('yo!!');
      this.carManageService.getCarType()
      .then(result=>this.carTypes=result)
      .catch(err=>{console.log(err)})
    }
  }

}
