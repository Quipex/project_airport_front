import {BaseEntityModel} from '../../../baseEntity.model';

export class PassportModel extends BaseEntityModel implements Cloneable {
  constructor(
    public serialNumber?: string,
    public country?: string,
    public birthDate?: string,
  ) {
    super();
  }

  clone(object: any) {
    super.clone(object);
    this.serialNumber = object.serialNumber;
    this.country = object.country;
    this.birthDate = object.birthDate
  }


  toString(): string {
    return super.toString() + 'serialNumber: ' + this.serialNumber +
      ';country: ' + this.country +
      ';birthDate: ' + this.birthDate;
  }
}
