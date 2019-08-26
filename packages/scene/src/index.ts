import { container, ILayer, IMapConfig, IMapService, IRendererService, 
  ISceneService, lazyInject, MapType, SceneService, TYPES } from '@l7-poc/core';
import { AMapService, MapboxService } from '@l7-poc/maps';
import { ReglRendererService } from '@l7-poc/renderer';

/**
 * 暴露 Scene API
 * 
 * @example
 * import { Scene } from '@l7/scene';
 * import { PointLayer } from '@l7/layers';
 * 
 * const scene = new Scene();
 * const pointLayer = new PointLayer();
 * scene.addLayer(pointLayer);
 * scene.render();
 */
class Scene {
  private sceneService: ISceneService;

  public constructor(mapConfig: IMapConfig) {
    const { type = MapType.amap } = mapConfig;

    // 根据用户传入参数绑定地图服务
    let mapService: new (...args: any[]) => IMapService;
    if (type === MapType.mapbox) {
      mapService = MapboxService;
    } else if (type === MapType.amap) {
      mapService = AMapService;
    } else {
      throw new Error('不支持的地图服务');
    }

    // DEMO 中切换底图实现时，需要重新绑定底图服务
    // @see https://github.com/inversify/InversifyJS/blob/master/wiki/container_api.md#containerrebindserviceidentifier-serviceidentifier
    if (container.isBound(TYPES.IMapService)) {
      container.rebind<IMapService>(TYPES.IMapService).to(mapService);
    } else {
      container.bind<IMapService>(TYPES.IMapService).to(mapService);
    }

    if (!container.isBound(TYPES.IRendererService)) {
      // 绑定渲染引擎
      container.bind<IRendererService>(TYPES.IRendererService).to(ReglRendererService);
    }

    // 依赖注入
    this.sceneService = container.resolve(SceneService);
    this.sceneService.init(mapConfig);
  }

  public addLayer(layer: ILayer): void {
    this.sceneService.addLayer(layer);
  }

  public render(): void {
    this.sceneService.render();
  }
}

export {
  Scene
};