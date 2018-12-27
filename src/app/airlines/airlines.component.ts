import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {BaseService} from '../shared/services/baseService.service';
import {AirlinesService} from '../shared/services/airlines.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.scss'],
  providers: [{provide: BaseService, useClass: AirlinesService}]
})
export class AirlinesComponent implements OnInit {

  form: FormGroup;

  settings: ColumnSetting[] =
    [
      {
        primaryKey: 'objectId',
        header: '#'
      },
      {
        primaryKey: 'name',
        header: 'Name',
        sortAttr: 12
      },
      {
        primaryKey: 'descr',
        header: 'Description',
        sortAttr: 13
      },
      {
        primaryKey: 'email',
        header: 'Email',
        sortAttr: 14
      },
      {
        primaryKey: 'phoneNumber',
        header: 'Phone number',
        sortAttr: 15
      }
    ];

  questions: InputBaseModel<any>[] = [


    new InputBaseModel({
      key: 'name',
      label: 'Name',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    }),

    new InputBaseModel({
      key: 'descr',
      label: 'Description',
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
      key: 'phoneNumber',
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
      'name': [null, [Validators.required]],
      'descr': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'phonenumber': [null, [Validators.required]]
    });
  }

}
