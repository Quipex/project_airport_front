import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Message} from '../../shared/models/message.model';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {UsersModel} from '../../shared/models/entity/users/users.model';
import {AuthorityModel} from "../../shared/models/entity/users/authority.model";
import {AuthResponseModel} from "../../shared/models/authResponse.model";
import {InputBaseModel} from "../../shared/models/inputBase.model";
import {FormControlService} from "../../services/formControl.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [UsersService]
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  message: Message;
  questions: InputBaseModel<any>[] = [


    new InputBaseModel({
      key: 'login',
      label: 'Login',
      required: true,
      type: 'text',
      order: 1
    }),

    new InputBaseModel({
      key: 'nickname',
      label: 'Nickname',
      required: true,
      type: 'text',
      order: 2
    }),

    new InputBaseModel({
      key: 'password',
      label: 'Password',
      required: true,
      type: 'password',
      order: 3
    }),

    new InputBaseModel({
      key: 'email',
      label: 'Email',
      required: true,
      type: 'email',
      order: 4
    }),

    new InputBaseModel({
      key: 'phoneNumber',
      label: 'Phone number',
      required: true,
      type: 'tel',
      order: 5
    })
  ];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private fcs: FormControlService
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
    this.form = this.fcs.toFormGroup(this.questions);
  }

  onSubmit() {
    const formData = this.form.value;
    const newUser: UsersModel = new UsersModel(formData.login, formData.password,
      formData.email, formData.phoneNumber.internationalNumber, formData.nickname, AuthorityModel.ROLE_USER);
    console.log(newUser);
    this.usersService.registerNewUser(newUser)
      .subscribe((user: UsersModel) => {
        this.router.navigate(['/login']);

      });
  }

}
