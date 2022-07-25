interface ResponseInterFace {
  code: number;
  message: string;
  data: any;
}

export class Res implements ResponseInterFace {
  code: number;
  message: string;
  data: any;
  type = 'success';

  ok(message: string, data: any = {}) {
    this.message = message;
    this.data = data;
    this.code = 20000;
    return this;
  }
  err(message: string, code = 20001, data: any = {}) {
    this.message = message;
    this.data = data;
    this.code = code;
    return this;
  }
  getStatus() {
    return 200;
  }
  getResponse() {
    return this;
  }
}
export const R = new Res();
