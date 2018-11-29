import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../shared/models/message.model';
import {Router} from '@angular/router';
import {UsersService} from '../../shared/services/users.service';
import {UsersModel} from '../../shared/models/users.model';
import {AuthorityModel} from '../../shared/models/authority.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
    const user: UsersModel = JSON.parse(window.localStorage.getItem('currentUser'));
    console.log(user);
    if (user !== null && user.email === 'admin@admin.com') {
      this.router.navigate(['/users']);
    } else if (user !== null && user.email !== 'admin@admin.com') {
      this.router.navigate(['/home']);
    }
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'phonenumber': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'),
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
    console.log('submit')
    const formData = this.form.value;

    const authority: AuthorityModel = new AuthorityModel('ROLE_USER', 2);
    const newUser: UsersModel = new UsersModel(formData.firstname, formData.lastname,
      formData.email, formData.password, formData.phonenumber, authority, 'true');
    console.log(newUser);
    this.usersService.registrateNewUser(newUser)
      .subscribe((user: UsersModel) => {
        console.log(user);

        this.router.navigate(['/login']);

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
