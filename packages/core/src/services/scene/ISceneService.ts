import { IMapConfig } from '../map/IMapService';
import { ILayer } from '../layer/ILayerService';

export default interface ISceneService {
  init(mapConfig: IMapConfig): void;
  addLayer(layer: ILayer): void;
  render(): void;
}