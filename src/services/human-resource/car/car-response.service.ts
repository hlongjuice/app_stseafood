import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarResponseService {
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

    /*Get Request*/
    getRequest(status): Promise<any> {
        let getRequestUrl = this.url + '/api/human_resource/car/car_response/get_request/' + status;
        return new Promise((resolve, reject) => {
            this.http.get(getRequestUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /* Search Reqeust By Date */
    searchRequestByDate(start_date, status): Promise<any> {
        let searchUrl = this.url + '/api/human_resource/car/car_response/search_request/date';
        let date = {
            'start_date': start_date,
            'status': status
        }
        return new Promise((resolve, reject) => {
            this.http.post(searchUrl, date, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    /*Get Response*/
    getResponse(status_id): Promise<any> {
        let getResponseUrl = this.url + '/api/human_resource/car/car_response/get_response/' + status_id;
        return new Promise((resolve, reject) => {
            this.http.get(getResponseUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /* Assign Car */
    assignCar(requestIDList, date, time, car_type_id, car_id, destination, details, user_id, driver_id) {
        let assignDetails = {
            'date': date,
            'time': time,
            'car_id': car_id,
            'car_type_id': car_type_id,
            'destination': destination,
            'details': details,
            'user_id': user_id,
            'car_request_ids': requestIDList,
            'driver_id': driver_id
        }
        let approveUrl = this.url + '/api/human_resource/car/car_response/assign_car';
        return new Promise((resolve, reject) => {
            this.http.post(approveUrl, assignDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Approve Request*/
    approveRequest(response_ids, request_ids, user_id): Promise<any> {
        let approveDetails = {
            'response_ids': response_ids,
            'request_ids': request_ids,
            'user_id': user_id
        }
        let approveUrl = this.url + '/api/human_resource/car/car_response/approve';
        return new Promise((resolve, reject) => {
            this.http.post(approveUrl, approveDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Update Response*/
    updateResponse(response_id, date, time, driver_id, car_id, destination, details): Promise<any> {
        let updateUrl = this.url + '/api/human_resource/car/car_response/update';
        let responseDetails = {
            'response_id':response_id,
            'date': date,
            'time': time,
            'driver_id': driver_id,
            'car_id': car_id,
            'destination': destination,
            'details': details
        }
        console.log(responseDetails)
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, responseDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Delete Response*/
    deleteResponse(responseID) {
        let responseIDList = {
            'response_id': responseID
        }
        /*responseID as Array*/
        let deleteResponseUrl = this.url + '/api/human_resource/car/car_response/delete_response/' + responseID;
        return new Promise((resolve, reject) => {
            this.http.post(deleteResponseUrl, responseIDList, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Delete Response Request*/
    deleteResponseRequest(response_id, car_reqeust_ids): Promise<any> {
        let requestList = {
            'response_id': response_id,
            'car_request_ids': car_reqeust_ids
        }
        let deleteResponseRequestUrl = this.url + '/api/human_resource/car/car_response/delete_response_request';
        return new Promise((resolve, reject) => {
            this.http.post(deleteResponseRequestUrl, requestList, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }
    /* Get Car Reqeust Status */
    getCarRequestStatus(): Promise<any> {
        let statusUrl = this.url + '/api/human_resource/car/car_response/car_request_status';
        return new Promise((resolve, reject) => {
            this.http.get(statusUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }
    /* Get Car Response By User */
    getCarResponseByUser(user_id, status_id): Promise<any> {
        let responseDetails = {
            'user_id': user_id,
            'status_id': status_id
        }
        console.log(responseDetails)
        let getResponseUrl = this.url + '/api/human_resource/car/car_response/get_response/history';
        return new Promise((resolve, reject) => {
            this.http.post(getResponseUrl, responseDetails, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /* Delete Assigned Reqeust */
    deleteAssignedRequest(response_id): Promise<any> {
        let deleteAssignedUrl = this.url + '/api/human_resource/car/car_response/delete_assigned_request/' + response_id
        return new Promise((resolve, reject) => {
            this.http.get(deleteAssignedUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    /* Cancel Approved Response */
    cancelApprovedResponse(response_id): Promise<any> {
        let cancelResponseUrl = this.url + '/api/human_resource/car/car_response/cancel_approved_response/' + response_id;
        return new Promise((resolve, reject) => {
            this.http.get(cancelResponseUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

}