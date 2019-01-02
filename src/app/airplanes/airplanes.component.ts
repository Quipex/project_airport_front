import { Component, OnInit } from '@angular/core';
import {BaseService} from "../shared/services/baseService.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {AirplanesService} from "../shared/services/airplanes.service";
import {Router} from "@angular/router";
import {UsersModel} from "../shared/models/users.model";

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.scss'],
  providers: [{provide: BaseService, useClass: AirplanesService}]
})
export class AirplanesComponent {

  form: FormGroup;

  settings: ColumnSetting[] =
    [
      {
        primaryKey: 'objectId',
        header: '#'
      },
      {
        primaryKey: 'model',
        header: 'Model'
      },
      {
        primaryKey: 'airlineId',
        header: 'Airline'
      }
    ];

  questions: InputBaseModel<any>[] = [

    new InputBaseModel({
      key: 'model',
      label: 'Model',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    }),

    new InputBaseModel({
      key: 'airlineId',
      label: 'Airline',
      required: true,
      type: 'text',
      order: 2,
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
