import {BaseEntityModel} from "../../baseEntity.model";

export class SeatModel extends BaseEntityModel {
  constructor(
    public col: number,
    public row: number,
    public airplaneId: number,
    public seatTypeId: number
  ) {
    super();
  }


  toString(): string {
    return "c:" + this.col + "." +
      "r:" + this.row + "." +
      "p:" + this.airplaneId + "." +
      "s:" + this.seatTypeId;
  }
}
