import {BaseEntityModel} from "../../baseEntity.model";

export class PassengersModel extends BaseEntityModel{
  constructor(
    public firstName?: string,
    public lastName?: string,
    public passportId?: number
  ) {
    super();
  }
}
