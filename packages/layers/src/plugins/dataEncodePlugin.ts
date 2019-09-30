import {
  CameraUniform,
  CoordinateUniform,
  ICameraService,
  ICoordinateSystemService,
  ILayer,
  ILayerPlugin,
  lazyInject,
  TYPES,
} from '@l7-poc/core';
import Encode from '../core/encode';
export default class DataEncodePlugin implements ILayerPlugin {
  public apply(layer: ILayer) {
    layer.hooks.init.tap('DataEndodePlugin', () => {
      // 重新计算坐标系参
      const dataEncode = new Encode(layer);
      layer.set('encode', dataEncode);
      // TODO：脏检查，决定是否需要渲染
    });
  }
}
