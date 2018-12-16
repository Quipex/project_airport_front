import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../shared/services/users.service';
import {BaseService} from '../shared/services/baseService.service';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';

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
        primaryKey: 'id',
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
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      'firstname': [null, [Validators.required]],
      'lastname': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required]],
      'phonenumber': [null, [Validators.required]]
    });
  }

}
