import { inject, injectable } from 'inversify';
import { ILogger, LoggingContext } from 'inversify-logging';
import { EventEmitter } from 'eventemitter3';
import { AsyncSeriesHook, AsyncParallelHook } from 'tapable';
import { TYPES } from '../../types';
import ILayerService, { ILayer } from '../layer/ILayerService';
import ICameraService from '../camera/ICameraService';
import IShaderModuleService from '../shader/IShaderModuleService';
import IMapService, { IMapConfig, IMapCamera } from '../map/IMapService';
import IRendererService from '../renderer/IRendererService';
import ISceneService from './ISceneService';
import { createRendererContainer } from '../../utils/dom';

@injectable()
@LoggingContext('L7Scene')
export default class Scene extends EventEmitter implements ISceneService {

  /**
   * 使用各种 Service
   */
  @inject(TYPES.ILogService) logger: ILogger;
  @inject(TYPES.IMapService) map: IMapService;
  @inject(TYPES.IRendererService) renderer: IRendererService;
  @inject(TYPES.ILayerService) layerManager: ILayerService;
  @inject(TYPES.ICameraService) camera: ICameraService;
  @inject(TYPES.IShaderModuleService) shaderModule: IShaderModuleService;

  /**
   * 保存一份原始的地图配置
   */
  private mapConfig: IMapConfig;

  /**
   * 是否首次渲染
   */
  private inited: boolean;

  private hooks: {
    init: AsyncParallelHook<unknown>;
  };

  public constructor() {
    super();

    // @see https://github.com/webpack/tapable#usage
    this.hooks = {
      /**
       * 初始化异步任务，可并行：
       * 1. initMap：初始化地图底图、相机
       * 2. initRenderer：初始化渲染引擎
       * 3. initWorker：初始化 Worker
       */
      init: new AsyncParallelHook(['mapConfig']),
    };
  }

  public init(mapConfig: IMapConfig) {
    this.mapConfig = mapConfig;
    /**
     * 初始化底图
     */
    this.hooks.init.tapPromise('initMap', async (config: IMapConfig) => {
      // 等待首次相机同步
      await new Promise((resolve) => {
        this.map.onCameraChanged((mapCamera: IMapCamera) => {
          this.camera.update(mapCamera);
          resolve();
        });
        this.map.init(config);
      });

      // 重新绑定非首次相机更新事件
      this.map.onCameraChanged(this.handleMapCameraChanged);
      this.logger.info('map loaded');
    });

    /**
     * 初始化渲染引擎
     */
    this.hooks.init.tapPromise('initRenderer', async () => {
      // 创建底图之上的 container
      const $container = createRendererContainer(this.mapConfig.id);
      if ($container) {
        await this.renderer.init($container);
      } else {
        this.logger.error('容器 id 不存在');
      }

      // 初始化 ShaderModule
      this.shaderModule.registerBuiltinModules();

      // TODO：init renderer
      this.logger.info('renderer loaded');
    });

    // TODO：init worker, fontAtlas...
  }

  public addLayer(layer: ILayer) {
    this.logger.info('add layer', layer.name);
    layer.init();
    this.layerManager.add(layer);
  }
  
  public async render() {
    if (!this.inited) {
      // 首次渲染需要等待底图、相机初始化
      await this.hooks.init.promise(this.mapConfig);
      this.emit('loaded');
      this.inited = true;
    }
    this.logger.info('render');
    this.renderer.render();
  }

  private handleMapCameraChanged = (mapCamera: IMapCamera) => {
    this.camera.update(mapCamera);
    this.render();
  }
}