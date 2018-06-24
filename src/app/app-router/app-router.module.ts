import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../users/user.component';
import { AuthGuard } from '../_services/auth-guard.service';
import { ErrorPageComponent } from '../errorpage/errorpage.component';


const appRoutes: Routes = [
  { path: 'userhome', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
