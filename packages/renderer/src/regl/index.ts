/**
 * render w/ regl
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md
 */
import {
  glEnum,
  IAttribute,
  IAttributeInitializationOptions,
  IBuffer,
  IBufferInitializationOptions,
  IElements,
  IElementsInitializationOptions,
  IModel,
  IModelInitializationOptions,
  IRendererService,
} from '@l7-poc/core';
import { inject, injectable } from 'inversify';
import regl from 'regl';
import ReglAttribute from './ReglAttribute';
import ReglBuffer from './ReglBuffer';
import ReglElements from './ReglElements';
import ReglModel from './ReglModel';

/**
 * regl renderer
 */
@injectable()
export default class ReglRendererService implements IRendererService {
  private gl: regl.Regl;

  public async init($container: HTMLDivElement): Promise<void> {
    // tslint:disable-next-line:typedef
    this.gl = await new Promise((resolve, reject) => {
      regl({
        container: $container,
        // extensions: [
        //   'EXT_shader_texture_lod', // IBL
        //   'OES_standard_derivatives', // wireframe
        //   'EXT_SRGB', // baseColor emmisive
        //   'OES_texture_float', // shadow map
        //   'WEBGL_depth_texture',
        //   'EXT_texture_filter_anisotropic' // VSM shadow map
        // ],
        // optionalExtensions: ['oes_texture_float_linear'],
        // profile: true,
        onDone: (err: Error | null, r?: regl.Regl | undefined): void => {
          if (err || !r) {
            reject(err);
          }
          resolve(r);
        },
      });
    });
  }

  public createModel = (options: IModelInitializationOptions): IModel => {
    return new ReglModel(this.gl, options);
  };

  public createAttribute = (
    options: IAttributeInitializationOptions,
  ): IAttribute => {
    return new ReglAttribute(this.gl, options);
  };

  public createBuffer = (options: IBufferInitializationOptions): IBuffer => {
    return new ReglBuffer(this.gl, options);
  };

  public createElements = (
    options: IElementsInitializationOptions,
  ): IElements => {
    return new ReglElements(this.gl, options);
  };
}
