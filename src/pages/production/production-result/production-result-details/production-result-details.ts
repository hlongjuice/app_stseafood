import { ProductionWorkService } from './../../../../services/production/work.service';
// import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the ProductionResultDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-result-details',
  templateUrl: 'production-result-details.html',
})
export class ProductionResultDetailsPage {

  work: any;
  selected_em_id: any;
  work_id: number;
  em_work_list: any;
  em_ids: any[];
  employees: any[];
  em_weight_list: any;
  em_amount_weight: any;
  em_avg_weight: any;
  date: Date;
  time_start: any;
  time_end: any;
  minute_range: any;
  average_weight: any;
  isHighlightVisible: boolean[];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public productionWorkService: ProductionWorkService,
    public alertCtrl: AlertController) {
  }
  ngOnInit() {
    this.isHighlightVisible = [];
    this.employees = [];
    this.work = this.navParams.get('work');
    console.log(this.work);
    // this.time_period=this.navParams.get('timePeriod')
    this.time_start = this.navParams.get('time_start')
    this.time_end = this.work.p_time_end
    let start = moment(this.time_start,'HH:mm')
    let end=moment(this.time_end,'HH:mm')
    this.minute_range = end.diff(start, 'minutes')
    console.log(this.minute_range)

    this.productionWorkService.getWorkDetials(this.work.id)
      .then(result => {

        this.em_work_list = result;
        this.em_ids = Object.keys(result);
        /*Set Employee Details*/
        this.em_ids.forEach(em_id => {
          let employee: any = {
            em_id: "",
            amout_weight: 0
          };
          employee.amout_weight = 0;
          employee.em_id = em_id;

          this.em_work_list[em_id].forEach(weight_list => {
            employee.amout_weight += parseFloat(weight_list.weight);
          });
          employee.amout_weight = employee.amout_weight.toFixed(2);
          this.employees.push(employee);
          console.log(this.employees);

        })
      }).catch(err => { console.log(err) });
  }

  /*Get Details*/
  getDetails(em_id, i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
    this.selected_em_id = em_id;
    this.em_amount_weight = 0;
    this.em_weight_list = this.em_work_list[em_id];
    this.em_weight_list.forEach(em_weight => {
      this.em_amount_weight += parseFloat(em_weight.weight);
    })
    this.em_amount_weight = this.em_amount_weight.toFixed(2);
    this.em_avg_weight = (this.em_amount_weight/this.minute_range)*60
    this.em_avg_weight=parseFloat(this.em_avg_weight).toFixed(2)
  }
  /*Delete Em Weight*/
  deleteWeight(weight_id, weight_index) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        /*Cancel*/
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
          },
          cssClass: 'alertDanger'
        },
        /*Confirm*/
        /*Add Work*/
        {
          text: 'ยืนยัน',
          handler: () => {
            this.productionWorkService.deleteWeight(weight_id)
              .then(result => {
                /*Remove Item*/
                this.em_amount_weight = 0;//clear old amount weight
                this.em_weight_list.splice(weight_index, 1);
                this.em_weight_list.forEach(em_weight => {
                  this.em_amount_weight += parseFloat(em_weight.weight);
                })

              }).catch(err => { console.log(err) });
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    alert.present();
  }

}
