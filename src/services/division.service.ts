import { Events } from 'ionic-angular';

import { WebUrlService } from "./weburl.service";
// import { NgForm } from "@angular/forms";
import { Http,Headers} from "@angular/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { DivisionModel } from "../models/human-resource/division";

@Injectable()
export class DivisionService {
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

    /*Add*/
    addDivision(formInput):Promise<any> {
        let addUrl=this.url+'/api/division';
        return new Promise((resolve,reject)=>{
            let division=new DivisionModel();
            division.name=formInput.value.divisionName;
            this.http.post(addUrl,division,{headers:this.headers})
            .subscribe(
                result=>{
                    resolve(result);
                },
                err=>{
                    reject(err);
                }
            )
        })
    }
    /*Get All Divisions*/
    getDivision():Promise<any> {
        let getDivisionUrl= this.url+'/api/human_resource/division';
        return new Promise((resolve,reject)=>{
             this.http.get(getDivisionUrl,{headers:this.headers})
             .subscribe(
                 divisions=>{
                     resolve(divisions.json());
                 },
                 err=>{
                     reject(err);
                 }
             )
        })
    }
    /*Edit*/
    editDivsion(divisionName:string,id:number){
        let editDivisionUrl=this.url+'/api/division/'+id;
        let division=new DivisionModel();
        division.name=divisionName;
        return new Promise((resolve,reject)=>{
            this.http.put(editDivisionUrl,division,{headers:this.headers})
            .subscribe(
                result=>{resolve(result)},
                err=>{reject(err)}
            )
        })
    }
    /*Delete*/
    deleteDivision(id:number):Promise<any>{
        let deleteDivisionUrl=this.url+'/api/division/'+id;
        return new Promise((resolve,reject)=>{
            this.http.delete(deleteDivisionUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result)},
                err=>{reject(err)}
            )
        })
    }

    getDivisionID(){
        let divisions={
            'production':9,
            'engineer':6,
            'hr':7,
            'qc':11
        }
        return divisions;
    }
}