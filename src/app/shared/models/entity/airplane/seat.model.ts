import {BaseEntityModel} from '../../baseEntity.model';
import {AirplanesModel} from './airplanes.model';
import {SeatTypeModel} from './seat-type.model';

export class SeatModel extends BaseEntityModel {
  constructor(
    public col: number,
    public row: number,
    public airplane: AirplanesModel,
    public seatType: SeatTypeModel,
    public modifier?: number
  ) {
    super();
  }


  toString(): string {
    return 'c:' + this.col + '.' +
      'r:' + this.row;
  }
}
