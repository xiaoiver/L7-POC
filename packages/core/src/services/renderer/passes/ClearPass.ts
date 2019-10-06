import { inject, injectable } from 'inversify';
import { TYPES } from '../../../types';
import { IPass, PassType } from '../IMultiPassRenderer';
import IRendererService from '../IRendererService';

/**
 * ClearPass
 */
@injectable()
export default class ClearPass implements IPass {
  @inject(TYPES.IRendererService)
  protected readonly rendererService: IRendererService;

  public getType() {
    return PassType.Normal;
  }

  public init() {
    //
  }

  public render() {
    this.rendererService.clear({
      color: [0, 0, 0, 0],
      depth: 1,
      framebuffer: null,
    });
  }
}
