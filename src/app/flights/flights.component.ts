import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {BaseService} from '../services/baseService.service';
import {FlightsService} from '../services/flights.service';
import {Router} from '@angular/router';
import {FlightStatusModel} from '../shared/models/entity/flight/flightStatus.model';
import {FlightDTOModel} from '../shared/models/flightDTO.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {ResponseFilteringWrapperModel} from '../shared/models/responseFilteringWrapper.model';
import {PassportModel} from '../shared/models/entity/users/passengers/passport.model';
import {PassengerPassportModel} from '../shared/models/entity/users/passengers/passengerPasport.model';
import {PassengersModel} from '../shared/models/entity/users/passengers/passengers.model';
import {FormControlService} from '../services/formControl.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  providers: [FlightsService, DatePipe]
})
export class FlightsComponent implements OnInit {
  form: FormGroup;
  flights: FlightDTOModel[] = [];

  editForm: FormGroup;
  newPassenger: PassengersModel;
  newPassport: PassportModel;
  currentItem: PassengerPassportModel;
  editMode: Boolean = false;
  submitType = 'Save';
  searchString = '';
  deleteId: number;
  // flights: FlightsModel[] = [];


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
        primaryKey: 'actualDepartureDatetime',
        header: 'Departure:',
        sortAttr: 6
      },
      {
        primaryKey: 'arrivalAirportId',
        header: 'Arrival airport',
        sortAttr: 10
      },
      {
        primaryKey: 'actualArrivalDatetime',
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
      key: 'actualDepartureDatetime',
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
      key: 'actualArrivalDatetime',
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
      type: 'select',
      order: 8,
      edit: true,
      value: FlightStatusModel
    })
  ];

  constructor(
    private router: Router,
    private flightsService: FlightsService,
    private fcs: FormControlService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights() {
    this.flightsService.getTenItems(1).subscribe((value: FlightDTOModel[]) => {
      this.flights = value;
    });


    // let values = this.flightsService.getTenItems(1);
    // values.forEach((value: FlightDTOModel) => {
    //   let flight = value.flight;
    //   flight.airplane = value.airplane;
    //   flight.departureAirport = value.departureAirport;
    //   flight.arrivalAirport = value.arrivalAirport;
    //   this.flights.push(flight);
    // });
  }

  onEnter($event: KeyboardEvent) {
    if ($event.key == 'Enter') {
      this.onSearch();
    }
  }

  onSearch() {
    if (this.searchString === '') {
      this.flights = [];
      this.getFlights();
    } else {
      let wrapper = new FilterAndSortWrapperModel(this.searchString);
      this.flightsService.search(1, wrapper)
        .subscribe((data: ResponseFilteringWrapperModel) => {
          this.flights = [];
          data.entities.forEach(element => {
            this.flights.push(element);
          })
        });
    }
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  // fillArray() {
  //   const passengersToDisplay = this.flights.forEach(element => {
  //     element.passengers.forEach(passenger => {
  //       element.passports.forEach(passport => {
  //         passenger.passport = passport;
  //       })
  //     })
  //   });
  // }

}
