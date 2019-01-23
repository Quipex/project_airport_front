import {BaseEntityModel} from '../../../baseEntity.model';
import {PassengersModel} from './passengers.model';
import {PassportModel} from './passport.model';

export class PassengerPassportModel extends BaseEntityModel {
  constructor(
    public passenger?: PassengersModel,
    public passport?: PassportModel
  ) { super(); }
}
