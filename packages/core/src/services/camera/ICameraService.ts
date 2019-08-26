import { IMapCamera } from '../map/IMapService';

export default interface ICameraService {
  update(mapCamera: Partial<IMapCamera>): void;
}