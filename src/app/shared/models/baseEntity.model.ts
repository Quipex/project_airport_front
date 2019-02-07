import {Listable} from '../dynamic-form/search-list/item.model';

export class BaseEntityModel implements Listable, Cloneable {
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

  clone(object: any) {
    if (object) {
      this.id = object.id;
      this.objectId = object.objectId;
      this.parentId = object.parentId;
      this.objectName = object.objectName;
      this.objectDescription = object.objectDescription;
    }
  }

  toString() {
    return 'objectId=[' + this.objectId + '] ';
  }

}
