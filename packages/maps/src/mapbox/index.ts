/**
 * AMapService
 */
import { inject, injectable } from 'inversify';
import mapboxgl from 'mapbox-gl';
import { IMapConfig, IMapService, IMapCamera } from '@l7-poc/core';

mapboxgl.accessToken = 'pk.eyJ1IjoieGlhb2l2ZXIiLCJhIjoiY2pxcmc5OGNkMDY3cjQzbG42cXk5NTl3YiJ9.hUC5Chlqzzh0FFd_aEc-uQ';

/**
 * AMapService
 */
@injectable()
export default class MapboxService implements IMapService {
  private map: IMapboxInstance;
  private cameraChangedCallback: (camera: Partial<IMapCamera>) => void;

  public async init(mapConfig: IMapConfig): Promise<void> {
    const { id, ...rest } = mapConfig;

    /**
     * TODO: 使用 mapbox v0.53.x 版本 custom layer，需要共享 gl context
     * @see https://github.com/mapbox/mapbox-gl-js/blob/master/debug/threejs.html#L61-L64
     */
    this.map = new mapboxgl.Map({
      container: id,
      ...rest
    });

    this.map.on('move', this.handleCameraChanged);

    // 不同于高德地图，需要手动触发首次渲染
    this.handleCameraChanged();

    const $link: HTMLLinkElement = document.createElement('link');
    $link.href = 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.2.1/mapbox-gl.css';
    $link.rel = 'stylesheet';
    document.head.appendChild($link);
  }

  public onCameraChanged(callback: (camera: Partial<IMapCamera>) => void): void {
    this.cameraChangedCallback = callback;
  }

  private handleCameraChanged = () => {
    // @see https://github.com/mapbox/mapbox-gl-js/issues/2572
    const { lat, lng } = this.map.getCenter().wrap();
    this.cameraChangedCallback({
      zoom: this.map.getZoom(),
      center: [ lng, lat ],
      pitch: this.map.getPitch(),
      bearing: this.map.getBearing(),
      height: this.map.transform.height,
      width: this.map.transform.width
    });
  }
}
