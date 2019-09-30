import { extent } from 'd3-array';
import * as d3 from 'd3-scale';
import { isNil, isNumber, isString, uniq } from 'lodash';
const dateRegex = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/;

interface IScale {
  field?: string;
  type: string;
  ticks?: any[];
  nice?: boolean;
  format?: () => any;
  domain?: any[];
}
interface IScalesOption {
  [key: string]: IScale;
}
interface IScaleMap {
  [key: string]: () => any;
}
enum ScaleTypes {
  LINEAR = 'linear',
  POWER = 'power',
  LOG = 'log',
  IDENTITY = 'identity',
  TIME = 'time',
  QUANTILE = 'quantile',
  QUANTIZE = 'quantize',
  THRESHOLD = 'threshold',
  CAT = 'cat',
}
const scaleMap: IScaleMap = {
  linear: d3.scaleLinear,
  power: d3.scalePow,
  log: d3.scaleLog,
  identity: d3.scaleIdentity,
  time: d3.scaleTime,
  quantile: d3.scaleQuantile,
  quantize: d3.scaleQuantize,
  threshold: d3.scaleThreshold,
  cat: d3.scaleOrdinal,
};

export default class ScaleController {
  private scalesOption: IScalesOption;
  constructor(cfg: IScalesOption) {
    this.scalesOption = cfg;
  }

  public createScale(field: string, data?: any[]) {
    let scaleOption: IScale = this.scalesOption[field];
    const scale: { field: string; scale?: any } = {
      field,
    };
    if (!data || !data.length) {
      // 数据为空
      scale.scale =
        scaleOption && scaleOption.type
          ? this.generateScale(scaleOption.type, scaleOption)
          : d3.scaleOrdinal([field]);
      return scale;
    }
    let firstValue = null;
    data.some((item) => {
      if (!isNil(item[field])) {
        firstValue = item[field];
        return true;
      }
      firstValue = null;
    });
    // 常量 Scale
    if (isNumber(field) || (isNil(firstValue) && !scaleOption)) {
      scale.scale = d3.scaleOrdinal([field]);
    } else {
      // 根据数据类型判断 默认等分位，时间，和枚举类型
      const type =
        scaleOption && scaleOption.type
          ? scaleOption.type
          : this.getDefaultType(field, firstValue);
      const cfg = this.getScaleCfg(type, field, data);
      Object.assign(cfg, scaleOption);
      scaleOption = cfg;
      scale.scale = this.generateScale(type, cfg);
    }
    return scale;
  }

  private getDefaultType(field: string, firstValue: any) {
    let type = ScaleTypes.QUANTIZE;
    if (dateRegex.test(firstValue)) {
      type = ScaleTypes.TIME;
    } else if (isString(firstValue)) {
      type = ScaleTypes.CAT;
    }
    return type;
  }

  private getScaleCfg(type: string, field: string, data: any[]) {
    const cfg: IScale = {
      field,
      type,
    };
    const values = data.map((item) => item[field]);
    // 默认类型为 Quantile Scales https://github.com/d3/d3-scale#quantile-scales
    if (type !== ScaleTypes.CAT && type !== ScaleTypes.QUANTILE) {
      cfg.domain = extent(values);
    } else if (type === ScaleTypes.CAT) {
      cfg.domain = uniq(values);
    }
    return cfg;
  }
  private generateScale(type: string, scaleOption: IScale) {
    const scale = scaleMap[type]();
    if (scaleOption.hasOwnProperty('domain')) {
      scale.domain(scaleOption.domain);
    }
    // TODO 其他属性支持
    return scale;
  }
}
