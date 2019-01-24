import {BaseEntityModel} from '../../baseEntity.model';

export class SeatTypeModel extends BaseEntityModel {
  constructor(
    public name: string,
    public modifier: number,
    public description?: string
  ) {
    super();
  }

}
