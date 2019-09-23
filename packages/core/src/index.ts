import container, { lazyInject } from './inversify.config';
import { CameraUniform } from './services/camera/CameraService';
import ICameraService from './services/camera/ICameraService';
import { CoordinateUniform } from './services/coordinate/CoordinateSystemService';
import ICoordinateSystemService from './services/coordinate/ICoordinateSystemService';
import { ILayer, ILayerPlugin } from './services/layer/ILayerService';
import ILayerStyleService, {
  ILayerStyleOptions,
} from './services/layer/ILayerStyleService';
import IMapService, {
  IMapCamera,
  IMapConfig,
  MapType,
} from './services/map/IMapService';
import { glEnum } from './services/renderer/glenum';
import IAttribute, {
  IAttributeInitializationOptions,
} from './services/renderer/IAttribute';
import IBuffer, {
  IBufferInitializationOptions,
} from './services/renderer/IBuffer';
import IElements, {
  IElementsInitializationOptions,
} from './services/renderer/IElements';
import IModel, {
  IModelDrawOptions,
  IModelInitializationOptions,
} from './services/renderer/IModel';
import IRendererService from './services/renderer/IRendererService';
import ISceneService from './services/scene/ISceneService';
import SceneService from './services/scene/SceneService';
import IShaderModuleService from './services/shader/IShaderModuleService';
import { TYPES } from './types';
import { packCircleVertex } from './utils/vertex-compression';

export {
  /**
   * IoC 容器
   */
  container,
  CameraUniform,
  CoordinateUniform,
  /**
   * lazy inject，供各个 Layer 使用
   */
  lazyInject,
  /**
   * 各个 Service 接口标识符
   */
  TYPES,
  /**
   * 各个 Layer 实现该接口
   */
  ILayer,
  /**
   * 各个 Service 接口
   */
  ICameraService,
  ICoordinateSystemService,
  ISceneService,
  SceneService,
  IMapService,
  IMapConfig,
  IMapCamera,
  MapType,
  ILayerPlugin,
  ILayerStyleService,
  ILayerStyleOptions,
  IShaderModuleService,
  IRendererService,
  IModel,
  IModelDrawOptions,
  IModelInitializationOptions,
  packCircleVertex,
  IAttribute,
  IAttributeInitializationOptions,
  IElements,
  IElementsInitializationOptions,
  IBuffer,
  IBufferInitializationOptions,
  glEnum,
};
