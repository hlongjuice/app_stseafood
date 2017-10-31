import { Storage } from '@ionic/storage';
import { Injectable, Injector } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { NavController, LoadingController } from 'ionic-angular';
// import { Login } from '../pages/login/login';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Events, LoadingController } from 'ionic-angular';




@Injectable()
export class HttpHanderService extends Http {
    // private router;
    // private authService;

    constructor(backend: XHRBackend, defaultOptions: RequestOptions,
        private injector: Injector, public events: Events,
        public loaderCtrl:LoadingController,
        public storage:Storage
    ) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

        /*    if (typeof url === 'string') {
                if (!options) {
                    options = { headers: new Headers() };
                }
                this.setHeaders(options);
            } else {
                this.setHeaders(url);
            }
            console.log("url: " + JSON.stringify(url) + ", Options:" + options);*/
        return super.request(url, options).catch(this.catchErrors());
    }



    private catchErrors() {

        return (res: Response) => {

            if (res.status === 401 || res.status === 403) {
                //handle authorization errors
                //in this example I am navigating to login.
                console.log("Error_Token_Expired: redirecting to login.");

                // localStorage.removeItem("token");
             /*   this.storage.get('token')
                .then(token=>{
                    if(token!=null){
                        // this.storage.remove('token')
                    }
                    this.events.publish('logout');
                })*/
                this.events.publish('logout');
            }
            return Observable.throw(res);
        };
    }

    /*  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
  
          // if (this.authService == null) {
          //     // this.authService = this.injector.get(AuthService);
          // }
          //add whatever header that you need to every request
          //in this example I could set the header token by using authService that I've created
          //objectToSetHeadersTo.headers.set('token', this.authService.getToken());
          let token = localStorage.getItem("token");
          let head = new Headers({
              'Content-Type': 'application/json',
              'X-Access-Token': token,
          });
          //let options = new RequestOptions({ headers: head });
          if(token){
              objectToSetHeadersTo.headers.set('Content-Type', 'application/json');
              objectToSetHeadersTo.headers.set('X-Access-Token', token);
          }
          
      }*/
}