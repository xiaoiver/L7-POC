import IRenderbuffer from './IRenderbuffer';
import ITexture2D from './ITexture2D';

export interface IFramebufferInitializationOptions {
  width?: number;
  height?: number;

  /**
   * 布尔值用于开关 depth attachment，
   * 同时也支持 attach 一个 Texture2D 或者 RenderBuffer
   */
  depth?: boolean | ITexture2D | IRenderbuffer;

  /**
   * 布尔值用于开关 color attachment，
   * 同时也支持 attach 一个/一组 Texture2D 或者 RenderBuffer
   */
  color?: boolean | ITexture2D | IRenderbuffer;
  colors?: Array<ITexture2D | IRenderbuffer>;

  /**
   * 布尔值用于开关 depth attachment，
   * 同时也支持 attach 一个 RenderBuffer
   */
  stencil?: boolean | IRenderbuffer;
}

export default interface IFramebuffer {
  resize(options: { width: number; height: number }): void;

  /**
   * gl.deleteRenderbuffer
   */
  destroy(): void;
}
