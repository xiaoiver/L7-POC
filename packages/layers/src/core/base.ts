import { EventEmitter } from 'eventemitter3';
export default class Base extends EventEmitter {
  private attrs: { [key: string]: any } = {};
  private destroyed: boolean = false;
  constructor(cfg: any) {
    super();
    const defaultCfg = this.getDefaultCfg();
    Object.assign(this.attrs, defaultCfg, cfg);
  }
  public getDefaultCfg() {
    return {};
  }
  public get(name: string) {
    return this.attrs[name];
  }

  public set(name: string, value: any) {
    this.attrs[name] = value;
  }
  public destroy() {
    this.attrs = {};
    this.removeAllListeners();
    this.destroyed = true;
  }
}
