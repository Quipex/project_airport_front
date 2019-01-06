import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UsersService } from './shared/services/users.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';
import { AirlinesComponent } from './airlines/airlines.component';
import { AirlinesService } from './shared/services/airlines.service';
import { CountriesComponent } from './countries/countries.component';
import { AbstractCatalogComponent } from './shared/abstract-catalog/abstract-catalog.component';
import { TableLayoutComponent } from './shared/table-layout/table-layout.component';
import { CountriesService } from './shared/services/countries.service';
import { DynamicFormComponent } from './shared/dynamic-form/dynamic-form.component';
import { DynamicFormRenderComponent } from './shared/dynamic-form/dynamic-form-render.component';
import { httpInterceptorProviders } from './http-interceptors';
import { AirplanesComponent } from './airplanes/airplanes.component';
import {FormControlService} from "./shared/services/formControl.service";
import { PassengersComponent } from './users/passengers/passengers.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatInputModule, MatNativeDateModule
} from "@angular/material";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {BsDropdownModule} from "ngx-bootstrap";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {IntlTelInputModule} from "angular-intl-tel-input";


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
    PassengersComponent
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
    BsDropdownModule.forRoot(),
    IntlTelInputModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UsersService, AuthenticationService, AirlinesService, CountriesService, httpInterceptorProviders, FormControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
