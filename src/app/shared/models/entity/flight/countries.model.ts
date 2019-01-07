import {BaseEntityModel} from '../../baseEntity.model';

export class CountriesModel extends BaseEntityModel {
  constructor(
    public name?: string,
  ) {
    super();
  }
}
