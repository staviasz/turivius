export class ErrorApi extends Error {
  status: number;
  body: any;
  constructor(body: any, status: number, name?: string) {
    super();
    this.name = name || 'ErrorApi';
    this.status = status;
    this.body = body ? this.cleanErrormessages(body) : undefined;
  }

  private cleanErrormessages(body: any) {
    const { errors } = body;
    const newErrors: string[] = errors.map((error: { message: string }) => {
      const { message } = error;
      return message;
    });
    return newErrors;
  }
}
