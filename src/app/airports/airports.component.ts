import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ColumnSetting} from "../shared/models/columnSetting.model";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {BaseService} from "../services/baseService.service";
import {AirportsService} from "../services/airports.service";
import {CountriesService} from "../services/countries.service";
import {CountriesModel} from "../shared/models/entity/flight/countries.model";

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.scss'],
  providers: [{provide: BaseService, useClass: AirportsService}]
})
export class AirportsComponent implements OnInit {

  form: FormGroup;
  countries = [];
  settings: ColumnSetting[] =
    [
      // {
      //   primaryKey: 'objectId',
      //   header: '#'
      // },
      {
        primaryKey: 'name',
        header: 'Name',
        sortAttr: 2
      },
      {
        primaryKey: 'country.name',
        header: 'Country',
        sortAttr: 3
      },
      {
        primaryKey: 'address',
        header: 'Address',
        sortAttr: 4
      },
      {
        primaryKey: 'city',
        header: 'City',
        sortAttr: 5
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
      key: 'country',
      label: 'Country',
      required: true,
      type: 'country-selector',
      order: 2,
      edit: true,
      value: this.countries
    }),

    new InputBaseModel({
      key: 'address',
      label: 'Address',
      required: true,
      type: 'text',
      order: 3,
      edit: true
    }),

    new InputBaseModel({
      key: 'city',
      label: 'City',
      required: true,
      type: 'text',
      order: 5,
      edit: true
    })
  ];

  constructor(
    private countriesService: CountriesService
  ) {
  }

  ngOnInit(): void {
    this.countriesService.getAll()
      .subscribe((data: CountriesModel[]) => {
        data.forEach((item: CountriesModel) => {
          this.countries.push(item);
        })
      });
  }

}
