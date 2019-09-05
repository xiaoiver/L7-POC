/**
 * render w/ regl
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md
 */
import { IRendererService } from '@l7-poc/core';
import { inject, injectable } from 'inversify';
import regl from 'regl';

/**
 * regl renderer
 */
@injectable()
export default class ReglRendererService implements IRendererService {
  // tslint:disable-next-line:variable-name
  private _regl: regl.Regl;

  public async init($container: HTMLDivElement): Promise<void> {
    // tslint:disable-next-line:typedef
    this._regl = await new Promise((resolve, reject) => {
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

  // public createDrawCommand(): regl.DrawCommand {
  //   return this._regl({
  //     vert: this.prefixDefines(vs, defines),
  //     frag: this.prefixDefines(fs, defines),
  //     attributes: uniqueAttributes,
  //     uniforms: {

  //     }
  //   });
  // }

  public render(): void {
    //
  }
}
