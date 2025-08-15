// src/components/SquidGameBackground.jsx
import React, { useEffect, useRef } from "react";

export default function SquidGameBackground({ accent = "#FF0050" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d", { alpha: true });

    const DPR = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for mobile perf
    let W = (c.width = Math.floor(window.innerWidth * DPR));
    let H = (c.height = Math.floor(window.innerHeight * DPR));
    c.style.width = "100%";
    c.style.height = "100%";
    ctx.scale(DPR, DPR);
    let vw = W / DPR, vh = H / DPR;

    const COLOR_A = accent;       // Neon Pink
    const COLOR_B = "#00FF87";    // Neon Green
    const COLOR_C = "#FFFFFF";    // White Glow
    const BG_BASE = "#000000";

    const SHAPE_COUNT = 18;
    const PARTICLE_COUNT = 90;
    const MARBLE_COUNT = 12;

    const shapes = [];
    const particles = [];
    const marbles = [];

    const types = ["circle", "triangle", "square"];
    const colors = [COLOR_A, COLOR_B, COLOR_C];
    const R = (min, max) => min + Math.random() * (max - min);

    // Main shapes
    for (let i = 0; i < SHAPE_COUNT; i++) {
      shapes.push({
        type: types[i % types.length],
        x: Math.random() * vw,
        y: Math.random() * vh,
        size: R(40, 90),
        speed: R(0.2, 0.8),
        depth: R(0.5, 2.2),
        rot: Math.random() * Math.PI,
        rotSpeed: R(-0.003, 0.003),
        color: colors[i % colors.length],
        glow: R(8, 22),
        sway: R(0.4, 1.8),
        phase: Math.random() * Math.PI * 2
      });
    }

    // Floating dust
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        r: R(0.5, 1.5),
        speedY: R(0.1, 0.3),
        alpha: R(0.15, 0.4),
        drift: R(-0.1, 0.1)
      });
    }

    // Marbles
    for (let i = 0; i < MARBLE_COUNT; i++) {
      marbles.push({
        x: Math.random() * vw,
        y: Math.random() * vh,
        r: R(4, 8),
        speedY: R(0.25, 0.5),
        hue: R(0, 360),
        drift: R(-0.15, 0.15)
      });
    }

    let targetPX = 0, targetPY = 0;
    let pX = 0, pY = 0;
    let scrollFactor = 0;
    let frame = 0;

    const onMove = (e) => {
      const x = e.clientX ?? (e.touches?.[0]?.clientX) ?? vw / 2;
      const y = e.clientY ?? (e.touches?.[0]?.clientY) ?? vh / 2;
      targetPX = ((x / vw) - 0.5) * 20;
      targetPY = ((y / vh) - 0.5) * 12;
    };

    const onScroll = () => {
      scrollFactor = Math.min(2, window.scrollY / 600);
    };

    const onResize = () => {
      const DPR2 = Math.min(window.devicePixelRatio || 1, 2);
      W = c.width = Math.floor(window.innerWidth * DPR2);
      H = c.height = Math.floor(window.innerHeight * DPR2);
      c.style.width = "100%";
      c.style.height = "100%";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR2, DPR2);
      vw = W / DPR2;
      vh = H / DPR2;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const fillRect = (color, a = 1) => {
      ctx.globalAlpha = a;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, vw, vh);
      ctx.globalAlpha = 1;
    };

    const drawFog = (t) => {
      const cx = vw / 2;
      const cy = vh / 2;
      const r = Math.max(vw, vh);
      const hueShift = (Math.sin(t * 0.002) * 20 + 340) % 360;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `hsla(${hueShift}, 100%, 60%, 0.08)`);
      g.addColorStop(0.5, `hsla(${(hueShift + 100) % 360}, 100%, 50%, 0.08)`);
      g.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, vw, vh);
      ctx.globalCompositeOperation = "source-over";
    };

    const drawGlassBridge = (t) => {
      ctx.save();
      ctx.strokeStyle = "rgba(200,255,255,0.25)";
      ctx.lineWidth = 2;
      const vpY = vh * 0.55;
      for (let i = -5; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(vw / 2 + i * 100, vh);
        ctx.lineTo(vw / 2 + i * 20, vpY);
        ctx.stroke();
      }
      ctx.strokeStyle = `rgba(255,255,255,${0.15 + 0.05 * Math.sin(t * 0.02)})`;
      for (let y = vpY; y < vh; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(vw, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawShape = (s, pulse) => {
      const sx = s.x + pX * (s.depth * 0.6);
      const sy = s.y + pY * (s.depth * 0.5);
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(s.rot);
      ctx.shadowBlur = s.glow + pulse * 0.5;
      ctx.shadowColor = s.color;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 3;
      const size = s.size + Math.sin(frame * 0.015 + s.phase) * 2;
      if (s.type === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else if (s.type === "triangle") {
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.strokeRect(-size / 2, -size / 2, size, size);
      }
      ctx.restore();
    };

    const tick = () => {
      frame++;
      pX += (targetPX - pX) * 0.06;
      pY += (targetPY - pY) * 0.06;

      fillRect(BG_BASE, 1);
      drawFog(frame);
      drawGlassBridge(frame);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.drift;
        if (p.y < -2) { p.y = vh + 2; p.x = Math.random() * vw; }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      for (const m of marbles) {
        m.y += m.speedY;
        m.x += m.drift;
        if (m.y > vh + m.r) { m.y = -m.r; m.x = Math.random() * vw; }
        ctx.fillStyle = `hsl(${m.hue}, 80%, 60%)`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const pulse = (Math.sin(frame * 0.06) + 1) * 6;
      for (const s of shapes) {
        s.y -= (s.speed + scrollFactor * 0.4) * s.depth;
        s.rot += s.rotSpeed;
        s.x += Math.sin(frame * 0.008 + s.phase) * (0.2 * s.sway);
        if (s.y < -s.size) { s.y = vh + s.size; s.x = Math.random() * vw; }
        drawShape(s, pulse);
      }

      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, vw, vh);

      requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [accent]);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20" />;
}
