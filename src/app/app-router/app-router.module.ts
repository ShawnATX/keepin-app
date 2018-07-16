import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../users/user.component';
// import { AdminComponent } from '../admin/admin.component';
import { AuthGuard } from '../_services/auth-guard.service';
import { ErrorPageComponent } from '../errorpage/errorpage.component';


const appRoutes: Routes = [
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'admin', component: AdminComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

export const Routing = RouterModule.forRoot(appRoutes);
