import {Injectable} from '@angular/core';
import {InputBaseModel} from '../shared/models/inputBase.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreditCardValidator} from 'ng2-cc-library';

@Injectable()
export class FormControlService {
  constructor() {
  }

  toFormGroup(items: InputBaseModel<any>[]) {
    const group: any = {};

    let validators: {};
    items.forEach(item => {
      switch (item.type) {
        case 'email': {
          validators = [Validators.required, this.validateEmailAddress];
          break;
        }
        case 'tel': {
          validators = [Validators.required, this.validatePhoneNumber];
          break;
        }
        case 'cc-number': {
          validators = [Validators.required, this.validateCreditCard];
          break;
        }
        case 'cc-exp-date': {
          validators = [Validators.required, <any>CreditCardValidator.validateExpDate];
          break;
        }
        case 'cc-cvc': {
          validators = [Validators.required, this.cvvValueValidator(100, 999)];
          break;
        }
        case 'airlines-selector': {
          validators = [Validators.required];
          break;
        }
        default: {
          validators = [Validators.required];
          break;
        }
      }
      group[item.key] = item.required ? new FormControl(item.value || '', validators)
        : new FormControl(item.value || '');
    });
    return new FormGroup(group);
  }

  validateCreditCard(control: FormControl) {
    const CC_REGEXP = /^4[0-9]{12}(?:[0-9]{3})?$/;

    return CC_REGEXP.test(control.value) ? null : {
      validateCC: {
        valid: false
      }
    };
  }

  validateEmailAddress(control: FormControl) {
    const EMAIL_REGEXP = /[^\s]+@[^\s]+\.[^\s]+/;

    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  validatePhoneNumber(control: FormControl) {
    if (control.value === null) {
      return {
        validatePhone: {
          valid: false
        }
      };
    }

    return control.value.number !== undefined ? null : {
      validatePhone: {
        valid: false
      }
    };
  }

  cvvValueValidator = (min: number, max: number) => {
    return (control: FormControl) => {
      const num = +control.value;
      if (isNaN(num) || num < min) {
        return {
          cvvValidate: {
            valid: false
          }
        };
      } else if (isNaN(num) || num > max) {
        return {
          cvvValidate: {
            valid: false
          }
        };
      }
      return null;
    };
  }
}
