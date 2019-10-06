import {
  IMultiPassRenderer,
  IPass,
  IPostProcessingPass,
  IPostProcessor,
  PassType,
} from '@l7-poc/core';
import regl from 'regl';
import ReglPostProcessor from './ReglPostProcessor';

/**
 * ported from Three.js EffectComposer
 * @example
 * const renderer = new MultiPassRenderer(gl, [
 *   new ClearPass(gl),
 *   new RenderPass(gl, {
 *     models: [
 *       new Model(),
 *       new Model(),
 *     ],
 *   }),
 *   new CopyPass(gl, {
 *     renderToScreen: true,
 *   }),
 *   new TAAPass(gl),
 * ]);
 * renderer.render();
 * @see https://yuque.antfin-inc.com/yuqi.pyq/fgetpa/apuvbf#dRM8W
 */
export default class ReglMultiPassRenderer implements IMultiPassRenderer {
  private passes: IPass[] = [];
  private postProcessor: IPostProcessor;

  private reGl: regl.Regl;

  constructor(reGl: regl.Regl) {
    this.reGl = reGl;
    this.postProcessor = new ReglPostProcessor(reGl);
  }

  public getPostProcessor() {
    return this.postProcessor;
  }

  public async render() {
    for (const pass of this.passes) {
      await pass.render();
    }
    await this.postProcessor.render();
  }

  public resize(width: number, height: number) {
    this.postProcessor.resize(width, height);
  }

  public add(pass: IPass) {
    if (pass.getType() === PassType.PostProcessing) {
      this.postProcessor.add(pass as IPostProcessingPass);
    } else {
      pass.init();
      this.passes.push(pass);
    }
  }

  public insert(pass: IPass, index: number) {
    pass.init();
    this.passes.splice(index, 0, pass);
  }
}
