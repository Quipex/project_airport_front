export class SortEntityModel {

  public type: string;
  public order: boolean;

  constructor(
    type: number,
    order: boolean
  ) {
    this.type = 'ATTR'+type;
    this.order = order;
  }
}
