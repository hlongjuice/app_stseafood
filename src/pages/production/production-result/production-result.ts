import { AuthService } from './../../../services/auth.service';
import { ProductionWorkService } from './../../../services/production/work.service';
import { DateService } from './../../../services/date.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
declare var naturalSort:any;

/**
 * Generated class for the ProductionResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-production-result',
  templateUrl: 'production-result.html',
})
export class ProductionResultPage {

  /*Page*/;
  
  /*EndPage*/
  dateHistory;
  timePeriods: any;
  works: any;
  selectedTime: any;
  selectedDate: Date;
  amountWeight: number[];
  averageWeight: number[];
  isHighlightVisible: boolean[];
  time_start:any;
  time_end:any;
  timePeriodID:any;


  constructor(public navCtrl: NavController,
    public authService:AuthService,
    public navParams: NavParams,
    public dateService: DateService,
    public productionWorkService: ProductionWorkService,
    public modalCtrl:ModalController,
    public loaderCtrl:LoadingController,
    public alertCtrl: AlertController) {
    let currentDate = this.dateService.getCurrentDateTime()
    this.dateHistory = currentDate.YY + '-' + currentDate.MM + '-' + currentDate.DD;
  }

  ngOnInit() {
    let loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    loader.present();
    // let time=[];
    this.timePeriods=[];
    this.isHighlightVisible = [];
    this.productionWorkService.getTimePeriod(this.dateHistory)
      .then(result => {
        this.timePeriods=result.production_date_time;
        loader.dismiss();
      })
      .catch(err => { console.log(err);loader.dismiss(); });
    console.log(this.dateHistory);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductionResultPage');
  }

  /*Get Time Period*/
  getTimePeriod(date: Date) {
    this.selectedDate = date;
    this.productionWorkService.getTimePeriod(date)
      .then(result => {
        // console.log(result);
        this.timePeriods = result.production_date_time;
        // this.timePeriods=result;
      })
      .catch(err => { console.log(err) })
  }

  /*Get Work List*/
  getWorkList() {
    let loader=this.loaderCtrl.create({content:'กำลังโหลดข้อมูล...'})
    loader.present();
    let time_period_id = this.timePeriodID;
    this.timePeriods.filter(item=>{
      if(item.id==this.timePeriodID){
        this.time_start=item.time_start;
      }
    })
    this.productionWorkService.getWorkList(time_period_id)
      .then(
      result => {
        this.isHighlightVisible[0]=true;
        this.works = result.production_work;
        loader.dismiss();
        console.log(this.works);
      }
      ).catch(err => { console.log(err);loader.dismiss(); })
  }
  /*Get Details*/
  getWorkDetails(work) {
    this.navCtrl.push('ProductionResultDetailsPage', {
      'date': this.selectedDate,
      'time_start': this.time_start,
      'work': work
    })
  }
  setHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
    console.log(this.isHighlightVisible);
  }
  /* Edit Work */
  editWork(work,index){
    let modal =this.modalCtrl.create('PEditResultPage',{
      'time_start':this.time_start,
      'work':work,
      'date':this.selectedDate
    },{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(result=>{
      if(result){
        this.getWorkList();
      }
    })
  }
  /*Delete Work*/
  deleteWork(id, index) {
    console.log(index);
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler:()=>{
            console.log(this.works)
          },
          cssClass: 'alertCancel'
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            this.productionWorkService.deleteWork(id)
              .then(
              result => {
                console.log(this.works)
                this.works.splice(index,1);
              }
              ).catch(err => { console.log(err) })
          },
          cssClass:'alertConfirm'
        }
      ]
    })
    alert.present();
  }
}
