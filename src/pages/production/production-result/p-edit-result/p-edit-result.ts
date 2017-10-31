import { ProductionWorkService } from './../../../../services/production/work.service';
import { ProductionActivityService } from './../../../../services/production/activity.service';
import { ProductionEmployeeService } from './../../../../services/production/employee.service';
import { ProductionShrimpTypeService } from './../../../../services/production/shrimp-type.service';
import { ProductionShrimpSizeService } from './../../../../services/production/shrimp-size.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';

/**
 * Generated class for the PEditResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-p-edit-result',
  templateUrl: 'p-edit-result.html',
})
export class PEditResultPage {

  activities: any;
  shrimp_types: any;
  shrimp_sizes: any;
  groups: any;
  work:any;
  date:any;
  time_start:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public activityService: ProductionActivityService,
    public shrimpSizeService: ProductionShrimpSizeService,
    public shrimpTypeService: ProductionShrimpTypeService,
    public loaderService:LoadingController,
    public emService: ProductionEmployeeService,
    public viewCtrl:ViewController,
    public productionWorkService:ProductionWorkService
  ) {
  }

  ngOnInit() {
    let loader=this.loaderService.create({content:'กำลังโหลดข้อมูล...'})
    loader.present();
    this.work=this.navParams.data.work;
    this.date=this.navParams.data.date;
    console.log(this.work)
    Promise.all([
      /* Activity */
      this.activityService.getActivity()
        .then(result => {
          this.activities = result
        }).catch(err => { console.log(err) }),
      /* Types */
      this.shrimpTypeService.getShrimpType()
        .then(result => {
          this.shrimp_types = result
        }).catch(err => { console.log(err) }),
      /* Size */
      this.shrimpSizeService.getShrimpSize()
      .then(result=>{this.shrimp_sizes=result})
      .catch(err=>{console.log(err)}),
      /* Groups */
      this.emService.getGroups()
      .then(result=>{this.groups=result})
      .catch(err=>{console.log(err)})
    ]).then(()=>{
      this.time_start=this.navParams.data.time_start;
      loader.dismiss();
    })
      .catch(err=>{console.log(err);loader.dismiss();})
  }

  /* Dismiss() */
  dismiss(){
    this.viewCtrl.dismiss();
  }

  /* UpdateWork */
  updateWork(formInputs){
    formInputs.id=this.work.id;
    formInputs.date=this.date;
    formInputs.time_start=this.time_start;
    this.productionWorkService.updateWork(formInputs)
    .then(()=>{
      let result=1
      this.viewCtrl.dismiss(result)
    })
  }

}
