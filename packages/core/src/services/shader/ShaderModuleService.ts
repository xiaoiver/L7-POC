import { inject, injectable } from 'inversify';
import { ILogger, LoggingContext } from 'inversify-logging';
import { uniq } from 'lodash';
import { TYPES } from '../../types';
import { extractUniforms } from '../../utils/shader-module';
import IShaderModuleService, { IModuleParams } from './IShaderModuleService';

import circleFrag from '../../shaders/circle_frag.glsl';
import circleVert from '../../shaders/circle_vert.glsl';
import decode from '../../shaders/decode.glsl';
import projection from '../../shaders/projection.glsl';
import sdf2d from '../../shaders/sdf_2d.glsl';

const precisionRegExp = /precision\s+(high|low|medium)p\s+float/;
const globalDefaultprecision =
  '#ifdef GL_FRAGMENT_PRECISION_HIGH\n precision highp float;\n #else\n precision mediump float;\n#endif\n';
const includeRegExp = /#pragma include (["^+"]?["\ "[a-zA-Z_0-9](.*)"]*?)/g;

@injectable()
@LoggingContext('ShaderModuleService')
export default class ShaderModuleService implements IShaderModuleService {
  @inject(TYPES.ILogService) public logger: ILogger;

  private moduleCache: { [key: string]: IModuleParams } = {};
  private rawContentCache: { [key: string]: IModuleParams } = {};

  public registerBuiltinModules() {
    this.registerModule('decode', { vs: decode, fs: '' });
    this.registerModule('projection', { vs: projection, fs: '' });
    this.registerModule('sdf_2d', { vs: '', fs: sdf2d });
    this.registerModule('circle', { vs: circleVert, fs: circleFrag });

    this.logger.info('builtin modules compiled');
  }

  public registerModule(moduleName: string, moduleParams: IModuleParams) {
    const { vs, fs, uniforms: declaredUniforms } = moduleParams;
    const { content: extractedVS, uniforms: vsUniforms } = extractUniforms(vs);
    const { content: extractedFS, uniforms: fsUniforms } = extractUniforms(fs);

    this.rawContentCache[moduleName] = {
      fs: extractedFS,
      uniforms: {
        ...vsUniforms,
        ...fsUniforms,
        ...declaredUniforms,
      },
      vs: extractedVS,
    };
  }

  public getModule(moduleName: string): IModuleParams {
    if (this.moduleCache[moduleName]) {
      return this.moduleCache[moduleName];
    }

    const rawVS = this.rawContentCache[moduleName].vs;
    const rawFS = this.rawContentCache[moduleName].fs;

    const { content: vs, includeList: vsIncludeList } = this.processModule(
      rawVS,
      [],
      'vs',
    );
    const { content: fs, includeList: fsIncludeList } = this.processModule(
      rawFS,
      [],
      'fs',
    );
    let compiledFs = fs;
    // TODO: extract uniforms and their default values from GLSL
    const uniforms: {
      [key: string]: any;
    } = uniq(vsIncludeList.concat(fsIncludeList).concat(moduleName)).reduce(
      (prev, cur: string) => {
        return {
          ...prev,
          ...this.rawContentCache[cur].uniforms,
        };
      },
      {},
    );

    /**
     * set default precision for fragment shader
     * https://stackoverflow.com/questions/28540290/why-it-is-necessary-to-set-precision-for-the-fragment-shader
     */
    if (!precisionRegExp.test(fs)) {
      compiledFs = globalDefaultprecision + fs;
    }

    this.moduleCache[moduleName] = {
      fs: compiledFs.trim(),
      uniforms,
      vs: vs.trim(),
    };
    return this.moduleCache[moduleName];
  }

  private processModule(
    rawContent: string,
    includeList: string[],
    type: 'vs' | 'fs',
  ): {
    content: string;
    includeList: string[];
  } {
    const compiled = rawContent.replace(includeRegExp, (_, strMatch) => {
      const includeOpt = strMatch.split(' ');
      const includeName = includeOpt[0].replace(/"/g, '');

      if (includeList.indexOf(includeName) > -1) {
        return '';
      }

      const txt = this.rawContentCache[includeName][type];
      includeList.push(includeName);

      const { content } = this.processModule(txt, includeList, type);
      return content;
    });

    return {
      content: compiled,
      includeList,
    };
  }
}
