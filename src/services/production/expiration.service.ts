import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";

@Injectable()
export class ProductionExpService {

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
    getRecordByMonth(year, month) {
        let inputs = {
            'year': year,
            'month': month
        }
        console.log(inputs)
        let getUrl = this.url + '/api/production/extension/exp/get_record_by_month';
        return new Promise((resolve, reject) => {
            this.http.post(getUrl, inputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    getRecordByDate(date) {
        let getUrl = this.url + '/api/production/extension/exp/get_record_by_date/' + date;
        return new Promise((resolve, reject) => {
            this.http.get(getUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }

    //Add Exp
    addExp(formInputs): Promise<any> {
        console.log(formInputs)
        let addUrl = this.url + '/api/production/extension/exp/add_exp';
        return new Promise((resolve, reject) => {
            this.http.post(addUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()); }
                )
        })
    }
    //Add Exp Image
    addExpImage(formInputs): Promise<any> {
        console.log(formInputs)
        let addUrl = this.url + '/api/production/extension/exp/add_exp_image';
        return new Promise((resolve, reject) => {
            this.http.post(addUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()); }
                )
        })
    }
    //Update Exp
    updateExp(formInputs) {
        let updateUrl = this.url + '/api/production/extension/exp/update_exp';
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Update Exp Image
    updateExpImage(formInputs) {
        console.log(formInputs)
        let updateUrl = this.url + '/api/production/extension/exp/update_exp_image';
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Delete Exp
    deleteExp(id): Promise<any> {
        let deleteUrl = this.url + '/api/production/extension/exp/delete_exp/' + id;
        return new Promise((resolve, reject) => {
            this.http.get(deleteUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Delete Exp Image
    deleteExpImage(formInputs): Promise<any> {
        let deleteUrl = this.url + '/api/production/extension/exp/delete_exp_image';
        return new Promise((resolve, reject) => {
            this.http.post(deleteUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Delete Exp Build
    deleteExpBuild(id): Promise<any> {
        let deleteUrl = this.url + '/api/production/extension/exp/delete_exp_build/' + id;
        return new Promise((resolve, reject) => {
            this.http.get(deleteUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }

    //Exp Checker
    pdQcChecker(formInputs):Promise<any> {
        let url = this.url + '/api/production/extension/exp/checker';
        console.log(formInputs);
        return new Promise((resolve,reject)=>{
            this.http.post(url,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err.json)}
            )
        })

    }
}