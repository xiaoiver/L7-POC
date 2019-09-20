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
import { SyncHook } from 'tapable';
import ShaderUniformPlugin from './plugins/ShaderUniformPlugin';

export default class BaseLayer implements ILayer {
  public styleOptions: ILayerStyleOptions;
  public name: string;
  public uniforms: { [key: string]: any } = {};

  // 生命周期钩子
  public hooks = {
    beforeRender: new SyncHook(['layer']),
    afterRender: new SyncHook(['layer']),
  };

  // 插件集
  public plugins: ILayerPlugin[] = [new ShaderUniformPlugin()];

  public addPlugin(plugin: ILayerPlugin) {
    // TODO: 控制插件注册顺序
    this.plugins.push(plugin);
  }

  public addUniforms(uniforms: { [key: string]: any }): void {
    this.uniforms = {
      ...this.uniforms,
      ...uniforms,
    };
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
