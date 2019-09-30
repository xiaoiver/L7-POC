import { glEnum } from './glenum';

export interface IBufferInitializationOptions {
  data:
    | number[]
    | number[][]
    | Uint8Array
    | Uint16Array
    | Uint32Array
    | Float32Array;

  /**
   * gl.DRAW_STATIC | gl.DYNAMIC_DRAW | gl.STREAM_DRAW
   */
  usage?: glEnum.STATIC_DRAW | glEnum.DYNAMIC_DRAW | glEnum.STREAM_DRAW;

  /**
   * gl.Float | gl.UNSIGNED_BYTE | ...
   */
  type?: glEnum.FLOAT | glEnum.UNSIGNED_BYTE;
  length?: number;
}

export default interface IBuffer {
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
