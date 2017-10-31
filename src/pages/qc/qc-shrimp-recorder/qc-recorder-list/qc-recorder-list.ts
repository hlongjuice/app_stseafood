import { QcShrimpReceivingService } from './../../../../services/qc/shrimp_receiving.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';

/**
 * Generated class for the QcRecorderListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-qc-recorder-list',
  templateUrl: 'qc-recorder-list.html',
})
export class QcRecorderListPage {

  _loader: any;
  _alert: any;
  _toast: any;
  lists: any[];
  supplier: any;
  date: string;
  receiving_id: number;
  user: any;
  recorder: any
  isHighlightVisible: boolean[];
  isSplitShow: boolean[];
  avg_result: any[];
  /* Daily Result */
  total_result_shrimp_weight: any;
  total_result_shrimp_dead_percent: any;
  total_result_last_five_shrimp_dead_percent: any;
  total_result_total_shrimp_dead_percent: any;
  total_result_shrimp_soft_p:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loaderCtrl: LoadingController,
    public shrimpReceivingService: QcShrimpReceivingService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public eventCtrl: Events
  ) {
  }

  ngOnInit() {
    this.isHighlightVisible = []
    this.isHighlightVisible[0] = true
    this.isSplitShow = []
    this.isSplitShow[0] = true
    this.recorder = this.navParams.data.recorder
    this.lists = this.navParams.data.recorder.shrimp_receiving
    this.convertToPercent();
    this.supplier = this.navParams.data.supplier
    this.date = this.navParams.data.date
    this.receiving_id = this.navParams.data.recorder.id
    this.user = this.navParams.data.user
    /* Calculate Weight */
    this.sumRowWeight();
    this.avgRowTemp();
    this.totalResult(this.lists);

    console.log(this.lists)
  }

  //Get Receiving
  getShrimpReceiving() {
    // this.showLoader();
    this.lists = [];
    this.shrimpReceivingService.getReceivingByID(this.date, this.receiving_id)
      .then(result => {
        this.lists = result.shrimp_receiving
        this.totalResult(this.lists);
        this.convertToPercent();
        this.sumRowWeight();
        this.avgRowTemp();
        // this.dismissLoader()
      }).catch(err => { console.log(err); })
  }


  //Add New Receiving
  addNewReceiving() {
    let modal = this.modalCtrl.create('QcAddReceivingPage', {
      'recorder': this.recorder,
      'user': this.user
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.eventCtrl.publish('receiving:update');
        this.getShrimpReceiving();
      }
    })
  }
  //Cal Row Sum Weight
  sumRowWeight() {
    let i = 0;
    this.lists.reduce((sum, item) => {
      this.lists[i].row_sum_weight = (sum + parseFloat(item.weight)).toFixed()
      i++;
      return sum + parseFloat(item.weight)
    }, 0)
  }
  //Total Result
  totalResult(lists) {
    let result_list=lists.slice();
    let last_five_list=[];
    this.total_result_last_five_shrimp_dead_percent=0;
    this.total_result_shrimp_soft_p=0;
    let sum_weight = new Promise((resolve) => {
      //Total Weight
      this.total_result_shrimp_weight = this.lists.reduce((sum, item) => {
        return sum + parseFloat(item.weight)
      }, 0);
      resolve(this.total_result_shrimp_weight);
    })
    sum_weight.then(
      (total_weight:number)=>{
        //Check Last Five Round Status
        if(this.recorder.last_five_round_status==1){
          last_five_list=result_list.splice(-5);
          this.total_result_last_five_shrimp_dead_percent=(last_five_list.reduce((sum,item)=>{
            return sum+parseFloat(item.real_shrimp_dead)
          },0)/total_weight)*100
        }
        //Real Shrimp Dead
        this.total_result_shrimp_dead_percent = (result_list.reduce((sum, item) => {
          return sum + parseFloat(item.real_shrimp_dead)
        }, 0)/total_weight)*100

        //Total Shrimp Dead
        this.total_result_total_shrimp_dead_percent=this.total_result_last_five_shrimp_dead_percent+this.total_result_shrimp_dead_percent
        //Shrimp Soft
        this.total_result_shrimp_soft_p=(parseFloat(this.recorder.real_shrimp_soft)/total_weight)*100;
      }
    )

  }
  //Avg Row Temp
  avgRowTemp() {
    console.log('in Avg Row Temp')
    this.lists.forEach(item => {
      let sum_temp = item.water_temp.reduce((sum, temp) => {
        return sum + parseFloat(temp.value)
      }, 0)
      item.avg_water_temp = (sum_temp / item.water_temp.length).toFixed(2)
    })
    console.log(this.lists)
  }

  showDetails(list) {
    let details = Object.create(list);
    list.sp_pond = this.navParams.data.recorder.pond;
    list.sp_code = this.navParams.data.recorder.code;
    list.date = this.navParams.data.recorder.date;
    list.supplier = this.navParams.data.recorder.supplier
    let modal = this.modalCtrl.create('QcRecorderDetailsPage', {
      'details': details,
      'supplier_details': this.supplier,
      'user': this.user
    }, { cssClass: 'my-modal' })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.eventCtrl.publish('receiving:update');
        this.getShrimpReceiving();
      }
    })
  }

  /* Delete Shrimp Receiving */
  deleteShrimpReceiving(list) {
    let alert = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel'
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.shrimpReceivingService.deleteShrimpReceiving(list.id)
              .then(result => {
                console.log(result)
                this.eventCtrl.publish('receiving:delete');
                this.getShrimpReceiving();
              }).catch(err => { console.log(err); this.showAlert('ไม่สามารถลบข้อมูลได้') })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    alert.present();
  }

  /* Convert To Percent */
  convertToPercent() {
    this.lists.forEach(list => {
      let df_s_dead_p = this.toDfPercent(parseFloat(list.df_shrimp_dead))
      let df_s_semi_soft_p = this.toDfPercent(parseFloat(list.df_shrimp_semi_soft))
      let df_s_soft_shell_p = this.toDfPercent(parseFloat(list.df_shrimp_soft_shell))
      let df_s_scar_p = this.toDfPercent(parseFloat(list.df_shrimp_scar))
      let df_s_bk_line_p = this.toDfPercent(parseFloat(list.df_shrimp_bk_line))
      let df_s_disabled_p = this.toDfPercent(parseFloat(list.df_shrimp_disabled))
      let shrimp_dead_p = this.toPercent(parseFloat(list.real_shrimp_dead), parseFloat(list.weight))
      list.df_s_dead_p = df_s_dead_p
      list.df_s_semi_soft_p = df_s_semi_soft_p
      list.df_s_soft_shell_p = df_s_soft_shell_p
      list.df_s_scar_p = df_s_scar_p
      list.df_s_bk_line_p = df_s_bk_line_p
      list.df_s_disabled_p = df_s_disabled_p
      list.real_shrimp_dead_p = shrimp_dead_p
    })
    console.log(this.lists)
  }
  /* To DF Percent */
  toDfPercent(df) {
    let percent: any;
    if (!isNaN(df)) {
      return percent = ((df / 2000) * 100).toFixed(2) + '%';
    }
    else {
      return null
    }

  }
  /* To Percent */
  toPercent(item, weight) {
    let percent: any;
    if (!isNaN(weight))
      return percent = ((item / weight) * 100).toFixed(2) + '%'
    else
      return null
  }

  /* Set Highlight */
  setHighlight(i) {
    this.isHighlightVisible.fill(false);
    this.isHighlightVisible[i] = true;
    this.isSplitShow.fill(false)
    this.isSplitShow[i] = true;
    console.log(this.isHighlightVisible);
    console.log(this.isSplitShow);
  }
  /* Loader */
  showLoader() {
    this._loader = this.loaderCtrl.create({ content: 'กำลังโหลดข้อมูล...' })
    this._loader.present()
  }
  /* Dismiss Loader */
  dismissLoader() {
    this._loader.dismiss()
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present()
  }
  /* Toast */
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000 })
    this._toast.present()
  }


}
