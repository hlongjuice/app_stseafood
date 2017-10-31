import { Events } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";
// import { ProductionWorkModel } from "../../models/production/production-work";
import { NgForm } from "@angular/forms";

@Injectable()
export class ProductionWorkService {
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
                        console.log('header without sub')
                        console.log(headers)
                        this.headers = headers
                    }
                    )
            }
        )
        this.eventCtrl.subscribe('after:login', () => {
            console.log('Fired After:login')
            this.getAuth();
        })
    }

    /* Get Auth */
    getAuth() {
        console.log('In Get Auth')
        this.authService.getUser().then(
            userID => {
                console.log('In Get User')
                this.userID = userID.id
                this.authService.getHeader()
                    .then(
                    headers => {
                        console.log('Yo!!')
                        this.headers = headers
                        console.log(this.headers)
                    }
                    ).catch(err=>{console.log(err)})
            }
        )
    }

    /*Add New Work*/
    addWork(formInput: NgForm): Promise<any> {
        let addWorkUrl = this.url + '/api/production/work';
        // let user_id;
        let inputs = {
            'date': formInput.value.date,
            'time_start': formInput.value.startTime,
            'time_end': formInput.value.endTime,
            'em_id': formInput.value.em_id,
            'activity_id': formInput.value.activity_id,
            'shrimp_size_id': formInput.value.shrimp_size_id,
            'shrimp_type_id': formInput.value.shrimp_type_id,
            'weight': formInput.value.weight,
            'user_id': this.userID,
            'group_id': formInput.value.selectedGroup
        }
        console.log(inputs)

        return new Promise((resolve, reject) => {
            // this.http.post()
            this.http.post(addWorkUrl, inputs, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => { reject(err) }
                )
        });
    }

    /*Amount Weight Per Employee*/
    employeeAmountWeight(em_id: number): Promise<any> {
        let amountWeightUrl = this.url + '/api/production/work/employee_amount_weight/' + em_id;
        return new Promise((resolve, reject) => {
            this.http.get(amountWeightUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { console.log(err) }
                );
        });
    }

    /*Get Time Period*/
    getTimePeriod(date): Promise<any> {
        console.log('in Time Period ')
        console.log(this.headers)
        let getTimePeriodUrl = this.url + '/api/production/work/date/' + date;
        return new Promise((resolve, reject) => {
            this.http.get(getTimePeriodUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                );
        });
    }

    /*Get Work List*/
    getWorkList(time_period_id): Promise<any> {
        let getWorkListUrl = this.url + '/api/production/work/date/time_period/' + time_period_id;
        return new Promise((resolve, reject) => {
            this.http.get(getWorkListUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        });
    }

    /*Get Work Details*/
    getWorkDetials(work_id): Promise<any> {
        let getWorkDetialsUrl = this.url + '/api/production/work/date/time_period/work_list/' + work_id;
        return new Promise((resolve, reject) => {
            this.http.get(getWorkDetialsUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { reject(err) }
                )
        })
    }

    /*Delete Employee Weight*/
    deleteWeight(weight_id): Promise<any> {
        let deleteWeightUrl = this.url + '/api/production/work/date/time_period/work_list/weight/' + weight_id;
        return new Promise((resolve, reject) => {
            this.http.delete(deleteWeightUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    /*Delete Work*/
    deleteWork(id): Promise<any> {
        let deleteWorkUrl = this.url + '/api/production/work/delete/' + id;
        return new Promise((resolve, reject) => {
            this.http.get(deleteWorkUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }

    /* Update Work */
    updateWork(formInputs):Promise<any>{
        console.log(formInputs)
        let updateUrl=this.url+'/api/production/work/update_work'
        return new Promise((resolve,reject)=>{
            this.http.post(updateUrl,formInputs,{headers:this.headers})
            .subscribe(
                result=>{resolve(result.json())},
                err=>{reject(err)}
            )
        })
    }

    /* Last Insert */
    lastInsert(): Promise<any> {
        let lastUrl = this.url + '/api/production/work/last_insert'
        return new Promise((resolve, reject) => {
            this.http.get(lastUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
}