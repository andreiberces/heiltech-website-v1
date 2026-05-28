"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_res;
out vec4 fragColor;

// Gradient noise hash
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i),             f             ),
        dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
    mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
        dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x), u.y);
}

// Fractal Brownian Motion — 5 octaves
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = p * 2.07 + vec2(100.4, 73.2);
    a *= 0.5;
  }
  return v * 0.5 + 0.5;
}

// Fast hash for high-freq static grain
float grain(vec2 p, float t) {
  return fract(sin(dot(p * u_res, vec2(12.9898, 78.233)) + t * 43.0) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float t  = u_time * 0.055;

  // Two offset noise layers
  float n1 = fbm(uv * 2.8 + t * vec2(0.28, 0.17));
  float n2 = fbm(uv * 5.5 - t * vec2(0.14, 0.33) + 1.73);
  float n  = n1 * 0.65 + n2 * 0.35;

  // High-frequency static grain (not time-smooth — intentional flicker)
  float g = grain(uv, u_time * 60.0) * 0.014;

  // Slow horizontal scanner band (single bright line moving down)
  float scanY = mod(t * 2.8, 1.0);
  float band  = smoothstep(0.06, 0.0, abs(uv.y - scanY));

  // Vertical interference stripes (very subtle)
  float vStripe = sin(uv.x * u_res.x * 0.5 + u_time * 3.0) * 0.5 + 0.5;
  float vLine   = step(0.97, vStripe) * 0.018;

  // Compose: dark void base + noise shimmer + grain + scanner
  vec3 col = vec3(0.036, 0.031, 0.033)
    + n  * vec3(0.030, 0.005, 0.005)
    + g  * vec3(1.0,   0.8,   0.8)
    + band * vec3(0.055, 0.008, 0.008)
    + vLine * vec3(0.04, 0.006, 0.006);

  fragColor = vec4(col, 1.0);
}`;

function buildShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("NoiseField shader error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function NoiseField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const v = buildShader(gl, gl.VERTEX_SHADER, VERT);
    const f = buildShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!v || !f) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    gl.deleteShader(v);
    gl.deleteShader(f);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("NoiseField link error:", gl.getProgramInfoLog(prog));
      return;
    }

    const posLoc  = gl.getAttribLocation(prog, "a_pos");
    const timeLoc = gl.getUniformLocation(prog, "u_time");
    const resLoc  = gl.getUniformLocation(prog, "u_res");

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    // Cap DPR at 1.5 — noise doesn't need retina detail
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let animId: number;
    let alive = true;

    const resize = () => {
      const w = Math.round(canvas.clientWidth  * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const tick = (ms: number) => {
      if (!alive) return;
      resize();
      gl.useProgram(prog);
      gl.uniform1f(timeLoc, ms * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.bindVertexArray(null);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(animId);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
      gl.deleteVertexArray(vao);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
