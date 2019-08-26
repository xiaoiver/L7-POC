import { injectable } from 'inversify';
import { ILayer } from '../..';
import ILayerService from './ILayerService';

@injectable()
export default class LayerService implements ILayerService {
  private layers: ILayer[] = [];

  public add(layer: ILayer) {
    this.layers.push(layer);
  }
}