import { inject, injectable } from 'inversify';
import { AsyncParallelHook, AsyncSeriesHook } from 'tapable';
import { ILayer } from '../..';
import { TYPES } from '../../types';
import ICameraService from '../camera/ICameraService';
import { Uniform } from '../shader/ShaderModuleService';
import ILayerService from './ILayerService';

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
    this.layers.forEach((layer) => layer.init());
  }

  public async renderLayers() {
    await this.hooks.beforeRender.promise(...this.layers);
    this.layers.forEach((layer) =>
      layer.render({
        uniforms: {
          [Uniform.ProjectionMatrix]: this.camera.getProjectionMatrix(),
          [Uniform.ViewMatrix]: this.camera.getViewMatrix(),
          [Uniform.Zoom]: this.camera.getZoom(),
          [Uniform.ProjectionScale]: Math.pow(2, this.camera.getZoom()),
        },
      }),
    );
    await this.hooks.afterRender.promise(...this.layers);
  }
}
