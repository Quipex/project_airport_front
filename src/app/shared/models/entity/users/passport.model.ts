import {BaseEntityModel} from "../../baseEntity.model";

export class PassportModel extends BaseEntityModel {
  constructor(
    public serialNumber?: string,
    public country?: string,
    public birthDate?: Date,
  ) {
    super();
  }
}
