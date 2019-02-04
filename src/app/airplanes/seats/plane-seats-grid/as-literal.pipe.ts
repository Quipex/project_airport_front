import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'asLiteral'
})
export class AsLiteralPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    const charCode = value.toString().split('').map(c => (+c || 10) + 0x40);
    return String.fromCharCode(...charCode);
  }

}
