import {BaseEntityModel} from "./baseEntity.model";

export class ChangePasswordModel extends BaseEntityModel{
  constructor(
    public oldPassword?: string,
    public newPassword?: string,
    public confirmPassword?: string
  ) {
    super();
  }
}
