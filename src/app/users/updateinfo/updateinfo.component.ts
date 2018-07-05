import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';
import { UserLogin } from '../../_models/user-login.model';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateinfo',
  templateUrl: './updateinfo.component.html',
  styleUrls: ['./updateinfo.component.css']
})
export class UpdateInfoComponent implements OnInit {
  @Input() currentUser: UserLogin;
  userdetails: User;

  constructor( private userservice: UserService ) {  }

  ngOnInit() {
    this.getUser()
    .subscribe(
      data => {
        console.log('Got User' + data);
      },
      error => {
          console.log('Update Error');
      });
  }

  onSubmit(form: HTMLFormElement) {
    this.updateUser(this.currentUser.userid, form.value.firstname);
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

  getUser() {
    return this.userservice.getById(this.currentUser.userid);

  }


}
