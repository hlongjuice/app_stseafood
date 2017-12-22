import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserModel } from "../models/users";
import { WebUrlService } from "./weburl.service";


@Injectable()
export class AuthService {

    private url: string;
    private oauthUrl: string;
    private userUrl: string;
    private user: UserModel;
    private authState: boolean;
    private accessToken: string;
    // private userDetails:any;
    constructor(
        private http: Http,
        public webUrl: WebUrlService,
        public eventCtrl: Events,
        public storage: Storage
    ) {
        console.log('AuthController');
        this.url = this.webUrl.getUrl();
        this.oauthUrl = this.url + '/oauth/token';
        this.userUrl = this.url + '/api/user';
        console.log(this.oauthUrl);
        this.authState = false;
    }
    /*Log In*/
    login(usernameInput: string, passwordInput: string): Promise<any> {
        let userModel = new UserModel();
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
            grant_type: "password",
            client_id: 2,
            client_secret: "Om77NZrPdq0TaGRovXCA6hi3Y5NVuO3gNfZKPxsI",
            username: usernameInput,
            password: passwordInput,
            scope: ""
        }

        return new Promise(
            (resolve, reject) => {
                this.http.post(this.oauthUrl, JSON.stringify(postData), { headers: headers })
                    .subscribe(
                    (response: Response) => {
                        let access_token = response.json().access_token;
                        var headers = new Headers({
                            "Accept": "application/json",
                            "Authorization": "Bearer " + access_token,
                        });
                        console.log('Test Login')
                        console.log(response);
                        /*Store Access Token to Global*/
                        this.accessToken = access_token;

                        this.http.get(this.userUrl, { headers: headers })
                            .subscribe(
                            user => {
                                userModel.name = user.json().name;
                                userModel.email = user.json().email;
                                userModel.id = user.json().id;
                                this.user = userModel;
                                this.authState = true;
                                this.eventCtrl.publish('after:login');
                                this.storage.set('token', this.accessToken);
                                console.log('after:login')
                                resolve(this.user);
                            },err=>{console.log('errr')}
                            )
                    },
                    (err) => {
                        console.log(err);
                        console.log('Error Login')
                        reject();
                    }
                    )
            }
        )
    }

    logout(): Promise<boolean> {
        let headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + this.accessToken,
        });
        // let tokens = {
            // 'access_token': this.accessToken
        // }
        let user = {
            'user_id': this.user.id
        }
        let logoutUrl = this.url + '/api/auth/custom_logout'
        return new Promise((resolve, reject) => {
            this.http.post(logoutUrl, user, { headers: headers })
                .subscribe(
                result => {
                    console.log('inLogout', result.json())
                    this.user = null;
                    this.authState = false;
                    this.accessToken = null;
                    this.storage.remove('token');
                    this.eventCtrl.publish('logout');
                    resolve(result.json());
                },
                err => { console.log(err) }
                )
        })

    }

    setAuth(token) {
        let userModel = new UserModel();
        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        });
        return new Promise((resolve, reject) => {
            /*Store Access Token to Global*/
            this.accessToken = token;

            this.http.get(this.userUrl, { headers: headers })
                .subscribe(
                user => {
                    userModel.name = user.json().name;
                    userModel.email = user.json().email;
                    userModel.id = user.json().id;
                    this.user = userModel;
                    this.authState = true;
                    this.eventCtrl.publish('after:login');
                    console.log('after:login')
                    resolve(this.user);
                },
                err => { reject(err) }
                )
        })

    }

    /*Get User*/
    getUser(): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            resolve(this.user);
        });
    }
    /*Get Auth State*/
    getAuthState() {
        return this.authState;
    }
    /*Get Token*/
    getToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.get('token')
                .then(token => {
                    this.accessToken = token
                    resolve(this.accessToken);
                })
        })
    }
    /*Get Header*/
    getHeader(): Promise<Headers> {
        return new Promise((resolve, reject) => {
            let headers = new Headers({
                "Accept": "application/json",
                "Authorization": "Bearer " + this.accessToken,
            });
            console.log('Show Header')
            console.log('In Get Header')
            resolve(headers);
        })
    }

    //User Details
    getUserDetails(){
        let myHeaders:any;
        let user_id=null;
        if(this.user){
            user_id=this.user.id
        }
        let detailsUrl=this.url+'/api/auth/get_user_details/'+user_id;
        return new Promise((resolve,reject)=>{
            this.getHeader()
            .then(result=>{
                myHeaders=result
                this.http.get(detailsUrl,{headers:myHeaders})
                .subscribe(
                    result=>{
                        resolve(result.json())
                    },
                    err=>{
                        reject(err.json())
                    }
                )
                
            }).catch(err=>{
                reject(err)
                console.log(err)
            })
        })
    }

    //User Types
    getUserTypes(){
        let types={
            member:'1',
            admin:'2',
            security:'3'
        }
        return types;
    }

}