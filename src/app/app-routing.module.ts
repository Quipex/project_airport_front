import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AirlinesComponent} from './airlines/airlines.component';
import {CountriesComponent} from './countries/countries.component';
import {AirplanesComponent} from './airplanes/airplanes.component';
import {ExtraTypeComponent} from './extra-type/extra-type.component';
import {PassengersComponent} from './users/passengers/passengers.component';
import {ErrorTestComponent} from "./error-test/error-test.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'airlines',
    component: AirlinesComponent
  },
  {
    path: 'airplanes',
    component: AirplanesComponent
  },
  {
    path: 'extra-type',
    component: ExtraTypeComponent
  },
  {
    path: 'countries',
    component: CountriesComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'passengers',
    component: PassengersComponent
  },
  {
    path: 'error-test',
    component: ErrorTestComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
