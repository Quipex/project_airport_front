import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {BaseService} from '../services/baseService.service';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {AuthorityModel} from "../shared/models/entity/users/authority.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ],
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
        header: 'Login',
        sortAttr: 44
      },
      {
        primaryKey: 'email',
        header: 'Email',
        sortAttr: 46
      },
      {
        primaryKey: 'phoneNumber',
        header: 'Phone number',
        sortAttr: 47
      },
      {
        primaryKey: 'nickname',
        header: 'Nickname',
        sortAttr: 48
      },
      {
        primaryKey: 'authority',
        header: 'User role',
        sortAttr: 49
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
      key: 'phoneNumber',
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
      edit: true
    }),

    new InputBaseModel({
      key: 'authority',
      label: 'User role',
      required: true,
      type: 'select',
      order: 6,
      edit: true,
      value: AuthorityModel
    })
  ];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
