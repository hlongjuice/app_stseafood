import { Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarManageService {
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

    /*Get Car*/
    getCar(type): Promise<any> {
        let getCarUrl = this.url + '/api/human_resource/car/manage/' + type;
        return new Promise((resolve, reject) => {
            this.http.get(getCarUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => {
                    reject(err)
                }
                )
        });
    }
    /* Get Available Car*/
    getAvailableCar(type):Promise<any> {
        let getCarUrl = this.url + '/api/human_resource/car/manage/available_car/' + type
        return new Promise((resolve, reject) => {
            this.http.get(getCarUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => {
                    reject(err)
                }
                )
        });
    }

    /*Add Car*/
    addCar(car_number, car_type_id, plate_number): Promise<any> {
        let newCar = {
            'car_number': car_number,
            'car_type_id': car_type_id,
            'plate_number': plate_number
        };
        let addCarUrl = this.url + '/api/human_resource/car/manage/add';
        return new Promise((resolve, reject) => {
            this.http.post(addCarUrl, newCar, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                );
        });
    }

    /*Update Car*/
    updateCar(car_number, car_type_id, plate_number, quantity): Promise<any> {
        let newDetials = {
            'car_number': car_number,//Required
            'car_type_id': car_type_id,//Required
            'plate_number': plate_number,//Required
            'quantity': quantity
        }
        let updateCarUrl = this.url + '/api/human_resource/car/manage/update';
        return new Promise((resolve, reject) => {
            this.http.post(updateCarUrl, newDetials, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        });
    }

    /*Update Status*/
    updateStatus(id, status): Promise<any> {
        let newStatus = {
            'id': id,
            'status': status
        }
        let updateStatusUrl = this.url + '/api/human_resource/car/manage/update_status';
        return new Promise((resolve, reject) => {
            this.http.post(updateStatusUrl, newStatus, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        });
    }

    /*Get CarType*/
    getCarType(): Promise<any> {
        let getTypeUrl = this.url + '/api/human_resource/car/car_type';
        return new Promise((resolve, reject) => {
            this.http.get(getTypeUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
}