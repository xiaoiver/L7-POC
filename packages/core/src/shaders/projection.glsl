const float TILE_SIZE = 512.0;
const float PI = 3.1415926536;
const float WORLD_SCALE = TILE_SIZE / (PI * 2.0);

uniform vec3 u_pixels_per_meter;
uniform float u_project_scale;

// 经纬度 -> [0, 1]
vec2 project_mercator(vec2 lnglat) {
  float x = lnglat.x;
  return vec2(
    radians(x) + PI,
    PI - log(tan(PI * 0.25 + radians(lnglat.y) * 0.5))
  );
}

float project_scale(float meters) {
  return meters * u_pixels_per_meter.z;
}

vec4 project_position(vec4 position) {
  // if (u_is_offset) {
  //   float X = position.x - u_viewport_center.x;
  //   float Y = position.y - u_viewport_center.y;
  //   return project_offset(vec4(X, Y, position.z, position.w));
  // } else {
    return vec4(
      project_mercator(position.xy) * WORLD_SCALE * u_project_scale,
      project_scale(position.z),
      position.w
    );
  // }
}