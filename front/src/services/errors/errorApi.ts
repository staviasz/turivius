export class ErrorApi extends Error {
  status: number;
  body: any;
  constructor(body: any, status: number, name?: string) {
    super();
    this.name = name || 'ErrorApi';
    this.status = status;
    this.body = body;
  }
}
