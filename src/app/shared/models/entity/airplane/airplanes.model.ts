import {BaseEntityModel} from '../../baseEntity.model';
import {AirlinesModel} from '../airline/airlines.model';

export class AirplanesModel extends BaseEntityModel {

  public model: string;
  public airline: AirlinesModel;


  constructor(model: string,
              airline: AirlinesModel,
              id?: number,
              objectId?: number,
              parentId?: number,
              objectName?: string,
              objectDescription?: string
  ) {
    super(id, objectId, parentId, objectName, objectDescription);
    this.model = model;
    this.airline = airline;
  }

  toString(): string {
    return 'model: ' + this.model +
      ';airline {' + this.airline + '}';
  }
}
