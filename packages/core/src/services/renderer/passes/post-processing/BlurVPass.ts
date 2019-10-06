import { injectable } from 'inversify';
import blur from '../../../../shaders/post-processing/blur.glsl';
import quad from '../../../../shaders/post-processing/quad.glsl';
import BasePostProcessingPass from '../BasePostProcessingPass';

@injectable()
export default class BlurVPass extends BasePostProcessingPass {
  public setupShaders() {
    this.shaderModule.registerModule('blur-pass', {
      vs: quad,
      fs: blur,
    });

    const { vs, fs, uniforms } = this.shaderModule.getModule('blur-pass');
    const { width, height } = this.renderer.getViewportSize();

    return {
      vs,
      fs,
      uniforms: {
        ...uniforms,
        u_BlurDir: [0.0, 8.0],
        u_ViewportSize: [width, height],
      },
    };
  }
}
