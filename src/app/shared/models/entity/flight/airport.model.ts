import {BaseEntityModel} from "../../baseEntity.model";

export class AirportModel extends BaseEntityModel {
  constructor(
    public name?: string,
    public countryId?: number,
    public address?: string,
    public city?: string
  ) {
    super();
  }
}
