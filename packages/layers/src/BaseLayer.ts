import {
  gl,
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
import { SyncHook } from 'tapable';
import ShaderUniformPlugin from './plugins/ShaderUniformPlugin';

export default class BaseLayer implements ILayer {
  public styleOptions: ILayerStyleOptions;
  public name: string;

  public models: IModel[] = [];

  // 生命周期钩子
  public hooks = {
    beforeRender: new SyncHook(['layer']),
    afterRender: new SyncHook(['layer']),
  };

  // 插件集
  public plugins: ILayerPlugin[] = [
    // new CoordinatePlugin(),
    new ShaderUniformPlugin(),
  ];

  /**
   * @example
   * pointLayer.addPlugin(new MyCustomPlugin(), {
   *   before: 'L7BuiltinPlugin'
   * });
   */
  public addPlugin(plugin: ILayerPlugin) {
    // TODO: 控制插件注册顺序
    this.plugins.push(plugin);
  }

  public init(): void {
    throw new Error('Method not implemented.');
  }

  public style(options: ILayerStyleOptions): void {
    throw new Error('Method not implemented.');
  }
  public render(): void {
    throw new Error('Method not implemented.');
  }
  public source(options: { data: any }): void {
    throw new Error('Method not implemented.');
  }
}
