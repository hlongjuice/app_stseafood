import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "./auth.service";

@Injectable()
export class NextPageService {
    public url: string;
    public headers: Headers;
    public userID: number;
    constructor(
        private http: Http,
        private authService: AuthService,
        private eventCtrl: Events
    ) {

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
    }
    /* Next Page */
    nextPage(url): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(url, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }
}