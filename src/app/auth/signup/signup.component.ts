import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../shared/models/message.model';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {UsersModel} from '../../shared/models/entity/users/users.model';
import {AuthorityModel} from "../../shared/models/entity/users/authority.model";
import {AuthResponseModel} from "../../shared/models/authResponse.model";

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
  ) {
  }

  ngOnInit() {
    const user: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    console.log(user);
    if (user !== null && user.authority === AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigate(['/users']);
    } else if (user !== null && user.authority !== AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigate(['/home']);
    }
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'),
        Validators.minLength(8)]),
      'nickname': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    // console.log('submit');
    const formData = this.form.value;

    const newUser: UsersModel = new UsersModel(formData.login, formData.password,
      formData.email, formData.phoneNumber, formData.nickname, AuthorityModel.ROLE_USER);
    console.log(newUser);
    this.usersService.registerNewUser(newUser)
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

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

}
