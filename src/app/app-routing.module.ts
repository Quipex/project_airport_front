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
import {ErrorTestComponent} from './error-test/error-test.component';
import {UserFlightsComponent} from './users/user-flights/user-flights.component';
import {FlightsComponent} from './flights/flights.component';
import {NotFoundComponent} from './not-found-component/not-found-component.component';
import {TicketsComponent} from "./tickets/tickets.component";
import {RoleGuardService} from "./services/roleGuard.service";
import {AuthGuardService} from "./services/authGuard.service";
import {ProfileComponent} from "./profile/profile.component";
import {FlightBookingComponent} from './booking/flight-booking/flight-booking.component';
import {AirplaneInfoComponent} from "./airplanes/airplane-info/airplane-info.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'airlines',
    component: AirlinesComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'airplanes',
    component: AirplanesComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'airplane-info',
    component: AirplaneInfoComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'extra-type',
    component: ExtraTypeComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'countries',
    component: CountriesComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN']
    }
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
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'passengers',
    component: PassengersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_USER', 'ROLE_ADMIN']
    }
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_CASHIER']
    }
  },
  {
    path: 'error-test',
    component: ErrorTestComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'user-flights',
    component: UserFlightsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_USER']
    }
  },
  {
    path: 'flights',
    component: FlightsComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_CONTROLLER']
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'flight-booking',
    component: FlightBookingComponent,
    canActivate: [AuthGuardService]
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
