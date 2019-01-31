import {Listable} from '../dynamic-form/search-list/item.model';

export class BaseEntityModel implements Listable {
  constructor(
    public id?: number,
    public objectId?: number,
    public parentId?: number,
    public objectName?: string,
    public objectDescription?: string,
  ) {
  }

  getDisplayedId() {
    return this.objectId;
  }

  getDisplayedName() {
    return this.objectName;
  }

}
