import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {PassengersService} from "../../services/passengers.service";
import {AuthResponseModel} from "../../shared/models/authResponse.model";
import {AuthorityModel} from "../../shared/models/entity/users/authority.model";
import {Router} from "@angular/router";
import {PassportsService} from "../../services/passports.service";
import {FormControlService} from "../../services/formControl.service";
import {InputBaseModel} from "../../shared/models/inputBase.model";
import {DatePipe} from "@angular/common";
import {ModalDirective} from "angular-bootstrap-md";
import {FilterAndSortWrapperModel} from "../../shared/models/filterAndSortWrapper.model";
import {ResponseFilteringWrapperModel} from "../../shared/models/responseFilteringWrapper.model";
import {ToastrService} from "ngx-toastr";
import {PassengerPassportModel} from "../../shared/models/entity/users/passengers/passengerPasport.model";
import {PassengersModel} from "../../shared/models/entity/users/passengers/passengers.model";
import {PassportModel} from "../../shared/models/entity/users/passengers/passport.model";

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  providers: [PassengersService, PassportsService, DatePipe]
})
export class PassengersComponent implements OnInit {


  passports = [];

  form: FormGroup;
  editForm: FormGroup;
  newPassenger: PassengersModel;
  newPassport: PassportModel;
  currentItem: PassengerPassportModel;
  editMode: Boolean = false;
  submitType = 'Save';
  searchString = '';
  deleteId: number;
  @ViewChild('newModal') newModal: ModalDirective;
  @ViewChild('removeConfirmModal') removeConfirmModal: ModalDirective;
  constructor(
    private router: Router,
    private passengersService: PassengersService,
    private passportsService: PassportsService,
    private fcs: FormControlService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
  }

  userLogin: string;
  passengers: any = [];
  items: PassengerPassportModel[] = [];

  questions: InputBaseModel<any>[] = [
    new InputBaseModel({
      key: 'firstName',
      label: 'First Name',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'lastName',
      label: 'Last name',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'country',
      label: 'Country',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'serialNumber',
      label: 'Passport SN',
      required: true,
      type: 'text',
      edit: true
    }),

    new InputBaseModel({
      key: 'birthDate',
      label: 'Birth date',
      required: true,
      type: 'date',
      edit: true
    }),
  ];

  ngOnInit() {

    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser === null || currentUser.authority === null) {
      this.router.navigateByUrl('login');
    } else if (currentUser.authority !== AuthorityModel.ROLE_USER.toString()) {
      this.router.navigateByUrl('home');
    }

    this.userLogin = currentUser.login;

    this.form = this.fcs.toFormGroup(this.questions);
    this.editForm = this.fcs.toFormGroup(this.questions);

    this.getPassengers(this.userLogin);
  }

  getPassengers(login: string) {
    this.passengersService.getPassengersByUserLogin(login, 1)
      .subscribe(
        (response: PassengersModel[]) => { this.fillArray(response); },
        (error) => console.log(error)
      );
  }

  fillArray(response : PassengersModel[]) {
    response.map(passenger => {this.passengers.push(passenger)});
    const passengersToDisplay = this.passengers.forEach(element => {
      this.passportsService.getPassportsByParentId(element.objectId)
        .subscribe((response: PassportModel) => {
          this.passports.push(response);
          this.items.push(new PassengerPassportModel(element, response));
        })
    });
  }

  onSave(returnedItem: any) {
    if (this.editMode) {
      for (const x in this.currentItem.passenger) {
        for (const y in returnedItem) {
          if (x === y) {
            this.currentItem.passenger[x] = returnedItem[y];
          }
        }
      }
      for (const x in this.currentItem.passport) {
        for (const y in returnedItem) {
          if (x === y) {
            if (x === 'birthDate') {
              this.currentItem.passport[x] = this.datePipe.transform(returnedItem[y], 'yyyy-MM-dd\'T\'HH:mm:ss');
            } else {
              this.currentItem.passport[x] = returnedItem[y];
            }
          }
        }
      }
      this.passengersService.savePassengerAndPassport(this.userLogin, this.currentItem)
        .subscribe((data: PassengerPassportModel) => {
          this.currentItem.passport.birthDate = data.passport.birthDate;
          this.newModal.hide();
          const message = 'The item has been edited.';
          this.showInfo(message);
        })
    } else {
      this.newPassenger = new PassengersModel();
      this.newPassport = new PassportModel();
      for (const x in this.newPassenger) {
        for (const y in returnedItem) {
          if (x === y) {
            this.newPassenger[x] = returnedItem[y];
          }
        }
      }
      for (const x in this.newPassport) {
        for (const y in returnedItem) {
          if (x === y) {
            if (x === 'birthDate') {
              this.newPassport[x] = this.datePipe.transform(returnedItem[y], 'yyyy-MM-dd\'T\'HH:mm:ss');
            } else {
              this.newPassport[x] = returnedItem[y];
            }
          }
        }
      }
      console.log(this.newPassport);
      let wrapper = new PassengerPassportModel(this.newPassenger, this.newPassport);
      this.passengersService.savePassengerAndPassport(this.userLogin, wrapper)
        .subscribe((data: PassengerPassportModel) => {
          this.items.push(data);
          this.newModal.hide();
          const message = 'New item has been added.';
          this.showInfo(message);
        })
    }
  }

  onNew() {
    this.form.reset();
    this.submitType = 'Save';
    this.editMode = false;
  }

  onEdit(index: number) {
    this.editMode = true;
    this.currentItem = this.items[index];
    this.editForm.patchValue(this.currentItem.passenger);
    this.editForm.patchValue(this.currentItem.passport);
    this.submitType = 'Update';
    this.newModal.show();
  }

  onCancel(event: boolean) {
    if (event) {
      this.form.reset();
      this.newModal.hide();
    }
  }

  onEnter($event: KeyboardEvent) {
    if ($event.key == "Enter") {
      this.onSearch();
    }
  }

  onSearch() {
    if (this.searchString === '') {
      this.items = [];
      this.getPassengers(this.userLogin);
    } else {
      let wrapper = new FilterAndSortWrapperModel(this.searchString);

      this.passengersService.search(this.userLogin,1, wrapper)
        .subscribe((data: ResponseFilteringWrapperModel) => {

          this.passports = [];
          this.passengers = [];
          this.items = [];
          data.entities.forEach(element => {
            this.passportsService.getPassportsByParentId(element.objectId)
              .subscribe((response: PassportModel) => {
                this.passports.push(response);
                this.items.push(new PassengerPassportModel(element, response));
              })
          });
        });
    }
  }

  showRemoveConfirmModal(i: number) {
    this.deleteId = i;
    this.removeConfirmModal.show();
  }

  onDelete(index: number) {
    this.currentItem = this.items[index];
    this.items.splice(index, 1);

    this.passengersService.deleteItems(this.currentItem.passenger.objectId,
      this.currentItem.passport.objectId)
      .subscribe(() => {
        const message = 'The item has been deleted.';
        this.showInfo(message);
      });
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

}





