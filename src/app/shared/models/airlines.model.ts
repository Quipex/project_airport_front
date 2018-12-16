import {BaseEntityModel} from './baseEntity.model';

export class AirlinesModel extends BaseEntityModel{
  constructor(
    public name?: string,
    public descr?: string,
    public email?: string,
    public phonenumber?: string,
    public id?: number
  ) {
    super();
  }
}
