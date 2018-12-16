import {ErrorContentModel} from './errorContent.model';

export class ResponseErrorModel {
  constructor(
    public name?: string,
    public message?: string,
    public status?: number,
    public error?: ErrorContentModel
  ) {}
}
