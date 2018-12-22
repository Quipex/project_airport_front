import { Component, OnInit } from '@angular/core';
import {BaseService} from "../shared/services/baseService.service";
import {AirlinesService} from "../shared/services/airlines.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.scss'],
  providers: [{provide: BaseService, useClass: AirlinesService}]
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
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'model': [null, [Validators.required]],
      'airlineId': [null, [Validators.required]]
    });
  }

}
