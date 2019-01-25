import {BaseEntityModel} from '../../baseEntity.model';

export class AirlinesModel extends BaseEntityModel {
  constructor(
    public name?: string,
    public descr?: string,
    public email?: string,
    public phoneNumber?: string,
  ) {
    super();
  }

  toString(): string {
    return 'name: ' + this.name +
      ';description: ' + this.descr +
      ';email: ' + this.email +
      ';phone: ' + this.phoneNumber;
  }
}
