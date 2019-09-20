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
  Zoom: 'u_Zoom',
  PixelsPerMeter: 'u_pixels_per_meter',
  ProjectionScale: 'u_project_scale',
};

@injectable()
@LoggingContext('CameraService')
export default class CameraService implements ICameraService {
  @inject(TYPES.ILogService)
  private readonly logger: ILogger;

  private mapCamera: Partial<IMapCamera>;

  private projectionMatrix: number[];

  private viewMatrix: number[];

  private zoom: number;

  public init() {
    //
  }

  public update(mapCamera: Partial<IMapCamera>) {
    this.logger.info('camera updated...');
    this.mapCamera = mapCamera;

    const { center, zoom, pitch, bearing, height, width } = mapCamera;

    const viewport = new WebMercatorViewport({
      width,
      height,
      longitude: center && center[0],
      latitude: center && center[1],
      zoom,
      pitch,
      bearing,
    });

    const { projectionMatrix, viewMatrix } = viewport;
    this.projectionMatrix = projectionMatrix;
    this.viewMatrix = viewMatrix;
    this.zoom = zoom as number;
  }

  public getProjectionMatrix(): number[] {
    return this.projectionMatrix;
  }

  public getViewMatrix(): number[] {
    return this.viewMatrix;
  }

  public getZoom(): number {
    return this.zoom;
  }
}
