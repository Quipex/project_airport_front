import {SeatTypeModel} from '../../shared/models/entity/airplane/seat-type.model';

export class SectionModel {
  constructor(
    public seatType: SeatTypeModel,
    public rows: number,
    public cols: number,
    public colorCode?: string
  ) {
  }

  toString(): string {
    return 'cols: ' + this.cols + '; rows: ' + this.rows + '; seatType: {' + this.seatType + '}';
  }
}
