import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';
import { UserLogin } from '../../_models/user-login.model';
import { UserService } from '../user.service';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.css']
})
export class UpdateInfoComponent implements OnInit {
  @Input() currentUser: UserLogin;
  public user = [];

  constructor( private userservice: UserService ) { 
   }

  ngOnInit() {
    this.userservice.getById(this.currentUser.token)
    .subscribe(
      data => {
        console.log(data);
        // this.user = data;
      },
      error => {
        console.log('error getting user data');
      });
   }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.updateUser(this.currentUser.token, form.value);
  }

  updateUser(userid, userParams) {
    console.log('update user component');
    this.userservice.update(userid, userParams)
    .subscribe(
      data => {
          console.log('Update finished');
      },
      error => {
          console.log('Update Error');
      });
  }

  getUser(userid) {
    return this.userservice.getById(userid);

  }


}
