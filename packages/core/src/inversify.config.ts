import 'reflect-metadata';

import { EventEmitter } from 'eventemitter3';
import { Container, decorate, injectable, interfaces } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { activateLogging } from 'inversify-logging';
import { TYPES } from './types';

/** Service interfaces */
import ICameraService from './services/camera/ICameraService';
import ICoordinateSystemService from './services/coordinate/ICoordinateSystemService';
import ILayerService from './services/layer/ILayerService';
import ILayerStyleService from './services/layer/ILayerStyleService';
import IShaderModuleService from './services/shader/IShaderModuleService';

/** Service implements */
import CameraService from './services/camera/CameraService';
import CoordinateSystemService from './services/coordinate/CoordinateSystemService';
import LayerService from './services/layer/LayerService';
import LayerStyleService from './services/layer/LayerStyleService';
import ShaderModuleService from './services/shader/ShaderModuleService';

// @see https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#defaultscope
const container = new Container({ defaultScope: 'Singleton' });

// 支持 L7 使用 new 而非容器实例化的场景
// @see https://github.com/inversify/inversify-inject-decorators
const DECORATORS = getDecorators(container);
interface IBabelPropertyDescriptor extends PropertyDescriptor {
  initializer(): any;
}
// Add babel legacy decorators support
// @see https://github.com/inversify/InversifyJS/issues/1050
// @see https://github.com/inversify/InversifyJS/issues/1026#issuecomment-504936034
const lazyInject = (serviceIdentifier: interfaces.ServiceIdentifier<any>) => {
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
// @see https://github.com/inversify/InversifyJS/blob/master/wiki/inheritance.md#what-can-i-do-when-my-base-class-is-provided-by-a-third-party-module
decorate(injectable(), EventEmitter);
activateLogging(container);

export default container;
export { lazyInject };
