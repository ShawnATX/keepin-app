import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthenticationService } from './_services/auth.service';
import { AuthGuard } from './_services/auth-guard.service';
import { UserComponent } from './users/user.component';
import { RegisterComponent } from './users/register/register.component';
import { ErrorPageComponent } from './errorpage/errorpage.component';
import { LoginComponent } from './login/login.component';
import { PersonalinfoComponent } from './users/personal info/personalinfo.component';
import { UserService } from './users/user.service';
import { UpdateInfoComponent } from './users/updateinfo/updateinfo.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { Router } from '@angular/router';
import { Routing } from './app-router/app-router.module';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    ErrorPageComponent,
    LoginComponent,
    PersonalinfoComponent,
    UpdateInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    Routing
  ],
  providers: [AuthenticationService, AuthGuard, UserService, JwtInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
