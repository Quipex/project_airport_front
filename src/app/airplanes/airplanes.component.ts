import {Component, OnInit} from '@angular/core';
import {BaseService} from '../services/baseService.service';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {AirplanesService} from '../services/airplanes.service';

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
      // {
      //   primaryKey: 'objectId',
      //   header: '#'
      // },
      {
        primaryKey: 'model',
        header: 'Model',
        sortAttr: 16
      },
      {
        primaryKey: 'airlineId',
        header: 'Airline',
        sortAttr: 17
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
      key: 'airline',
      label: 'Airline',
      required: true,
      type: 'airline-selector',
      order: 2,
      edit: true
    })
  ];

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
