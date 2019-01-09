import {BaseEntityModel} from '../../baseEntity.model';

export class ExtraTypeModel extends BaseEntityModel {
  constructor(
    public name?: string,
    public descr?: string,
    public baseCost?: number
  ) {
    super();
  }
}
