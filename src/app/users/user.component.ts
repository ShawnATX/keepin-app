import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
// import { UserService } from '../_services/UserService';

@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;
  constructor() { }

  ngOnInit() {
  }

}
