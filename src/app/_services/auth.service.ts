import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        // console.log('auth service logging in ' + username);
        return this.http.post<any>(appConfig.apiUrl + '/users/authenticate', { username: username, password: password })
            .map(userToken => {
                // login successful if there's a jwt token in the response
                if (userToken) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userToken));
                }
                return userToken;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
    isAuthenticated() {
    //   const promise = new Promise(
    //     (resolve, reject) => {
    //       if (localStorage.getItem('currentUser')) {
    //         resolve(true);
    //       } else {
    //         reject();
    //       });
    //   return promise;
    }
}
