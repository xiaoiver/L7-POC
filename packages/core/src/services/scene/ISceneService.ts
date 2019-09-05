import { ILayer } from '../layer/ILayerService';
import { IMapConfig } from '../map/IMapService';

export default interface ISceneService {
  init(mapConfig: IMapConfig): void;
  addLayer(layer: ILayer): void;
  render(): void;
}
