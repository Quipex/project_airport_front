import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'toModifier'
})
export class ModifierPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    if (value === null) {
      return 1;
    }
    return value;
  }

}
