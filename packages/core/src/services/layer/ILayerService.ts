import { AsyncParallelHook, SyncHook } from 'tapable';
import { IMapConfig } from '../map/IMapService';
import IModel from '../renderer/IModel';
import { IRenderConfig } from '../renderer/IRendererService';
import { ILayerStyleOptions } from './ILayerStyleService';

export interface ILayer {
  styleOptions: ILayerStyleOptions;
  name: string;
  plugins: ILayerPlugin[];
  hooks: {
    beforeRender: SyncHook<unknown>;
    afterRender: SyncHook<unknown>;
  };
  models: IModel[];
  init(): void;
  style(options: ILayerStyleOptions): void;
  render(): void;
  source(options: { data: any }): void;
  addPlugin(plugin: ILayerPlugin): void;
}

export interface ILayerPlugin {
  apply(layer: ILayer): void;
}

/**
 * 提供 Layer 管理服务
 */
export default interface ILayerService {
  add(layer: ILayer): void;
  initLayers(): void;
  renderLayers(enableMultiPassRenderer: boolean): void;
}
