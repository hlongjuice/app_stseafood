import { Events } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class QcShrimpReceivingService {
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

    // Add Receiving
    addReceiving(formInputs):Promise<any>{
        let addUrl=this.url+'/api/qc/add_receiving';
        return new Promise((resolve,reject)=>{
            this.http.post(addUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result)},
                err=>{reject(err)}
            )
        })
    }
    //Add Extra Receiving
    addExtraReceiving(formInputs):Promise<any>{
        let addExtraUrl=this.url+'/api/qc/add_extra_receiving'
        return new Promise((resolve,reject)=>{
            this.http.post(addExtraUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
    // Show Receiving
    showReceiving(dateInput):Promise<any>{
        let date={
            'date':dateInput
        }
        let showUrl=this.url+'/api/qc/show_receiving'
        return new Promise((resolve,reject)=>{
            this.http.post(showUrl,date,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }

    //Get Receiving By ID
    getReceivingByID(date,receiving_id):Promise<any>{
        let inputs={
            'date':date,
            'receiving_id':receiving_id
        }
        let getUrl=this.url+'/api/qc/get_shrimp_receiving_by_id';
        return new Promise((resolve,reject)=>{
            this.http.post(getUrl,inputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }

    //Update Shrimp Receiving
    updateShrimpReceiving(formInputs):Promise<any>{
        let updateUrl=this.url+'/api/qc/update_shrimp_receiving'
        return new Promise((resolve,reject)=>{
            this.http.post(updateUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }

    /* Update Supplier Receiving */
    updateSupplierReceiving(formInputs):Promise<any>{
        let updateUrl=this.url+'/api/qc/update_supplier_receiving'
        return new Promise((resolve,reject)=>{
            this.http.post(updateUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }

    /* Delete Supplier Receiving */
    deleteSupplierReceiving(id):Promise<any>{
        console.log(id)
        let deleteUrl=this.url+'/api/qc/delete_supplier_receiving/'+id;
        return new Promise((resolve,reject)=>{
            this.http.get(deleteUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
        /* Delete Shrimp Receiving */
    deleteShrimpReceiving(id):Promise<any>{
        let deleteUrl=this.url+'/api/qc/delete_shrimp_receiving/'+id;
        return new Promise((resolve,reject)=>{
            this.http.get(deleteUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
    /* Checker */
    addChecker(formInputs){
        let url=this.url+'/api/qc/add_checker';
        return new Promise((resolve,reject)=>{
            this.http.post(url,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }
}