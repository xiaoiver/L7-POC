import { isNil } from 'lodash';
import { CallbackType, IAttributeCfg } from './interface';
export default class Attribute {
  public type: string;
  public names: string[];
  public scales: any[] = [];
  public values: any[] = [];
  constructor(cfg: IAttributeCfg) {
    const {
      type = 'base',
      names = [],
      scales = [],
      values = [],
      callback,
    } = cfg;
    this.type = type;
    this.scales = scales;
    this.values = values;
    this.names = names;
    // 设置 range  TODO 2维映射
    this.scales.forEach((scale) => {
      scale.scale.range(values);
    });
    this.callback = (...params: any[]): any[] => {
      /**
       * 当用户设置的 callback 返回 null 时, 应该返回默认 callback 中的值
       */
      if (callback) {
        // 使用用户返回的值处理
        const ret = callback(...params);
        if (!isNil(ret)) {
          return [ret];
        }
      }

      // 没有 callback 或者用户 callback 返回值为空，则使用默认的逻辑处理
      return this.defaultCallback.apply(this, params);
    };
  }
  public callback: CallbackType = () => [];
  public mapping(...params: any[]): any[] {
    return this.callback.apply(this, params);
  }
  private defaultCallback(...params: any[]): any[] {
    // 没有 params 的情况，是指没有指定 fields，直接返回配置的 values 常量
    if (params.length === 0) {
      return this.values;
    }
    return params.map((param, idx) => {
      const scale = this.scales[idx];
      return scale.scale(param);
    });
  }
}
