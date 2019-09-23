import { glEnum } from './glenum';
import IAttribute from './IAttribute';
import IElements from './IElements';
import { IUniform } from './IUniform';

export interface IModelInitializationOptions {
  /**
   * Shader 字符串，假设此时已经经过 ShaderLib 处理
   */
  vs: string;
  fs: string;

  uniforms?: {
    [key: string]: IUniform;
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
    [key: string]: IUniform;
  };

  attributes?: {
    [key: string]: IAttribute;
  };
}

export default interface IModel {
  addUniforms(uniforms: { [key: string]: IUniform }): void;
  draw(options: IModelDrawOptions): void;
}
