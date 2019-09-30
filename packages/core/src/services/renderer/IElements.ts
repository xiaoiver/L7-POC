import { glEnum } from './glenum';

export interface IElementsInitializationOptions {
  data: number[] | number[][] | Uint8Array | Uint16Array | Uint32Array;

  /**
   * gl.DRAW_STATIC | gl.DYNAMIC_DRAW | gl.STREAM_DRAW
   */
  usage?: GLenum;

  /**
   * gl.UNSIGNED_BYTE  | gl.UNSIGNED_SHORT | gl.UNSIGNED_INT（开启 OES_element_index_uint 扩展）
   */
  type?: glEnum.UNSIGNED_BYTE | glEnum.UNSIGNED_SHORT | glEnum.UNSIGNED_INT;
  length?: number;
  primitive?:
    | glEnum.POINTS
    | glEnum.LINES
    | glEnum.LINE_STRIP
    | glEnum.LINE_LOOP
    | glEnum.TRIANGLES
    | glEnum.TRIANGLE_STRIP
    | glEnum.TRIANGLE_FAN;
}

export default interface IElements {
  /**
   * gl.bufferSubData
   */
  subData(options: {
    // 用于替换的数据
    data: number[] | number[][] | Uint8Array | Uint16Array | Uint32Array;
    // 原 Buffer 替换位置，单位为 byte
    offset: number;
  }): void;

  /**
   * gl.deleteBuffer
   */
  destroy(): void;
}
