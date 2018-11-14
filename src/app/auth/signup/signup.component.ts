import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../shared/models/message.module';
import {Router} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {UsersModel} from '../../shared/models/users.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UsersService]
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'),
        Validators.minLength(8)]),
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

    const newUser: UsersModel = new UsersModel(formData.firstName, formData.lastName,
      formData.email, formData.password, formData.phone, 'user');
    console.log(newUser);
    this.usersService.addUser(newUser)
      .subscribe((user: UsersModel) => {
        console.log(user);

          this.router.navigate(['/']);

      });
    // this.authenticationService.login(formData.login, formData.password)
    //   .subscribe((user: UsersModel) =>  {
    //     console.log(user)
    //     if (user) {
    //       if (user.userPassword === formData.password) {
    //
    //         this.message.text = '';
    //         window.sessionStorage.setItem('currentUser', JSON.stringify(user));
    //         this.router.navigate(['/users']);
    //       } else {
    //         this.showMessage('Такого пользователя не существует');
    //       }
    //     } else {
    //       this.showMessage('Такого пользователя не существует');
    //     }
    //   });
  }

}
