import { inject, injectable } from 'inversify';
// import { ILogger, LoggingContext } from 'inversify-logging';
import ICameraService, { IViewport } from './ICameraService';

// 后续传入 Shader 的变量
export const CameraUniform = {
  ProjectionMatrix: 'u_ProjectionMatrix',
  ViewMatrix: 'u_ViewMatrix',
  ViewProjectionMatrix: 'u_ViewProjectionMatrix',
  Zoom: 'u_Zoom',
  ZoomScale: 'u_ZoomScale',
  FocalDistance: 'u_FocalDistance',
};

@injectable()
// @LoggingContext('CameraService')
export default class CameraService implements ICameraService {
  // @inject(TYPES.ILogService)
  // private readonly logger: ILogger;

  private viewport: IViewport;

  /**
   * 不使用 Viewport 计算的 VP 矩阵，例如偏移坐标系场景
   */
  private overridedViewProjectionMatrix: number[] | undefined;

  public init() {
    //
  }

  /**
   * 同步根据相机参数创建的视口
   */
  public update(viewport: IViewport) {
    // this.logger.info('camera updated...');
    this.viewport = viewport;
  }

  public getProjectionMatrix(): number[] {
    return this.viewport.getProjectionMatrix();
  }

  public getViewMatrix(): number[] {
    return this.viewport.getViewMatrix();
  }

  public getViewMatrixUncentered(): number[] {
    return this.viewport.getViewMatrixUncentered();
  }

  public getViewProjectionMatrix(): number[] {
    return (
      this.overridedViewProjectionMatrix ||
      this.viewport.getViewProjectionMatrix()
    );
  }

  public getZoom(): number {
    return this.viewport.getZoom();
  }

  public getZoomScale(): number {
    return this.viewport.getZoomScale();
  }

  public getCenter(): [number, number] {
    const [lng, lat] = this.viewport.getCenter();
    return [lng, lat];
  }

  public getFocalDistance() {
    return this.viewport.getFocalDistance();
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
    this.overridedViewProjectionMatrix = viewProjectionMatrix;
  }
}
