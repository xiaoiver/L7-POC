/**
 * AMapService
 */
import { IMapCamera, IMapConfig, IMapService } from '@l7-poc/core';
import { inject, injectable } from 'inversify';

const AMAP_API_KEY: string = '15cd8a57710d40c9b7c0e3cc120f1200';
const AMAP_VERSION: string = '1.4.8';

/**
 * AMapService
 */
@injectable()
export default class AMapService implements IMapService {
  private map: IAMapInstance;
  private cameraChangedCallback: (camera: Partial<IMapCamera>) => void;

  public async init(mapConfig: IMapConfig): Promise<void> {
    const { id, style, ...rest } = mapConfig;

    // tslint:disable-next-line:typedef
    await new Promise((resolve) => {
      // 异步加载高德地图
      // @see https://lbs.amap.com/api/javascript-api/guide/abc/load
      window.onLoad = (): void => {
        // @ts-ignore
        this.map = new AMap.Map(id, {
          mapStyle: style,
          viewMode: '3D',
          ...rest,
        });

        // 监听地图相机时间
        this.map.on('camerachange', this.handleCameraChanged);
        resolve();
      };

      const url: string = `https://webapi.amap.com/maps?v=${AMAP_VERSION}&key=${AMAP_API_KEY}&plugin=Map3D&callback=onLoad`;
      const jsapi: HTMLScriptElement = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);
    });
  }

  public onCameraChanged(
    callback: (camera: Partial<IMapCamera>) => void,
  ): void {
    this.cameraChangedCallback = callback;
  }

  private handleCameraChanged = (e: IAMapEvent): void => {
    const { fov, near, far, height, pitch, rotation, aspect } = e.camera;

    if (this.cameraChangedCallback) {
      this.cameraChangedCallback({
        aspect,
        // AMap 定义 rotation 为顺时针方向，而 Mapbox 为逆时针
        // @see https://docs.mapbox.com/mapbox-gl-js/api/#map#getbearing
        bearing: 360 - rotation,
        far,
        fov,
        height,
        near,
        pitch,
        // AMap 定义的缩放等级 与 Mapbox 相差 1
        zoom: this.map.getZoom() - 1,
      });
    }
  };
}
