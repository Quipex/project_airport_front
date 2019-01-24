import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {BaseService} from '../services/baseService.service';
import {ExtraTypeService} from '../services/extra-type.service';

@Component({
  selector: 'app-extra-type',
  templateUrl: './extra-type.component.html',
  styleUrls: ['./extra-type.component.scss'],
  providers: [{provide: BaseService, useClass: ExtraTypeService}]
})
export class ExtraTypeComponent implements OnInit {

  form: FormGroup;

  settings: ColumnSetting[] =
    [
      {
        primaryKey: 'id',
        header: '#'
      },
      {
        primaryKey: 'name',
        header: 'Name'
      },
      {
        primaryKey: 'description',
        header: 'Description'
      },
      {
        primaryKey: 'baseCost',
        header: 'Base cost'
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
      key: 'baseCost',
      label: 'Base cost',
      required: true,
      type: 'cost',
      order: 3,
      edit: true
    })
  ];

  constructor(
  ) { }

  ngOnInit() {
  }

}
