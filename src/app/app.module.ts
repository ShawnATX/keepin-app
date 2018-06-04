import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router/app-router.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { UserComponent } from './users/user.component';
import { RegisterComponent } from './users/register/register.component';
import { ErrorPageComponent } from './errorpage/errorpage.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
