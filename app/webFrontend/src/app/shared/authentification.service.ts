import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {BackendService} from "./backend.service";
import {UserService} from "./user.service";

@Injectable()
export class AuthenticationService {

    private token: string;
    private isLoggedIn = false;

    constructor(private http: Http, private backendService: BackendService, private userService: UserService) {
        // set token if saved in local storage
        //var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = localStorage.getItem('currentUserToken');
    }

    login(username: string, password: string) {


        //localStorage.clear();

        return new Promise((resolve, reject) => {

            this.backendService.post('user/login', { email: username, password: password })
                .subscribe(
                    (response: any) => {
                        console.log(response);
                        if (this.setMetaData(response, true)){
                            resolve();
                        } else {
                            reject();
                        }
                    }, (err) => {

                        reject(err);

                    });

        });

    }

    setMetaData(json: any, setToken: boolean):boolean {

        if (setToken && json.token) {
            console.log(json.token);
            console.log('set tokens');
            localStorage.setItem('currentUserToken', json.token);
            this.backendService.token = json.token;
            console.log('done');
            localStorage.setItem('currentUserRole', json.user.role);
        }

        if(json.user) {
            localStorage.setItem('currentUser', json.user.firstName);

            this.userService.userRole = json.user.role;
        }

        this.isLoggedIn = true;
        return true;

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
        localStorage.removeItem('currentUserRole');
    }

    register(username: string, password: string, prename: string, surname: string) {

        return new Promise((resolve, reject) => {

            this.backendService.post('user/register',  { email: username, password: password, firstName: prename, lastName: surname})
                .subscribe(
                    (json: any) => {
                        console.log(json);
                        //this.setMetaData(json, true);
                        resolve();

                    }, (err) => {

                        reject(err);

                    });

        });

    }

    getToken(){
        return this.token;
    }
}