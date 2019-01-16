import {BaseEntityModel} from "../../../baseEntity.model";
import {PassportModel} from "./passport.model";

export class PassengersModel extends BaseEntityModel{
  constructor(
    public firstName?: string,
    public lastName?: string,
    public passport?: PassportModel
  ) {
    super();
  }
}
