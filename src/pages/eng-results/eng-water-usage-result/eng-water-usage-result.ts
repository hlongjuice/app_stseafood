import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController, PopoverController } from 'ionic-angular';
import { DateService } from "../../../services/date.service";
import { EngWaterUsageService } from "../../../services/eng/water_usage.service";
import * as moment from 'moment';
/**
 * Generated class for the EngWaterUsageResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-eng-water-usage-result',
  templateUrl: 'eng-water-usage-result.html',
})
export class EngWaterUsageResultPage {

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
  used:any;
  sumRow:any;
  avgRow:any;
  isHighlightVisible: boolean[];
  thai_month:any;
  result_year:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public engWaterUsageService: EngWaterUsageService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService,
    public popCtrl:PopoverController
  ) {
  }

  ngOnInit() {
    this.isHighlightVisible = [];
    this.isHighlightVisible[0] = true;
    this.avgRow=[];
    this.sumRow=[];
    this.recorders=[];
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
  //Get Supply
  getRecords() {
    let dateInput=moment(this.date,'YYYY-MM-DD');
    let year=dateInput.format('YYYY');
    let month=dateInput.format('MM');
    this.showLoader()
    this.engWaterUsageService.getResultByMonth(year,month)
      .then((result: any) => {
        this.recorders = result.data;
        this.sumRow=result.sumRow
        this.avgRow=result.avgRow
        this.thai_month=result.thai_month;
        this.result_year=result.year;
        console.log(result)
        console.log(this.sumRow)
        
        // this.daily_used = result;
        this.dismissLoader()
      }).catch(err => {
        console.log(err)
        this.showAlert(err)
        this.dismissLoader();
      })
  }

  showDate(event,index){
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[index] = true;
    console.log(this.isHighlightVisible);
    console.log(event)
    let pop = this.popCtrl.create('EngWaterUsagePopPage',{
      'date':index+1,
      'data':event.target
    })
    pop.present({
      ev:event
    })
  }
  showResultTitle(event,type){
    let pop = this.popCtrl.create('EngWaterUsagePopPage',{
      'date':null,
      'data':event.target,
      'type':type
    })
    pop.present({
      ev:event
    })
    console.log(event)
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
