import {BaseEntityModel} from "../../baseEntity.model";

export class CreditCardModel extends BaseEntityModel {
  constructor(
    public number?: string,
    public cvv?: string,
    public expirationDate?: string,
    public nickname?: string
  ) {
    super();
  }
}
