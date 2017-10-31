import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";

@Injectable()
export class EngWsOutsideService {

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
    getSupplyByDate(date){
        let getUrl=this.url+'/api/eng/water_supply_outside/get_supply_by_date/'+date
        return new Promise((resolve,reject)=>{
            this.http.get(getUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
    //Get Supply By Month
    getSupplyByMonth(year,month):Promise<any>{
        let inputs={
            'year':year,
            'month':month
        }
        let getUrl=this.url+'/api/eng/water_supply_outside/get_supply_by_month';
        return new Promise((resolve,reject)=>{
            this.http.post(getUrl,inputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }

    //Add New Supply
    addSupply(formInputs): Promise<any> {
        console.log(formInputs)
        let addUrl = this.url + '/api/eng/water_supply_outside/add_supply';
        return new Promise((resolve, reject) => {
            this.http.post(addUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err);}
                )
        })
    }
    //Update Supply
    updateSupply(formInputs) {
        let updateUrl = this.url + '/api/eng/water_supply_outside/update_supply';
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    //Delete Supply
    deleteSupply(id):Promise<any>{
        let deleteUrl=this.url+'/api/eng/water_supply_outside/delete_supply/'+id;
        return new Promise((resolve,reject)=>{
            this.http.get(deleteUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err.json())}
            )
        })
    }
}