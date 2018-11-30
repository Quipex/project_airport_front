import {UsersModel} from './users.model';

export class UserFilteringWrapperModel {
  constructor(
    public users?: UsersModel[],
    public countOfPages?: number
  ) {}

}
