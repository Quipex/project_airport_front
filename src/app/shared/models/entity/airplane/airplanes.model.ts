import {BaseEntityModel} from "../../baseEntity.model";

export class AirplanesModel extends BaseEntityModel{
  constructor(
    public model?: string,
    public airlineId?: number
  ) {
    super();
  }
}
