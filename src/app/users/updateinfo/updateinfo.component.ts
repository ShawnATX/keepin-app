import { Component, Input, OnInit } from '@angular/core';
import { UserLogin } from '../../_models/user-login.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.css']
})
export class UpdateInfoComponent implements OnInit {
  @Input() currentUser = UserLogin;

  constructor( private userservice: UserService ) {  }

  ngOnInit() { }

  updateUser() {
    this.userservice.update(this.currentUser)
    .subscribe(
      data => {
          console.log('Update finished');
      },
      error => {
          console.log('Update Error');
      });
  }

}
