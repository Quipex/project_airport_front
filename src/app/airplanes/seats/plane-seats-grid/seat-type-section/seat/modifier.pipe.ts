import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toModifier'
})
export class ModifierPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    if (value === null || value === undefined || value < 0) {
      return 1;
    }
    return value;
  }

}
