import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";

@Injectable()
export class EngChlorineService {

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
    getRecordByDate(date){
        let getUrl=this.url+'/api/eng/chlorine/get_record_by_date/'+date
        return new Promise((resolve,reject)=>{
            this.http.get(getUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err.json())}
            )
        })
    }

    //Add New Supply
    addRecord(formInputs): Promise<any> {
        console.log(formInputs)
        let addUrl = this.url + '/api/eng/chlorine/add_record';
        return new Promise((resolve, reject) => {
            this.http.post(addUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json());}
                )
        })
    }
    //Update Supply
    updateRecord(formInputs) {
        let updateUrl = this.url + '/api/eng/chlorine/update_record';
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })
    }
    //Delete Supply
    deleteRecord(id):Promise<any>{
        let deleteUrl=this.url+'/api/eng/chlorine/delete_record/'+id;
        return new Promise((resolve,reject)=>{
            this.http.get(deleteUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err.json())}
            )
        })
    }
}