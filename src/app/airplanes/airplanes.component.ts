import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseService} from '../services/baseService.service';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {AirplanesService} from '../services/airplanes.service';
import {AirlinesModel} from '../shared/models/entity/airline/airlines.model';
import {AirlinesService} from '../services/airlines.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.scss'],
  providers: [{provide: BaseService, useClass: AirplanesService}]
})
export class AirplanesComponent implements OnInit, OnDestroy {

  private airlinesServiceSub: Subscription;

  airlines: AirlinesModel[] = [];

  form: FormGroup;
  airline: AirlinesModel[] = [];

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
        primaryKey: 'airline.name',
        header: 'Airline',
        sortAttr: 17
      }
    ];

  questions = [
    new InputBaseModel({
      key: 'model',
      label: 'Model',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    }),

    new InputBaseModel({
      value: this.airlines,
      key: 'airline',
      label: 'Airline',
      required: true,
      type: 'airline-selector',
      order: 2,
      edit: true
    })
  ];

  constructor(
    private airlineService: AirlinesService
  ) {
  }

  ngOnInit(): void {
    this.airlinesServiceSub = this.airlineService.getAll().subscribe((next: AirlinesModel[]) => {
      next.forEach(item => {
        this.airlines.push(item);
      });
    });
  }

  ngOnDestroy(): void {
    this.airlinesServiceSub.unsubscribe();
  }

}
