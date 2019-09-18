import { IMapCamera } from '../map/IMapService';

export default interface ICameraService {
  init(): void;
  update(mapCamera: Partial<IMapCamera>): void;
  getProjectionMatrix(): number[];
  getViewMatrix(): number[];
  getZoom(): number;
}
