export class BaseEntityModel {
  constructor(
    public id?: number,
    public objectId?: number,
    public parentId?: number,
    public objectName?: string,
    public objectDescription?: string,
  ) {
  }

}
