import {
  glEnum,
  IElements,
  IElementsInitializationOptions,
} from '@l7-poc/core';
import regl from 'regl';
import { dataTypeMap, usageMap } from './constants';

/**
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#elements
 */
export default class ReglElements implements IElements {
  private gl: regl.Regl;
  private elements: regl.Elements;

  constructor(gl: regl.Regl, options: IElementsInitializationOptions) {
    this.gl = gl;

    const { data, usage, type } = options;

    this.elements = this.gl.elements({
      data,
      usage: usageMap[usage || glEnum.STATIC_DRAW],
      type: dataTypeMap[type || glEnum.UNSIGNED_BYTE] as
        | 'uint8'
        | 'uint16'
        | 'uint32',
    });
  }

  public get() {
    return this.elements;
  }

  public subData({
    data,
  }: {
    data: number[] | number[][] | Uint8Array | Uint16Array | Uint32Array;
  }) {
    this.elements.subdata(data);
  }

  public destroy() {
    this.elements.destroy();
  }
}
