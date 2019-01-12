import {BaseEntityModel} from "../../baseEntity.model";

export class SeatTypeModel extends BaseEntityModel {
  constructor(
    public name: string,
    public description: string,
    public baseCost: number
  ) {
    super()
  }

}
