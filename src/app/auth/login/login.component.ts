import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Message} from '../../shared/models/message.model';
import {UsersModel} from '../../shared/models/users.model';

import {AuthenticationService} from '../../shared/services/authentication.service';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {AuthResponceModel} from '../../shared/models/authResponce.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenResponceModel} from '../../shared/models/tokenResponce.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService, NavbarComponent]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private navBar: NavbarComponent,
    private router: Router
  ) { }

  ngOnInit() {
    const user: UsersModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (user !== null && user.email === 'admin@admin.com') {
      this.router.navigate(['/users']);
    } else if (user !== null && user.email !== 'admin@admin.com') {
      this.router.navigate(['/home']);
    }

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    window.setTimeout(() => {
    }, 5000);
  }

  onSubmit() {
    this.message = false;
    const formData = this.form.value;

    this.authenticationService.login(formData.email, formData.password).subscribe(
      (data: TokenResponceModel) => {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(data.token);
        const authResponce: AuthResponceModel = new AuthResponceModel(decodedToken.sub, decodedToken.user_role, data.token);
        localStorage.setItem('currentUser', JSON.stringify(authResponce));
        if (authResponce.authority === 'ROLE_ADMIN') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.message = true;
      });
  }

}
