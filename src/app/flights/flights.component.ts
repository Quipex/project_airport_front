import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {FlightsService} from '../services/flights.service';
import {Router} from '@angular/router';
import {FlightStatusModel} from '../shared/models/entity/flight/flightStatus.model';
import {FlightDTOModel} from '../shared/models/flightDTO.model';
import {FilterAndSortWrapperModel} from '../shared/models/filterAndSortWrapper.model';
import {ResponseFilteringWrapperModel} from '../shared/models/responseFilteringWrapper.model';
import {FormControlService} from '../services/formControl.service';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {BaseEntityModel} from '../shared/models/baseEntity.model';
import {SortEntityModel} from '../shared/models/sortEntity.model';
import {ModalDirective} from 'angular-bootstrap-md';
import {ResponseErrorModel} from '../shared/models/responseError.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponseModel} from '../shared/models/authResponse.model';
import {AuthorityModel} from '../shared/models/entity/users/authority.model';
import {AirportsService} from '../services/airports.service';
import {AirplanesModel} from '../shared/models/entity/airplane/airplanes.model';
import {AirplanesService} from '../services/airplanes.service';
import {AirportModel} from '../shared/models/entity/flight/airport.model';
import {AirlinesModel} from '../shared/models/entity/airline/airlines.model';
import {AirlinesService} from '../services/airlines.service';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  providers: [FlightsService, DatePipe, AirportsService, AirplanesService]
})
export class FlightsComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;
  authModel: AuthResponseModel;
  role = AuthorityModel;
  currentRole = '';
  @ViewChild('formAdd') formAdd: ElementRef;
  @ViewChild('removeConfirmModal') removeConfirmModal: ModalDirective;

  flights: FlightDTOModel[] = [];
  currentItem: any;
  editMode: Boolean = false;
  expanded = false;
  submitType = 'Save';
  searchString = '';
  filteringMode = false;
  sortList: SortEntityModel[] = [];
  deleteId: number;
  responseError: ResponseErrorModel;
  currentDay = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  minDate = new Date(this.currentYear, this.currentMonth, this.currentDay);

  paging = false;
  numberOfPage = 1;
  countOfPages = 0;
  editEnum = [];

  private height: number;
  private overflow: string;
  private airports: AirportModel[] = [];
  private airplanes: AirplanesModel[] = [];
  private airlines: AirlinesModel[] = [];

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
      type: 'airport-selector',
      order: 2,
      edit: true,
      value: this.airports
    }),
    new InputBaseModel({
      key: 'expectedDepartureDate',
      label: 'Expected departure date',
      required: true,
      type: 'date',
      order: 3,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'expectedDepartureTime',
      label: 'Expected departure time',
      required: true,
      type: 'time',
      order: 4,
      edit: true
    }),
    new InputBaseModel({
      key: 'arrivalAirportId',
      label: 'Arrival airport',
      required: true,
      type: 'airport-selector',
      order: 5,
      edit: true,
      value: this.airports
    }),
    new InputBaseModel({
      key: 'expectedArrivalDate',
      label: 'Expected arrival date',
      required: true,
      type: 'date',
      order: 6,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'expectedArrivalTime',
      label: 'Expected arrival time',
      required: true,
      type: 'time',
      order: 7,
      edit: true
    }),
    new InputBaseModel({
      key: 'airlineId',
      label: 'Airline',
      required: true,
      type: 'airline-selector',
      order: 8,
      edit: true,
      value: this.airlines
    }),
    new InputBaseModel({
      key: 'airplaneId',
      label: 'Airplane',
      required: true,
      type: 'airplane-selector',
      order: 9,
      edit: true,
      value: this.airplanes
    }),
    new InputBaseModel({
      key: 'baseCost',
      label: 'Cost',
      required: true,
      type: 'number',
      order: 10,
      edit: true
    })
  ];

  editQuestions: InputBaseModel<any>[] = [
    new InputBaseModel({
      key: 'flightNumber',
      label: 'Flight Number',
      required: true,
      type: 'text',
      order: 1,
      edit: true,
      // disable: true
    }),
    new InputBaseModel({
      key: 'departureAirportId',
      label: 'Departure airport',
      required: true,
      type: 'airport-selector',
      order: 2,
      edit: true,
      value: this.airports
      // , disable: true
    }),
    new InputBaseModel({
      key: 'expectedDepartureDate',
      label: 'Expected departure date',
      required: true,
      type: 'date',
      order: 3,
      edit: true,
      minDate: this.minDate
      // , disable: true
    }),
    new InputBaseModel({
      key: 'expectedDepartureTime',
      label: 'Expected departure time',
      required: true,
      type: 'time',
      order: 4,
      edit: true
      // , disable: true
    }),
    new InputBaseModel({
      key: 'expectedArrivalDate',
      label: 'Expected arrival date',
      required: true,
      type: 'date',
      order: 5,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'expectedArrivalTime',
      label: 'Expected arrival time',
      required: true,
      type: 'time',
      order: 6,
      edit: true
    }),
    new InputBaseModel({
      key: 'actualDepartureDate',
      label: 'Actual departure date',
      required: true,
      type: 'date',
      order: 7,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'actualDepartureTime',
      label: 'Actual departure time',
      required: true,
      type: 'time',
      order: 8,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'actualArrivalDate',
      label: 'Actual arrival date',
      required: true,
      type: 'date',
      order: 10,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'actualArrivalTime',
      label: 'Actual arrival time',
      required: true,
      type: 'time',
      order: 11,
      edit: true
    }),
    new InputBaseModel({
      key: 'arrivalAirportId',
      label: 'Arrival airport',
      required: true,
      type: 'airport-selector',
      order: 9,
      edit: true,
      value: this.airports
      // , disable: true;
    }),
    new InputBaseModel({
      key: 'baseCost',
      label: 'Cost',
      required: true,
      type: 'number',
      order: 12,
      edit: true
    }),
    new InputBaseModel({
      key: 'status',
      label: 'Status',
      required: true,
      type: 'status-selector',  //  select
      order: 13,
      edit: true,
      value: this.editEnum  //FlightStatusModel  //this.editEnum
    })
  ];

  constructor(
    private router: Router,
    private flightsService: FlightsService,
    private airportsService: AirportsService,
    private airplanesService: AirplanesService,
    private airlinesService: AirlinesService,
    private fcs: FormControlService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    for (let x in FlightStatusModel) {
      this.editEnum.push(x);
      // console.log(this.editEnum);
      // console.log(x);
    }

    // this.editQuestions[7].value = this.editEnum;
    // this.editEnum.push(FlightStatusModel.SCHEDULED);

    this.authModel = JSON.parse(window.localStorage.getItem('currentUser'));
    const token = this.authModel.token;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.currentRole = decodedToken.user_role;

    this.form = this.fcs.toFormGroup(this.questions);
    this.editForm = this.fcs.toFormGroup(this.editQuestions);
    this.getFlights();

    this.airportsService.getAll()
      .subscribe((data: AirportModel[]) => {
        data.forEach(item => {
          this.airports.push(item);
        });
      });

    this.airlinesService.getAll()
      .subscribe((data: AirlinesModel[]) => {
        data.forEach(item => {
          this.airlines.push(item);
        });
      });
  }

  getAirplanesByAirlineId(airline: AirlinesModel) {
    this.airplanes = [];
    console.log(airline);
    this.airplanesService.getAll()
      .subscribe((data: AirplanesModel[]) => {
        data.forEach(item => {
          if (item.airlineId == airline.objectId) {
            this.airplanes.push(item);
          }
        });
        this.form.controls['airplaneId'].setValue(this.airplanes[0]);
      });

    this.form.controls['airplaneId'].reset();
    this.questions[8].value = this.airplanes;
    // console.log(this.airplanes.length);
    // if (this.airplanes.length <= 0) {
    //   this.form.controls['airplaneId'].disable();
    // }
  }

  getFlights() {
    this.getCountOfItems();
  }

  private getCountOfItems() {
    setTimeout(() => {
      this.flightsService.getCountOfItems()
        .subscribe((data: number) => {
          this.countOfPages = Math.ceil(data / 10);
          console.log('Data:' + data + ', Pages count:' + this.countOfPages);
          if (data > 10)
            this.paging = true;
          else
            this.paging = false;
        });
      this.getTenItems(this.numberOfPage);
    }, 150);
  }

  private getTenItems(numberOfPage: number) {
    this.numberOfPage = numberOfPage;
    console.log('Current page:' + this.numberOfPage);
    this.flightsService.getTenItems(numberOfPage).subscribe((value: FlightDTOModel[]) => {
      this.flights = value;
      console.log(value);
    });
  }

  private getTenItemsByFilter(numberOfPage: number) {
    let wrapper = new FilterAndSortWrapperModel(this.searchString, this.sortList);
    this.numberOfPage = numberOfPage;
    this.flightsService.search(numberOfPage, wrapper)
      .subscribe((data: ResponseFilteringWrapperModel) => {
        this.flights = data.entities;
      });
  }

  onSave(returnedItem: any) {
    if (this.submitType === 'Save') {
      this.flightsService.addItem(returnedItem)
        .subscribe(() => {
            // this.formAdd.hide();
            const message = 'New flight has been added.';
            this.showInfo(message);
            this.expanded = false;
          },
          err => {
            this.responseError = err;
            this.showError(this.responseError.error.message);
          });
    } else {
      this.flightsService.editItem(returnedItem.objectId, returnedItem)
        .subscribe((editedItem: BaseEntityModel) => {
          //this.flights[this.selectedRow] = editedItem;
          this.flights = JSON.parse(JSON.stringify(this.flights));
          // this.formAdd.hide();
          const message = 'The flight has been edited.';
          this.showInfo(message);
          this.expanded = false;
        }, err => {
          this.responseError = err;
          this.showError(this.responseError.message);
        });
    }
    this.getCountOfItems();
  }

  onNew() {
    if (this.questions.length > 5) {
      this.height = 79;
      this.overflow = 'scroll';
    }
    this.form.reset();
    this.submitType = 'Save';
    this.editMode = false;
  }

  onEdit(index: number) {
    if (!this.expanded) {
      this.expanded = true;
    }
    this.currentItem = this.flights[index];
    this.editMode = true;
    this.setSelectFromCurrentStatus(this.currentItem);
    this.setInputsFromCurrentStatus(this.currentItem.flight.status);

    // console.log(this.currentItem.flight.expectedArrivalDatetime);
    let expectedArrival: Date;
    let expectedArrivalDate;
    let expectedArrivalTime;
    if (this.currentItem.flight.expectedArrivalDatetime != null) {
      expectedArrival = new Date(this.currentItem.flight.expectedArrivalDatetime);
      expectedArrivalDate = this.datePipe.transform(expectedArrival, 'MM/dd/yyyy');
      expectedArrivalTime = this.datePipe.transform(expectedArrival, 'HH:mm');
    } else {
      expectedArrivalDate = null;
      expectedArrivalTime = null;
    }

    let expectedDeparture: Date;
    let expectedDepartureDate;
    let expectedDepartureTime;
    if (this.currentItem.flight.expectedDepartureDatetime != null) {
      expectedDeparture = new Date(this.currentItem.flight.expectedDepartureDatetime);
      expectedDepartureDate = this.datePipe.transform(expectedDeparture, 'MM/dd/yyyy');
      expectedDepartureTime = this.datePipe.transform(expectedDeparture, 'HH:mm');
    } else {
      expectedDepartureDate = null;
      expectedDepartureTime = null;
    }

    let actualArrival: Date;
    let actualArrivalDate;
    let actualArrivalTime;
    if (this.currentItem.flight.actualArrivalDatetime != null) {
      actualArrival = new Date(this.currentItem.flight.actualArrivalDatetime);
      actualArrivalDate = this.datePipe.transform(actualArrival, 'MM/dd/yyyy');
      actualArrivalTime = this.datePipe.transform(actualArrival, 'HH:mm');
    } else {
      actualArrivalDate = null;
      actualArrivalTime = null;
    }

    let actualDeparture: Date;
    let actualDepartureDate;
    let actualDepartureTime;
    if (this.currentItem.flight.actualDepartureDatetime != null) {
      actualDeparture = new Date(this.currentItem.flight.actualDepartureDatetime);
      actualDepartureDate = this.datePipe.transform(actualDeparture, 'MM/dd/yyyy');
      actualDepartureTime = this.datePipe.transform(actualDeparture, 'HH:mm');
    } else {
      actualDepartureDate = null;
      actualDepartureTime = null;
    }


    this.editForm.controls['expectedArrivalDate'].setValue(expectedArrivalDate != null ? new Date(expectedArrivalDate) : null);
    this.editForm.controls['expectedArrivalTime'].setValue(expectedArrivalTime);
    this.editForm.controls['expectedDepartureDate'].setValue(expectedDepartureDate != null ? new Date(expectedDepartureDate) : null);
    this.editForm.controls['expectedDepartureTime'].setValue(expectedDepartureTime);

    this.editForm.controls['actualArrivalDate'].setValue(actualArrivalDate != null ? new Date(actualArrivalDate) : null);
    this.editForm.controls['actualArrivalTime'].setValue(actualArrivalTime);
    this.editForm.controls['actualDepartureDate'].setValue(actualDepartureDate != null ? new Date(actualDepartureDate) : null);
    this.editForm.controls['actualDepartureTime'].setValue(actualDepartureTime);

    this.editForm.controls['flightNumber'].setValue(this.currentItem.flight.flightNumber);
    this.editForm.controls['departureAirportId'].setValue(this.currentItem.departureAirport.objectId);
    this.editForm.controls['arrivalAirportId'].setValue(this.currentItem.arrivalAirport.objectId);
    this.editForm.controls['baseCost'].setValue(this.currentItem.flight.baseCost);
    this.editForm.controls['status'].setValue(this.currentItem.flight.status);
    // this.editForm.controls['arrivalAirportId'].setValue(this.currentItem.arrivalAirport.objectId);
    // this.editForm.controls['status'].setValue(this.currentItem.flight.status);

    this.submitType = 'Update';

    // this.editForm.patchValue(this.currentItem.flight);
    // this.formAdd.show();
    // if (this.editEnum.length !== 0) {
    //   this.editEnum = [];
    // } else {
    //   let options = Object.keys(FlightStatusModel);
    //   for (let i = 0; i < options.length; i++) {
    //     if (options[i] === this.currentItem.flight.status) {
    //       this.editEnum.push(options[i-1]);
    //       this.editEnum.push(options[i]);
    //       this.editEnum.push(options[i+1]);
    //     }
    //   }
    // }

    scrollTo(0, 90);
  }

  setSelectFromCurrentStatus(item: FlightDTOModel) {
    // this.currentItem = this.flights[itemIndex].flight;
    this.editEnum = [];
    //-----------------  Filling status array  ------------------
    switch (item.flight.status) {
      case FlightStatusModel.SCHEDULED:
        this.editEnum.push(FlightStatusModel.SCHEDULED, FlightStatusModel.CHECK_IN, FlightStatusModel.CANCELED);
        break;

      case FlightStatusModel.CHECK_IN:
        this.editEnum.push(FlightStatusModel.SCHEDULED, FlightStatusModel.CHECK_IN, FlightStatusModel.BOARDING, FlightStatusModel.CANCELED);
        break;

      case FlightStatusModel.BOARDING:
        this.editEnum.push(FlightStatusModel.CHECK_IN, FlightStatusModel.BOARDING, FlightStatusModel.DEPARTED, FlightStatusModel.CANCELED);
        break;

      case FlightStatusModel.DEPARTED:
        this.editEnum.push(FlightStatusModel.BOARDING, FlightStatusModel.DEPARTED, FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
        break;

      case FlightStatusModel.EXPECTING:
        this.editEnum.push(FlightStatusModel.DEPARTED, FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
        break;

      case FlightStatusModel.DELAYED:
        this.editEnum.push(FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
        break;

      case FlightStatusModel.REDIRECTED:
        this.editEnum.push(FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
        break;

      case FlightStatusModel.CANCELED:
        this.editEnum.push(FlightStatusModel.CANCELED);
        break;

      case FlightStatusModel.LANDED:
        this.editEnum.push(FlightStatusModel.LANDED);
        break;

      default:
        for (let item in FlightStatusModel) {
          this.editEnum.push(item);
        }
    }


    // if (this.currentItem.status == FlightStatusModel.SCHEDULED) {
    //   this.editEnum.push(FlightStatusModel.SCHEDULED, FlightStatusModel.CHECK_IN, FlightStatusModel.CANCELED);
    //
    // } else if (this.currentItem.status == FlightStatusModel.CHECK_IN) {
    //   this.editEnum.push(FlightStatusModel.CHECK_IN, FlightStatusModel.SCHEDULED, FlightStatusModel.BOARDING, FlightStatusModel.CANCELED);
    //
    // } else if (this.currentItem.status == FlightStatusModel.BOARDING) {
    //   this.editEnum.push(FlightStatusModel.BOARDING, FlightStatusModel.CHECK_IN, FlightStatusModel.DEPARTED, FlightStatusModel.CANCELED);
    //
    // } else if (this.currentItem.status == FlightStatusModel.DEPARTED) {
    //   this.editEnum.push(FlightStatusModel.DEPARTED, FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
    //
    // } else if (this.currentItem.status == FlightStatusModel.EXPECTING) {
    //   this.editEnum.push(FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
    //
    // } else if (this.currentItem.status == FlightStatusModel.DELAYED) {
    //   this.editEnum.push(FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
    //
    // } else if (this.currentItem.status == FlightStatusModel.REDIRECTED) {
    //   this.editEnum.push(FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED);
    //
    // } else if (this.currentItem.status == FlightStatusModel.CANCELED) {
    //   this.editEnum.push(FlightStatusModel.CANCELED);
    //
    // } else {
    //   this.editEnum.push(FlightStatusModel.LANDED);
    // }

    //-----------------------------------------------------------

    // this.editForm.controls['status'].setValue(this.editEnum);
    // console.log(this.editForm.controls['status'].value);
    this.editQuestions[12].value = this.editEnum;
    // this.form.controls['status'].reset();
  }

  setInputsFromCurrentStatus(status: FlightStatusModel) {
    this.editForm.enable();
    switch (status) {
      case FlightStatusModel.SCHEDULED:
        this.editForm.controls['actualDepartureDate'].disable();
        this.editForm.controls['actualDepartureTime'].disable();
        this.editForm.controls['actualArrivalDate'].disable();
        this.editForm.controls['actualArrivalTime'].disable();
        break;
      case FlightStatusModel.CHECK_IN:
      case FlightStatusModel.BOARDING:
        this.editForm.disable();
        this.editForm.controls['status'].enable();
        break;
      case FlightStatusModel.DEPARTED:
        this.editForm.disable();
        this.editForm.controls['actualDepartureDate'].enable();
        this.editForm.controls['actualDepartureTime'].enable();
        this.editForm.controls['status'].enable();
        break;
      case FlightStatusModel.EXPECTING:
      case FlightStatusModel.DELAYED:
        this.editForm.disable();
        this.editForm.controls['expectedArrivalDate'].enable();
        this.editForm.controls['expectedArrivalTime'].enable();
        this.editForm.controls['status'].enable();
        break;
      case FlightStatusModel.REDIRECTED:
        this.editForm.disable();
        this.editForm.controls['arrivalAirportId'].enable();
        this.editForm.controls['expectedArrivalDate'].enable();
        this.editForm.controls['expectedArrivalTime'].enable();
        this.editForm.controls['status'].enable();
        break;
      case FlightStatusModel.CANCELED:
        this.editForm.disable();
        this.editForm.controls['status'].enable();
        break;
      case FlightStatusModel.LANDED:
        this.editForm.disable();
        this.editForm.controls['actualArrivalDate'].enable();
        this.editForm.controls['actualArrivalTime'].enable();
        this.editForm.controls['status'].enable();
        break;
    }
  }

  onSubmit() {
    try {
      if (this.submitType === 'Save') {
        let expectedArrivalDate = this.datePipe.transform(this.form.controls['expectedArrivalDate'].value, 'yyyy-MM-dd');
        let expectedArrivalTime = this.form.controls['expectedArrivalTime'].value;
        let expectedArrivalDateTime = new Date(expectedArrivalDate + 'T' + expectedArrivalTime);
        let expectedArrivalDatetime = this.datePipe.transform(expectedArrivalDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

        let expectedDepartureDate = this.datePipe.transform(this.form.controls['expectedDepartureDate'].value, 'yyyy-MM-dd');
        let expectedDepartureTime = this.form.controls['expectedDepartureTime'].value;
        let expectedDepartureDateTime = new Date(expectedDepartureDate + 'T' + expectedDepartureTime);
        let expectedDepartureDatetime = this.datePipe.transform(expectedDepartureDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

        let newFlight: any = {};
        newFlight.arrivalAirportId = this.form.controls['arrivalAirportId'].value.objectId;
        newFlight.departureAirportId = this.form.controls['departureAirportId'].value.objectId;
        newFlight.baseCost = this.form.controls['baseCost'].value;
        newFlight.status = 'SCHEDULED';
        newFlight.expectedDepartureDatetime = expectedDepartureDatetime;
        newFlight.expectedArrivalDatetime = expectedArrivalDatetime;
        // newFlight.actualDepartureDatetime = expectedDepartureDatetime;
        // newFlight.actualArrivalDatetime = expectedArrivalDatetime;
        newFlight.flightNumber = this.form.controls['flightNumber'].value;
        newFlight.airplaneId = this.form.controls['airplaneId'].value.objectId;
        console.log('Save flight: ', newFlight);

        this.onSave(newFlight);


      } else if (this.submitType === 'Update') {
        let expectedArrivalDatetime = null;
        let expectedDepartureDatetime = null;
        let actualArrivalDatetime = null;
        let actualDepartureDatetime = null;

        if (this.editForm.controls['expectedArrivalDate'].value != null &&
          this.editForm.controls['expectedArrivalTime'].value != null) {
          let expectedArrivalDate = this.datePipe.transform(this.editForm.controls['expectedArrivalDate'].value, 'yyyy-MM-dd');
          let expectedArrivalTime = this.editForm.controls['expectedArrivalTime'].value;
          console.log(expectedArrivalTime);
          let expectedArrivalDateTime = new Date(expectedArrivalDate + 'T' + expectedArrivalTime);
          expectedArrivalDatetime = this.datePipe.transform(expectedArrivalDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');
        }

        if (this.editForm.controls['expectedDepartureDate'].value != null &&
          this.editForm.controls['expectedDepartureTime'].value != null) {
          let expectedDepartureDate = this.datePipe.transform(this.editForm.controls['expectedDepartureDate'].value, 'yyyy-MM-dd');
          let expectedDepartureTime = this.editForm.controls['expectedDepartureTime'].value;
          let expectedDepartureDateTime = new Date(expectedDepartureDate + 'T' + expectedDepartureTime);
          expectedDepartureDatetime = this.datePipe.transform(expectedDepartureDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');
        }

        if (this.editForm.controls['actualArrivalDate'].value != null &&
          this.editForm.controls['actualArrivalTime'].value != null) {
          let actualArrivalDate = this.datePipe.transform(this.editForm.controls['actualArrivalDate'].value, 'yyyy-MM-dd');
          let actualArrivalTime = this.editForm.controls['actualArrivalTime'].value;
          console.log(actualArrivalTime);
          let actualArrivalDateTime = new Date(actualArrivalDate + 'T' + actualArrivalTime);
          actualArrivalDatetime = this.datePipe.transform(actualArrivalDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');
        }

        if (this.editForm.controls['actualDepartureDate'].value != null &&
          this.editForm.controls['actualDepartureTime'].value != null) {
          let actualDepartureDate = this.datePipe.transform(this.editForm.controls['actualDepartureDate'].value, 'yyyy-MM-dd');
          let actualDepartureTime = this.editForm.controls['actualDepartureTime'].value;
          let actualDepartureDateTime = new Date(actualDepartureDate + 'T' + actualDepartureTime);
          actualDepartureDatetime = this.datePipe.transform(actualDepartureDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');
        }

        this.currentItem.flight.flightNumber = this.editForm.controls['flightNumber'].value;
        this.currentItem.flight.expectedDepartureDatetime = expectedDepartureDatetime;
        this.currentItem.flight.expectedArrivalDatetime = expectedArrivalDatetime;
        this.currentItem.flight.actualDepartureDatetime = actualDepartureDatetime;
        this.currentItem.flight.actualArrivalDatetime = actualArrivalDatetime;
        this.currentItem.flight.departureAirportId = this.editForm.controls['departureAirportId'].value;
        this.currentItem.flight.arrivalAirportId = this.editForm.controls['arrivalAirportId'].value;
        this.currentItem.flight.baseCost = this.editForm.controls['baseCost'].value;
        this.currentItem.flight.status = this.editForm.controls['status'].value;
        console.log('Update flight: ', this.currentItem.flight);
        this.onSave(this.currentItem.flight);
      }
    } catch (error) {
      console.error(error, error.message);
      this.showError('Please, choose or enter a valid date in date fields.');
    }
  }

  onDelete(index: number) {
    this.currentItem = this.flights[index].flight;
    this.flights.splice(index, 1);

    this.flightsService.deleteItem(this.currentItem.objectId)
      .subscribe(() => {
        const message = 'The item has been deleted.';
        this.showInfo(message);
      }, err => {
        this.responseError = err;
        this.showError(this.responseError.message);
      });
    if (this.flights.length === 0 && this.numberOfPage > 1) {
      this.numberOfPage -= 1;
    }
    this.getCountOfItems();
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
          });
        });
    }
  }

  showRemoveConfirmModal(i: number) {
    this.deleteId = i;
    this.removeConfirmModal.show();
  }

  onCancel() {
    if (this.submitType === 'Save') {
      this.form.reset();
    } else if (this.submitType === 'Update') {
      this.editForm.reset();
    }
    this.expanded = false;
  }

  closeAdd() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.onNew();
    }
  }

  onPrevPage() {
    if (this.numberOfPage !== 1)
      this.numberOfPage--;

    if (this.filteringMode)
      this.getTenItemsByFilter(this.numberOfPage);
    else
      this.getTenItems(this.numberOfPage);
  }

  onNextPage() {
    if (this.numberOfPage !== this.countOfPages)
      this.numberOfPage++;

    if (this.filteringMode)
      this.getTenItemsByFilter(this.numberOfPage);
    else
      this.getTenItems(this.numberOfPage);
  }

  onEnter($event: KeyboardEvent) {
    if ($event.key == 'Enter') {
      this.onSearch();
    }
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
