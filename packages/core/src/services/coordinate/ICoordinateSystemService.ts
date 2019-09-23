/**
 * 支持以下坐标系：
 * 1. 经纬度
 * 2. 偏移经纬度，用于解决高精度抖动问题
 * 3. 瓦片坐标，用于数据瓦片
 * 4. 常规世界坐标系，用于常规 2D/3D 可视化场景
 * @see https://yuque.antfin-inc.com/yuqi.pyq/fgetpa/doml91
 */

// TODO：自动注入 Shader 中
export enum CoordinateSystem {
  LNGLAT = 1.0,
  LNGLAT_OFFSET = 2.0,
  VECTOR_TILE = 3.0,
  IDENTITY = 4.0,
}

export default interface ICoordinateSystemService {
  refresh(): void;
  getCoordniateSystem(): CoordinateSystem;
  getViewportCenter(): [number, number];
  getViewportCenterProjection(): [number, number, number, number];
  getPixelsPerDegree(): [number, number, number];
  getPixelsPerDegree2(): [number, number, number];
  getPixelsPerMeter(): [number, number, number];
}
