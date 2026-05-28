"use client";

import { useEffect, useRef } from "react";

/* ─── GLSL ES 3.0 ─────────────────────────────────────────────────── */

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_res;
out vec4 fragColor;

#define TAU 6.28318530718

// 5 contact blips: (angle_radians, radius)
const int   N_BLIPS = 5;
const float B_ANGLES[5] = float[5](0.87, 2.31, 3.78, 4.92, 1.54);
const float B_RADII[5]  = float[5](0.52, 0.71, 0.38, 0.65, 0.83);

void main() {
  // Map pixel to [-1, 1] NDC with aspect-corrected circle
  vec2 uv = (2.0 * gl_FragCoord.xy - u_res) / min(u_res.x, u_res.y);
  float d  = length(uv);

  // Hard-clip outside unit disc
  if (d > 1.01) { fragColor = vec4(0.036, 0.032, 0.036, 1.0); return; }

  // ── Base colour (near-void) ─────────────────────────────────────
  vec3 col = vec3(0.036, 0.032, 0.036);

  // ── Concentric range rings ──────────────────────────────────────
  for (float i = 1.0; i <= 4.0; i++) {
    float r    = i * 0.25;
    float ring = smoothstep(0.009, 0.0, abs(d - r));
    col += ring * vec3(0.55, 0.08, 0.08) * 0.35;
  }

  // ── Cross-hair lines ────────────────────────────────────────────
  float cross = max(
    smoothstep(0.003, 0.0, abs(uv.x)),
    smoothstep(0.003, 0.0, abs(uv.y))
  );
  col += cross * vec3(0.40, 0.06, 0.06) * 0.30;

  // ── Degree tick-marks every 30° on outer ring ───────────────────
  for (float a = 0.0; a < TAU; a += TAU / 12.0) {
    vec2  dir  = vec2(cos(a), sin(a));
    float tick = smoothstep(0.004, 0.0, abs(dot(uv, vec2(-dir.y, dir.x))));
    float ring = smoothstep(0.018, 0.0, abs(d - 0.97));
    col += tick * ring * vec3(0.55, 0.08, 0.08) * 0.50;
  }

  // ── Sweep angle (one rotation every ~9.7 s) ─────────────────────
  float sweep = mod(u_time * 0.648, TAU);           // leading edge angle
  float pAngle = mod(atan(uv.y, uv.x) + TAU, TAU); // pixel angle [0, TAU]
  float delta  = mod(sweep - pAngle + TAU, TAU);    // lag behind sweep

  // Phosphor decay trail (28 % of full circle)
  float trailLen = TAU * 0.28;
  if (delta < trailLen && d > 0.04) {
    float t = 1.0 - delta / trailLen;
    float trail = t * t * (1.0 - d * 0.25);         // fade toward rim
    col += trail * vec3(0.85, 0.12, 0.12) * 0.75;
  }

  // Bright leading edge
  float lead = smoothstep(0.055, 0.0, delta) * smoothstep(0.04, 0.10, d);
  col += lead * vec3(1.0, 0.28, 0.28) * 0.95;

  // ── Contact blips ───────────────────────────────────────────────
  for (int i = 0; i < N_BLIPS; i++) {
    vec2  bPos   = B_RADII[i] * vec2(cos(B_ANGLES[i]), sin(B_ANGLES[i]));
    float bDelta = mod(sweep - B_ANGLES[i] + TAU, TAU);
    float fade   = exp(-(bDelta / TAU) * 5.5);       // exponential decay

    // Core blip
    float blip   = smoothstep(0.040, 0.004, length(uv - bPos)) * fade;
    col += blip  * vec3(1.0, 0.22, 0.22) * 1.9;

    // Bloom halo
    float halo   = smoothstep(0.090, 0.0,   length(uv - bPos)) * fade * 0.35;
    col += halo  * vec3(0.50, 0.07, 0.07);
  }

  // ── Center targeting dot ────────────────────────────────────────
  col += smoothstep(0.040, 0.0, d) * vec3(0.90, 0.20, 0.20) * 0.75;

  // ── Rim vignette (flat falloff, no gradient) ────────────────────
  col *= 1.0 - d * 0.30;
  col *= smoothstep(1.01, 0.95, d);   // hard anti-alias at disc edge

  fragColor = vec4(col, 1.0);
}`;

/* ─── WebGL helpers ────────────────────────────────────────────────── */

function buildShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function buildProgram(gl: WebGL2RenderingContext) {
  const v = buildShader(gl, gl.VERTEX_SHADER, VERT);
  const f = buildShader(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!v || !f) return null;
  const p = gl.createProgram()!;
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("Program error:", gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

/* ─── Component ────────────────────────────────────────────────────── */

export default function RadarSweep({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const prog = buildProgram(gl);
    if (!prog) return;

    const posLoc  = gl.getAttribLocation(prog, "a_pos");
    const timeLoc = gl.getUniformLocation(prog, "u_time");
    const resLoc  = gl.getUniformLocation(prog, "u_res");

    // Fullscreen quad
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId: number;
    let alive = true;

    const resize = () => {
      const w = Math.round(canvas.clientWidth  * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
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
