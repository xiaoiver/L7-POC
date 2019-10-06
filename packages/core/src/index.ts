import container, { lazyInject } from './inversify.config';
import { CameraUniform } from './services/camera/CameraService';
import ICameraService, { IViewport } from './services/camera/ICameraService';
import { CoordinateUniform } from './services/coordinate/CoordinateSystemService';
import ICoordinateSystemService, { CoordinateSystem } from './services/coordinate/ICoordinateSystemService';
import { ILayer, ILayerPlugin } from './services/layer/ILayerService';
import ILayerStyleService, {
  ILayerStyleOptions,
} from './services/layer/ILayerStyleService';
import IMapService, {
  IMapCamera,
  IMapConfig,
  MapType,
} from './services/map/IMapService';
import { gl } from './services/renderer/gl';
import IAttribute, {
  IAttributeInitializationOptions,
} from './services/renderer/IAttribute';
import IBuffer, {
  IBufferInitializationOptions,
} from './services/renderer/IBuffer';
import IElements, {
  IElementsInitializationOptions,
} from './services/renderer/IElements';
import IFramebuffer, {
  IFramebufferInitializationOptions,
} from './services/renderer/IFramebuffer';
import IModel, {
  IModelDrawOptions,
  IModelInitializationOptions,
} from './services/renderer/IModel';
import IMultiPassRenderer, {
  IPass,
  IPostProcessingPass,
  IPostProcessor,
  PassType,
} from './services/renderer/IMultiPassRenderer';
import IRenderbuffer, {
  IRenderbufferInitializationOptions,
} from './services/renderer/IRenderbuffer';
import IRendererService, {
  IClearOptions,
  IRenderConfig,
} from './services/renderer/IRendererService';
import ITexture2D, {
  ITexture2DInitializationOptions,
} from './services/renderer/ITexture2D';
import { IUniform } from './services/renderer/IUniform';
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
  IViewport,
  ICoordinateSystemService,
  CoordinateSystem,
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
  /** render 相关 */
  IRenderConfig,
  IRendererService,
  IClearOptions,
  IAttribute,
  IAttributeInitializationOptions,
  IElements,
  IElementsInitializationOptions,
  IBuffer,
  IBufferInitializationOptions,
  IUniform,
  IModel,
  IModelDrawOptions,
  IModelInitializationOptions,
  IFramebuffer,
  IFramebufferInitializationOptions,
  ITexture2D,
  ITexture2DInitializationOptions,
  IRenderbuffer,
  IRenderbufferInitializationOptions,
  IPass,
  PassType,
  IMultiPassRenderer,
  IPostProcessor,
  IPostProcessingPass,
  packCircleVertex,
  gl,
};
