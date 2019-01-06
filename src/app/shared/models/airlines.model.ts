import {BaseEntityModel} from './baseEntity.model';

export class AirlinesModel extends BaseEntityModel {
  constructor(
    public name?: string,
    public descr?: string,
    public email?: string,
    public phoneNumber?: string,
  ) {
    super();
  }
}
