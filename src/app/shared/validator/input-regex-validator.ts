export class RegexValidator {
  static isInteger(input: string): boolean {
    return !!input.match(/^[0-9]+$/);
  }

  static isFloat(input: string): boolean {
    return !!input.match(/^[-+]?[0-9]*\.?[0-9]+$/);
  }
}
