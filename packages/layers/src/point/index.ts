/**
 * 
 */
import { ILayer, IShaderModuleService, lazyInject, TYPES } from '@l7-poc/core';

/**
 * PointLayer
 */
export default class PointLayer implements ILayer {
  @lazyInject(TYPES.IShaderModuleService)
  public shaderModule: IShaderModuleService;

  public name: string = 'pointLayer';

  public init(): void {
    // this.shaderModule.registerModule();
  }
}
