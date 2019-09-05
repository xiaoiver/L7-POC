import container, { lazyInject } from './inversify.config';
import { ILayer } from './services/layer/ILayerService';
import IMapService, {
  IMapCamera,
  IMapConfig,
  MapType,
} from './services/map/IMapService';
import IRendererService from './services/renderer/IRendererService';
import ISceneService from './services/scene/ISceneService';
import SceneService from './services/scene/SceneService';
import IShaderModuleService from './services/shader/IShaderModuleService';
import { TYPES } from './types';

export {
  /**
   * IoC 容器
   */
  container,
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
  ISceneService,
  SceneService,
  IMapService,
  IMapConfig,
  IMapCamera,
  MapType,
  IShaderModuleService,
  IRendererService,
};
