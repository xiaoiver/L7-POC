import { glEnum } from './glenum';

export interface ITexture2DInitializationOptions {
  /**
   * 纹理尺寸
   */
  width: number;
  height: number;
}

// export default interface ITexture2D {
//   resize(options: { width: number; height: number }): void;

//   /**
//    * 写入 subimage
//    * gl.texSubImage2D gl.copyTexSubImage2D
//    */
//   subImageData(options: {
//     pixels,
//     x,
//     y,
//     width,
//     height,
//     level,
//     type,
//     format
//   });

//   /**
//    * gl.deleteTexture
//    */
//   destroy(): void;
// }
