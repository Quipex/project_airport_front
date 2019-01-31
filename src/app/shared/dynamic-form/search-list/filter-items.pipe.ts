import {Pipe, PipeTransform} from '@angular/core';
import {Listable} from './item.model';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(value: Listable[], substring: string): Listable[] {
    if (value === undefined) {
      return [];
    }

    const matchingItems = [];
    for (const item of value) {
      const upperOrigin = item.getDisplayedName().toUpperCase();
      const upperSubstr = substring.toUpperCase();
      if (upperOrigin.includes(upperSubstr)) {
        matchingItems.push(item);
      }
    }
    return matchingItems;
  }

}
