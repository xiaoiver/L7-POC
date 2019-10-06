import { inject, injectable } from 'inversify';
import { IRendererService } from '../../../index';
import { TYPES } from '../../../types';
import ILayerService from '../../layer/ILayerService';
import { IPass, PassType } from '../IMultiPassRenderer';

/**
 * RenderPass，负责输出到后续 PostProcessor 的 readFBO 中
 */
@injectable()
export default class RenderPass implements IPass {
  @inject(TYPES.IRendererService)
  protected readonly renderer: IRendererService;

  @inject(TYPES.ILayerService)
  protected readonly layerService: ILayerService;

  public getType() {
    return PassType.Normal;
  }

  public init() {
    //
  }

  public render() {
    this.renderer
      .getMultiPassRenderer()
      .getPostProcessor()
      .renderToPostProcessor(() => {
        // render to post processor
        this.layerService.renderLayers(true);
      });
  }
}
