import {Component, OnInit} from '@angular/core';
import {BaseService} from '../services/baseService.service';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {AirplanesService} from '../services/airplanes.service';
import {AirlinesModel} from '../shared/models/entity/airline/airlines.model';
import {AirlinesService} from '../services/airlines.service';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.scss'],
  providers: [{provide: BaseService, useClass: AirplanesService}]
})
export class AirplanesComponent implements OnInit {

  airlines: AirlinesModel[] = [];

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

  questions;

  constructor(
    private airlineService: AirlinesService
  ) {
  }

  ngOnInit(): void {
    this.airlineService.getAll().subscribe((next: AirlinesModel[]) => {
      this.questions = [
        new InputBaseModel({
          key: 'model',
          label: 'Model',
          required: true,
          type: 'text',
          order: 1,
          edit: true
        }),

        new InputBaseModel({
          value: next,
          key: 'airline',
          label: 'Airline',
          required: true,
          type: 'airline-selector',
          order: 2,
          edit: true
        })
      ];
    });
  }

}
