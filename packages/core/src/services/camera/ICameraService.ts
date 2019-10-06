import { IMapCamera } from '../map/IMapService';

export interface IViewport {
  syncWithMapCamera(mapCamera: Partial<IMapCamera>): void;
  getProjectionMatrix(): number[];
  getViewMatrix(): number[];
  getViewMatrixUncentered(): number[];
  getViewProjectionMatrix(): number[];
  getZoom(): number;
  getZoomScale(): number;
  getFocalDistance(): number;
  getCenter(): [number, number];
  projectFlat(
    lngLat: [number, number],
    scale?: number | undefined,
  ): [number, number];
}

export default interface ICameraService
  extends Omit<IViewport, 'syncWithMapCamera'> {
  init(): void;
  update(viewport: IViewport): void;
  setViewProjectionMatrix(viewProjectionMatrix: number[] | undefined): void;
}
