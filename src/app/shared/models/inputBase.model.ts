export class InputBaseModel<T> {
  value: any;
  key: string;
  label: string;
  required: boolean;
  order: number;
  type: string;
  edit: boolean;
  minDate: any;

  constructor(options: {
    value?: any,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    type?: string,
    edit?: boolean,
    minDate?: any,
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.type = options.type || '';
    this.edit = options.edit;
    this.minDate = options.minDate;
  }
}
