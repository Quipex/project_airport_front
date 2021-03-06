import {BaseEntityModel} from '../../baseEntity.model';
import {Listable} from '../../../dynamic-form/search-list/item.model';

export class AirlinesModel extends BaseEntityModel implements Listable, Cloneable {

  public name: string;
  public descr: string;
  public email: string;
  public phoneNumber: string;


  constructor(name?: string,
              descr?: string,
              email?: string,
              phoneNumber?: string,
              id?: number,
              objectId?: number,
              parentId?: number,
              objectName?: string,
              objectDescription?: string,
  ) {
    super(id, objectId, parentId, objectName, objectDescription);
    this.name = name;
    this.descr = descr;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }

  getDisplayedName() {
    return this.name;
  }

  toString(): string {
    return super.toString() + 'name: ' + this.name +
      ';description: ' + this.descr +
      ';email: ' + this.email +
      ';phone: ' + this.phoneNumber;
  }

  clone(object: any) {
    super.clone(object);
    if (object) {
      this.name = object.name;
      this.descr = object.descr;
      this.email = object.email;
      this.phoneNumber = object.phoneNumber;
    }
  }
}
