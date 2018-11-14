import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './auth/signup/signup.component';
import {UsersService} from './shared/services/users.service';
import {AuthenticationService} from './shared/services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    NavbarComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [UsersService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
