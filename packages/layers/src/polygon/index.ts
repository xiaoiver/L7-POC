import {
  glEnum,
  ILayer,
  ILayerStyleOptions,
  ILayerStyleService,
  IModel,
  IModelDrawOptions,
  IRendererService,
  IShaderModuleService,
  lazyInject,
  packCircleVertex,
  TYPES,
} from '@l7-poc/core';
import BaseLayer from '../core/baseLayer';
import fillBuffer from './buffers/fill_buffer';
export interface IPointLayerStyleOptions extends ILayerStyleOptions {
  pointShape: string;
  pointColor: [number, number, number];
  pointRadius: number;
  pointOpacity: number;
  strokeWidth: number;
  strokeColor: [number, number, number];
  strokeOpacity: number;
}

export default class PolygonLayer extends BaseLayer {
  public name: string = 'PolygonLayer';

  @lazyInject(TYPES.IShaderModuleService)
  private readonly shaderModule: IShaderModuleService;

  @lazyInject(TYPES.IRendererService)
  private readonly renderer: IRendererService;

  @lazyInject(TYPES.ILayerStyleService)
  private readonly layerStyleService: ILayerStyleService;
  public style(options: Partial<IPointLayerStyleOptions>) {
    // this.layerStyleService.update(options);
    // this.styleOptions = {
    //   ...this.styleOptions,
    //   ...options,
    // };
  }

  public prepareRender(): void {
    const { vs, fs, uniforms } = this.shaderModule.getModule('polygon');
    const encode = this.get('encode');
    const buffer = new fillBuffer({
      data: encode.encodeData,
    });
    console.log(buffer);
    const {
      createAttribute,
      createBuffer,
      createElements,
      createModel,
    } = this.renderer;
    this.models.push(
      createModel({
        attributes: {
          a_Position: createAttribute({
            buffer: createBuffer({
              data: buffer.attributes.positions,
              type: glEnum.FLOAT,
            }),
            size: 3,
          }),
          a_color: createAttribute({
            buffer: createBuffer({
              data: buffer.attributes.colors,
              type: glEnum.FLOAT,
            }),
            size: 4,
          }),
        },
        uniforms,
        fs,
        vs,
        count: buffer.indexArray.length,
        elements: createElements({
          data: buffer.indexArray,
          type: glEnum.UNSIGNED_INT,
        }),
      }),
    );
  }
  public render() {
    this.models.forEach((model) => model.draw({}));
    return this;
  }
}
