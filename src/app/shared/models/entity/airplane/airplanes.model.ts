import {BaseEntityModel} from '../../baseEntity.model';
import {AirlinesModel} from '../airline/airlines.model';

export class AirplanesModel extends BaseEntityModel implements Cloneable {

  public model: string;
  public airline: AirlinesModel;
  public versionNum: number;
  public airlineId: number;

  constructor(model?: string,
              airline?: AirlinesModel,
              versionNum?: number,
              id?: number,
              objectId?: number,
              parentId?: number,
              objectName?: string,
              objectDescription?: string
  ) {
    super(id, objectId, parentId, objectName, objectDescription);
    this.model = model;
    this.airline = airline;
    this.versionNum = versionNum;
  }

  toString(): string {
    return 'model: ' + this.model +
      ';airline {' + this.airline + '}' +
      ';version: ' + this.versionNum;
  }


  clone(object: any) {
    super.clone(object);
    if (object) {
      this.model = object.model;
      const tempAirline = new AirlinesModel();
      tempAirline.clone(object.airline);
      this.airline = object.airline;
      this.versionNum = object.versionNum;
    }
  }
}
