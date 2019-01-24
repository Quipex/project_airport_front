export class AuthResponseModel {
  constructor(
    public login?: string,
    public token?: string,
  ) {
  }

  fromJSON(json) {
    for (var propName in json)
      this[propName] = json[propName];
    return this;
  }

}
