import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
