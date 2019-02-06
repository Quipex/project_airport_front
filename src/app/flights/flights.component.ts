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
      key: 'actualDepartureDate',
      label: 'Actual departure date',
      required: true,
      type: 'date',
      order: 3,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'actualDepartureTime',
      label: 'Actual departure time',
      required: true,
      type: 'time',
      order: 4,
      edit: true,
      minDate: this.minDate
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
      label: 'Actual arrival date',
      required: true,
      type: 'date',
      order: 6,
      edit: true,
      minDate: this.minDate
    }),
    new InputBaseModel({
      key: 'actualArrivalTime',
      label: 'Actual arrival time',
      required: true,
      type: 'time',
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
      value: FlightStatusModel  //this.editEnum
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
      // console.log(x);
    }
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
    // this.airplanesService.getAll()
    //   .subscribe((data: AirplanesModel[]) => {
    //     data.forEach(item => {
    //       this.airplanes.push(item);
    //     });
    //   });
  }

  getAirplanesByAirlineId(airlineId: number) {
    this.airplanes = [];
    this.airplanesService.getAll()
      .subscribe((data: AirplanesModel[]) => {
        data.forEach(item => {
          if (item.airlineId == airlineId) {
            this.airplanes.push(item);
          }
        });
      });
    this.form.controls['airplaneId'].reset();
    // console.log(this.airplanes.length);
    this.questions[8].value = this.airplanes;
    this.form.controls['airplaneId'].setValue(this.airplanes.length); // FIX
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
    if (!this.expanded) {
      this.expanded = true;
    }
    this.setAllFromStatus(index);
    this.editMode = true;
    this.currentItem = this.flights[index];
    let arrivalDate: Date = new Date(this.currentItem.flight.actualArrivalDatetime);
    let expectedArrivalDate = this.datePipe.transform(arrivalDate, 'MM/dd/yyyy');
    let expectedArrivalTime = this.datePipe.transform(arrivalDate, 'HH:mm');

    let departureDate: Date = new Date(this.currentItem.flight.actualDepartureDatetime);
    let expectedDepartureDate = this.datePipe.transform(departureDate, 'MM/dd/yyyy');
    let expectedDepartureTime = this.datePipe.transform(departureDate, 'HH:mm');

    this.editForm.controls['actualArrivalDate'].setValue(new Date(expectedArrivalDate));
    this.editForm.controls['actualArrivalTime'].setValue(expectedArrivalTime);
    this.editForm.controls['actualDepartureDate'].setValue(new Date(expectedDepartureDate));
    this.editForm.controls['actualDepartureTime'].setValue(expectedDepartureTime);
    this.editForm.controls['arrivalAirportId'].setValue(this.currentItem.arrivalAirport.objectId);
    this.editForm.patchValue(this.currentItem.flight);

    this.submitType = 'Update';
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

  setAllFromStatus(itemIndex: number) {
    this.currentItem = this.flights[itemIndex].flight;

    //-----------------  Filling status array  ------------------

    // switch (this.currentItem.status) {
    //   case FlightStatusModel.SCHEDULED: ;
    // }
    if (this.currentItem.status == FlightStatusModel.SCHEDULED) {
      this.editEnum = [FlightStatusModel.SCHEDULED, FlightStatusModel.CHECK_IN, FlightStatusModel.CANCELED];

    } else if (this.currentItem.status == FlightStatusModel.CHECK_IN) {
      this.editEnum = [FlightStatusModel.CHECK_IN, FlightStatusModel.SCHEDULED, FlightStatusModel.BOARDING, FlightStatusModel.CANCELED];

    } else if (this.currentItem.status == FlightStatusModel.BOARDING) {
      this.editEnum = [FlightStatusModel.BOARDING, FlightStatusModel.CHECK_IN, FlightStatusModel.DEPARTED, FlightStatusModel.CANCELED];

    } else if (this.currentItem.status == FlightStatusModel.DEPARTED) {
      this.editEnum = [FlightStatusModel.DEPARTED, FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED];

    } else if (this.currentItem.status == FlightStatusModel.EXPECTING) {
      this.editEnum = [FlightStatusModel.EXPECTING, FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED];

    } else if (this.currentItem.status == FlightStatusModel.DELAYED) {
      this.editEnum = [FlightStatusModel.DELAYED, FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED];

    } else if (this.currentItem.status == FlightStatusModel.REDIRECTED) {
      this.editEnum = [FlightStatusModel.REDIRECTED, FlightStatusModel.LANDED];

    } else if (this.currentItem.status == FlightStatusModel.CANCELED) {
      this.editEnum = [FlightStatusModel.CANCELED];

    } else {
      this.editEnum = [FlightStatusModel.LANDED];
    }

    //-----------------------------------------------------------

    // this.questions[7].value = this.editEnum;
    // this.form.controls['status'].reset();
    console.log(this.questions[7].value);
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
    // this.questions[8].value = [];
  }

  onSubmit() {
    if (this.submitType === 'Save') {
      let expectedArrivalDate = this.datePipe.transform(this.form.value['expectedArrivalDate'], 'yyyy-MM-dd');
      console.log(expectedArrivalDate);
      let expectedArrivalTime = this.form.value['expectedArrivalTime'];
      let expectedArrivalDateTime = new Date(expectedArrivalDate + 'T' + expectedArrivalTime);
      console.log(expectedArrivalDateTime);
      let expectedArrivalDatetime = this.datePipe.transform(expectedArrivalDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

      let expectedDepartureDate = this.datePipe.transform(this.form.value['expectedDepartureDate'], 'yyyy-MM-dd');
      let expectedDepartureTime = this.form.value['expectedDepartureTime'];
      let expectedDepartureDateTime = new Date(expectedDepartureDate + 'T' + expectedDepartureTime);
      let expectedDepartureDatetime = this.datePipe.transform(expectedDepartureDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

      let newFlight: any = {};
      newFlight.arrivalAirportId = this.form.value['arrivalAirportId'].objectId;
      newFlight.departureAirportId = this.form.value['departureAirportId'].objectId;
      newFlight.baseCost = this.form.value['baseCost'];
      newFlight.status = 'SCHEDULED';
      newFlight.expectedDepartureDatetime = expectedDepartureDatetime;
      newFlight.expectedArrivalDatetime = expectedArrivalDatetime;
      // newFlight.actualDepartureDatetime = expectedDepartureDatetime;
      // newFlight.actualArrivalDatetime = expectedArrivalDatetime;
      newFlight.flightNumber = this.form.value['flightNumber'];
      newFlight.airplaneId = this.form.value['airplaneId'].objectId;
      this.onSave(newFlight);

    } else if (this.submitType === 'Update') {
      let actualArrivalDate = this.datePipe.transform(this.editForm.value['actualArrivalDate'], 'yyyy-MM-dd');
      let actualArrivalTime = this.editForm.value['actualArrivalTime'];
      let actualArrivalDateTime = new Date(actualArrivalDate + 'T' + actualArrivalTime);
      let actualArrivalDatetime = this.datePipe.transform(actualArrivalDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

      let actualDepartureDate = this.datePipe.transform(this.editForm.value['actualDepartureDate'], 'yyyy-MM-dd');
      let actualDepartureTime = this.editForm.value['actualDepartureTime'];
      let actualDepartureDateTime = new Date(actualDepartureDate + 'T' + actualDepartureTime);
      let actualDepartureDatetime = this.datePipe.transform(actualDepartureDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

      this.currentItem.flight.actualDepartureDatetime = actualDepartureDatetime;
      this.currentItem.flight.actualArrivalDatetime = actualArrivalDatetime;
      this.currentItem.flight.arrivalAirportId = this.editForm.value['arrivalAirportId'];
      this.currentItem.flight.status = this.editForm.value['status'];
      console.log(this.currentItem.flight);
      this.onSave(this.currentItem.flight);
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
        this.showError(this.responseError.error.message);
      });
    if (this.flights.length === 0 && this.numberOfPage > 1) {
      this.numberOfPage -= 1;
    }
    this.getCountOfItems();
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
