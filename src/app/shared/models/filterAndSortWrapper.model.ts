import {SortEntityModel} from "./sortEntity.model";

export class FilterAndSortWrapperModel {
  constructor(
    public searchString?: string,
    public sortList?: SortEntityModel[],
    public filters?: Array<number>
  ) {
  }
}
