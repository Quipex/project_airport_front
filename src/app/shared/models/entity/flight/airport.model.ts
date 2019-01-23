import {BaseEntityModel} from '../../baseEntity.model';
import {CountriesModel} from './countries.model';

export class AirportModel extends BaseEntityModel {
  constructor(
    public name?: string,
    public country?: CountriesModel,
    public address?: string,
    public city?: string
  ) {
    super();
  }
}
