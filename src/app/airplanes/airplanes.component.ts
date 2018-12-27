import { Component, OnInit } from '@angular/core';
import {BaseService} from "../shared/services/baseService.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {AirplanesService} from "../shared/services/airplanes.service";

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.scss'],
  providers: [{provide: BaseService, useClass: AirplanesService}]
})
export class AirplanesComponent implements OnInit {

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
        primaryKey: 'airline_id',
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
      key: 'airline_id',
      label: 'Airline',
      required: true,
      type: 'text',
      order: 2,
      edit: true
    })
  ];

  constructor(
    public fb: FormBuilder
  ) { }

  ngOnInit() {
  }

}
