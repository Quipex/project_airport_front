import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'half'
})
export class HalfPipe implements PipeTransform {

  transform(value: number, args?: any): number {
    if (value === 0) {
      return 0;
    }
    return value / 2;
  }

}
