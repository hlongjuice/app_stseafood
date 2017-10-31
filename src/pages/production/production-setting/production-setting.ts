import { AuthService } from './../../../services/auth.service';
import { ProductionShrimpSizeService } from './../../../services/production/shrimp-size.service';
import { ProductionShrimpTypeService } from './../../../services/production/shrimp-type.service';
import { ProductionActivityService } from './../../../services/production/activity.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ProductionSettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-setting',
  templateUrl: 'production-setting.html',
})
export class ProductionSettingPage {


  activities: any;
  isActivityLoading=true;
  shrimpTypes: any;
  isShrimpTypeLoading=true;
  shrimpSizes: any;
  isShrimpSizeLoading=true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productionActivity: ProductionActivityService,
    public productionShrimpType: ProductionShrimpTypeService,
    public productionShrimpSize: ProductionShrimpSizeService,
    public alertCtrl: AlertController,
    public authService:AuthService,
    public loadingCtrl:LoadingController
  ) {
  }

  ngOnInit() {
    console.log(this.authService.getUser());
    /*Get Activity*/
    this.productionActivity.getAllActivity()
      .then(result => {
        this.isActivityLoading=false;
        this.activities = result;
      }
      ).catch(err => { console.log(err) })
    /*Get Shrimp Type*/
    this.productionShrimpType.getAllShrimpType()
      .then(result => {
        this.isShrimpTypeLoading=false;
        this.shrimpTypes = result;
      }).catch(err => { console.log(err) })
    /*Get Shrimp Size*/
    this.productionShrimpSize.getAllShrimpSize()
      .then(result => {
        this.isShrimpSizeLoading=false;
        this.shrimpSizes = result;
      }).catch(err=>{console.log(err)})
  }

  /*Activity*/
  /*Toggle Status*/
  toggleStatus(event, i) {
    let eventStat = event.checked;
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถแก้ไขได้'
    })
    let status;
    if (event.checked) {
      status = 1;
    } else status = 0;
    this.productionActivity.updateStatus(this.activities[i].id, status)
      .then(result => {
        console.log(result)
      }).catch(err => {
        console.log(err)
        alert.present();
      });
    alert.onDidDismiss(() => {
      event.ionChange.isStopped = true;
      event.checked = !eventStat;
      event.ionChange.isStopped = false;
    });
  }
  /*Edit Activity*/
  editActivity(index) {
    let alert = this.alertCtrl.create({
      title: 'แก้ไขชื่อ',
      inputs: [
        {
          name: 'name',
          value: this.activities[index].name
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionActivity.update(this.activities[index].id, data.name)
              .then((result: any) => {
                this.activities[index].name = result.name
              }).catch(err => { console.log(err) })
          }
        }
      ]
    })
    alert.present();

  }
  /*Delete Activity*/
  deleteActivity(index) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'ยืนยัน',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionActivity.delete(this.activities[index].id)
              .then(
              result => {
                this.activities.splice(index, 1);
              }
              ).catch(err => { console.log(err) });
          }
        }
      ]
    })
    alert.present();
  }
  /*Add Activity*/
  addActivity() {
    let alert = this.alertCtrl.create({
      title: 'เพิ่มงาน',
      inputs: [{
        name: 'name'
      }],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionActivity.addActivity(data.name)
              .then(
              (result: any) => {
                console.log(result);
                this.activities.push(result);
              }).catch(err => { console.log(err) })
          }
        }
      ]
    })
    alert.present();
  }
  /*ShrimpType*/
  /*Toggle ShrimpType Status*/
  toggleShrimpTypeStatus(event, i) {
    let eventStat = event.checked;
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถแก้ไขได้'
    })
    let status;
    if (event.checked) {
      status = 1;
    } else status = 0;
    this.productionShrimpType.updateStatus(this.shrimpTypes[i].id, status)
      .then(result => {
        console.log(result)
      }).catch(err => {
        console.log(err)
        alert.present();
      });
    alert.onDidDismiss(() => {
      event.ionChange.isStopped = true;
      event.checked = !eventStat;
      event.ionChange.isStopped = false;
    });
  }
  /*Edit ShrimpType*/
  editShrimpType(index) {
    let alert = this.alertCtrl.create({
      title: 'แก้ไขชื่อ',
      inputs: [
        {
          label:'ชนิดกุ้ง',
          name: 'name',
          value: this.shrimpTypes[index].name
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionShrimpType.update(this.shrimpTypes[index].id, data.name)
              .then((result: any) => {
                this.shrimpTypes[index].name = result.name
              }).catch(err => { console.log(err) })
          }
        }
      ]
    })
    alert.present();

  }
  /*Delete ShrimpType*/
  deleteShrimpType(index) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'ยืนยัน',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionShrimpType.delete(this.shrimpTypes[index].id)
              .then(
              result => {
                this.shrimpTypes.splice(index, 1);
              }
              ).catch(err => { console.log(err) });
          }
        }
      ]
    })
    alert.present();
  }
  /*Add ShrimpType*/
  addShrimpType() {
    let alert = this.alertCtrl.create({
      title: 'เพิ่มงาน',
      inputs: [{
        label:'ชนิดกุ้ง',
        name: 'name'
      }],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionShrimpType.add(data.name)
              .then(
              (result: any) => {
                this.shrimpTypes.push(result);
              }).catch(err => { console.log(err) })
          }
        }
      ]
    })
    alert.present();
  }

  /*ShrimpSize*/
    /*Edit ShrimpSize*/
  editShrimpSize(index) {
    let alert = this.alertCtrl.create({
      title: 'แก้ไขชื่อ',
      inputs: [
        {
          name: 'name',
          value: this.shrimpSizes[index].name
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionShrimpSize.update(this.shrimpSizes[index].id, data.name)
              .then((result: any) => {
                this.shrimpSizes[index].name = result.name
              }).catch(err => { console.log(err) })
          }
        }
      ]
    })
    alert.present();

  }
  /*Delete ShrimpSize*/
  deleteShrimpSize(index) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'ยืนยัน',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionShrimpSize.delete(this.shrimpSizes[index].id)
              .then(
              result => {
                this.shrimpSizes.splice(index, 1);
              }
              ).catch(err => { console.log(err) });
          }
        }
      ]
    })
    alert.present();
  }
  /*Add ShrimpType*/
  addShrimpSize() {
    let alert = this.alertCtrl.create({
      title: 'เพิ่มงาน',
      inputs: [{
        name: 'name'
      }],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel',
        },
        {
          text: 'บันทึก',
          cssClass: 'alertConfirm',
          handler: data => {
            this.productionShrimpSize.add(data.name)
              .then(
              (result: any) => {
                console.log(result);
                this.shrimpSizes.push(result);
              }).catch(err => { console.log(err) })
          }
        }
      ]
    })
    alert.present();
  }
    /*Toggle ShrimpType Status*/
  toggleShrimpSizeStatus(event, i) {
    let eventStat = event.checked;
    let alert = this.alertCtrl.create({
      title: 'ไม่สามารถแก้ไขได้'
    })
    let status;
    if (event.checked) {
      status = 1;
    } else status = 0;
    this.productionShrimpSize.updateStatus(this.shrimpSizes[i].id, status)
      .then(result => {
        console.log(result)
      }).catch(err => {
        console.log(err)
        alert.present();
      });
    alert.onDidDismiss(() => {
      event.ionChange.isStopped = true;
      event.checked = !eventStat;
      event.ionChange.isStopped = false;
    });
  }
  




}
