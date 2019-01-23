import {Component, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../services/tickets.service";
import {FilterAndSortWrapperModel} from "../shared/models/filterAndSortWrapper.model";
import {ResponseFilteringWrapperModel} from "../shared/models/responseFilteringWrapper.model";
import {TicketDTOModel} from "../shared/models/ticketDTO.model";
import {FormGroup} from "@angular/forms";
import {ModalDirective} from "angular-bootstrap-md";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {FormControlService} from "../services/formControl.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {PassengersService} from "../services/passengers.service";
import {TicketStatusModel} from "../shared/models/entity/flight/ticketStatus.model";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [PassengersService, DatePipe]
})
export class TicketsComponent implements OnInit {

  editForm: FormGroup;
  editMode: Boolean = false;
  submitType = 'Edit';

  display = false;
  searchString = '';
  searchFilter = '';
  message = '';
  paging = false;
  countOfPages = 0;
  numberOfPage = 0;
  @ViewChild('newModal') newModal: ModalDirective;

  constructor(
    private ticketsService: TicketsService,
    private fcs: FormControlService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) { }

  currentItem: TicketDTOModel;
  items: TicketDTOModel[] = [];

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

    new InputBaseModel({
      key: 'ticketStatus',
      label: 'Ticket status',
      required: true,
      type: 'select',
      edit: true,
      value: TicketStatusModel
    }),
  ];

  ngOnInit() {
    if (this.items.length === 0) {
      this.message = 'There are no items.';
    }
    this.editForm = this.fcs.toFormGroup(this.questions);
  }

  filterForm() {
    this.display = !this.display;
  }

  onEnter($event: KeyboardEvent) {
    if ($event.key == "Enter") {
      this.onSearch(1, true);
    }
  }

  onSearch(numberOfPage: number, direction: boolean) {
    if (this.searchString === '') {
      this.numberOfPage = 0;
      this.items = [];
      this.message = 'There are no items.'
    } else {
      if (this.searchFilter === '') {
        this.message = 'Choose a filter before searching.';
      } else {
        let attrArray: Array<number>;
        if (this.searchFilter === 'passenger') {
          attrArray = new Array<number>(38, 39);
        } else if (this.searchFilter === 'flight') {
          attrArray = new Array<number>(62);
        }
        let wrapper = new FilterAndSortWrapperModel(this.searchString, null, attrArray);

        this.ticketsService.search(numberOfPage, wrapper)
          .subscribe((data: ResponseFilteringWrapperModel) => {
            if (data.entities.length === 0) {
              this.message = 'There are no items.'
            } else {
              this.message = '';
            }

            if (data.countOfPages < 2) {
              this.paging = false;
            } else {
              this.paging = true;
              this.numberOfPage = 1;
              this.countOfPages = data.countOfPages;
            }
            data.entities.forEach((t: TicketDTOModel) => {
              this.items.push(new TicketDTOModel(t.ticket, t.flight, t.passenger, t.arrivalAirport, t.departureAirport, t.airplane, t.airline, t.passport));
            });
          });
        if (direction) {
          if (this.numberOfPage !== this.countOfPages) {
            this.numberOfPage++;
          }
        } else {
          if (this.numberOfPage !== 1) {
            this.numberOfPage--;
          }
        }
      }
    }
  }

  onSave(returnedItem: any) {
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
    this.currentItem.ticket.ticketStatus = returnedItem.ticketStatus;
    this.ticketsService.editTicket(this.currentItem)
      .subscribe((data: TicketDTOModel) => {
        //this.currentItem.passport.birthDate = data.passport.birthDate;
        this.newModal.hide();
        const message = 'The item has been edited.';
        this.showInfo(message);
      })
  }

  onEdit(index: number) {
    this.editMode = true;
    this.currentItem = this.items[index];
    this.editForm.patchValue(this.currentItem.passenger);
    this.editForm.patchValue(this.currentItem.passport);
    this.editForm.patchValue(this.currentItem.ticket);
    this.submitType = 'Update';
    this.newModal.show();
  }

  onCancel(event: boolean) {
    if (event) {
      this.editForm.reset();
      this.newModal.hide();
    }
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }
}
