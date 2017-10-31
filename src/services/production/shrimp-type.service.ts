import { Events } from 'ionic-angular';

import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductionShrimpTypeService {
    public headers: Headers;
    public userID: number;
    private url: string;
    constructor(
        private http: Http,
        private authService: AuthService,
        private webUrlService: WebUrlService,
        private eventCtrl:Events
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

    /*Get only enable shrimp type*/
    getShrimpType() {
        let getShrimpTypeUrl = this.url + '/api/production/shrimp_type/enable';
        return new Promise((resolve, reject) => {
            this.http.get(getShrimpTypeUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { reject(err); }
                )
        })
    }
    getAllShrimpType(): Promise<any> {
        let getAllShrimpTypeUrl = this.url + '/api/production/shrimp_type';
        return new Promise((resolve, reject) => {
            this.http.get(getAllShrimpTypeUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { reject(err); }
                )
        })
    }
    /*Update*/
    update(id, name) {
        let updateUrl = this.url + '/api/production/shrimp_type/update/' + id
        let newName = {
            'name': name
        }
        return new Promise((resolve, reject) => {
            this.http.post(updateUrl, newName, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /*Update Status*/
    updateStatus(id, status) {
        let updateStatusUrl = this.url + '/api/production/shrimp_type/update/status/' + id
        let newStatus = {
            'status': status
        }
        return new Promise((resolve, reject) => {
            this.http.post(updateStatusUrl, newStatus, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /*delete*/
    delete(id) {
        let deleteUrl = this.url + '/api/production/shrimp_type/delete/' + id
        return new Promise((resolve, reject) => {
            this.http.get(deleteUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /*Add*/
    /*Add*/
    add(name) {
        let addUrl = this.url + '/api/production/shrimp_type/add';
        let newShrimpType = {
            'name': name
        }
        return new Promise((resolve, reject) => {
            this.http.post(addUrl, newShrimpType, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
}