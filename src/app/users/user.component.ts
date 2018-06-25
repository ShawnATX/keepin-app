import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UserService } from './user.service';
import { AuthenticationService } from '../_services/auth.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;
  model: any = {};

  constructor(private userservice: UserService,
              private authservice: AuthenticationService) { }

  ngOnInit() {
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
                console.log('LOGIN!!!!!!');
            },
            error => {
                console.log('login error');
            });
  }

}
