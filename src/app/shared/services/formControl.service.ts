import {Injectable} from '@angular/core';
import {InputBaseModel} from '../models/inputBase.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
      } else {
        group[item.key] = item.required ? new FormControl(item.value || '', Validators.required)
          : new FormControl(item.value || '');
      }

    });
    return new FormGroup(group);
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
}
