import 'reflect-metadata';

import { EventEmitter } from 'eventemitter3';
import { Container, decorate, injectable, interfaces } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

// import { activateLogging } from 'inversify-logging';
import { TYPES } from './types';

/** Service interfaces */
import ICameraService from './services/camera/ICameraService';
import IGlobalConfigService from './services/config/IConfigService';
import ICoordinateSystemService from './services/coordinate/ICoordinateSystemService';
import ILayerService from './services/layer/ILayerService';
import ILayerStyleService from './services/layer/ILayerStyleService';
import IShaderModuleService from './services/shader/IShaderModuleService';

/** Service implements */
import CameraService from './services/camera/CameraService';
import GlobalConfigService from './services/config/ConfigService';
import CoordinateSystemService from './services/coordinate/CoordinateSystemService';
import LayerService from './services/layer/LayerService';
import LayerStyleService from './services/layer/LayerStyleService';
import SceneService from './services/scene/SceneService';
import ShaderModuleService from './services/shader/ShaderModuleService';

import { IPass } from './services/renderer/IMultiPassRenderer';
import ClearPass from './services/renderer/passes/ClearPass';
import BlurHPass from './services/renderer/passes/post-processing/BlurHPass';
import BlurVPass from './services/renderer/passes/post-processing/BlurVPass';
import CopyPass from './services/renderer/passes/post-processing/CopyPass';
import RenderPass from './services/renderer/passes/RenderPass';

// @see https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#defaultscope
const container = new Container({ defaultScope: 'Singleton' });

/**
 * bind services
 */
container
  .bind<IGlobalConfigService>(TYPES.IGlobalConfigService)
  .to(GlobalConfigService);
container.bind<ILayerService>(TYPES.ILayerService).to(LayerService);
container
  .bind<ILayerStyleService>(TYPES.ILayerStyleService)
  .to(LayerStyleService);
container.bind<ICameraService>(TYPES.ICameraService).to(CameraService);
container
  .bind<ICoordinateSystemService>(TYPES.ICoordinateSystemService)
  .to(CoordinateSystemService);
container
  .bind<IShaderModuleService>(TYPES.IShaderModuleService)
  .to(ShaderModuleService);

/**
 * bind post-processing passes
 */
container
  .bind<IPass>(TYPES.ClearPass)
  .to(ClearPass)
  .inTransientScope();
container
  .bind<IPass>(TYPES.RenderPass)
  .to(RenderPass)
  .inTransientScope();
container
  .bind<IPass>(TYPES.CopyPass)
  .to(CopyPass)
  .inTransientScope();
container
  .bind<IPass>(TYPES.BlurHPass)
  .to(BlurHPass)
  .inTransientScope();
container
  .bind<IPass>(TYPES.BlurVPass)
  .to(BlurVPass)
  .inTransientScope();

// @see https://github.com/inversify/InversifyJS/blob/master/wiki/inheritance.md#what-can-i-do-when-my-base-class-is-provided-by-a-third-party-module
decorate(injectable(), EventEmitter);
// activateLogging(container);

// 支持 L7 使用 new 而非容器实例化的场景
// @see https://github.com/inversify/inversify-inject-decorators
const DECORATORS = getDecorators(container);

interface IBabelPropertyDescriptor extends PropertyDescriptor {
  initializer(): any;
}
// Add babel legacy decorators support
// @see https://github.com/inversify/InversifyJS/issues/1050
// @see https://github.com/inversify/InversifyJS/issues/1026#issuecomment-504936034
export const lazyInject = (
  serviceIdentifier: interfaces.ServiceIdentifier<any>,
) => {
  const original = DECORATORS.lazyInject(serviceIdentifier);
  // the 'descriptor' parameter is actually always defined for class fields for Babel, but is considered undefined for TSC
  // so we just hack it with ?/! combination to avoid "TS1240: Unable to resolve signature of property decorator when called as an expression"
  return function(
    this: any,
    proto: any,
    key: string,
    descriptor?: IBabelPropertyDescriptor,
  ): void {
    // make it work as usual
    original.call(this, proto, key);
    // return link to proto, so own value wont be 'undefined' after component's creation
    descriptor!.initializer = () => {
      return proto[key];
    };
  };
};

export default container;
