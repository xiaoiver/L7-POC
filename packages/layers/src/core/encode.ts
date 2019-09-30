import Attribute from '@l7-poc/attr';
import { ILayer } from '@l7-poc/core';
import { isString } from 'lodash';
import { rgb2arr } from '../utils/color';
import { IAttrOption, ILayerData } from './interface';
import ScaleController from './scale';

export default class Encode {
  public layer: ILayer;
  public scales: any = {};
  public attrs: any = {};
  public encodeData: any[];
  public scaleController: ScaleController;
  constructor(layer: ILayer) {
    this.layer = layer;
    this.init();
  }
  public reMapping(): ILayerData {
    throw new Error('Method not implemented.');
  }
  private init(): void {
    this.initScale();
    this.initAttr();
    this.mapping();
  }
  private initScale(): void {
    const scalesOption = this.layer.get('scalesOption');
    this.scaleController = new ScaleController(scalesOption);
  }
  private initAttr(): void {
    const attrsOption = this.layer.get('attrsOption');
    for (const type in attrsOption) {
      if (attrsOption.hasOwnProperty(type)) {
        this.attr(type);
      }
    }
  }
  private attr(type: string): void {
    const attrs = this.attrs;
    const attrsOption = this.layer.get('attrsOption');
    const option: IAttrOption = attrsOption[type];

    const scales: any[] = [];
    const attrFields = this.parseFields(option.field);
    for (const index in attrFields) {
      if (attrFields.hasOwnProperty(index)) {
        const scale = this.createScale(attrFields[index]); // scale copy
        // TODO option 默认值配置
        scales.push(scale);
      }
    }
    option.type = type;
    option.scales = scales;

    attrs[type] = new Attribute(option);
  }

  private createScale(field: string) {
    const scales = this.scales;
    let scale = scales[field];
    if (!scale) {
      const source = this.layer.get('source');
      const dataArray = source.data.dataArray;
      scale = this.scaleController.createScale(field, dataArray);
      scales[field] = scale;
    }
    return {
      field: scale.field,
      scale: scale.scale.copy(),
    };
  }

  private mapping(): void {
    const attrs = this.attrs;
    const data = this.layer.get('source').data.dataArray;
    this.encodeData = data.map((record: any) => {
      const encodeRecord: { [key: string]: any } = {
        id: record._id,
        coordinates: record.coordinates,
      };
      // TODO 数据过滤
      for (const k in attrs) {
        if (attrs.hasOwnProperty(k)) {
          const attr = attrs[k];
          let values = this.getAttrValue(attr, record);
          if (k === 'color') {
            values = values.map((c: string) => {
              return rgb2arr(c);
            });
          }
          encodeRecord[k] =
            Array.isArray(values) && values.length === 1 ? values[0] : values;
        }
      }
      return encodeRecord;
    });
  }

  private getAttrValue(attr: any, record: { [key: string]: any }) {
    const scales = attr.scales;
    const params = [];
    for (const i in scales) {
      if (scales.hasOwnProperty(i)) {
        const scale = scales[i];
        const field = scale.field;
        if (record[field]) {
          params.push(record[field]);
        }
      }
    }
    return attr.mapping(...params);
  }

  private parseFields(field: string | number | any[]): any[] {
    if (Array.isArray(field)) {
      return field;
    }
    if (isString(field)) {
      return field.split('*');
    }
    return [field];
  }
}
