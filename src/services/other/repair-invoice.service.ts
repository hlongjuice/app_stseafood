import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";

@Injectable()
export class RepairInvoiceService {

    public url: string;
    public headers: Headers
    constructor(
        public http: Http,
        public authService: AuthService,
        private webUrlService: WebUrlService,
        private eventCtrl: Events
    ) {

        this.url = this.webUrlService.getUrl();
        this.authService.getHeader()
            .then(
            headers => {
                this.headers = headers
            }
            )
        this.eventCtrl.subscribe('after:login', () => {
            this.getAuth();
        })
    }

    /* Get Auth */
    getAuth() {
        this.authService.getHeader()
            .then(
            headers => {
                this.headers = headers
            }
            )
    }

    //Get Supply By Date
    getRecordByDate(date) {
        let getUrl = this.url + '/api/other/repair_invoice/get_record_by_date/' + date
        return new Promise((resolve, reject) => {
            this.http.get(getUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Get Response By Date  
    getResponseByDate(date, status_id) {
        let inputs = {
            'date': date,
            'status_id': status_id
        }
        let getUrl = this.url + '/api/other/repair_invoice/get_response_by_date'
        return new Promise((resolve, reject) => {
            this.http.post(getUrl, inputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) }),
                err => { reject(err.json()) }
        })
    }

    //Add Request
    addRequest(formInputs): Promise<any> {
        console.log(formInputs)
        let addUrl = this.url + '/api/other/repair_invoice/add_request';
        return new Promise((resolve, reject) => {
            this.http.post(addUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()); }
                )
        })
    }
    //Update Request
    updateRequest(formInputs) {
        let updateUrl = this.url + '/api/other/repair_invoice/update_request';
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Delete Request
    deleteRequest(id): Promise<any> {
        let deleteUrl = this.url + '/api/other/repair_invoice/delete_request/' + id
        return new Promise((resolve, reject) => {
            this.http.get(deleteUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Delete Photo
    deletePhoto(id) {
        let deleteUrl = this.url + '/api/other/repair_invoice/delete_photo/' + id
        return new Promise((resolve, reject) => {
            this.http.get(deleteUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Approve Request
    approveRequest(formInputs) {
        let approveUrl = this.url + '/api/other/repair_invoice/approve_request';
        return new Promise((resolve, reject) => {
            this.http.post(approveUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }

    //Cancel Approve
    cancelApproved(id) {
        let cancelUrl = this.url + '/api/other/repair_invoice/cancel_approved/' + id
        return new Promise((resolve, reject) => {
            this.http.get(cancelUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }

    //Reject Request
    rejectRequest(id) {
        let rejectUrl = this.url + '/api/other/repair_invoice/reject_request/' + id
        return new Promise((resolve, reject) => {
            this.http.get(rejectUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }

    //Invoice Status
    getStatus() {
        let status = {
            'waiting': 1,
            'approved': 2,
            'reject': 3
        }
        return status;
    }
    //Receiver 
    getReceiver() {
        let receiver = [
            { id: 1, name: 'ช่างซ่อม' },
            { id: 2, name: 'ช่างเครื่อง' },
            { id: 3, name: 'ขนส่ง' }
        ]
        return receiver;
    }
}