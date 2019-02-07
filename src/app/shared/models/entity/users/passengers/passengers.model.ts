import {BaseEntityModel} from '../../../baseEntity.model';
import {PassportModel} from './passport.model';

export class PassengersModel extends BaseEntityModel {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public passport?: PassportModel
  ) {
    super();
  }


  toString(): string {
    return super.toString() + 'firstName: ' + this.firstName +
      ';lastName: ' + this.lastName +
      ';passport: {' + this.passport + '}';
  }


  clone(object: any) {
    super.clone(object);
    this.firstName = object.firstName;
    this.lastName = object.lastName;
  }
}
