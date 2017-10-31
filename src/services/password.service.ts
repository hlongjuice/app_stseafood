import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { WebUrlService } from './weburl.service';

@Injectable()
export class PasswordService {

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


    //Change Password
    changePassword(formInputs,id){
        let updateUrl=this.url+'/api/auth/change_password/'+id;
        return new Promise((resolve,reject)=>{
            this.http.post(updateUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }



}