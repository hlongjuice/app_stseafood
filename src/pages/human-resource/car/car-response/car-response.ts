import { AuthService } from './../../../../services/auth.service';
import { CarDriverService } from './../../../../services/human-resource/car/car-driver.service';
import { CarManageService } from './../../../../services/human-resource/car/car-manage.service';
import { DateService } from './../../../../services/date.service';
import { NextPageService } from './../../../../services/next-page.service';

import { CarResponseService } from './../../../../services/human-resource/car/car-response.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController} from 'ionic-angular';

/**
 * Generated class for the CarResponsePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-car-response',
  templateUrl: 'car-response.html',
})
export class CarResponsePage {

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
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    // this.selectedDate=this.dateService.getDate();
    this.chkItems = [];
    this.chkStatus = [];
    this.isHighlightVisible = [];
    this.pageNumber = [];
    this.requests = [];

    let loader = this.loader.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    loader.present();

    Promise.all([
      /* Get User */
      this.authService.getUserDetails()
        .then(result => {
          this.user = result;
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
          this.selectedStatus = this.requestStatuses[0].id.toString();
          console.log('Request Status')
          /* Get Request */
          return this.carResponseService.getRequest(this.selectedStatus)
            .then(result => {
              this.requests = result.data;
              this.pages = result;
              for (let i = 1; i <= this.pages.last_page; i++) {
                let pageDetails = {
                  'page_number': i,
                  'page_url': this.pages.path.slice(0, -1) + i
                }
                this.pageNumber.push(pageDetails);
              }
              console.log('Request')
            }).catch(err => { console.log(err) })
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
      console.log('Befor Dismiss')
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
  getCarRequests() {
    this.chkItems = [];
    this.selectedDate=this.dateService.getCurrentDateTime().YY+'-'+this.dateService.getCurrentDateTime().MM
    let loader = this.loader.create({
      content: 'กำลังโหลดข้อมูล...'
    })
    loader.present();
    if (this.selectedStatus == "1") {
      this.carResponseService.getRequest(this.selectedStatus)
        .then(result => {
          this.requests = result.data;
          this.pages = result;
          loader.dismiss()
        }).catch(err => { console.log(err); loader.dismiss() })
    }
    else {
      this.carResponseService.getResponse(this.selectedStatus)
        .then(result => {
          this.responses = result.data;
          console.log(this.responses)
          this.pages = result;
          loader.dismiss();
        }).catch(err => { console.log(err); loader.dismiss() })
    }
  }

  /* Show Response Details */
  showResponseDetails(response) {
    let modal = this.modalCtrl.create('ResponseDetailsPage',
      {
        'response': response,
        'drivers': this.drivers,
        'cars': this.cars,
        'carTypes': this.carTypes,
        'user': this.user,
        'selectedStatus': this.selectedStatus
      },{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        this.responses = result.data;
        this.pages = result;
      }
    })
  }
  /* Show Request Details */
    /*Get Details*/
  showRequestDetails(request) {
    console.log(request)
    // console.log(this.allRequests[index]);
    let modal=this.modalCtrl.create('RequestDetailsPage',{
      'requestDetails':request})
      modal.present();
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
        }else{this.responses=result.data}
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
    },{enableBackdropDismiss:false})
    modal.present();
    modal.onDidDismiss(result => {
      if (result) {
        console.log(result);
        this.requests = result.data;
        this.pages = result;
        this.chkItems=[];
      }
    })
  }

  /* Approve Request */
  approveRequest() {
    let modal = this.modalCtrl.create('ApproveRequestPage')
    modal.present();
  }

  /* Next Page */
  nextPage() {
    this.nextPageService.nextPage(this.pages.next_page_url)
      .then(result => {
        this.requests.push.apply(this.requests, result.data);
        this.pages = result;
      }).catch(err => { console.log(err) })
  }


}
