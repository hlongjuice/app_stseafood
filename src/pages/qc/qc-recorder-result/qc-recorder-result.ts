import { DateService } from './../../../services/date.service';
import { QcShrimpResultService } from './../../../services/qc/shrimp_result.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import 'chart.js/src/chart';
declare var Chart

/**
 * Generated class for the QcRecorderResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-recorder-result',
  templateUrl: 'qc-recorder-result.html',
})
export class QcRecorderResultPage {
  _loader: any
  _toast: any
  _alert: any
  @ViewChild('qcChart') el: ElementRef
  suppliers: any[];
  supplier_id: number;
  supplier_name: string;
  m_results: any;
  date: string;
  month: string;
  year: string;
  isHighlightVisible: boolean[];
  result_type: string;
  supplier_result_type: string;
  /* Monthly Result */
  total_result_shrimp_soft: any;
  total_result_shrimp_soft_percent: any;
  total_result_shrimp_weight: any;
  total_result_shrimp_dead_percent: any;
  total_result_last_five_shrimp_dead_percent: any;
  total_result_total_shrimp_dead_percent: any;
  /* Yearly Result */
  year_receivings: any;
  month_names: string[];
  year_headers: number[];
  yt_result_shrimp_dead_percents: number[];
  result_card_colors: any[];
  /* By Supplier Result */
  s_results: any;
  s_total_result_shrimp_weight: any;
  s_total_result_shrimp_dead_percent: any;
  s_total_result_last_five_shrimp_dead_percent: any;
  s_total_result_total_shrimp_dead_percent: any;
  s_total_result_shrimp_soft_percent: any;
  s_start_month:any;
  s_end_month:any;
  quarter: string;


  /* Update  */
  yearly_all_months_result:any[];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public qcShrimpResultService: QcShrimpResultService,
    public loaderCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public dateService: DateService
  ) {
  }

  ngOnInit() {
    this.yearly_all_months_result=[];
    // this.inMonth='test';
    this.result_card_colors = [
      {
        'cssClass': 'result-blue',
        'color': 'primary'
      },
      {
        'cssClass': 'result-orange',
        'color': 'warning'
      },
      {
        'cssClass': 'result-red',
        'color': 'danger'
      },
    ];
    this.year_headers = [];
    this.yt_result_shrimp_dead_percents = [];
    this.month_names = this.dateService.getMonthName();
    console.log(this.month_names)
    this.result_type = '1';
    this.isHighlightVisible = [];
    this.isHighlightVisible[0] = true;
    this.month = this.dateService.getCurrentDateTime().MM;
    this.year = this.dateService.getCurrentDateTime().YY;
    this.date = this.dateService.getDate();
    this.s_start_month=this.dateService.getDate();
    this.s_end_month=this.dateService.getDate();
    this.qcShrimpResultService.getMonthlyResult(this.year, this.month)
      .then(result => {
        for (let i = parseInt(this.year) - 2; i <= parseInt(this.year); i++) {
          this.year_headers.push(i);
        }
        console.log(result)
        this.m_results = result;
        //Calculate Total Result
        //Shrimp Weight
        this.total_result_shrimp_weight = this.m_results.reduce((sum, item) => {
          return sum + item.total_shrimp_weight;
        }, 0);
        //Last Five Percent
        this.total_result_last_five_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.last_five_shrimp_dead_percent);
        }, 0);
        //Shrimp Dead Percent
        this.total_result_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.shrimp_dead_percent);
        }, 0);
        //Total Shrimp Dead Percent
        this.total_result_total_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.total_shrimp_dead_percent);
        }, 0)
        //Total Result Shrimp Soft
        this.total_result_shrimp_soft_percent = (this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.real_shrimp_soft_percent)
        }, 0)).toFixed(2)
        //Set 2 Digit
        // console.log(this.total_result_last_five_shrimp_dead_percent,this.total_result_shrimp_dead_percent)
        //this.total_result_shrimp_soft_percent
        this.total_result_last_five_shrimp_dead_percent = this.total_result_last_five_shrimp_dead_percent.toFixed(2)
        this.total_result_shrimp_dead_percent = this.total_result_shrimp_dead_percent.toFixed(2)
        this.total_result_total_shrimp_dead_percent = this.total_result_total_shrimp_dead_percent.toFixed(2)


      }).catch(err => { console.log(err) })

  }

  setHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
    console.log(this.isHighlightVisible);
  }

  /* Get Receiving */
  getReceiving() {
    this.isHighlightVisible.fill(false)
    switch (this.result_type) {
      case '1': this.getMonthlyReceiving();
        break;
      case '2': this.getYearlyReceiving()
        break;
      case '3': { this.date = this.dateService.getDate() }
      default: break;
    }
  }

  getMonthlyReceiving() {
    this.showLoader()
    let date = new Date(this.date);
    this.month = (date.getMonth() + 1).toString();
    this.year = date.getFullYear().toString();
    console.log(this.month, this.year)
    this.qcShrimpResultService.getMonthlyResult(this.year, this.month)
      .then(result => {
        this.m_results = result;
        //Calculate Total Result
        //Shrimp Weight
        this.total_result_shrimp_weight = this.m_results.reduce((sum, item) => {
          return sum + item.total_shrimp_weight;
        }, 0);
        //Last Five Percent
        this.total_result_last_five_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.last_five_shrimp_dead_percent);
        }, 0);
        //Shrimp Dead Percent
        this.total_result_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.shrimp_dead_percent);
        }, 0);
        //Total Shrimp Dead Percent
        this.total_result_total_shrimp_dead_percent = this.m_results.reduce((sum, item) => {
          return sum + parseFloat(item.total_shrimp_dead_percent);
        }, 0)
        //Set 2 Digit
        // console.log(this.total_result_last_five_shrimp_dead_percent,this.total_result_shrimp_dead_percent)
        this.total_result_last_five_shrimp_dead_percent = this.total_result_last_five_shrimp_dead_percent.toFixed(2)
        this.total_result_shrimp_dead_percent = this.total_result_shrimp_dead_percent.toFixed(2)
        this.total_result_total_shrimp_dead_percent = this.total_result_total_shrimp_dead_percent.toFixed(2)
        this.dismissLoader();

      }).catch(err => { console.log(err); this.dismissLoader(); })
  }

  getYearlyReceiving() {
    let date = new Date(this.date);
    this.month = (date.getMonth() + 1).toString();
    this.year = date.getFullYear().toString();
    console.log(this.year);
    this.qcShrimpResultService.getYearlyResult(this.year)
      .then(result => {
        console.log('Yo!!',result);
        this.year_receivings = result;
        this.year_receivings.forEach(year => {
          console.log(year.data);
          let result = year.data.reduce((sum, item) => { return sum + item.m_total_shrimp_dead_percent }, 0)
          let avg = result / year.data.length
          this.yt_result_shrimp_dead_percents.push(avg);

          //Update 25-09-2017
          let monthData=[];
          for (let i = 0; i < 12; i++) {
            monthData[i] = 0
          }
          year.data.forEach(month => {
            for (let i = 0; i < 12; i++) {
              if (month.month == i + 1) {
                monthData[i] = parseFloat(month.m_total_shrimp_dead_percent)
                i = 12;
              }
            }
          })
          let allMonthData={
            'year':year.year,
            'data':monthData
          }
          this.yearly_all_months_result.push(allMonthData);
          console.log('RRRR',this.yearly_all_months_result);
          
        })
        // console.log(this.year_receivings)
        console.log(this.yt_result_shrimp_dead_percents)
        this.drawChart();

      }).catch(err => { console.log(err) })
  }
  //Draw Chart
  drawChart() {
    let dataInput = [];
    let colors = ['#488aff', '#f0ad4e', '#f53d3d'];
    this.year_receivings.forEach((year, index) => {
      let monthInit = [];
      let dataChart = {
        'label': '',
        'data': null,
        'backgroundColor': '',
        'fill': false,
        'borderColor': ''
      };
      for (let i = 0; i < 12; i++) {
        monthInit[i] = 0
      }
      monthInit.fill(0);
      dataChart.backgroundColor = colors[index]
      dataChart.borderColor = colors[index]
      dataChart.label = year.year.toString();
      // dataChart.yAxisID='y-axis-1'
      year.data.forEach(month => {
        for (let i = 0; i < 12; i++) {
          if (month.month == i + 1) {
            monthInit[i] = parseFloat(month.m_total_shrimp_dead_percent)
            i = 12;
          }
        }
      })
      dataChart.data = monthInit
      dataInput.push(dataChart);
    })
    console.log(dataInput);
    let ctx = this.el.nativeElement
    new Chart(ctx, {
      type: 'line',
      data: {
        'datasets': dataInput,
        'labels': this.month_names,
      },
      options: {
        title: {
          display: true,
          text: 'สรุปเปอร์เซ็นกุ้งตายประจำปี',
          fontSize: 16,
          position: 'top'
        },
        // responsive:true,
        maintainAspectRatio: false,
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

  /* *****Get By Supplier Result***** */
  /* Get Suppliers */
  getSuppliers() {
    let modal = this.modalCtrl.create('SupplierInputPage')
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.supplier_id = result.id
        this.supplier_name = result.name
      }
    })
  }
  /* Get Supplier Receiving */
  getSupplierReceiving() {
    let date = new Date(this.date);
    console.log(this.date)
    this.month = (date.getMonth() + 1).toString();
    this.year = date.getFullYear().toString();
    switch (this.supplier_result_type) {
      case 'month': this.getSupplierResultByMonth()
        break;
      case 'year': this.getSupplierResultByYear()
        break;
      case 'monthPeriod': this.getSupplierResultByMonthPeriod()
        break;
      default: break;
    }
  }
  /* Get Supplier Result */
  getSupplierResultByMonth() {
    this.s_results = null;
    this.showLoader()
    this.qcShrimpResultService.getSupplierResultByMonth(this.supplier_id, this.year, this.month)
      .then(result => {
        this.s_results = result;
        console.log(this.s_results)
        this.calculateSupplierTotalResult(result)
        this.dismissLoader();
      }).catch(err => { console.log(err); this.dismissLoader() })
  }
  /* By Year */
  getSupplierResultByYear() {
    this.showLoader()
    this.s_results = null;
    this.qcShrimpResultService.getSupplierResultByYear(this.supplier_id, this.year)
      .then(result => {
        this.s_results = result;
        console.log(this.s_results)
        this.calculateSupplierTotalResult(result)
        this.dismissLoader()
      }).catch(err => { console.log(err); this.dismissLoader() })
  }
  /* By Quarter */
  getSupplierResultByMonthPeriod() {
    let date_start=new Date(this.s_start_month);
    let date_end=new Date(this.s_end_month);
    this.showLoader()
    this.s_results = null;
    let start_month=(date_start.getMonth()+1).toString();
    let end_month=(date_end.getMonth()+1).toString();
    this.qcShrimpResultService.getSupplierResultByQuarter(this.supplier_id, this.year, start_month,end_month)
      .then(result => {
        this.s_results = result;
        this.calculateSupplierTotalResult(result)
        this.dismissLoader()
      }).catch(err => { console.log(err); this.dismissLoader() })
  }
  /* Calculate Total Result */
  calculateSupplierTotalResult(results) {
    //Calculate Total Result
    //Shrimp Weight
    this.s_total_result_shrimp_weight = results.reduce((sum, item) => {
      return sum + item.total_shrimp_weight;
    }, 0);
    //Last Five Percent
    this.s_total_result_last_five_shrimp_dead_percent = results.reduce((sum, item) => {
      return sum + parseFloat(item.last_five_shrimp_dead_percent);
    }, 0);
    //Shrimp Dead Percent
    this.s_total_result_shrimp_dead_percent = results.reduce((sum, item) => {
      return sum + parseFloat(item.shrimp_dead_percent);
    }, 0);
    //Total Shrimp Dead Percent
    this.s_total_result_total_shrimp_dead_percent = results.reduce((sum, item) => {
      return sum + parseFloat(item.total_shrimp_dead_percent);
    }, 0)
    //Total Result Shrimp Soft
    this.s_total_result_shrimp_soft_percent = (results.reduce((sum, item) => {
      return sum + parseFloat(item.real_shrimp_soft_percent)
    }, 0)).toFixed(2)
    //Set 2 Digit
    // console.log(this.total_result_last_five_shrimp_dead_percent,this.total_result_shrimp_dead_percent)
    this.s_total_result_last_five_shrimp_dead_percent = this.s_total_result_last_five_shrimp_dead_percent.toFixed(2)
    this.s_total_result_shrimp_dead_percent = this.s_total_result_shrimp_dead_percent.toFixed(2)
    this.s_total_result_total_shrimp_dead_percent = this.s_total_result_total_shrimp_dead_percent.toFixed(2)
  }

  /* Reset Data*/
  resetData() {
    this.m_results = null;
    this.s_results = null;
    this.date = this.dateService.getDate();
    this.total_result_shrimp_weight = 0;
    this.total_result_shrimp_dead_percent = 0;
    this.total_result_last_five_shrimp_dead_percent = 0;
    this.total_result_total_shrimp_dead_percent = 0;
    this.total_result_shrimp_soft_percent=0;
    this.total_result_shrimp_soft=0;
    /* Yearly Result */
    this.year_receivings = 0;
    this.yt_result_shrimp_dead_percents = [];
    /* By Supplier Result */
    this.s_total_result_shrimp_weight = 0;
    this.s_total_result_shrimp_dead_percent = 0;
    this.s_total_result_last_five_shrimp_dead_percent = 0;
    this.s_total_result_total_shrimp_dead_percent = 0;
    this.s_total_result_shrimp_soft_percent=0;
  }

  /* *******End Get By Supplier */

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
