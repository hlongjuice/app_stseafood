import { Injectable } from '@angular/core';
// import { Http, Headers, Response } from '@angular/http';
// import { UserModel } from "../models/users";


@Injectable()
export class UserService {

 /*   private oauthUrl = "http://localhost/stseafood/public/oauth/token";
    private productionUrl = 'http://localhost/stseafood/public/api/production';
    private token:Promise<string>;
    constructor(
        private http: Http,
        ) {
            this.token=this.getAccessToken();
         }
        */

    /*Get Access Token*/
   /* getAccessToken():Promise<string> {
        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        let postData = {
            grant_type: "password",
            client_id: 2,
            client_secret: "Om77NZrPdq0TaGRovXCA6hi3Y5NVuO3gNfZKPxsI",
            username: "isis.juicy@gmail.com",
            password: "hlong@123",
            scope: ""
        }

        return new Promise(
            (resolve, reject) => {
                this.http.post(this.oauthUrl, JSON.stringify(postData), { headers: headers })
                    .subscribe(
                    (reponse: Response) => {
                        resolve(reponse.json().access_token)   
                    }
                    )
            }
        )
    }

    getToken(){
        return this.token
    }

    getProduction(access_token:string) {
        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + access_token,
        });
        return this.http.get(this.productionUrl, { headers: headers })
    }
    */
    /*Test Get Http*/
    /*
    getTest() {
        return this.http.get('http://localhost/stseafood/public/test');
    }
    */
}