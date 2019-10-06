import { IMapConfig } from '../map/IMapService';
import { IRenderConfig } from '../renderer/IRendererService';

export type IGlobalConfig = IMapConfig & IRenderConfig;

export default interface IGlobalConfigService {
  getConfig(): Partial<IGlobalConfig>;
  setAndCheckConfig(config: Partial<IGlobalConfig>): boolean;
}
