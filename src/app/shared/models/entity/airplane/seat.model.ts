import {BaseEntityModel} from '../../baseEntity.model';
import {AirplanesModel} from './airplanes.model';
import {SeatTypeModel} from './seat-type.model';

export class SeatModel extends BaseEntityModel implements Cloneable {
  constructor(
    public col?: number,
    public row?: number,
    public airplane?: AirplanesModel,
    public seatType?: SeatTypeModel,
    public modifier?: number,
    public isBooked?: boolean,
    public cost?: number,
    id?: number,
    objectId?: number,
    parentId?: number,
    objectName?: string,
    objectDescription?: string
  ) {
    super(id, objectId, parentId, objectName, objectDescription);
  }


  toString(): string {
    return super.toString() + 'col:' + this.col +
      ';row:' + this.row +
      ';airplane:{' + this.airplane + '}' +
      ';seattype:{' + this.seatType + '}' +
      ';modifier:' + this.modifier;
  }

  clone(object: any) {
    super.clone(object);
    if (object) {
      this.col = object.col;
      this.row = object.row;

      const tempAirplane = new AirplanesModel();
      tempAirplane.clone(object.airplane);
      this.airplane = tempAirplane;

      const tempSeatType = new SeatTypeModel();
      tempSeatType.clone(object.seatType);
      this.seatType = tempSeatType;

      this.modifier = object.modifier;
      this.isBooked = object.isBooked;
      this.cost = object.cost;
    }
  }
}
