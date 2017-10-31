import { Events } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class QcShrimpResultService {
    private headers: Headers;
    private userID: number;
    private url: string;

    /*Constructor*/
    constructor(
        private http: Http,
        private authService: AuthService,
        private webUrlService: WebUrlService,
        private eventCtrl: Events
    ) {

        this.url = this.webUrlService.getUrl();
        this.authService.getUser().then(
            userID => {
                this.userID = userID.id
                this.authService.getHeader()
                    .then(
                    headers => {
                        this.headers = headers
                    }
                    )
            }
        )
        this.eventCtrl.subscribe('after:login', () => {
            this.getAuth();
        })
    }

    /* Get Auth */
    getAuth() {
        console.log('In Get Auth')
        this.authService.getUser().then(
            userID => {
                this.userID = userID.id
                this.authService.getHeader()
                    .then(
                    headers => {
                        this.headers = headers
                        console.log(this.headers)
                    }
                    )
            }
        )
    }

    getDailyResult(date): Promise<any> {
        let dailyUrl = this.url + '/api/qc/result/daily/' + date;
        return new Promise((resolve, reject) => {
            this.http.get(dailyUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /* Monthly Result */
    getMonthlyResult(year,month): Promise<any> {
        let monthlyUrl = this.url + '/api/qc/result/monthly';
        let inputs={
            'year':year,
            'month':month
        }
        return new Promise((resolve, reject) => {
            this.http.post(monthlyUrl,inputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /* Yearly Result */
        getYearlyResult(year): Promise<any> {
        let yearlyUrl = this.url + '/api/qc/result/yearly/' + year;
        return new Promise((resolve, reject) => {
            this.http.get(yearlyUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    /* Supplier Result By Month */
    getSupplierResultByMonth(supplier_id,year,month):Promise<any>{
        let inputs={
            'supplier_id':supplier_id,
            'year':year,
            'month':month
        }
        let getByMonthUrl=this.url+'/api/qc/result/supplier/month';
        return new Promise((resolve,reject)=>{
            this.http.post(getByMonthUrl,inputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
        /* Supplier Result By Year */
    getSupplierResultByYear(supplier_id,year):Promise<any>{
        let inputs={
            'supplier_id':supplier_id,
            'year':year
        }
        let getByMonthUrl=this.url+'/api/qc/result/supplier/year';
        return new Promise((resolve,reject)=>{
            this.http.post(getByMonthUrl,inputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
        /* Supplier Result By Month */
    getSupplierResultByQuarter(supplier_id,year,start_month,end_month):Promise<any>{
        let inputs={
            'supplier_id':supplier_id,
            'year':year,
            'start_month':start_month,
            'end_month':end_month
        }
        console.log(inputs)
        let getByMonthUrl=this.url+'/api/qc/result/supplier/quarter';
        return new Promise((resolve,reject)=>{
            this.http.post(getByMonthUrl,inputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}