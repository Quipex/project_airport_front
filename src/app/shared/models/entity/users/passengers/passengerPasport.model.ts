import {BaseEntityModel} from '../../../baseEntity.model';
import {PassengersModel} from './passengers.model';
import {PassportModel} from './passport.model';

export class PassengerPassportModel extends BaseEntityModel implements Cloneable{
  constructor(
    public passenger?: PassengersModel,
    public passport?: PassportModel
  ) { super(); }


  clone(object: any) {
    super.clone(object);

    const tempPsngr = new PassengersModel();
    tempPsngr.clone(object.passenger);
    this.passenger = tempPsngr;

    const tempPsprt = new PassportModel();
    tempPsprt.clone(object.passport);
    this.passport = tempPsprt;
  }


  toString(): string {
    return super.toString() + 'psngr_psprt: {passenger: {' + this.passenger +
      '}; passport: {' + this.passport + '}}';
  }
}
