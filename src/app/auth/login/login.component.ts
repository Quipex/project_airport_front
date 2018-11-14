import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Message} from '../../shared/models/message.module';
import {UsersModel} from '../../shared/models/users.model';

import {AuthenticationService} from '../../shared/services/authentication.service';
import {NavbarComponent} from '../../shared/navbar/navbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, NavbarComponent]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private authenticationService: AuthenticationService,
    private navBar: NavbarComponent,
    private router: Router
  ) { }

  ngOnInit() {
    const user: UsersModel = JSON.parse(window.sessionStorage.getItem('currentUser'));
    console.log(user);
    if (user !== null && user.role === 'admin') {
      this.router.navigate(['/users']);
    } else if (user !== null && user.role !== 'admin') {
      this.router.navigate(['/']);
    }

    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
console.log(formData.email);
    this.authenticationService.login(formData.email, formData.password)
      .subscribe((user: UsersModel) =>  {
        if (user) {
          if (user.password === formData.password) {

            this.message.text = '';
            window.sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.navBar.re
            this.router.navigate(['/users']);
          } else {
            this.showMessage('Такого пользователя не существует');
          }
        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
  }

}
