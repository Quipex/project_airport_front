import {Injectable} from '@angular/core';
import {SeatTypeModel} from '../../shared/models/entity/airplane/seat-type.model';

@Injectable()
export class SeatColorService {
  private colors: Set<string> = new Set([
    '#83d8be',
    '#c18aa6',
    '#ff8791',
    '#7cc4ff',
    '#ffcc85',
    '#70c36e',
    '#6d75c3',
    '#a1c345',
    '#a87fc3',
    '#a9557e'
  ]);

  private typeIdsToColors = new Map<number, string>();

  public addColor(colorCode: string) {
    this.colors.add(colorCode);
  }

  public removeColor(colorCode: string) {
    this.colors.delete(colorCode);
  }

  public getColors(): string[] {
    const iterator = this.colors.values();
    let res = iterator.next();
    const colors = [];
    while (!res.done) {
      colors.push(res.value);
      res = iterator.next();
    }
    return colors;
  }

  public setColorForSeatType(sType: SeatTypeModel, colorCode: string) {
    this.typeIdsToColors.set(sType.objectId, colorCode);
  }

  public getColorByNum(num: number): string {
    const numCodes = this.colors.size;
    let index = num % numCodes;
    const colorIterator = this.colors.values();
    let result;
    index++;
    while (index--) {
      result = colorIterator.next();
    }
    return result.value;
  }

  public getColorBySeatType(seatType: SeatTypeModel): string {
    if (this.typeIdsToColors.get(seatType.objectId) === undefined) {
      const colorCode = this.getColorByNum(this.typeIdsToColors.size);
      this.typeIdsToColors.set(seatType.objectId, colorCode);
    }
    return this.typeIdsToColors.get(seatType.objectId);
  }
}
