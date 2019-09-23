import { IMapCamera } from '../map/IMapService';

export default interface ICameraService {
  init(): void;
  update(mapCamera: Partial<IMapCamera>): void;
  getProjectionMatrix(): number[];
  getViewMatrix(): number[];
  getViewMatrixUncentered(): number[];
  getViewProjectionMatrix(): number[];
  getZoom(): number;
  getCenter(): [number, number];
  projectFlat(
    lngLat: [number, number],
    scale?: number | undefined,
  ): [number, number];
  setViewProjectionMatrix(viewProjectionMatrix: number[] | undefined): void;
}
