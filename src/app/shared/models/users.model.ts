import {AuthorityModel} from './authority.model';

export class UsersModel {
  constructor(
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public phonenumber?: string,
    public authority?: AuthorityModel,
    public enabled?: string,
    public id?: number
  ) {}

}
