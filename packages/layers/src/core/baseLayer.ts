import {
  glEnum,
  ILayer,
  ILayerPlugin,
  ILayerStyleOptions,
  ILayerStyleService,
  IModel,
  IModelDrawOptions,
  IRendererService,
  IShaderModuleService,
  lazyInject,
  packCircleVertex,
  TYPES,
} from '@l7-poc/core';
import Source, { ISourceCFG } from '@l7-poc/source';
import { isFunction } from 'lodash';
import { SyncHook } from 'tapable';
import Global from '../global';
import DataEncodePlugin from '../plugins/dataEncodePlugin';
import ShaderUniformPlugin from '../plugins/ShaderUniformPlugin';
import Base from './base';
import { AttrField } from './interface';
export default class BaseLayer extends Base implements ILayer {
  public styleOptions: ILayerStyleOptions;
  public name: string;

  public models: IModel[] = [];
  // 生命周期钩子
  public hooks = {
    init: new SyncHook(['layer']),
    beforeRender: new SyncHook(['layer']),
    afterRender: new SyncHook(['layer']),
  };

  // 插件集
  public plugins: ILayerPlugin[] = [
    // new CoordinatePlugin(),
    new DataEncodePlugin(),
    new ShaderUniformPlugin(),
  ];
  public getDefaultCfg() {
    return {
      attrsOption: {},
      scalesOption: {},
    };
  }
  public prepareRender(): void {
    throw new Error('Method not implemented.');
  }

  public addPlugin(plugin: ILayerPlugin) {
    // TODO: 控制插件注册顺序
    // @example:
    // pointLayer.addPlugin(new MyCustomPlugin(), {
    //   before: 'L7BuiltinPlugin'
    // });
    this.plugins.push(plugin);
  }
  public init(): void {
    this.hooks.init.call(this);
    this.prepareRender();
  }
  public color(field: AttrField, values?: any) {
    this.createAttrOption('color', field, values, Global.colors);
    return this;
  }
  public size(field: AttrField, values?: any) {
    this.createAttrOption('size', field, values, Global.size);
    return this;
  }
  public shape(field: AttrField, values?: any) {
    this.createAttrOption('shape', field, values, Global.shape);
    return this;
  }
  // public style(options: ILayerStyleOptions) {
  //   return this;
  // }
  public render(): ILayer {
    throw new Error('Method not implemented.');
  }
  public source(data: any, options?: ISourceCFG) {
    const source = new Source(data, options);
    this.set('source', source);
    return this;
  }

  private createAttrOption(
    attrName: string,
    field: AttrField,
    cfg: any,
    defaultValues: any,
  ) {
    const attrCfg: { [key: string]: any } = {};
    attrCfg.field = field;
    if (cfg) {
      isFunction(cfg) ? (attrCfg.callback = cfg) : (attrCfg.values = cfg);
    }
    const options = this.get('attrsOption');
    options[attrName] = attrCfg;
  }
}
