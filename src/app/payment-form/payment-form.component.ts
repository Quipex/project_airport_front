import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PaymentService} from "../services/payment.service";
import {AuthResponseModel} from "../shared/models/authResponse.model";
import {CreditCardModel} from "../shared/models/entity/users/creditCard.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreditCardValidator} from "ng2-cc-library";
import {ToastrService} from "ngx-toastr";
import {UsersService} from "../services/users.service";
import {UsersModel} from "../shared/models/entity/users/users.model";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {

  typeOfCard = false;
  typeOfCardValue: string = 'new';
  savedCards: CreditCardModel[] = [];
  savedCard: string;
  selectCardForm: FormGroup = new FormGroup({
    savedCard: new FormControl()
  });

  newCardForm: FormGroup = new FormGroup({
    numberOfCard: new FormControl('', [Validators.required, <any>CreditCardValidator.validateCCNumber]),
    expirationDate: new FormControl('', [Validators.required, <any>CreditCardValidator.validateExpDate]),
    cvv: new FormControl('', [Validators.required, Validators.minLength(3)]),
    nickname: new FormControl('', [Validators.required])
  });

  emailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required])
  });

  numberOfCard: string;
  cvv: string;
  expirationDate: string;
  nickname: string;
  email: string = '';

  currentUser: UsersModel;

  @Output() paymentCreditCard = new EventEmitter<CreditCardModel>();
  @Output() userEmail = new EventEmitter<string>();
  constructor(
    private paymentService: PaymentService,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const currentUser: AuthResponseModel = JSON.parse(window.localStorage.getItem('currentUser'));
    if (currentUser !== null) {
      this.usersService.getUserByLogin(currentUser.login)
        .subscribe((user: UsersModel) => {
          this.currentUser = user;
          this.email = user.email;
        });
    }
  }

  onTypeSelect(type: string) {
    if (type === 'saved') {
      this.typeOfCard = true;
    } else {
      this.typeOfCard = false;
      this.numberOfCard = '';
      this.cvv = '';
      this.expirationDate = '';
      this.nickname = '';
      this.savedCards = [];
      this.selectCardForm.reset();
    }

    this.paymentService.getCreditCardsByUserLogin(this.currentUser.login, 1)
      .subscribe((data: CreditCardModel[]) => {
        this.savedCards = data;
        this.savedCards.forEach((item: any) => {
          let creditCard = <CreditCardModel>item;
          creditCard.expirationDate = item.month + '/' + item.year;
          item.expirationDate = creditCard.expirationDate;
        })
      });
  }

  onCardSelect(index: string) {
    let selectedCard = new CreditCardModel();
    selectedCard = this.savedCards[index];
    this.numberOfCard = selectedCard.number;
    this.cvv = selectedCard.cvv;
    this.expirationDate = selectedCard.expirationDate;
    this.nickname = selectedCard.nickname;
  }

  onPay(form: FormGroup) {
    if (!form.valid) {
      if (form.value.numberOfCard === undefined
        || form.value.expirationDate === undefined
        || form.value.cvv === undefined
        || form.value.nickname === undefined)  {
        this.showError('All field are required.');
      } else if (!form.controls.numberOfCard.valid) {
        this.showError('Number of card is wrong.')
      } else if (!form.controls.expirationDate.valid) {
        this.showError('Expiration date is wrong.')
      } else if (!form.controls.cvv.valid) {
        this.showError('CVV is wrong.')
      } else if (!form.controls.nickname.valid) {
        this.showError('Nickname is wrong.')
      }
    } else {
      let date = form.controls.expirationDate.value.split("/");
      let month = date[0];
      let year = date[1];

      let paymentCreditCard: any = {};
      paymentCreditCard.number = form.controls.numberOfCard.value;
      paymentCreditCard.cvv = form.controls.cvv.value;
      paymentCreditCard.nickname = form.controls.nickname.value;
      paymentCreditCard.month = month;
      paymentCreditCard.year = year;

      this.paymentCreditCard.emit(paymentCreditCard);
      this.userEmail.emit(this.email);
    }
  }

  showError(message: string) {
    this.toastr.error(message);
  }

}
