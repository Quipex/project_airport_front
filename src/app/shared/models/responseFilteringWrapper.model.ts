import {BaseEntityModel} from "./baseEntity.model";

export class ResponseFilteringWrapperModel {
  constructor(
    public entities?: BaseEntityModel[],
    public countOfPages?: number
  ) {}

}
