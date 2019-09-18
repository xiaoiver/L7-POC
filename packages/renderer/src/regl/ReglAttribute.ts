import { IAttribute, IAttributeInitializationOptions } from '@l7-poc/core';
import regl from 'regl';
import ReglBuffer from './ReglBuffer';

/**
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#attributes
 */
export default class ReglAttribute implements IAttribute {
  private gl: regl.Regl;
  private attribute: regl.Attribute;

  constructor(gl: regl.Regl, options: IAttributeInitializationOptions) {
    this.gl = gl;

    const { buffer, offset, stride, normalized, size, divisor } = options;

    this.attribute = {
      buffer: (buffer as ReglBuffer).get(),
      // offset: offset || 0,
      // stride: stride || 0,
      // normalized: normalized || false,
      // size: size || 4,
      // divisor: divisor || 0,
    };
  }

  public get() {
    return this.attribute;
  }

  public destroy() {
    // TODO: destroy buffer?
  }
}
