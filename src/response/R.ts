export interface ResponseInterFace {
  code: number;
  message: string;
  data: any;
  type: 'success' | 'error';
}

export class Res<T = any> implements ResponseInterFace {
  code: number;
  message: string;
  data: T;
  type: 'success' | 'error';

  ok(message: string, data: any = {}) {
    this.message = message;
    this.data = data;
    this.code = 20000;
    this.type = 'success';
    return this;
  }
  err(message: string, code = 20001, data: any = {}) {
    this.message = message;
    this.data = data;
    this.code = code;
    this.type = 'error';
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
