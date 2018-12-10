export class ErrorContentModel {
  constructor(
    public debugMessage?: string,
    public message?: string,
    public status?: string,
    public timestamp?: string,
  ) {}
}
