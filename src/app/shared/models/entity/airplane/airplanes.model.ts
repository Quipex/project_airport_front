import {BaseEntityModel} from '../../baseEntity.model';
import {AirlinesModel} from '../airline/airlines.model';

export class AirplanesModel extends BaseEntityModel {
  constructor(
    public model?: string,
    public airline?: AirlinesModel
  ) {
    super();
  }
}
