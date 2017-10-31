import { Events } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductionActivityService {
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

    /*Get onlu Enable Activity*/
    getActivity(): Promise<any> {
        let getActivityUrl = this.url + '/api/production/activity/enable';
        return new Promise((resolve, reject) => {
            this.http.get(getActivityUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => {
                    reject(err);
                }
                )
        })
    }

    getAllActivity() {
        let getAllActivityUrl = this.url + '/api/production/activity';
        console.log(this.headers);
        return new Promise((resolve, reject) => {
            this.http.get(getAllActivityUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => {
                    reject(err);
                }
                )
        })
    }

    /*Update Status*/
    updateStatus(id, status): Promise<any> {
        let newStatus = {
            'status': status
        }
        console.log(this.headers);
        let updateStatusUrl = this.url + '/api/production/activity/update/status/' + id;
        return new Promise((resolve, reject) => {
            this.http.post(updateStatusUrl, newStatus, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        })
    }
    /*Update*/
    update(id, name) {
        let newName = {
            'name': name
        }
        let updateUrl = this.url + '/api/production/activity/update/' + id;
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, newName, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        })
    }
    /*Delete*/
    delete(id) {
        let deleteUrl = this.url + '/api/production/activity/delete/' + id
        return new Promise((resolve, reject) => {
            this.http.get(deleteUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        })
    }
    /*Add*/
    addActivity(name) {
        let addActivityUrl = this.url + '/api/production/activity/add';
        let newActivity = {
            'name': name
        }
        return new Promise((resolve, reject) => {
            this.http.post(addActivityUrl, newActivity, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
}