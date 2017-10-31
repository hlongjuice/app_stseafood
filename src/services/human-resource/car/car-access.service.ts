import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarAccessService {
    private headers: Headers;
    private userID: number;
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

    /* Add Car Departure */
    addCarDeparture(car_id, response_id, date_departure, time_departure, mile_start, user_id): Promise<any> {
        let carDetails = {
            'car_id': car_id,
            'response_id': response_id,
            'date_departure': date_departure,
            'time_departure': time_departure,
            'mile_start': mile_start,
            'user_id': user_id
        }
        let departureUrl = this.url + '/api/human_resource/car/car_access/add_departure';
        return new Promise((resolve, reject) => {
            this.http.post(departureUrl, carDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(resolve) },
                err => { reject(err) }
                )
        });
    }
    /* Add Car Arrival */
    addCarArrival(response_id, date_arrival, time_arrival, mile_end, gas_fill, gas_unit_price, gas_total_price, gas_station, user_id): Promise<any> {
        let carDetails = {
            'response_id': response_id,
            'date_arrival': date_arrival,
            'time_arrival': time_arrival,
            'mile_end': mile_end,
            'user_id': user_id,
            'gas_fill': gas_fill,
            'gas_total_price': gas_total_price,
            'gas_unit_price': gas_unit_price,
            'gas_station': gas_station
        }
        let arrivalUrl = this.url + '/api/human_resource/car/car_access/add_arrival';
        return new Promise((resolve, reject) => {
            this.http.post(arrivalUrl, carDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /* Update Car Access */
    updateCarAccess(response_id, date_departure, time_departure, mile_start, date_arrival, time_arrival, mile_end, gas_fill, gas_unit_price, gas_total_price, gas_station, user_id) {
        let carDetails = {
            'response_id': response_id,
            'date_departure': date_departure,
            'time_departure': time_departure,
            'date_arrival': date_arrival,
            'time_arrival': time_arrival,
            'mile_start': mile_start,
            'mile_end': mile_end,
            'user_id': user_id,
            'gas_fill': gas_fill,
            'gas_total_price': gas_total_price,
            'gas_unit_price': gas_unit_price,
            'gas_station': gas_station
        }
        let updateUrl = this.url + '/api/human_resource/car/car_access/update';
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, carDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    //Update Departure
    updateDeparture(formInputs): Promise<any> {
        let updateUrl = this.url + '/api/human_resource/car/car_access/update_departure'
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    /* Cancel Status */
    cancelStatus(response_id): Promise<any> {
        let cancelUrl = this.url + '/api/human_resource/car/car_access/cancel_status/' + response_id;
        return new Promise((resolve, reject) => {
            this.http.get(cancelUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err.json()) }
                )
        })

    }
    /* Get Cars*/
    getCars(status_id, date): Promise<any> {
        let inputs = {
            'status_id': status_id,
            'date': date
        }
        let getDepartureUrl = this.url + '/api/human_resource/car/car_access/get_cars';
        return new Promise((resolve, reject) => {
            this.http.post(getDepartureUrl, inputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    //Get Car Arrival By Date
    getCarArrivalByDate(date, status): Promise<any> {
        let inputs = {
            'date': date,
            'gas_fill_status': status
        }
        let getUrl = this.url + '/api/human_resource/car/car_access/get_car_arrival_by_date';
        return new Promise((resolve, reject) => {
            this.http.post(getUrl, inputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    //add Gas Fill
    addGasFill(formInputs): Promise<any> {
        let fillUrl = this.url + '/api/human_resource/car/car_access/add_gas_fill';
        return new Promise((resolve, reject) => {
            this.http.post(fillUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    //Update Gas Fill
    updateGasFill(formInputs):Promise<any>{
        let fillUrl = this.url + '/api/human_resource/car/car_access/update_gas_fill';
        return new Promise((resolve, reject) => {
            this.http.post(fillUrl, formInputs, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    //Delete Gas Fill
    deleteGasFill(id):Promise<any>{
        let deleteUrl=this.url+'/api/human_resource/car/car_access/delete_gas_fill/'+id;
        return new Promise((resolve,reject)=>{
            this.http.get(deleteUrl,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }

    getStatuses() {
        let statuses = {
            before_departure: 1,
            before_arrival: 2,
            arrival: 3,
            usage: 4
        }
        return statuses;
    }
}