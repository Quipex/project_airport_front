import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from "../services/payment.service";
import {InputBaseModel} from "../shared/models/inputBase.model";
import {FormGroup} from "@angular/forms";
import {ModalDirective} from "angular-bootstrap-md";
import {Router} from "@angular/router";
import {FormControlService} from "../services/formControl.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {AuthResponseModel} from "../shared/models/authResponse.model";
import {FilterAndSortWrapperModel} from "../shared/models/filterAndSortWrapper.model";
import {ResponseFilteringWrapperModel} from "../shared/models/responseFilteringWrapper.model";
import {CreditCardModel} from "../shared/models/entity/users/creditCard.model";

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  providers: [DatePipe]
})
export class PaymentMethodsComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;
  newCreditCard: CreditCardModel;
  currentItem: CreditCardModel;
  editMode: Boolean = false;
  submitType = 'Save';
  searchString = '';
  deleteId: number;
  userLogin: string;
  items: CreditCardModel[] = [];
  @ViewChild('newModal') newModal: ModalDirective;
  @ViewChild('removeConfirmModal') removeConfirmModal: ModalDirective;
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private fcs: FormControlService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {
  }

  questions: InputBaseModel<any>[] = [
    new InputBaseModel({
      key: 'number',
      label: 'Number',
      required: true,
      type: 'cc-number',
      order: 1,
      edit: true
    }),

    new InputBaseModel({
      key: 'expirationDate',
      label: 'Expiration date (MM/YYYY)',
      required: true,
      type: 'cc-exp-date',
      order: 2,
      edit: true
    }),

    new InputBaseModel({
      key: 'cvv',
      label: 'CVV',
      required: true,
      type: 'cc-cvc',
      order: 3,
      edit: true
    }),

    new InputBaseModel({
      key: 'nickname',
      label: 'Nickname',
      required: true,
      type: 'text',
      order: 4,
      edit: true
    })
  ];

  ngOnInit() {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    this.userLogin = currentUser.login;
    this.form = this.fcs.toFormGroup(this.questions);
    this.editForm = this.fcs.toFormGroup(this.questions);
    this.getCreditCards(this.userLogin);
  }

  getCreditCards(login: string) {
    this.paymentService.getCreditCardsByUserLogin(login, 1)
      .subscribe(
        (response: CreditCardModel[]) => { this.fillArray(response); },
        (error) => console.log(error)
      );
  }

  fillArray(response : CreditCardModel[]) {
    response.forEach((item: any) => {
      let creditCard = <CreditCardModel>item;
      creditCard.expirationDate = item.month + '/' + item.year;
      this.items.push(creditCard);
    })
  }

  onSave(returnedItem: any) {
    if (this.editMode) {
      let currentItem:any = {};
      for (const y in returnedItem) {
        if (y === 'expirationDate') {
          let parts = returnedItem[y].split("/");
          currentItem.month = parts[0];
          currentItem.year = parts[1];
          this.currentItem[y] = returnedItem[y];
        } else {
          this.currentItem[y] = returnedItem[y];
          currentItem[y] = returnedItem[y];
        }
      }

      this.paymentService.addItem(this.userLogin, currentItem)
        .subscribe((item: any) => {
          this.currentItem.expirationDate = item.month + '/' + item.year;

          this.newModal.hide();
          const message = 'The item has been edited.';
          this.showInfo(message);
        })
    } else {
      let newItem:any = {};

      for (const y in returnedItem) {
        if (y === 'expirationDate') {
          let parts = returnedItem[y].split("/");
          newItem.month = parts[0];
          newItem.year = parts[1];
        } else {
          newItem[y] = returnedItem[y];
        }
      }

      this.paymentService.addItem(this.userLogin, newItem)
        .subscribe((item: any) => {
          let creditCard = <CreditCardModel>item;
          creditCard.expirationDate = item.month + '/' + item.year;
          this.items.push(creditCard);
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
    this.editForm.patchValue(this.currentItem);
    this.submitType = 'Update';
    this.newModal.show();
  }

  onCancel(event: boolean) {
    if (event) {
      this.form.reset();
      this.newModal.hide();
    }
  }

  showRemoveConfirmModal(i: number) {
    this.deleteId = i;
    this.removeConfirmModal.show();
  }

  onDelete(index: number) {
    this.currentItem = this.items[index];
    this.items.splice(index, 1);

    this.paymentService.deleteItem(this.currentItem.objectId)
      .subscribe(() => {
        const message = 'The item has been deleted.';
        this.showInfo(message);
      });
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

}
