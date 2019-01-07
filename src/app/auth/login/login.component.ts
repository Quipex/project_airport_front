import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../shared/services/authentication.service';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {AuthResponseModel} from '../../shared/models/authResponse.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenResponceModel} from '../../shared/models/tokenResponce.model';
import {AuthorityModel} from "../../shared/models/entity/users/authority.model";


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
  ) {
  }

  ngOnInit() {
    const authModel: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (authModel !== null && authModel.authority === AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigate(['/users']);
    } else if (authModel !== null && authModel.authority !== AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigate(['/home']);
    }

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.message = false;
    const formData = this.form.value;

    this.authenticationService.login(formData.email, formData.password).subscribe(
      (data: TokenResponceModel) => {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(data.token);
        const authResponse: AuthResponseModel = new AuthResponseModel(decodedToken.sub, decodedToken.user_role, data.token);
        localStorage.setItem('currentUser', JSON.stringify(authResponse));
        if (authResponse.authority === AuthorityModel.ROLE_ADMIN.toString()) {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.message = true;
      });
  }

  private showMessage(text: string, type: string = 'danger') {
    window.setTimeout(() => {
    }, 5000);
  }

}
