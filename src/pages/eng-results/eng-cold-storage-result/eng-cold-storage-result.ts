import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { EngColdStorageResultService } from "../../../services/eng/cold-storage-result.service";
import { DateService } from "../../../services/date.service";
import * as moment from 'moment';
import 'chart.js/src/chart';
declare var Chart

/**
 * Generated class for the EngColdStorageResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-cold-storage-result',
  templateUrl: 'eng-cold-storage-result.html',
})
export class EngColdStorageResultPage {
  @ViewChild('qcChart') el: ElementRef
  _loader: any;
  _alert: any;
  _toast: any;

  date: any;
  month: any;
  year: any;
  recorders: any;
  time_records: any[];
  daily_used: any;
  rooms: any;
  engSegment:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engColdStorageResultService: EngColdStorageResultService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService
  ) {
  }

  ngOnInit() {
    this.daily_used = [];
    this.time_records = [];
    for (let i = 1; i <= 24; i++) {
      this.time_records.push(i + ':00')
    }
    this.daily_used.cs1_max = null;
    this.daily_used.cs1_min = null;
    this.daily_used.cs2_max = null;
    this.daily_used.cs2_min = null;
    this.date = this.dateService.getDate();
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
    this.getRecords();
  }

  //ShowSegment
  showSegment(){
    if(this.engSegment=='chart'){
      setTimeout(()=>{
        this.drawChart();
      },100)
    }
  }
  //Get Supply
  getRecords() {
    this.showLoader()
    this.engColdStorageResultService.getResultByDate(this.date)
      .then((result: any) => {
        console.log(result)
        this.recorders = result.data;
        this.daily_used = result;
        this.showSegment();
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        this.dismissLoader();
      })
  }

  //Draw Chart
  drawChart() {
    let chart_date=moment(this.date,'YYYY-MM-DD').format('DD/MM/YYYY')
    console.log(this.recorders);
    // let dataInput = [];
    let times = [];
    let colors = ['#488aff', '#f0ad4e'];
    let dataChart = [{
      'label': '',
      'data': null,
      'backgroundColor': '',
      'fill': false,
      'borderColor': ''
    }, {
      'label': '',
      'data': null,
      'backgroundColor': '',
      'fill': false,
      'borderColor': ''
    }];
    dataChart[0].backgroundColor = colors[0]
    dataChart[0].borderColor = colors[0]
    dataChart[0].label = 'Room1'
    dataChart[1].backgroundColor = colors[1]
    dataChart[1].borderColor = colors[1]
    dataChart[1].label = 'Room2'
    for (let i = 0; i < 2; i++) {
      times[i] = [];
      for (let j = 0; j < this.time_records.length; j++) {
        times[i].push(0)
      }
    }
    this.recorders.forEach((record) => {
      for (let i = 0; i < this.time_records.length; i++) {
        if (record.time_record == this.time_records[i]) {
          times[0][i] = parseFloat(record.cs1_rm)
          times[1][i] = parseFloat(record.cs2_rm)
          i = this.time_records.length;
        }
      }
      dataChart[0].data = times[0]
      dataChart[1].data = times[1]
    })
     let ctx = this.el.nativeElement
     new Chart(ctx, {
       type: 'line',
       data: {
         'datasets': dataChart,
         'labels': this.time_records,
       },
       options: {
         title: {
           display: true,
           text: 'อุณหภูมิห้องเย็นประจำวันที่'+chart_date,
           fontSize: 16,
           position: 'top'
         },
         responsive:true,
         maintainAspectRatio: true,
         scales: {
           yAxes: [{
             ticks: {
               beginAtZero: false
             }
           }]
         }
       }
     });

  }
  //Loader
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  //disMiss
  dismissLoader() {
    this._loader.dismiss()
  }
  //Alert
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  //Toast
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000, position: 'top' })
    this._toast.present()
  }

}
