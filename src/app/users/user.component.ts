import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UserLogin } from '../_models/user-login.model';
import { UserService } from './user.service';
import { AuthenticationService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loggedInUser = UserLogin;
  model: any = {};

  constructor(private userservice: UserService,
              private authservice: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!this.loggedInUser) {
      this.loginRedirect();
    }
  }

  private loginRedirect() {
    this.router.navigate(['/login']);
  }

  createTesty() {
    const testUser = new User;
    testUser.userid = '1';
    testUser.username = 'user1';
    testUser.password = 'password1';
    testUser.active = true;
    testUser.email = 'test@email.com';
    testUser.phone = '2815555555';
    testUser.firstname = 'Testy';
    testUser.lastname = 'McTesterson';
    testUser.permission = 'admin';

    this.userservice.create(testUser)
            .subscribe(
                data => {
                    console.log('CREATED!!');
                },
                error => {
                    console.log('Creation Error');
                });
    console.log('test user pushed');
  }

  testLogin() {
    this.authservice.login('user1', 'password1')
        .subscribe(
            data => {
                // this.router.navigate([this.returnUrl]);
                console.log('LOGIN token is' + data);
                this.loggedInUser = data;
            },
            error => {
                console.log('login error');
            });
  }

  testLogout() {
    this.authservice.logout();
    this.loggedInUser = null;
  }


  testDelete(){
    this.userservice.delete('1')
      .subscribe(
          data => {
            console.log('delete ' + data);
          },
          error => {
              console.log('error deleting user ');
          });
  }

}
