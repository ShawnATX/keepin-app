import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + '/users');
    }

    getById(userid: string) {
        return this.http.get(appConfig.apiUrl + '/users/' + userid);
    }

    create(user: User) {
        console.log('Ng Service create');
        console.log(user);
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    update(user: User) {
        return this.http.put(appConfig.apiUrl + '/users/' + user.userid, user);
    }

    delete(userid: string) {
        return this.http.delete(appConfig.apiUrl + '/users/' + userid);
    }
}
