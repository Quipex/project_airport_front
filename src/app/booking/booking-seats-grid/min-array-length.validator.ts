import {AbstractControl, ValidatorFn} from '@angular/forms';

export function minArrayLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const longEnough = control.value.length >= minLength;
    return longEnough ? null : {'notLongEnough': {value: control.value.length}};
  };
}
