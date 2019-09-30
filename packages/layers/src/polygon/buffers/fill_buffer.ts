import earcut from 'earcut';
import BufferBase, { IBufferInfo, IEncodeFeature } from '../../core/buffer';
export default class FillBuffer extends BufferBase {
  protected buildFeatures() {
    const layerData = this.get('data');
    layerData.forEach((feature: IEncodeFeature) => {
      this.calculateFill(feature);
      delete feature.bufferInfo;
    });
  }

  protected calculateFeatures() {
    const layerData = this.get('data');
    // 计算长
    layerData.forEach((feature: IEncodeFeature) => {
      const { coordinates } = feature;
      const flattengeo = earcut.flatten(coordinates);
      const { vertices, dimensions, holes } = flattengeo;
      const indexArray = earcut(vertices, holes, dimensions).map(
        (v) => this.verticesCount + v,
      );
      const bufferInfo: IBufferInfo = {
        vertices,
        indexArray,
        verticesOffset: this.verticesCount + 0,
        indexOffset: this.indexCount + 0,
        dimensions,
      };
      this.indexCount += indexArray.length;
      this.verticesCount += vertices.length / dimensions;
      feature.bufferInfo = bufferInfo;
    });
  }

  private calculateFill(feature: IEncodeFeature) {
    const {
      indexArray,
      vertices,
      indexOffset,
      verticesOffset,
      dimensions = 3,
    } = feature.bufferInfo;
    const pointCount = vertices.length / dimensions;
    this.encodeArray(feature, pointCount);
    // 添加顶点
    for (let i = 0; i < pointCount; i++) {
      this.attributes.positions.set(
        [vertices[i * dimensions], vertices[i * dimensions + 1], 0],
        (verticesOffset + i) * 3,
      );
      if (this.get('uv')) {
        // TODO 用过BBox计算纹理坐标
        this.attributes.uv.set(
          [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
          (verticesOffset + i) * 3,
        );
      }
    }
    feature.bufferInfo.verticesOffset += pointCount;
    // 添加顶点索引
    this.indexArray.set(indexArray, indexOffset); // 顶部坐标
  }
}
