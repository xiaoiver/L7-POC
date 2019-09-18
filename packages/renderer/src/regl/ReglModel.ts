import {
  glEnum,
  IModel,
  IModelDrawOptions,
  IModelInitializationOptions,
} from '@l7-poc/core';
import regl from 'regl';
import { primitiveMap } from './constants';
import ReglAttribute from './ReglAttribute';
import ReglElements from './ReglElements';

/**
 * adaptor for regl.DrawCommand
 */
export default class ReglModel implements IModel {
  private gl: regl.Regl;
  private drawCommand: regl.DrawCommand;

  constructor(gl: regl.Regl, options: IModelInitializationOptions) {
    this.gl = gl;
    const {
      vs,
      fs,
      attributes,
      uniforms,
      primitive,
      count,
      elements,
    } = options;

    const reglUniforms: { [key: string]: any } = {};
    if (uniforms) {
      Object.keys(uniforms).forEach((uniformName) => {
        // @ts-ignore
        reglUniforms[uniformName] = this.gl.prop(uniformName);
      });
    }

    const reglAttributes: { [key: string]: regl.Attribute } = {};
    Object.keys(attributes).forEach((name: string) => {
      reglAttributes[name] = (attributes[name] as ReglAttribute).get();
    });

    const drawParams: regl.DrawConfig = {
      attributes: reglAttributes,
      frag: fs,
      uniforms: reglUniforms,
      vert: vs,
      primitive:
        primitiveMap[primitive === undefined ? glEnum.TRIANGLES : primitive],
      count,
      depth: {
        enable: false,
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1,
        },
      },
      // cull: {
      //   enable: false,
      //   face: 'back',
      // },
    };

    if (elements) {
      drawParams.elements = (elements as ReglElements).get();
    }

    this.drawCommand = this.gl(drawParams);
  }

  public draw(options: IModelDrawOptions) {
    // @ts-ignore
    this.drawCommand(options.uniforms);
  }
}
