import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {BaseService} from '../services/baseService.service';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {Router} from "@angular/router";
import {AuthorityModel} from "../shared/models/entity/users/authority.model";
import {AuthResponseModel} from "../shared/models/authResponse.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss'
  ],
  providers: [{provide: BaseService, useClass: UsersService}]
})
export class UsersComponent implements OnInit {

  form: FormGroup;

  settings: ColumnSetting[] =
    [
      {
        primaryKey: 'objectId',
        header: '#'
      },
      {
        primaryKey: 'login',
        header: 'Login'
      },
      {
        primaryKey: 'email',
        header: 'Email'
      },
      {
        primaryKey: 'phone',
        header: 'Phone number'
      },
      {
        primaryKey: 'nickname',
        header: 'Nickname'
      },
      {
        primaryKey: 'authority',
        header: 'User role'
      }
    ];

  questions: InputBaseModel<any>[] = [


    new InputBaseModel({
      key: 'login',
      label: 'Login',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    }),

    new InputBaseModel({
      key: 'password',
      label: 'Password',
      required: true,
      type: 'password',
      order: 2,
      edit: false
    }),

    new InputBaseModel({
      key: 'email',
      label: 'Email',
      required: true,
      type: 'email',
      order: 3,
      edit: true
    }),

    new InputBaseModel({
      key: 'phone',
      label: 'Phone number',
      required: true,
      type: 'tel',
      order: 4,
      edit: true
    }),

    new InputBaseModel({
      key: 'nickname',
      label: 'Nickname',
      required: true,
      type: 'text',
      order: 5,
      edit: false
    }),

    new InputBaseModel({
      key: 'authority',
      label: 'User role',
      required: true,
      type: 'text',
      order: 6,
      edit: true
    })
  ];

  constructor(
    private  router: Router
  ) {
  }

  ngOnInit(): void {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.authority === null) {
      this.router.navigateByUrl('login');
    } else if (currentUser.authority !== AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigateByUrl('home');
    }
  }

}
