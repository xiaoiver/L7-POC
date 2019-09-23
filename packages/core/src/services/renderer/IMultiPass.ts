export interface IPass {
  init(): void;
  render(): void;
  setRenderToScreen(renderToScreen: boolean): void;
  isEnabled(): boolean;
  setEnabled(enabled: boolean): void;
}

// export interface IMultiPass {
//   getReadFBO(): IFramebuffer2D;
//   getWriteFBO(): IFramebuffer2D;
//   getScreenRenderTarget(): regl.DrawCommand;
//   getOffscreenRenderTarget(): regl.DrawCommand;
//   init(): void;
//   resize(viewportWidth: number, viewportHeight: number): void;
//   add(pass: IPass): void;
//   render(): void;
// }
