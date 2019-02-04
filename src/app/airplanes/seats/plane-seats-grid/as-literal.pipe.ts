import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asLiteral'
})
export class AsLiteralPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value >= 25) {
      return value.toString();
    } else {
      return String.fromCharCode(65 + value);
    }
  }

}
