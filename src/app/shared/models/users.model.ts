export class UsersModel {
  constructor(
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public phonenumber?: string,
    public authority?: string,
    public enabled?: string,
    public id?: number
  ) {}

}
