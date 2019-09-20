import { AsyncParallelHook, SyncHook } from 'tapable';
import { ILayerStyleOptions } from './ILayerStyleService';

export interface ILayer {
  styleOptions: ILayerStyleOptions;
  name: string;
  plugins: ILayerPlugin[];
  hooks: {
    beforeRender: SyncHook<unknown>;
    afterRender: SyncHook<unknown>;
  };
  init(): void;
  style(options: ILayerStyleOptions): void;
  render(): void;
  source(options: { data: any }): void;
  addPlugin(plugin: ILayerPlugin): void;
  addUniforms(uniforms: { [key: string]: any }): void;
}

export interface ILayerPlugin {
  apply(layer: ILayer): void;
}

/**
 * 提供 Layer 管理服务
 */
export default interface ILayerService {
  hooks: {
    /**
     * 渲染前调用
     */
    beforeRender: AsyncParallelHook<ILayer[]>;
    /**
     * 渲染后调用
     */
    afterRender: AsyncParallelHook<ILayer[]>;
  };
  add(layer: ILayer): void;
  initLayers(): void;
  renderLayers(): Promise<void>;
}
