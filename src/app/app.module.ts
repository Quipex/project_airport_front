import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {UsersService} from './shared/services/users.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { AirlinesComponent } from './airlines/airlines.component';
import {AirlinesService} from './shared/services/airlines.service';
import {CountriesComponent} from './countries/countries.component';
import {AbstractCatalogComponent} from './shared/abstract-catalog/abstract-catalog.component';
import {TableLayoutComponent} from './shared/table-layout/table-layout.component';
import {CountriesService} from './shared/services/countries.service';
import {DynamicFormComponent} from './shared/dynamic-form/dynamic-form.component';
import {DynamicFormRenderComponent} from './shared/dynamic-form/dynamic-form-render.component';


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
    DynamicFormRenderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [UsersService, AuthenticationService, AirlinesService, CountriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
