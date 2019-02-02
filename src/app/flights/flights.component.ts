import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnSetting} from '../shared/models/columnSetting.model';
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
import {FlightsModel} from '../shared/models/entity/flight/flights.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthResponseModel} from '../shared/models/authResponse.model';
import {AuthorityModel} from '../shared/models/entity/users/authority.model';
import {AirportsService} from "../services/airports.service";
import {AirplanesModel} from "../shared/models/entity/airplane/airplanes.model";
import {AirplanesService} from "../services/airplanes.service";
import {AirportModel} from "../shared/models/entity/flight/airport.model";


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  providers: [FlightsService, DatePipe, AirportsService, AirplanesService]
})
export class FlightsComponent implements OnInit {
  form: FormGroup;
  authModel: AuthResponseModel;
  role = AuthorityModel;
  currentRole = '';
  @ViewChild('formAdd') formAdd: ElementRef;
  @ViewChild('removeConfirmModal') removeConfirmModal: ModalDirective;
  // @ViewChild();
  flights: FlightDTOModel[] = [];

  editForm: FormGroup;
  // newPassenger: PassengersModel;
  // newPassport: PassportModel;
  currentItem: FlightsModel;
  editMode: Boolean = false;
  expanded = false;
  submitType = 'Save';
  searchString = '';
  filteringMode = false;
  sortList: SortEntityModel[] = [];
  deleteId: number;
  // flights: FlightsModel[] = [];
  responseError: ResponseErrorModel;

  paging = false;
  numberOfPage = 1;
  countOfPages = 0;

  private height: number;
  private overflow: string;
  private airports: AirportModel[] = [];
  private airplanes: AirplanesModel[] = [];

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
      key: 'name',
      label: 'Departure airport',
      required: true,
      type: 'airport-selector',
      order: 2,
      edit: true,
      value: this.airports
    }),
    new InputBaseModel({
      key: 'actualDepartureDate',
      label: 'Departure date',
      required: true,
      type: 'date',
      order: 3,
      edit: true
    }),
    new InputBaseModel({
      key: 'actualDepartureTime',
      label: 'Departure time',
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
      key: 'actualArrivalDate',
      label: 'Arrival date',
      required: true,
      type: 'date',
      order: 6,
      edit: true
    }),
    new InputBaseModel({
      key: 'actualArrivalTime',
      label: 'Arrival time',
      required: true,
      type: 'time',
      order: 7,
      edit: true
    }),
    new InputBaseModel({
      key: 'airplaneId',
      label: 'Airplane',
      required: true,
      type: 'airplane-selector',
      order: 8,
      edit: true,
      value: this.airplanes
    }),
    new InputBaseModel({
      key: 'baseCost',
      label: 'Cost',
      required: true,
      type: 'number',
      order: 9,
      edit: true
    }),
    new InputBaseModel({
      key: 'status',
      label: 'Status',
      required: true,
      type: 'select',
      order: 10,
      edit: true,
      value: FlightStatusModel
    })
  ];

  constructor(
    private router: Router,
    private flightsService: FlightsService,
    private airportsService: AirportsService,
    private airplanesService: AirplanesService,
    private fcs: FormControlService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.authModel = JSON.parse(window.localStorage.getItem('currentUser'));
    var token = this.authModel.token;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.currentRole = decodedToken.user_role;

    this.form = this.fcs.toFormGroup(this.questions);
    this.editForm = this.fcs.toFormGroup(this.questions);
    this.getFlights();
    this.airportsService.getAll()
      .subscribe((data: AirportModel[]) => {
        data.forEach(item => {
          this.airports.push(item);
        });
      });
    this.airplanesService.getAll()
      .subscribe((data: AirplanesModel[]) => {
        data.forEach(item => {
          this.airplanes.push(item);
        });
      });
  }

  getFlights() {
    this.getCountOfItems();
    // let values = this.flightsService.getTenItems(1);
    // values.forEach((value: FlightDTOModel) => {
    //   let flight = value.flight;
    //   flight.airplane = value.airplane;
    //   flight.departureAirport = value.departureAirport;
    //   flight.arrivalAirport = value.arrivalAirport;
    //   this.flights.push(flight);
    // });
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
    }, 50);
  }

  private getTenItems(numberOfPage: number) {
    this.numberOfPage = numberOfPage;
    console.log('Current page:' + this.numberOfPage);

    this.flightsService.getTenItems(numberOfPage).subscribe((value: FlightDTOModel[]) => {
      this.flights = value;
      // console.log(value);
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

  onSave(returnedItem: any) {
    if (this.submitType === 'Save') {
      this.flightsService.addItem(returnedItem)
        .subscribe(() => {
            // this.formAdd.hide();
            const message = 'New flight has been added.';
            this.showInfo(message);
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
        }, err => {
          this.responseError = err;
          this.showError(this.responseError.error.message);
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
    this.editMode = true;
    this.currentItem = this.flights[index];
    this.editForm.patchValue(this.currentItem);
    // this.editForm.patchValue(this.currentItem.passport);
    this.submitType = 'Update';
    // this.formAdd.show();
  }

  onCancel(event: boolean) {
    if (event) {
      this.form.reset();
      // this.formAdd.hide();
    }
  }

  onSubmit() {
    if (this.submitType === 'Save') {
      let actualArrivalDate = this.datePipe.transform(this.form.value['actualArrivalDate'], 'yyyy-MM-dd');
      let actualArrivalTime = this.form.value['actualArrivalTime'];
      let actualArrivalDateTime = new Date(actualArrivalDate + 'T' + actualArrivalTime);

      let actualDepartureDate = this.datePipe.transform(this.form.value['actualDepartureDate'], 'yyyy-MM-dd');
      let actualDepartureTime = this.form.value['actualDepartureTime'];
      let actualDepartureDateTime = new Date(actualDepartureDate + 'T' + actualDepartureTime);

      let newFlight: any = {};
      newFlight.arrivalAirportId = this.form.value['arrivalAirportId'].objectId;
      newFlight.departureAirportId = this.form.value['departureAirportId'].objectId;
      newFlight.baseCost = this.form.value['baseCost'];
      newFlight.status = 'SCHEDULED';
      newFlight.actualDepartureDatetime = actualDepartureDateTime;
      newFlight.actualArrivalDatetime = actualArrivalDateTime;
      newFlight.expectedDepartureDatetime = actualDepartureDateTime;
      newFlight.expectedArrivalDatetime = actualArrivalDateTime;
      newFlight.flightNumber = this.form.value['flightNumber'];
      newFlight.airplaneId = this.form.value['airplaneId'].objectId;

      this.onSave(newFlight);
    }
  }

  closeAdd() {
    this.expanded = !this.expanded;
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
