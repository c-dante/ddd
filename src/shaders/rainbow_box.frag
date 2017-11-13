// Author:
// Title: Rainbow Box

#ifdef GL_ES
precision mediump float;
#endif

#define PI  3.14159265359
#define PI_2 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


void main() {
    vec2 center = vec2(0.5);
    float t = u_time / 2.;
        //mod(u_time / 2., PI_2);
    vec2 st = center - (gl_FragCoord.xy / u_resolution.xy);
    // vec2 sm = center - (u_mouse / u_resolution);
    // float a = length(sm) * 2.;
    // vec2 x = st * sin(t);
    vec3 hsv = vec3(length(sin(st * 3.)) * t, 1.0, 1.0);
    vec3 color = hsv2rgb(hsv);
    gl_FragColor = vec4(color,1.0);
}
