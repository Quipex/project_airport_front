export class AuthResponceModel {
  constructor(
    public email?: string,
    public authority?: string,
    public token?: string,
  ) {}

  fromJSON(json) {
    for (var propName in json)
      this[propName] = json[propName];
    return this;
  }

}
