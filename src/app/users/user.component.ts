import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UserService } from './user.service';
import { AuthenticationService } from '../_services/auth.service';


// import { UserService } from '../_services/UserService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;

  constructor(private userservice: UserService,
              private authservice: AuthenticationService) { }

  ngOnInit() {
  }
  createTesty() {
    const testUser = new User;
    testUser.userid = '1';
    testUser.username = 'user1';
    testUser.password = 'password';
    testUser.active = true;
    testUser.email = 'test@email.com';
    testUser.phone = '2815555555';
    testUser.firstname = 'Testy';
    testUser.lastname = 'McTesterson';
    testUser.permission = 'admin';
    this.userservice.create(testUser);
    console.log('test user created in Mongo');
  }
  testLogin() {
    this.authservice.login('user1', 'password');
  }
}
