import {Injectable} from '@angular/core';
import {InputBaseModel} from '../models/inputBase.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable()
export class FormControlService {
  constructor() { }

  toFormGroup(items: InputBaseModel<any>[] ) {
    let group: any = {};

    items.forEach(item => {
      if (item.type === 'email') {
        group[item.key] = item.required ? new FormControl(item.value || '', [Validators.required, Validators.email])
          : new FormControl(item.value || '');
      } else {
        group[item.key] = item.required ? new FormControl(item.value || '', Validators.required)
          : new FormControl(item.value || '');
      }

    });
    return new FormGroup(group);
  }
}
