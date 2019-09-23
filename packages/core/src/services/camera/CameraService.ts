import { inject, injectable } from 'inversify';
import { ILogger, LoggingContext } from 'inversify-logging';
import WebMercatorViewport from 'viewport-mercator-project';
import { TYPES } from '../../types';
import { IMapCamera } from '../map/IMapService';
import ICameraService from './CameraService';

// 后续传入 Shader 的变量
export const CameraUniform = {
  ProjectionMatrix: 'u_ProjectionMatrix',
  ViewMatrix: 'u_ViewMatrix',
  ViewProjectionMatrix: 'u_ViewProjectionMatrix',
  Zoom: 'u_Zoom',
  ZoomScale: 'u_ZoomScale',
};

@injectable()
@LoggingContext('CameraService')
export default class CameraService implements ICameraService {
  @inject(TYPES.ILogService)
  private readonly logger: ILogger;

  private mapCamera: Partial<IMapCamera>;

  private zoom: number;

  private center: [number, number];

  private viewport: WebMercatorViewport;

  private viewProjectionMatrix: number[] | undefined;

  public init() {
    //
  }

  /**
   * 根据相机参数创建视口，包含 VP 矩阵等
   * @param mapCamera 地图相机
   */
  public update(mapCamera: Partial<IMapCamera>) {
    this.logger.info('camera updated...');
    this.mapCamera = mapCamera;

    const { center, zoom, pitch, bearing, height, width } = mapCamera;

    this.viewport = new WebMercatorViewport({
      width,
      height,
      longitude: center && center[0],
      latitude: center && center[1],
      zoom,
      pitch,
      bearing,
    });

    this.zoom = zoom as number;
    this.center = center as [number, number];
  }

  public getProjectionMatrix(): number[] {
    return this.viewport.projectionMatrix;
  }

  public getViewMatrix(): number[] {
    return this.viewport.viewMatrix;
  }

  public getViewMatrixUncentered(): number[] {
    // @ts-ignore
    return this.viewport.viewMatrixUncentered;
  }

  public getViewProjectionMatrix(): number[] {
    // @ts-ignore
    return this.viewProjectionMatrix || this.viewport.viewProjectionMatrix;
  }

  public getZoom(): number {
    return this.zoom;
  }

  public getCenter(): [number, number] {
    return this.center;
  }

  public projectFlat(
    lngLat: [number, number],
    scale?: number | undefined,
  ): [number, number] {
    return this.viewport.projectFlat(lngLat, scale);
  }

  /**
   * 支持外部计算 VP 矩阵的场景，例如：在偏移坐标系场景中，需要重新计算 VP 矩阵
   */
  public setViewProjectionMatrix(viewProjectionMatrix: number[] | undefined) {
    this.viewProjectionMatrix = viewProjectionMatrix;
  }
}
