export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequest";
    this.status = 400;
  }
}
