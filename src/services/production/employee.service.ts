import { Events } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { AuthService } from "../auth.service";
import { WebUrlService } from "../weburl.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProductionEmployeeService {
    public headers: Headers;
    public userID: number;
    private url: string;
    /*Constructor*/
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
                        console.log(this.headers)
                    }
                    )
            }
        )
        this.eventCtrl.subscribe('after:login', () => {
            this.getAuth();
        })
    }

    getAuth() {
        console.log('Employee')
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

    /*Get Employee From Group*/
    getGroupEmployee(groupID: string): Promise<any> {
        let getEmployeeGroupUrl = this.url + '/api/production/group/members/' + groupID;
        return new Promise((resolve, reject) => {
            this.http.get(getEmployeeGroupUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { reject(err); }
                );
        })
    }

    /*Get All Group*/
    getGroups(): Promise<any> {
        let getGroupUrl = this.url + '/api/production/groups';
        return new Promise((resolve, reject) => {
            this.http.get(getGroupUrl, { headers: this.headers })
                .subscribe(
                result => { resolve(result.json()) },
                err => { reject(err) }
                )
        })
    }
    /*Get Non Group Employees*/
    getNonGroupEmployee(division_id: number) {
        let getNonGroupMemberUrl = this.url + '/api/production/group/non_group/members/' + division_id;
        return new Promise((resolve, reject) => {
            this.http.get(getNonGroupMemberUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json());
                },
                err => { reject(err) }
                )
        })
    }

    /*get All Division Employee*/
    getAllDivisionEmployee(division_id: number): Promise<any> {
        let getAllDivisionEmployeeUrl = this.url + '/api/production/group/all/employee/' + division_id;
        return new Promise((resolve, reject) => {
            this.http.get(getAllDivisionEmployeeUrl, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        })
    }
    /*Go New Page*/
    goNextPage(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(url, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                },
                err => { reject(err) }
                )
        });
    }
    /*addGroupMember*/
    addGroupMember(group, employees): Promise<any> {
        let newMembers = {
            'group': group,
            'employees': employees
        }
        let addGroupMemberUrl = this.url + '/api/production/group/member/add';
        return new Promise((resolve, reject) => {
            this.http.post(addGroupMemberUrl, newMembers, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        });
    }
    /*changeGroupMember*/
    changeGroupMember(group, employees): Promise<any> {
        let editMembers = {
            'group': group,
            'employees': employees
        }
        console.log(this.headers);
        let changeGroupMemberUrl = this.url + '/api/production/group/member/edit';
        return new Promise((resolve, reject) => {
            this.http.post(changeGroupMemberUrl, editMembers, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        });
    }
    /*deleteGroupMember*/
    deleteGroupMember(employees) {
        let editMembers = {
            'employees': employees
        }
        let deleteGroupMemberUrl = this.url + '/api/production/group/member/delete';
        return new Promise((resolve, reject) => {
            this.http.post(deleteGroupMemberUrl, editMembers, { headers: this.headers })
                .subscribe(
                result => {
                    resolve(result.json())
                }, err => { reject(err) }
                )
        });
    }
}