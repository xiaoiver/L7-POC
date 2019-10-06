import { EventEmitter } from 'eventemitter3';
import { inject, injectable } from 'inversify';
// import { ILogger, LoggingContext } from 'inversify-logging';
import { AsyncParallelHook, AsyncSeriesHook } from 'tapable';
import { TYPES } from '../../types';
import { createRendererContainer } from '../../utils/dom';
import ICameraService, { IViewport } from '../camera/ICameraService';
import IGlobalConfigService, { IGlobalConfig } from '../config/IConfigService';
import ILayerService, { ILayer } from '../layer/ILayerService';
import IMapService, { IMapCamera, IMapConfig } from '../map/IMapService';
import IRendererService, { IRenderConfig } from '../renderer/IRendererService';
import IShaderModuleService from '../shader/IShaderModuleService';
import ISceneService from './ISceneService';

@injectable()
// @LoggingContext('L7Scene')
export default class Scene extends EventEmitter implements ISceneService {
  /**
   * 使用各种 Service
   */
  // @inject(TYPES.ILogService)
  // private readonly logger: ILogger;

  @inject(TYPES.IGlobalConfigService)
  private readonly configService: IGlobalConfigService;

  @inject(TYPES.IMapService)
  private readonly map: IMapService;

  @inject(TYPES.IRendererService)
  private readonly rendererService: IRendererService;

  @inject(TYPES.ILayerService)
  private readonly layerService: ILayerService;

  @inject(TYPES.ICameraService)
  private readonly cameraService: ICameraService;

  @inject(TYPES.IShaderModuleService)
  private readonly shaderModule: IShaderModuleService;

  /**
   * 是否首次渲染
   */
  private inited: boolean;

  /**
   * canvas 容器
   */
  private $container: HTMLDivElement | null;

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
      init: new AsyncParallelHook(['config']),
    };
  }

  public init(globalConfig: IGlobalConfig) {
    this.configService.setAndCheckConfig(globalConfig);
    /**
     * 初始化底图
     */
    this.hooks.init.tapPromise('initMap', async (config: unknown) => {
      // 等待首次相机同步
      await new Promise((resolve) => {
        this.map.onCameraChanged((viewport: IViewport) => {
          this.cameraService.init();
          this.cameraService.update(viewport);
          resolve();
        });
        this.map.init(config as Partial<IMapCamera>);
      });

      // 重新绑定非首次相机更新事件
      this.map.onCameraChanged(this.handleMapCameraChanged);
      // this.logger.info('map loaded');
    });

    /**
     * 初始化渲染引擎
     */
    this.hooks.init.tapPromise('initRenderer', async () => {
      // 创建底图之上的 container
      const $container = createRendererContainer(
        this.configService.getConfig().id || '',
      );
      this.$container = $container;
      if ($container) {
        await this.rendererService.init($container);
        window.addEventListener('resize', this.handleWindowResized, false);
      } else {
        // this.logger.error('容器 id 不存在');
      }

      // 初始化 ShaderModule
      this.shaderModule.registerBuiltinModules();

      // TODO：init renderer
      // this.logger.info('renderer loaded');
    });

    // TODO：init worker, fontAtlas...
  }

  public addLayer(layer: ILayer) {
    // this.logger.info('add layer', layer.name);
    this.layerService.add(layer);
  }

  public async render() {
    if (!this.inited) {
      // 首次渲染需要等待底图、相机初始化
      await this.hooks.init.promise(this.configService.getConfig());
      this.emit('loaded');
      this.inited = true;

      this.layerService.initLayers();
    }

    this.layerService.renderLayers(false);
    // this.logger.info('render');
  }

  public destroy() {
    window.removeEventListener('resize', this.handleWindowResized, false);
  }

  private handleWindowResized = () => {
    this.emit('resize');
    if (this.$container) {
      // recalculate the viewport's size and call gl.viewport
      // @see https://github.com/regl-project/regl/blob/master/lib/webgl.js#L24-L38
      const pixelRatio = window.devicePixelRatio;
      let w = window.innerWidth;
      let h = window.innerHeight;
      if (this.$container !== document.body) {
        const bounds = this.$container.getBoundingClientRect();
        w = bounds.right - bounds.left;
        h = bounds.bottom - bounds.top;
      }
      this.rendererService.viewport({
        x: 0,
        y: 0,
        width: pixelRatio * w,
        height: pixelRatio * h,
      });
      this.render();
    }
  };

  private handleMapCameraChanged = (viewport: IViewport) => {
    this.cameraService.update(viewport);
    this.render();
  };
}
