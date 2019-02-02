import {BaseEntityModel} from '../../baseEntity.model';

export class SeatTypeModel extends BaseEntityModel {
  constructor(
    public name: string,
    public modifier: number,
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
    return 'name: ' + this.name + ';modifier: ' + this.modifier + ';description: ' + this.description;
  }
}
