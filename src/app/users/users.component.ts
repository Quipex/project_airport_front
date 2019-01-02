import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../shared/services/users.service';
import {BaseService} from '../shared/services/baseService.service';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {UsersModel} from "../shared/models/users.model";
import {Router} from "@angular/router";

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
        primaryKey: 'firstname',
        header: 'First name'
      },
      {
        primaryKey: 'lastname',
        header: 'Last name'
      },
      {
        primaryKey: 'email',
        header: 'Email'
      },
      {
        primaryKey: 'phonenumber',
        header: 'Phone number'
      }
    ];

  questions: InputBaseModel<any>[] = [


    new InputBaseModel({
      key: 'firstname',
      label: 'First name',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    }),

    new InputBaseModel({
      key: 'lastname',
      label: 'Last name',
      required: true,
      type: 'text',
      order: 2,
      edit: true
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
      key: 'password',
      label: 'Password',
      required: true,
      type: 'password',
      order: 4,
      edit: false
    }),

    new InputBaseModel({
      key: 'phonenumber',
      label: 'Phone number',
      required: true,
      type: 'text',
      order: 5,
      edit: true
    })
  ];

  constructor(
    private  router: Router
  ) {}

  ngOnInit(): void {
    const currentUser: UsersModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.authority === null) {
      this.router.navigateByUrl('login');
    } else if (currentUser.authority !== 'ROLE_ADMIN') {
      this.router.navigateByUrl('home');
    }
  }

}
