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
  err(message: string, data: any = {}) {
    this.message = message;
    this.data = data;
    this.code = 20001;
    return this;
  }
}
export const R = new Res();
