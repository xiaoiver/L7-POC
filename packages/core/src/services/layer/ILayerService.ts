export interface ILayer {
  name: string;
  init(): void;
}

/**
 * 提供 Layer 管理服务
 */
export default interface ILayerService {
  add(layer: ILayer): void;
}