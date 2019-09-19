import { AsyncParallelHook, AsyncSeriesHook } from 'tapable';
import { IModelDrawOptions } from '../renderer/IRendererService';

interface IStyleOptions {
  [key: string]: any;
}

export interface ILayer {
  name: string;
  styleOptions: IStyleOptions;
  init(): void;
  style(options: IStyleOptions): void;
  render(options: IModelDrawOptions): void;
  source(options: { data: any }): void;
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
