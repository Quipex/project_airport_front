import {BaseEntityModel} from '../../baseEntity.model';
import {ExtraTypeModel} from './extra-type.model';
import {AirplanesModel} from './airplanes.model';

export class ExtraModel extends BaseEntityModel {
  constructor(
    public extraType: ExtraTypeModel,
    public airplane: AirplanesModel
  ) {
    super();
  }
}
