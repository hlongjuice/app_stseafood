import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "../../auth.service";
import { WebUrlService } from "../../weburl.service";
@Injectable()
export class CarDriverService {
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

    /* Get Driver */
    getAllDriver():Promise<any>{
        let getDriverUrl = this.url + '/api/human_resource/driver/all_driver';
        return new Promise((resolve, reject) => {
            this.http.get(getDriverUrl, { headers: this.headers })
                .subscribe(
                    result=>{resolve(result.json())},
                    err=>{reject(err)}
                )
        })
    }
}