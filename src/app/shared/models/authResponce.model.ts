export class AuthResponceModel {
  public user?: string;
  public token?: string;

  fromJSON(json) {
    for (var propName in json)
      this[propName] = json[propName];
    return this;
  }

}
