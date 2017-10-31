import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarRequestService {
    public headers: Headers;
    public userID: number;
    private url: string;

    /*Contructor*/
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
    /*End Contructor*/

    /*Get Car Request*/
    getCarRequest(user_id,date): Promise<any> {
        let inputs={
            'date':date,
            'user_id':user_id
        }

        let getCarUrl = this.url + '/api/human_resource/car/car_request';
        return new Promise((resolve, reject) => {
            this.http.post(getCarUrl,inputs, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => { reject(err) }
                )
        });
    }

    /*Add Car Request*/
    addCarRequest(start_date,start_time,end_date,end_time, car_type_id, division_id, em_id, rank_id, destination, details, user_id,passengers,passenger_number){
        let car_request = {
            'start_date': start_date,
            'start_time':start_time,
            'end_date':end_date,
            'end_time':end_time,
            'car_type_id': car_type_id,
            'division_id': division_id,
            'em_id': em_id,
            'rank_id': rank_id,
            'destination': destination,
            'details': details,
            'requested_by_user_id': user_id,
            'passengers':passengers,
            'passenger_number':passenger_number
        }
        console.log(passengers)
        let addCarUrl = this.url + '/api/human_resource/car/car_request/add';
        return new Promise((resolve, reject) => {
            this.http.post(addCarUrl, car_request, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Update Car Request*/
 /*   updateCarRequest(date, car_type_id, division_id, em_id, rank_id, destination, details, user_id):Promise<any> {
        let car_request = {
            'date': date,
            'car_type_id': car_type_id,
            'division_id': division_id,
            'em_id': em_id,
            'rank_id': rank_id,
            'destination': destination,
            'details': details,
            'updated_by_user_id': user_id
        }
        let updateCarUrl = this.url+'/api/human_resource/car/car_request/update';
        return new Promise((resolve,reject)=>{
            this.http.post(updateCarUrl,car_request,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }*/
    /* Update Car Request */
    updateCarRequest(formInputs):Promise<any>{
        let updateUrl=this.url+'/api/human_resource/car/car_request/update';
        return new Promise((resolve,reject)=>{
            this.http.post(updateUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err.json())}
            )
        })
    }

    /* Delete Car Request */
    deleteRequest(request_ids):Promise<any>{
        let requests={
            'car_request_ids':request_ids
        }
        console.log(requests)
        let deleteUrl=this.url+'/api/human_resource/car/car_request/delete';
        return new Promise((resolve,reject)=>{
            this.http.post(deleteUrl,requests,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json)},
                err=>{reject(err)}
            )
        })
    }
}