import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './services/users.service';
import {AuthenticationService} from './services/authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {AirlinesComponent} from './airlines/airlines.component';
import {AirlinesService} from './services/airlines.service';
import {AbstractCatalogComponent} from './shared/abstract-catalog/abstract-catalog.component';
import {TableLayoutComponent} from './shared/table-layout/table-layout.component';
import {CountriesComponent} from './countries/countries.component';
import {CountriesService} from './services/countries.service';
import {DynamicFormComponent} from './shared/dynamic-form/dynamic-form.component';
import {DynamicFormRenderComponent} from './shared/dynamic-form/dynamic-form-render.component';
import {httpInterceptorProviders} from './http-interceptors';
import {AirplanesComponent} from './airplanes/airplanes.component';
import {FormControlService} from './services/formControl.service';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap';
import {IntlTelInputModule} from 'angular-intl-tel-input';
import {PassengersComponent} from './users/passengers/passengers.component';
import {PassengersService} from './services/passengers.service';
import {PassportsService} from './services/passports.service';
import {ExtraTypeComponent} from './extra-type/extra-type.component';
import {ExtraTypeService} from './services/extra-type.service';
import {ErrorTestComponent} from './error-test/error-test.component';
import {ErrorTestService} from './services/error-test.service';
import {FlightsComponent} from './flights/flights.component';
import {UserFlightsComponent} from './users/user-flights/user-flights.component';
import {FlightsService} from './services/flights.service';
import {NotFoundComponent} from './not-found-component/not-found-component.component';
import { TicketsComponent } from './tickets/tickets.component';
import {TicketsService} from "./services/tickets.service";
import {RoleGuardService} from "./services/roleGuard.service";
import {AuthGuardService} from "./services/authGuard.service";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UsersComponent,
    NavbarComponent,
    AirlinesComponent,
    CountriesComponent,
    AbstractCatalogComponent,
    TableLayoutComponent,
    DynamicFormComponent,
    DynamicFormRenderComponent,
    AirplanesComponent,
    PassengersComponent,
    ExtraTypeComponent,
    ErrorTestComponent,
    UserFlightsComponent,
    FlightsComponent,
    NotFoundComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    BsDropdownModule.forRoot(),
    IntlTelInputModule,
    MatSelectModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [UsersService,
    AirlinesService,
    CountriesService,
    httpInterceptorProviders,
    FormControlService,
    AuthenticationService,
    PassengersService,
    ExtraTypeService,
    PassportsService,
    ErrorTestService,
    FlightsService,
    TicketsService,
    RoleGuardService,
    AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
