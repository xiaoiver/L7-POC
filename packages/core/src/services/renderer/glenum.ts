/**
 * WebGL 枚举值
 * @see http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
 * TODO: 使用 babel 插件对常量进行内联，以减少最终打包产物大小
 * @see https://github.com/uber/deck.gl/blob/7.1-release/dev-docs/roadmaps/dist-size-roadmap.md#inline-gl-constants
 */

export enum glEnum {
  /* ClearBufferMask */
  DEPTH_BUFFER_BIT = 0x00000100,
  STENCIL_BUFFER_BIT = 0x00000400,
  COLOR_BUFFER_BIT = 0x00004000,

  /* BeginMode */
  POINTS = 0x0000,
  LINES = 0x0001,
  LINE_LOOP = 0x0002,
  LINE_STRIP = 0x0003,
  TRIANGLES = 0x0004,
  TRIANGLE_STRIP = 0x0005,
  TRIANGLE_FAN = 0x0006,

  /* AlphaFunction (not supported in ES20) */
  /*      NEVER */
  /*      LESS */
  /*      EQUAL */
  /*      LEQUAL */
  /*      GREATER */
  /*      NOTEQUAL */
  /*      GEQUAL */
  /*      ALWAYS */

  /* BlendingFactorDest */
  ZERO = 0,
  ONE = 1,
  SRC_COLOR = 0x0300,
  ONE_MINUS_SRC_COLOR = 0x0301,
  SRC_ALPHA = 0x0302,
  ONE_MINUS_SRC_ALPHA = 0x0303,
  DST_ALPHA = 0x0304,
  ONE_MINUS_DST_ALPHA = 0x0305,

  /* BlendingFactorSrc */
  /*      ZERO */
  /*      ONE */
  DST_COLOR = 0x0306,
  ONE_MINUS_DST_COLOR = 0x0307,
  SRC_ALPHA_SATURATE = 0x0308,
  /*      SRC_ALPHA */
  /*      ONE_MINUS_SRC_ALPHA */
  /*      DST_ALPHA */
  /*      ONE_MINUS_DST_ALPHA */

  /* BlendEquationSeparate */
  FUNC_ADD = 0x8006,
  BLEND_EQUATION = 0x8009,
  BLEND_EQUATION_RGB = 0x8009 /* same as BLEND_EQUATION */,
  BLEND_EQUATION_ALPHA = 0x883d,

  /* BlendSubtract */
  FUNC_SUBTRACT = 0x800a,
  FUNC_REVERSE_SUBTRACT = 0x800b,

  /* Separate Blend Functions */
  BLEND_DST_RGB = 0x80c8,
  BLEND_SRC_RGB = 0x80c9,
  BLEND_DST_ALPHA = 0x80ca,
  BLEND_SRC_ALPHA = 0x80cb,
  CONSTANT_COLOR = 0x8001,
  ONE_MINUS_CONSTANT_COLOR = 0x8002,
  CONSTANT_ALPHA = 0x8003,
  ONE_MINUS_CONSTANT_ALPHA = 0x8004,
  BLEND_COLOR = 0x8005,

  /* Buffer Objects */
  ARRAY_BUFFER = 0x8892,
  ELEMENT_ARRAY_BUFFER = 0x8893,
  ARRAY_BUFFER_BINDING = 0x8894,
  ELEMENT_ARRAY_BUFFER_BINDING = 0x8895,

  STREAM_DRAW = 0x88e0,
  STATIC_DRAW = 0x88e4,
  DYNAMIC_DRAW = 0x88e8,

  BUFFER_SIZE = 0x8764,
  BUFFER_USAGE = 0x8765,

  CURRENT_VERTEX_ATTRIB = 0x8626,

  /* CullFaceMode */
  FRONT = 0x0404,
  BACK = 0x0405,
  FRONT_AND_BACK = 0x0408,

  /* DepthFunction */
  /*      NEVER */
  /*      LESS */
  /*      EQUAL */
  /*      LEQUAL */
  /*      GREATER */
  /*      NOTEQUAL */
  /*      GEQUAL */
  /*      ALWAYS */

  /* EnableCap */
  /* TEXTURE_2D */
  CULL_FACE = 0x0b44,
  BLEND = 0x0be2,
  DITHER = 0x0bd0,
  STENCIL_TEST = 0x0b90,
  DEPTH_TEST = 0x0b71,
  SCISSOR_TEST = 0x0c11,
  POLYGON_OFFSET_FILL = 0x8037,
  SAMPLE_ALPHA_TO_COVERAGE = 0x809e,
  SAMPLE_COVERAGE = 0x80a0,

  /* ErrorCode */
  NO_ERROR = 0,
  INVALID_ENUM = 0x0500,
  INVALID_VALUE = 0x0501,
  INVALID_OPERATION = 0x0502,
  OUT_OF_MEMORY = 0x0505,

  /* FrontFaceDirection */
  CW = 0x0900,
  CCW = 0x0901,

  /* GetPName */
  LINE_WIDTH = 0x0b21,
  ALIASED_POINT_SIZE_RANGE = 0x846d,
  ALIASED_LINE_WIDTH_RANGE = 0x846e,
  CULL_FACE_MODE = 0x0b45,
  FRONT_FACE = 0x0b46,
  DEPTH_RANGE = 0x0b70,
  DEPTH_WRITEMASK = 0x0b72,
  DEPTH_CLEAR_VALUE = 0x0b73,
  DEPTH_FUNC = 0x0b74,
  STENCIL_CLEAR_VALUE = 0x0b91,
  STENCIL_FUNC = 0x0b92,
  STENCIL_FAIL = 0x0b94,
  STENCIL_PASS_DEPTH_FAIL = 0x0b95,
  STENCIL_PASS_DEPTH_PASS = 0x0b96,
  STENCIL_REF = 0x0b97,
  STENCIL_VALUE_MASK = 0x0b93,
  STENCIL_WRITEMASK = 0x0b98,
  STENCIL_BACK_FUNC = 0x8800,
  STENCIL_BACK_FAIL = 0x8801,
  STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS = 0x8803,
  STENCIL_BACK_REF = 0x8ca3,
  STENCIL_BACK_VALUE_MASK = 0x8ca4,
  STENCIL_BACK_WRITEMASK = 0x8ca5,
  VIEWPORT = 0x0ba2,
  SCISSOR_BOX = 0x0c10,
  /*      SCISSOR_TEST */
  COLOR_CLEAR_VALUE = 0x0c22,
  COLOR_WRITEMASK = 0x0c23,
  UNPACK_ALIGNMENT = 0x0cf5,
  PACK_ALIGNMENT = 0x0d05,
  MAX_TEXTURE_SIZE = 0x0d33,
  MAX_VIEWPORT_DIMS = 0x0d3a,
  SUBPIXEL_BITS = 0x0d50,
  RED_BITS = 0x0d52,
  GREEN_BITS = 0x0d53,
  BLUE_BITS = 0x0d54,
  ALPHA_BITS = 0x0d55,
  DEPTH_BITS = 0x0d56,
  STENCIL_BITS = 0x0d57,
  POLYGON_OFFSET_UNITS = 0x2a00,
  /*      POLYGON_OFFSET_FILL */
  POLYGON_OFFSET_FACTOR = 0x8038,
  TEXTURE_BINDING_2D = 0x8069,
  SAMPLE_BUFFERS = 0x80a8,
  SAMPLES = 0x80a9,
  SAMPLE_COVERAGE_VALUE = 0x80aa,
  SAMPLE_COVERAGE_INVERT = 0x80ab,

  /* GetTextureParameter */
  /*      TEXTURE_MAG_FILTER */
  /*      TEXTURE_MIN_FILTER */
  /*      TEXTURE_WRAP_S */
  /*      TEXTURE_WRAP_T */

  COMPRESSED_TEXTURE_FORMATS = 0x86a3,

  /* HintMode */
  DONT_CARE = 0x1100,
  FASTEST = 0x1101,
  NICEST = 0x1102,

  /* HintTarget */
  GENERATE_MIPMAP_HINT = 0x8192,

  /* DataType */
  BYTE = 0x1400,
  UNSIGNED_BYTE = 0x1401,
  SHORT = 0x1402,
  UNSIGNED_SHORT = 0x1403,
  INT = 0x1404,
  UNSIGNED_INT = 0x1405,
  FLOAT = 0x1406,

  /* PixelFormat */
  DEPTH_COMPONENT = 0x1902,
  ALPHA = 0x1906,
  RGB = 0x1907,
  RGBA = 0x1908,
  LUMINANCE = 0x1909,
  LUMINANCE_ALPHA = 0x190a,

  /* PixelType */
  /*      UNSIGNED_BYTE */
  UNSIGNED_SHORT_4_4_4_4 = 0x8033,
  UNSIGNED_SHORT_5_5_5_1 = 0x8034,
  UNSIGNED_SHORT_5_6_5 = 0x8363,

  /* Shaders */
  FRAGMENT_SHADER = 0x8b30,
  VERTEX_SHADER = 0x8b31,
  MAX_VERTEX_ATTRIBS = 0x8869,
  MAX_VERTEX_UNIFORM_VECTORS = 0x8dfb,
  MAX_VARYING_VECTORS = 0x8dfc,
  MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8b4d,
  MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8b4c,
  MAX_TEXTURE_IMAGE_UNITS = 0x8872,
  MAX_FRAGMENT_UNIFORM_VECTORS = 0x8dfd,
  SHADER_TYPE = 0x8b4f,
  DELETE_STATUS = 0x8b80,
  LINK_STATUS = 0x8b82,
  VALIDATE_STATUS = 0x8b83,
  ATTACHED_SHADERS = 0x8b85,
  ACTIVE_UNIFORMS = 0x8b86,
  ACTIVE_ATTRIBUTES = 0x8b89,
  SHADING_LANGUAGE_VERSION = 0x8b8c,
  CURRENT_PROGRAM = 0x8b8d,

  /* StencilFunction */
  NEVER = 0x0200,
  LESS = 0x0201,
  EQUAL = 0x0202,
  LEQUAL = 0x0203,
  GREATER = 0x0204,
  NOTEQUAL = 0x0205,
  GEQUAL = 0x0206,
  ALWAYS = 0x0207,

  /* StencilOp */
  /*      ZERO */
  KEEP = 0x1e00,
  REPLACE = 0x1e01,
  INCR = 0x1e02,
  DECR = 0x1e03,
  INVERT = 0x150a,
  INCR_WRAP = 0x8507,
  DECR_WRAP = 0x8508,

  /* StringName */
  VENDOR = 0x1f00,
  RENDERER = 0x1f01,
  VERSION = 0x1f02,

  /* TextureMagFilter */
  NEAREST = 0x2600,
  LINEAR = 0x2601,

  /* TextureMinFilter */
  /*      NEAREST */
  /*      LINEAR */
  NEAREST_MIPMAP_NEAREST = 0x2700,
  LINEAR_MIPMAP_NEAREST = 0x2701,
  NEAREST_MIPMAP_LINEAR = 0x2702,
  LINEAR_MIPMAP_LINEAR = 0x2703,

  /* TextureParameterName */
  TEXTURE_MAG_FILTER = 0x2800,
  TEXTURE_MIN_FILTER = 0x2801,
  TEXTURE_WRAP_S = 0x2802,
  TEXTURE_WRAP_T = 0x2803,

  /* TextureTarget */
  TEXTURE_2D = 0x0de1,
  TEXTURE = 0x1702,

  TEXTURE_CUBE_MAP = 0x8513,
  TEXTURE_BINDING_CUBE_MAP = 0x8514,
  TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515,
  TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516,
  TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517,
  TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518,
  TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519,
  TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851a,
  MAX_CUBE_MAP_TEXTURE_SIZE = 0x851c,

  /* TextureUnit */
  TEXTURE0 = 0x84c0,
  TEXTURE1 = 0x84c1,
  TEXTURE2 = 0x84c2,
  TEXTURE3 = 0x84c3,
  TEXTURE4 = 0x84c4,
  TEXTURE5 = 0x84c5,
  TEXTURE6 = 0x84c6,
  TEXTURE7 = 0x84c7,
  TEXTURE8 = 0x84c8,
  TEXTURE9 = 0x84c9,
  TEXTURE10 = 0x84ca,
  TEXTURE11 = 0x84cb,
  TEXTURE12 = 0x84cc,
  TEXTURE13 = 0x84cd,
  TEXTURE14 = 0x84ce,
  TEXTURE15 = 0x84cf,
  TEXTURE16 = 0x84d0,
  TEXTURE17 = 0x84d1,
  TEXTURE18 = 0x84d2,
  TEXTURE19 = 0x84d3,
  TEXTURE20 = 0x84d4,
  TEXTURE21 = 0x84d5,
  TEXTURE22 = 0x84d6,
  TEXTURE23 = 0x84d7,
  TEXTURE24 = 0x84d8,
  TEXTURE25 = 0x84d9,
  TEXTURE26 = 0x84da,
  TEXTURE27 = 0x84db,
  TEXTURE28 = 0x84dc,
  TEXTURE29 = 0x84dd,
  TEXTURE30 = 0x84de,
  TEXTURE31 = 0x84df,
  ACTIVE_TEXTURE = 0x84e0,

  /* TextureWrapMode */
  REPEAT = 0x2901,
  CLAMP_TO_EDGE = 0x812f,
  MIRRORED_REPEAT = 0x8370,

  /* Uniform Types */
  FLOAT_VEC2 = 0x8b50,
  FLOAT_VEC3 = 0x8b51,
  FLOAT_VEC4 = 0x8b52,
  INT_VEC2 = 0x8b53,
  INT_VEC3 = 0x8b54,
  INT_VEC4 = 0x8b55,
  BOOL = 0x8b56,
  BOOL_VEC2 = 0x8b57,
  BOOL_VEC3 = 0x8b58,
  BOOL_VEC4 = 0x8b59,
  FLOAT_MAT2 = 0x8b5a,
  FLOAT_MAT3 = 0x8b5b,
  FLOAT_MAT4 = 0x8b5c,
  SAMPLER_2D = 0x8b5e,
  SAMPLER_CUBE = 0x8b60,

  /* Vertex Arrays */
  VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622,
  VERTEX_ATTRIB_ARRAY_SIZE = 0x8623,
  VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624,
  VERTEX_ATTRIB_ARRAY_TYPE = 0x8625,
  VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886a,
  VERTEX_ATTRIB_ARRAY_POINTER = 0x8645,
  VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889f,

  /* Shader Source */
  COMPILE_STATUS = 0x8b81,

  /* Shader Precision-Specified Types */
  LOW_FLOAT = 0x8df0,
  MEDIUM_FLOAT = 0x8df1,
  HIGH_FLOAT = 0x8df2,
  LOW_INT = 0x8df3,
  MEDIUM_INT = 0x8df4,
  HIGH_INT = 0x8df5,

  /* Framebuffer Object. */
  FRAMEBUFFER = 0x8d40,
  RENDERBUFFER = 0x8d41,

  RGBA4 = 0x8056,
  RGB5_A1 = 0x8057,
  RGB565 = 0x8d62,
  DEPTH_COMPONENT16 = 0x81a5,
  STENCIL_INDEX = 0x1901,
  STENCIL_INDEX8 = 0x8d48,
  DEPTH_STENCIL = 0x84f9,

  RENDERBUFFER_WIDTH = 0x8d42,
  RENDERBUFFER_HEIGHT = 0x8d43,
  RENDERBUFFER_INTERNAL_FORMAT = 0x8d44,
  RENDERBUFFER_RED_SIZE = 0x8d50,
  RENDERBUFFER_GREEN_SIZE = 0x8d51,
  RENDERBUFFER_BLUE_SIZE = 0x8d52,
  RENDERBUFFER_ALPHA_SIZE = 0x8d53,
  RENDERBUFFER_DEPTH_SIZE = 0x8d54,
  RENDERBUFFER_STENCIL_SIZE = 0x8d55,

  FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8cd0,
  FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8cd1,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8cd2,
  FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8cd3,

  COLOR_ATTACHMENT0 = 0x8ce0,
  DEPTH_ATTACHMENT = 0x8d00,
  STENCIL_ATTACHMENT = 0x8d20,
  DEPTH_STENCIL_ATTACHMENT = 0x821a,

  NONE = 0,

  FRAMEBUFFER_COMPLETE = 0x8cd5,
  FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8cd6,
  FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8cd7,
  FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8cd9,
  FRAMEBUFFER_UNSUPPORTED = 0x8cdd,

  FRAMEBUFFER_BINDING = 0x8ca6,
  RENDERBUFFER_BINDING = 0x8ca7,
  MAX_RENDERBUFFER_SIZE = 0x84e8,

  INVALID_FRAMEBUFFER_OPERATION = 0x0506,

  /* WebGL-specific enums */
  UNPACK_FLIP_Y_WEBGL = 0x9240,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241,
  CONTEXT_LOST_WEBGL = 0x9242,
  UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243,
  BROWSER_DEFAULT_WEBGL = 0x9244,
}
