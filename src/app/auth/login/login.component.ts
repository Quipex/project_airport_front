import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Message} from '../../shared/models/message.model';
import {UsersModel} from '../../shared/models/users.model';

import {AuthenticationService} from '../../shared/services/authentication.service';
import {NavbarComponent} from '../../shared/navbar/navbar.component';
import {AuthResponceModel} from '../../shared/models/authResponce.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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



    //let data = new AuthResponceModel().fromJSON();

    this.authenticationService.login(formData.email, formData.password).subscribe(
      (data: AuthResponceModel) => {
        localStorage.setItem('currentUser', JSON.stringify({ email: formData.email, token: data.token }));
        if (formData.email === 'admin@admin.com') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/home']);
        }
      },

      error => {
        this.message = true;
      });

      // .subscribe(result => {
      //
      //   if (result === true) {
      //     // login successful
      //     this.router.navigate(['/users']);
      //   } else {
      //     // login failed
      //     console.log('lol');
      //     this.showMessage('Username or password is incorrect');
      //   }
      // }, error => {
      //   this.showMessage(error);
      // });
  }

}
