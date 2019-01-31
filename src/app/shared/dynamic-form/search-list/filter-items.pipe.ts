import {Pipe, PipeTransform} from '@angular/core';
import {ListItemModel} from './item.model';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(value: ListItemModel[], substring: string): ListItemModel[] {
    const matchingItems = [];
    for (const item of value) {
      const upperOrigin = item.name.toUpperCase();
      const upperSubstr = substring.toUpperCase();
      if (upperOrigin.includes(upperSubstr)) {
        matchingItems.push(item);
      }
    }
    return matchingItems;
  }

}
