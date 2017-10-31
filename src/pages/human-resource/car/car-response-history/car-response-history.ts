import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { CarResponseService } from "../../../../services/human-resource/car/car-response.service";
import { NextPageService } from "../../../../services/next-page.service";
import { DateService } from "../../../../services/date.service";
import { CarManageService } from "../../../../services/human-resource/car/car-manage.service";
import { CarDriverService } from "../../../../services/human-resource/car/car-driver.service";
import { AuthService } from "../../../../services/auth.service";

/**
 * Generated class for the CarResponseHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-response-history',
  templateUrl: 'car-response-history.html',
})
export class CarResponseHistoryPage {

  _response_status = '2';
  _loader: any;
  _alert: any;
  _toast: any;
  requests: any[];
  responses: any[];
  chkStatus: any[];
  chkItems: any[];
  isHighlightVisible: any[];
  selectedStatus: any;
  requestStatuses: any[];
  pages: any;
  pageNumber: any[];
  selectedDate: string;
  isHidden = true;
  carTypes: any[];
  cars: any[];
  drivers: any[];
  user: any;
  approver: any;
  assigner: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carResponseService: CarResponseService,
    public loader: LoadingController,
    public modalCtrl: ModalController,
    public nextPageService: NextPageService,
    public dateService: DateService,
    public carManageService: CarManageService,
    public carDriverService: CarDriverService,
    public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.chkItems = [];
    this.chkStatus = [];
    this.isHighlightVisible = [];
    this.pageNumber = [];
    this.requests = [];

    let loader = this.loader.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    loader.present();

    this.selectedStatus = this._response_status
    Promise.all([

      /* Get User */
      this.authService.getUser()
        .then(result => {
          this.user = result;
          /* Get Response */
          return this.carResponseService.getCarResponseByUser(this.user.id, this._response_status)
            .then(result => {
              this.responses = result.data;
              this.pages = result;
            }).catch(err => { console.log(err) })
        }).catch(err => { console.log(err) }),

      /* Get Driver */
      this.carDriverService.getAllDriver()
        .then(result => {
          this.drivers = result;
        }).catch(err => { return err; }),
      /* Get Request Status */
      this.carResponseService.getCarRequestStatus()
        .then(result => {
          this.requestStatuses = result;
        }).catch(err => { console.log(err); }),


      /* Get Car Types */
      this.carManageService.getCarType()
        .then(result => {
          this.carTypes = result;
          console.log('Car Types')
        }).catch(err => { console.log(err) }),
      /* Get Cars */
      this.carManageService.getCar('all')
        .then(result => {
          this.cars = result
          console.log('Cars')
        }).catch(err => { console.log(err) })
    ]).then(() => {
      console.log('Before Dismiss')
      loader.dismiss();
    }).catch(err => { console.log(err); loader.dismiss() })
  }

  /* Set Check Box */
  setCheckedItems(event, request, i) {
    let index
    if (event.checked) {
      this.chkStatus[i] = true;
      this.chkItems.push(request);
      this.isHighlightVisible[i] = true;
    }
    else {
      this.chkStatus[i] = false;
      index = this.chkItems.indexOf(request)
      this.chkItems.splice(index, 1);
      this.isHighlightVisible[i] = false;
    }
    console.log(this.chkItems)
  }

  /* Get Car Request */
  getCarResponse() {
    this.responses = [];
    this.chkItems = [];
    this.selectedDate = this.dateService.getCurrentDateTime().YY + '-' + this.dateService.getCurrentDateTime().MM
    let loader = this.loader.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    loader.present();
    this.carResponseService.getCarResponseByUser(this.user.id, this.selectedStatus)
      .then(result => {
        this.responses = result.data;
        console.log(this.responses)
        this.pages = result;
        loader.dismiss();
      }).catch(err => { console.log(err); loader.dismiss() })

  }

  initialDate(event) {
    console.log(event);
  }
  /* Search Request By Date */
  searchRequestByDate() {
    this.isHidden = false;
    let loader = this.loader.create({
      content: 'กำลังโหลดข้อมูล'
    })
    loader.present();
    this.carResponseService.searchRequestByDate(this.selectedDate, this.selectedStatus)
      .then(result => {
        if (this.selectedStatus == '1') {
          this.requests = result.data;
        } else { this.responses = result.data }
        this.pages = null;
        loader.dismiss();
      }).catch(err => { console.log(err); loader.dismiss() })
  }

  /* Assign Car */
  assignCar() {
    let modal = this.modalCtrl.create('AssignCarPage', {
      'selectedRequestIDs': this.chkItems,
      'requests': this.requests,
      'cars': this.cars,
      'carTypes': this.carTypes,
      'drivers': this.drivers,
      'selectedRequests': this.chkItems,
      'user': this.user,
      'selectedStatus': this.selectedStatus
    })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        console.log(result);
        this.requests = result.data;
        this.pages = result;
      }
    })
  }

  /* Approve Request */
  approveRequest() {
    let modal = this.modalCtrl.create('ApproveRequestPage')
    modal.present();
  }
  /* Delete Assigned Request */
  deleteAssignedRequest(response) {
    let confirm = this.alertCtrl.create(
      {
        title: 'ยืนยันการลบ',
        buttons: [
          {
            text: 'ยกเลิก',
            role: 'cancel',
            cssClass: 'alertCancel'
          }, {
            text: 'ยืนยัน',
            handler: () => {
              this.showLoader('กำลังลบข้อมูล...');
              this.carResponseService.deleteAssignedRequest(response.id)
                .then(result => {
                  this.dismissLoader();
                  this.showToast('ลบเสร็จสิ้น')
                  this.getCarResponse();
                }).catch(err => { console.log(err); this.showAlert('ไม่สามารถลบข้อมูลได้'); this.dismissLoader() })
            },
            cssClass: 'alertConfirm'
          }
        ]

      }
    )
    confirm.present();
  }
  /* Cancel Approved Response */
  cancelApprovedResponse(response) {
    let confirm = this.alertCtrl.create({
      title: 'ยืนยันการลบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'alertCancel'
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.showLoader('กำลังลบข้อมูล...');
            this.carResponseService.cancelApprovedResponse(response.id)
              .then(result => {
                this.dismissLoader();
                this.showToast('ลบเสร็จสิ้น')
                this.getCarResponse();
              }).catch(err => { console.log(err); this.showAlert('ไม่สามารถลบข้อมูลได้'); this.dismissLoader() })
          },
          cssClass: 'alertConfirm'
        }
      ]
    })
    confirm.present();
  }

  /* Next Page */
  nextPage() {
    this.nextPageService.nextPage(this.pages.next_page_url)
      .then(result => {
        this.requests.push.apply(this.requests, result.data);
        this.pages = result;
      }).catch(err => { console.log(err) })
  }

  /* Loader */
  showLoader(textInput) {
    this._loader = this.loader.create({ content: textInput })
    this._loader.present();
  }
  dismissLoader() {
    this._loader.dismiss();
  }
  /* Alert */
  showAlert(textInput) {
    this._alert = this.alertCtrl.create({ title: textInput })
    this._alert.present();
  }
  /* Toast */
  showToast(textInput) {
    this._toast = this.toastCtrl.create({ message: textInput, duration: 2000 })
    this._toast.present();
  }

  /* Show Response Details */
  editResponse(response) {
    let modal = this.modalCtrl.create('EditResponsePage',
      {
        'response': response,
        'drivers': this.drivers,
        'cars': this.cars,
        'carTypes': this.carTypes,
        'user': this.user,
        'selectedStatus': this.selectedStatus
      })
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.responses = result.data;
        this.pages = result;
      }
    })
  }

}
