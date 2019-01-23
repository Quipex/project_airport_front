import {BaseEntityModel} from '../../baseEntity.model';
import {AuthorityModel} from './authority.model';

export class UsersModel extends BaseEntityModel {

  constructor(
    public login: string,
    public password: string,
    public email: string,
    public phoneNumber?: string,
    public nickname?: string,
    public authority?: AuthorityModel
  ) {
    super();
  }
}
