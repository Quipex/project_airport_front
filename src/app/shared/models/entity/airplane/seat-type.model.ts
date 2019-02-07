import {BaseEntityModel} from '../../baseEntity.model';

export class SeatTypeModel extends BaseEntityModel implements Cloneable {
  constructor(
    public name?: string,
    public modifier?: number,
    public description?: string,
    objectId?: number,
    parentId?: number,
    objectName?: string,
    objectDescription?: string,
    id?: number
  ) {
    super(
      id,
      objectId,
      parentId,
      objectName,
      objectDescription
    );
  }


  toString(): string {
    return super.toString() + 'name: ' + this.name + ';modifier: ' + this.modifier +
      ';description: ' + this.description;
  }


  clone(object: any) {
    super.clone(object);
    if (object) {
      this.name = object.name;
      this.modifier = object.modifier;
      this.description = object.description;
    }
  }
}
