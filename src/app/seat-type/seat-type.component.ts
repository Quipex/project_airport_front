import { Component, OnInit } from '@angular/core';
import {BaseService} from "../services/baseService.service";
import {UsersService} from "../services/users.service";
import {SeatTypeService} from "../services/seatType.service";
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {AuthorityModel} from "../shared/models/entity/users/authority.model";

@Component({
  selector: 'app-seat-type',
  templateUrl: './seat-type.component.html',
  styleUrls: ['./seat-type.component.scss'],
  providers: [{provide: BaseService, useClass: SeatTypeService}]
})
export class SeatTypeComponent implements OnInit {

  settings: ColumnSetting[] =
    [
      {
        primaryKey: 'objectId',
        header: '#'
      },
      {
        primaryKey: 'name',
        header: 'Name',
        sortAttr: 27
      },
      {
        primaryKey: 'description',
        header: 'Description',
        sortAttr: 28
      },
      {
        primaryKey: 'modifier',
        header: 'Modifier',
        sortAttr: 29
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
      key: 'description',
      label: 'Description',
      required: true,
      type: 'text',
      order: 2,
      edit: true
    }),

    new InputBaseModel({
      key: 'modifier',
      label: 'Modifier',
      required: true,
      type: 'number',
      order: 3,
      edit: true
    })
  ];

  constructor() { }

  ngOnInit() {
  }

}
