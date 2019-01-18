import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {BaseService} from '../services/baseService.service';
import {FlightsService} from '../services/flights.service';
import {Router} from '@angular/router';
import {AuthorityModel} from '../shared/models/entity/users/authority.model';
import {AuthResponseModel} from '../shared/models/authResponse.model';

// import {UsersModel} from "../shared/models/entity/users/users.model";

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  providers: [{provide: BaseService, useClass: FlightsService}]
})
export class FlightsComponent implements OnInit {
  form: FormGroup;

  settings: ColumnSetting[] =
    [
      // {
      //   primaryKey: 'id',
      //   header: '#'
      // },
      {
        primaryKey: 'flightNumber',
        header: 'Flight number',
        sortAttr: 62
      },
      {
        primaryKey: 'departureAirportId',
        header: 'Departure airport',
        sortAttr: 11
      },
      {
        primaryKey: 'departureDatetime',
        header: 'Departure:',
        sortAttr: 6
      },
      {
        primaryKey: 'arrivalAirportId',
        header: 'Arrival airport',
        sortAttr: 10
      },
      {
        primaryKey: 'arrivalDatetime',
        header: 'Arrival:',
        sortAttr: 7
      },
      {
        primaryKey: 'airplaneId',
        header: 'Airplane',
        sortAttr: 8
      },
      {
        primaryKey: 'baseCost',
        header: 'Cost',
        sortAttr: 9
      },
      {
        primaryKey: 'status',
        header: 'Status',
        sortAttr: 63
      }
    ];


  questions: InputBaseModel<any>[] = [
    new InputBaseModel({
      key: 'flightNumber',
      label: 'Flight Number',
      required: true,
      type: 'text',
      order: 1,
      edit: true
    }),
    new InputBaseModel({
      key: 'departureAirportId',
      label: 'Departure airport',
      required: true,
      type: 'text',
      order: 2,
      edit: true
    }),
    new InputBaseModel({
      key: 'departureDatetime',
      label: 'Departure datetime',
      required: true,
      type: 'text',
      order: 3,
      edit: true
    }),
    new InputBaseModel({
      key: 'arrivalAirportId',
      label: 'Arrival airport',
      required: true,
      type: 'text',
      order: 4,
      edit: true
    }),
    new InputBaseModel({
      key: 'arrivalDatetime',
      label: 'Arrival datetime',
      required: true,
      type: 'text',
      order: 5,
      edit: true
    }),
    new InputBaseModel({
      key: 'airplaneId',
      label: 'Airplane',
      required: true,
      type: 'text',
      order: 6,
      edit: true
    }),
    new InputBaseModel({
      key: 'baseCost',
      label: 'Cost',
      required: true,
      type: 'text',
      order: 7,
      edit: true
    }),
    new InputBaseModel({
      key: 'status',
      label: 'Status',
      required: true,
      type: 'text',
      order: 8,
      edit: true
    })
  ];

  constructor(
    private  router: Router,
    private flightsService: FlightsService
  ) {
  }

  ngOnInit(): void {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.authority === null) {
      this.router.navigateByUrl('login');
    } else if (currentUser.authority !== AuthorityModel.ROLE_CONTROLLER.toString() //){
      && currentUser.authority !== AuthorityModel.ROLE_ADMIN.toString()) {
      this.router.navigateByUrl('home');
    }

    this.flightsService.getTenItems(1);
  }

}
