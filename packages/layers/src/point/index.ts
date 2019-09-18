import {
  glEnum,
  ILayer,
  IModel,
  IModelDrawOptions,
  IRendererService,
  IShaderModuleService,
  lazyInject,
  packCircleVertex,
  TYPES,
} from '@l7-poc/core';
import { featureEach } from '@turf/meta';

interface IPointFeature {
  coordinates: [number, number];
}

/**
 * PointLayer
 */
export default class PointLayer implements ILayer {
  public name: string = 'pointLayer';

  // TODO: use ConfigService
  public pointShape = 'circle';
  public pointColor = [81, 187, 214];
  public pointRadius = 10;
  public pointOpacity = 1;
  public strokeWidth = 2;
  public strokeColor = [255, 255, 255];
  public strokeOpacity = 1;

  @lazyInject(TYPES.IShaderModuleService)
  private readonly shaderModule: IShaderModuleService;

  @lazyInject(TYPES.IRendererService)
  private readonly renderer: IRendererService;

  private model: IModel;

  private pointFeatures: IPointFeature[] = [];

  public init(): void {
    const { vs, fs, uniforms } = this.shaderModule.getModule('circle');

    const {
      packedBuffer,
      packedBuffer2,
      packedBuffer3,
      indexBuffer,
      positionBuffer,
    } = this.buildPointBuffers(this.pointFeatures);

    const {
      createAttribute,
      createBuffer,
      createElements,
      createModel,
    } = this.renderer;

    this.model = createModel({
      attributes: {
        a_Position: createAttribute({
          buffer: createBuffer({
            data: positionBuffer,
            type: glEnum.FLOAT,
          }),
        }),
        a_packed_data: createAttribute({
          buffer: createBuffer({
            data: packedBuffer,
            type: glEnum.FLOAT,
          }),
        }),
      },
      uniforms,
      fs,
      vs,
      count: indexBuffer.length,
      primitive: glEnum.TRIANGLES,
      elements: createElements({
        data: indexBuffer,
        type: glEnum.UNSIGNED_SHORT,
      }),
    });
  }

  public source({ data }: { data: any }): void {
    featureEach(data, ({ geometry: { coordinates }, properties }) => {
      this.pointFeatures.push({
        coordinates,
      });
    });
  }

  public render(options: IModelDrawOptions): void {
    const { uniforms } = options;
    this.model.draw({
      uniforms: {
        ...uniforms,
        u_ModelMatrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        u_pixels_per_meter: [1, 1, 1],
        u_stroke_width: 1,
        u_blur: 0,
        u_opacity: 1,
        u_stroke_color: [1, 1, 1, 1],
        u_stroke_opacity: 1,
      },
    });
  }

  private buildPointBuffers(pointFeatures: IPointFeature[]) {
    const packedBuffer: number[][] = [];
    const packedBuffer2: number[][] = [];
    const packedBuffer3: number[][] = [];
    const positionBuffer: number[][] = [];
    const indexBuffer: Array<[number, number, number]> = [];

    let i = 0;
    pointFeatures.forEach((pointFeature) => {
      // TODO: 判断是否使用瓦片坐标
      const [tileX, tileY] = pointFeature.coordinates;

      // 压缩顶点数据
      const {
        packedBuffer: packed1,
        packedBuffer2: packed2,
        packedBuffer3: packed3,
      } = packCircleVertex({
        color: [...this.pointColor, 255],
        radius: this.pointRadius,
        tileX: 0,
        tileY: 0,
        shape: this.pointShape,
        opacity: this.pointOpacity,
        strokeColor: [...this.strokeColor, 255],
        strokeOpacity: this.strokeOpacity,
        strokeWidth: this.strokeWidth,
      });
      packedBuffer.push(...packed1);
      packedBuffer2.push(...packed2);
      packedBuffer3.push(...packed3);

      // 经纬度坐标
      positionBuffer.push([tileX, tileY]);
      positionBuffer.push([tileX, tileY]);
      positionBuffer.push([tileX, tileY]);
      positionBuffer.push([tileX, tileY]);

      // 构造 index
      indexBuffer.push([0 + i, 1 + i, 2 + i]);
      indexBuffer.push([2 + i, 3 + i, 0 + i]);
      i += 4;
    });

    return {
      packedBuffer,
      packedBuffer2,
      packedBuffer3,
      indexBuffer,
      positionBuffer,
    };
  }
}
