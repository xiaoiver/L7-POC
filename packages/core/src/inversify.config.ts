import 'reflect-metadata';

import { EventEmitter } from 'eventemitter3';
import { Container, decorate, injectable } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { activateLogging } from 'inversify-logging';
import { TYPES } from './types';

/** Service interfaces */
import ICameraService from './services/camera/ICameraService';
import ILayerService from './services/layer/ILayerService';
import IShaderModuleService from './services/shader/IShaderModuleService';

/** Service implements */
import CameraService from './services/camera/CameraService';
import LayerService from './services/layer/LayerService';
import ShaderModuleService from './services/shader/ShaderModuleService';

const container = new Container();

// 支持 L7 使用 new 而非容器实例化的场景
// @see https://github.com/inversify/inversify-inject-decorators
const { lazyInject } = getDecorators(container, false);

container.bind<ILayerService>(TYPES.ILayerService).to(LayerService);
container.bind<ICameraService>(TYPES.ICameraService).to(CameraService);
container
  .bind<IShaderModuleService>(TYPES.IShaderModuleService)
  .to(ShaderModuleService);

decorate(injectable(), EventEmitter);
activateLogging(container);

export default container;
export { lazyInject };
