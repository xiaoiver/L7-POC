import { inject, injectable } from 'inversify';
import { AsyncParallelHook } from 'tapable';
import { ILayer } from '../..';
import { TYPES } from '../../types';
import ICameraService from '../camera/ICameraService';
import ILayerService from './ILayerService';
import ILayerStyleService from './ILayerStyleService';

@injectable()
export default class LayerService implements ILayerService {
  public hooks: {
    /**
     * 渲染前调用
     */
    beforeRender: AsyncParallelHook<ILayer[]>;
    /**
     * 渲染后调用
     */
    afterRender: AsyncParallelHook<ILayer[]>;
  };

  private layers: ILayer[] = [];

  @inject(TYPES.ICameraService)
  private readonly camera: ICameraService;

  @inject(TYPES.ILayerStyleService)
  private readonly layerStyleService: ILayerStyleService;

  constructor() {
    this.hooks = {
      beforeRender: new AsyncParallelHook<ILayer[]>(['layers']),
      afterRender: new AsyncParallelHook<ILayer[]>(['layers']),
    };
  }

  public add(layer: ILayer) {
    this.layers.push(layer);
  }

  public initLayers() {
    this.layers.forEach((layer) => {
      // register plugins in every layer
      for (const plugin of layer.plugins) {
        plugin.apply(layer);
      }
      layer.init();
    });
  }

  public async renderLayers() {
    await this.hooks.beforeRender.promise(...this.layers);
    this.layers.forEach((layer) => {
      // trigger hooks
      layer.hooks.beforeRender.call(layer);
      layer.render();
      layer.hooks.afterRender.call(layer);
    });
    await this.hooks.afterRender.promise(...this.layers);
  }
}
