import {BaseEntityModel} from '../../baseEntity.model';

export class SeatTypeModel extends BaseEntityModel {
  constructor(
    public name: string,
    public modifier: number,
    public description?: string
  ) {
    super();
  }


  toString(): string {
    return 'name: ' + this.name + ';modifier: ' + this.modifier + ';description: ' + this.description;
  }
}
