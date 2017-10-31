import { AuthService } from './auth.service';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { WebUrlService } from "./weburl.service";
import { Events } from "ionic-angular";
@Injectable()
export class DepartmentService {
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

    getDepartment(): Promise<any> {
        let getDepartmentUrl = this.url + '/api/human_resource/department';
        return new Promise((resolve, reject) => {
            this.http.get(getDepartmentUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
}