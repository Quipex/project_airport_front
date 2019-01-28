import {Injectable} from '@angular/core';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CreditCardValidator} from "ng2-cc-library";
import {isPresent} from "ng2-cc-library/dist/lang";

@Injectable()
export class FormControlService {
  constructor() {
  }

  toFormGroup(items: InputBaseModel<any>[]) {
    let group: any = {};

    items.forEach(item => {
      if (item.type === 'email') {
        group[item.key] = item.required ? new FormControl(item.value || '', [Validators.required, this.validateEmailAddress])
          : new FormControl(item.value || '');
      } else if (item.type === 'tel') {
        group[item.key] = item.required ? new FormControl(item.value || '', [Validators.required, this.validatePhoneNumber])
          : new FormControl(item.value || '');
      } else if (item.type === 'cc-number') {
        group[item.key] = item.required ? new FormControl(item.value || '', [Validators.required, this.validateCreditCard])
          : new FormControl(item.value || '');
      } else if (item.type === 'cc-exp-date') {
        group[item.key] = item.required ? new FormControl(item.value || '', [Validators.required, <any>CreditCardValidator.validateExpDate])
          : new FormControl(item.value || '');
      } else if (item.type === 'cc-cvc') {
        group[item.key] = item.required ? new FormControl(item.value || '', [Validators.required, this.cvvValueValidator(100, 999)])
          : new FormControl(item.value || '');
      } else {
        group[item.key] = item.required ? new FormControl(item.value || '', Validators.required)
          : new FormControl(item.value || '');
      }

    });
    return new FormGroup(group);
  }

  validateCreditCard(control: FormControl) {
    let CC_REGEXP = /^4[0-9]{12}(?:[0-9]{3})?$/;

    return CC_REGEXP.test(control.value) ? null : {
      validateCC: {
        valid: false
      }
    };
  }

  validateEmailAddress(control: FormControl) {
    let EMAIL_REGEXP = /[^\s]+@[^\s]+\.[^\s]+/;

    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  validatePhoneNumber(control: FormControl) {
    return control.value.number !== undefined ? null : {
      validatePhone: {
        valid: false
      }
    };
  }

  cvvValueValidator = (min:number, max:number) => {
    return (control:FormControl) => {
      var num = +control.value;
      if(isNaN(num) || num < min){
        return {
          cvvValidate: {
            valid: false
          }
        };
      } else if (isNaN(num) || num > max)  {
        return {
          cvvValidate: {
            valid: false
          }
        };
      }
      return null;
    };
  };
}
