import {BaseEntityModel} from "../../baseEntity.model";

export class ExtraModel extends BaseEntityModel{
  constructor(
    public extraTypeId: number,
    public airplaneId: number
  ) {
    super()
  }
}
