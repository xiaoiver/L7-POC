import { glEnum } from './glenum';
import IAttribute, { IAttributeInitializationOptions } from './IAttribute';
import IBuffer, { IBufferInitializationOptions } from './IBuffer';
import IElements, { IElementsInitializationOptions } from './IElements';

export interface IModelInitializationOptions {
  /**
   * Shader 字符串，假设此时已经经过 ShaderLib 处理
   */
  vs: string;
  fs: string;

  uniforms?: {
    [key: string]: number | number[] | boolean;
  };

  attributes: {
    [key: string]: IAttribute;
  };

  /**
   * gl.POINTS | gl.TRIANGLES | ...
   * 默认值 gl.TRIANGLES
   */
  primitive?:
    | glEnum.POINTS
    | glEnum.LINES
    | glEnum.LINE_LOOP
    | glEnum.LINE_STRIP
    | glEnum.TRIANGLES
    | glEnum.TRIANGLE_FAN
    | glEnum.TRIANGLE_STRIP;
  // 绘制的顶点数目
  count?: number;
  // 默认值为 0
  offset?: number;

  /**
   * gl.drawElements
   */
  elements?: IElements;
  /**
   * 绘制实例数目
   */
  instances?: number;
}

export interface IModelDrawOptions {
  uniforms?: {
    [key: string]: number | number[] | boolean;
  };

  attributes?: {
    [key: string]: IAttribute;
  };
}

export interface IModel {
  draw(options: IModelDrawOptions): void;
}

export default interface IRendererService {
  init($container: HTMLDivElement): Promise<void>;
  createModel(options: IModelInitializationOptions): IModel;
  createAttribute(options: IAttributeInitializationOptions): IAttribute;
  createBuffer(options: IBufferInitializationOptions): IBuffer;
  createElements(options: IElementsInitializationOptions): IElements;
}
