import {BaseEntityModel} from '../../../baseEntity.model';

export class PassengerPassportCommonModel extends BaseEntityModel {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public serialNumber?: string,
    public country?: string,
    public birthDate?: Date,
  ) {
    super();
  }
}
