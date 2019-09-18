import { EventEmitter } from 'eventemitter3';
import { inject, injectable } from 'inversify';
import { ILogger, LoggingContext } from 'inversify-logging';
import { AsyncParallelHook, AsyncSeriesHook } from 'tapable';
import { TYPES } from '../../types';
import { createRendererContainer } from '../../utils/dom';
import ICameraService from '../camera/ICameraService';
import ILayerService, { ILayer } from '../layer/ILayerService';
import IMapService, { IMapCamera, IMapConfig } from '../map/IMapService';
import IRendererService from '../renderer/IRendererService';
import IShaderModuleService from '../shader/IShaderModuleService';
import ISceneService from './ISceneService';

@injectable()
@LoggingContext('L7Scene')
export default class Scene extends EventEmitter implements ISceneService {
  /**
   * 使用各种 Service
   */
  @inject(TYPES.ILogService)
  private readonly logger: ILogger;

  @inject(TYPES.IMapService)
  private readonly map: IMapService;

  @inject(TYPES.IRendererService)
  private readonly renderer: IRendererService;

  @inject(TYPES.ILayerService)
  private readonly layerManager: ILayerService;

  @inject(TYPES.ICameraService)
  private readonly camera: ICameraService;

  @inject(TYPES.IShaderModuleService)
  private readonly shaderModule: IShaderModuleService;

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
    this.hooks.init.tapPromise('initMap', async (config: unknown) => {
      // 等待首次相机同步
      await new Promise((resolve) => {
        this.map.onCameraChanged((mapCamera: Partial<IMapCamera>) => {
          this.camera.init();
          this.camera.update(mapCamera);
          resolve();
        });
        this.map.init(config as Partial<IMapCamera>);
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
    this.layerManager.add(layer);
  }

  public async render() {
    if (!this.inited) {
      // 首次渲染需要等待底图、相机初始化
      await this.hooks.init.promise(this.mapConfig);
      this.emit('loaded');
      this.inited = true;

      this.layerManager.initLayers();
    }

    await this.layerManager.renderLayers();
    this.logger.info('render');
  }

  private handleMapCameraChanged = (mapCamera: Partial<IMapCamera>) => {
    this.camera.update(mapCamera);
    this.render();
  };
}
