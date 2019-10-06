import { inject, injectable } from 'inversify';
import { container, ILayer } from '../..';
import { TYPES } from '../../types';
import IGlobalConfigService from '../config/IConfigService';
import { IPass } from '../renderer/IMultiPassRenderer';
import IRendererService from '../renderer/IRendererService';
import ILayerService from './ILayerService';

@injectable()
export default class LayerService implements ILayerService {
  private layers: ILayer[] = [];

  @inject(TYPES.IRendererService)
  private readonly renderService: IRendererService;

  @inject(TYPES.IGlobalConfigService)
  private readonly configService: IGlobalConfigService;

  public add(layer: ILayer) {
    this.layers.push(layer);
  }

  public initLayers() {
    if (this.configService.getConfig().enableMultiPassRenderer) {
      this.initMultiPassRenderer();
    }
    this.layers.forEach((layer) => {
      // register plugins in every layer
      for (const plugin of layer.plugins) {
        plugin.apply(layer);
      }
      layer.init();
    });
  }

  public renderLayers(force: boolean) {
    if (!this.configService.getConfig().enableMultiPassRenderer || force) {
      this.renderService.clear({
        color: [0, 0, 0, 0],
        depth: 1,
        framebuffer: null,
      });
      this.layers.forEach((layer) => {
        // trigger hooks
        layer.hooks.beforeRender.call(layer);
        layer.render();
        layer.hooks.afterRender.call(layer);
      });
    } else {
      const { width, height } = this.renderService.getViewportSize();
      const multiPassRenderer = this.renderService.getMultiPassRenderer();
      multiPassRenderer.resize(width, height);
      multiPassRenderer.render();
    }
  }

  private initMultiPassRenderer() {
    const multiPassRenderer = this.renderService.getMultiPassRenderer();
    // TODO: PickingPass
    multiPassRenderer.add(container.get<IPass>(TYPES.ClearPass));
    multiPassRenderer.add(container.get<IPass>(TYPES.RenderPass));
    // post processing
    // multiPassRenderer.add(container.get<IPass>(TYPES.BlurHPass));
    // multiPassRenderer.add(container.get<IPass>(TYPES.BlurVPass));
    multiPassRenderer.add(container.get<IPass>(TYPES.CopyPass));
  }
}
