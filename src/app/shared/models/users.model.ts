import {BaseEntityModel} from './baseEntity.model';
import {AuthorityModel} from './authority.model';

export class UsersModel extends BaseEntityModel {

  constructor(
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public phoneNumber?: string,
    public authority?: AuthorityModel,
    public enabled?: string,
  ) {
    super();
  }

}
