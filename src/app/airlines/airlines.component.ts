import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {BaseService} from '../services/baseService.service';
import {AirlinesService} from '../services/airlines.service';
import {Router} from "@angular/router";
import {AuthorityModel} from "../shared/models/entity/users/authority.model";
import {AuthResponseModel} from "../shared/models/authResponse.model";

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
      type: 'tel',
      order: 5,
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
