"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

// Oscilloscope-style signal: multiple overlapping sine frequencies
const FRAG = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2  u_res;
out vec4 fragColor;

// Pseudo-random
float hash(float n) { return fract(sin(n) * 43758.5453); }

// Draw a single waveform line
float wave(vec2 uv, float freq, float amp, float speed, float phase) {
  float y = amp * sin(uv.x * freq + u_time * speed + phase)
          + amp * 0.4 * sin(uv.x * freq * 2.1 + u_time * speed * 1.3 + phase + 0.8)
          + amp * 0.15 * sin(uv.x * freq * 4.7 + u_time * speed * 0.7 + phase + 2.1);
  return smoothstep(0.018, 0.0, abs(uv.y - y));
}

void main() {
  // uv: x in [-PI, PI] across width, y in [-1, 1]
  vec2 uv  = (2.0 * gl_FragCoord.xy - u_res) / u_res.y;

  vec3 col = vec3(0.0);

  // Primary waveform — crimson
  float w1 = wave(uv, 3.2, 0.28, 1.8, 0.0);
  col += w1 * vec3(0.85, 0.12, 0.12);

  // Secondary waveform — dim red
  float w2 = wave(uv, 5.8, 0.18, 2.6, 1.2);
  col += w2 * vec3(0.45, 0.06, 0.06) * 0.7;

  // Tertiary waveform — very dim
  float w3 = wave(uv, 9.1, 0.10, 4.1, 3.3);
  col += w3 * vec3(0.25, 0.04, 0.04) * 0.5;

  // Baseline (0-volt axis)
  float baseline = smoothstep(0.003, 0.0, abs(uv.y)) * 0.15;
  col += baseline * vec3(0.30, 0.05, 0.05);

  // Phosphor bloom on primary
  float bloom = wave(uv, 3.2, 0.28, 1.8, 0.0);
  col += smoothstep(0.06, 0.0, abs(uv.y - (0.28 * sin(uv.x * 3.2 + u_time * 1.8))))
       * vec3(0.30, 0.04, 0.04) * 0.35;

  fragColor = vec4(col, 1.0);
}`;

function buildShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("SignalWave shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function SignalWave({ className }: { className?: string }) {
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
    gl.attachShader(prog, v); gl.attachShader(prog, f);
    gl.linkProgram(prog);
    gl.deleteShader(v); gl.deleteShader(f);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const posLoc  = gl.getAttribLocation(prog, "a_pos");
    const timeLoc = gl.getUniformLocation(prog, "u_time");
    const resLoc  = gl.getUniformLocation(prog, "u_res");

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId: number, alive = true;

    const resize = () => {
      const w = Math.round(canvas.clientWidth * dpr);
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
