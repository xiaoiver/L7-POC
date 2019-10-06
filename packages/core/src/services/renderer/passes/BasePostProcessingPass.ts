import { inject, injectable } from 'inversify';
import {
  gl,
  IModel,
  IRendererService,
  IShaderModuleService,
} from '../../../index';
import { TYPES } from '../../../types';
import { IPostProcessingPass, PassType } from '../IMultiPassRenderer';

/**
 * 后处理 Pass 基类，通过 PostProcessor 驱动。
 *
 * 约定使用 u_Texture 传递渲染纹理。
 */
@injectable()
export default class BasePostProcessingPass implements IPostProcessingPass {
  @inject(TYPES.IShaderModuleService)
  protected readonly shaderModule: IShaderModuleService;

  @inject(TYPES.IRendererService)
  protected readonly renderer: IRendererService;
  /**
   * 启用开关
   */
  private enabled: boolean = true;

  /**
   * 是否渲染到屏幕
   */
  private renderToScreen: boolean = false;

  /**
   * 渲染命令
   */
  private model: IModel;

  public getType() {
    return PassType.PostProcessing;
  }

  public init() {
    const { createAttribute, createBuffer, createModel } = this.renderer;

    // @ts-ignore
    const { vs, fs, uniforms } = this.setupShaders();

    this.model = createModel({
      vs,
      fs,
      attributes: {
        // 使用一个全屏三角形，相比 Quad 顶点数目更少
        a_Position: createAttribute({
          buffer: createBuffer({
            data: [-4, -4, 4, -4, 0, 4],
            type: gl.FLOAT,
          }),
        }),
      },
      // @ts-ignore
      uniforms: {
        u_Texture: null,
        ...uniforms,
      },
      depth: {
        enable: false,
      },
      count: 3,
    });
  }

  public render() {
    const postProcessor = this.renderer
      .getMultiPassRenderer()
      .getPostProcessor();

    const useRenderTarget = (this.renderToScreen
      ? postProcessor.useScreenRenderTarget
      : postProcessor.useOffscreenRenderTarget
    ).bind(postProcessor);

    useRenderTarget(async () => {
      this.model.draw({
        uniforms: {
          u_Texture: postProcessor.getReadFBO(),
        },
      });
    });
  }

  public isEnabled() {
    return this.enabled;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public setRenderToScreen(renderToScreen: boolean) {
    this.renderToScreen = renderToScreen;
  }

  protected setupShaders() {
    throw new Error('Method not implemented.');
  }
}
