export class Exception extends Error {
  private status: number;

  constructor(message: string, status: number) {
    super(message);
    this.message = message;
    this.status = status;
  }

  public getStatus() {
    return this.status;
  }
}
