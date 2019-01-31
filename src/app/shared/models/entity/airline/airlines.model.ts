import {BaseEntityModel} from '../../baseEntity.model';
import {Listable} from '../../../dynamic-form/search-list/item.model';

export class AirlinesModel extends BaseEntityModel implements Listable {

  getDisplayedName() {
    return this.name;
  }

  constructor(
    public name?: string,
    public descr?: string,
    public email?: string,
    public phoneNumber?: string
  ) {
    super();
  }

  toString(): string {
    return 'name: ' + this.name +
      ';description: ' + this.descr +
      ';email: ' + this.email +
      ';phone: ' + this.phoneNumber;
  }
}
