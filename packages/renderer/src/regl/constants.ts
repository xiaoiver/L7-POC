import { glEnum } from '@l7-poc/core';

// @see https://github.com/regl-project/regl/blob/gh-pages/lib/constants/primitives.json
export const primitiveMap: {
  [key: string]:
    | 'points'
    | 'lines'
    | 'line loop'
    | 'line strip'
    | 'triangles'
    | 'triangle strip'
    | 'triangle fan';
} = {
  [glEnum.POINTS]: 'points',
  [glEnum.LINES]: 'lines',
  [glEnum.LINE_LOOP]: 'line loop',
  [glEnum.LINE_STRIP]: 'line strip',
  [glEnum.TRIANGLES]: 'triangles',
  [glEnum.TRIANGLE_FAN]: 'triangle fan',
  [glEnum.TRIANGLE_STRIP]: 'triangle strip',
};

export const usageMap: {
  [key: string]: 'static' | 'dynamic' | 'stream';
} = {
  [glEnum.STATIC_DRAW]: 'static',
  [glEnum.DYNAMIC_DRAW]: 'dynamic',
  [glEnum.STREAM_DRAW]: 'stream',
};

export const dataTypeMap: {
  [key: string]:
    | 'int8'
    | 'int16'
    | 'int32'
    | 'uint8'
    | 'uint16'
    | 'uint32'
    | 'float';
} = {
  [glEnum.BYTE]: 'int8',
  [glEnum.UNSIGNED_INT]: 'int16',
  [glEnum.INT]: 'int32',
  [glEnum.UNSIGNED_BYTE]: 'uint8',
  [glEnum.UNSIGNED_SHORT]: 'uint16',
  [glEnum.UNSIGNED_INT]: 'uint32',
  [glEnum.FLOAT]: 'float',
};
