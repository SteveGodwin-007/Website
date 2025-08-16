// src/components/SquidGameBackground.jsx
import React, { useEffect, useRef, useCallback } from "react";

export default function SquidGameBackground({ accent = "#FF0050" }) {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const lastTimeRef = useRef(0);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext("2d", { 
      alpha: true, 
      desynchronized: true,
      willReadFrequently: false 
    });

    // Enhanced mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const isLowEnd = navigator.hardwareConcurrency <= 4 || /Android.*Chrome\/[0-9]{2}\./i.test(navigator.userAgent);
    
    // Adaptive DPR for performance
    const baseDPR = window.devicePixelRatio || 1;
    const DPR = isMobile ? Math.min(baseDPR, isLowEnd ? 1.5 : 2) : Math.min(baseDPR, 2);
    
    let width = canvas.width = Math.floor(window.innerWidth * DPR);
    let height = canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.scale(DPR, DPR);
    
    let vw = width / DPR;
    let vh = height / DPR;

    return { ctx, canvas, vw, vh, isMobile, isLowEnd, DPR };
  }, []);

  useEffect(() => {
    const setup = initializeCanvas();
    if (!setup) return;
    
    const { ctx, canvas, vw, vh, isMobile, isLowEnd } = setup;

    // Enhanced color palette
    const colors = {
      accent: accent,
      neonGreen: "#00FF87",
      neonPink: "#FF1B6B",
      whiteGlow: "#FFFFFF",
      background: "#000000",
      glassBlue: "rgba(100,200,255,0.3)",
      fogColor: "hsla(340, 100%, 60%, 0.08)"
    };

    // Performance-adaptive counts
    const SHAPE_COUNT = isLowEnd ? 8 : (isMobile ? 12 : 20);
    const PARTICLE_COUNT = isLowEnd ? 30 : (isMobile ? 45 : 80);
    const MARBLE_COUNT = isLowEnd ? 4 : (isMobile ? 8 : 15);
    const SPARK_COUNT = isLowEnd ? 0 : (isMobile ? 15 : 25);

    // Animation state
    let targetPX = 0, targetPY = 0;
    let pX = 0, pY = 0;
    let scrollFactor = 0;
    let frame = 0;
    let lastRenderTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    // Initialize elements
    const shapes = createShapes(SHAPE_COUNT, vw, vh, isMobile, colors);
    const particles = createParticles(PARTICLE_COUNT, vw, vh);
    const marbles = createMarbles(MARBLE_COUNT, vw, vh);
    const sparks = createSparks(SPARK_COUNT, vw, vh);

    // Enhanced event handlers with throttling
    let ticking = false;
    const onMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = e.clientX ?? (e.touches?.[0]?.clientX) ?? vw / 2;
          const y = e.clientY ?? (e.touches?.[0]?.clientY) ?? vh / 2;
          targetPX = ((x / vw) - 0.5) * (isMobile ? 15 : 25);
          targetPY = ((y / vh) - 0.5) * (isMobile ? 8 : 15);
          ticking = false;
        });
        ticking = true;
      }
    };

    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          scrollFactor = Math.min(3, window.scrollY / 500);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    const onResize = () => {
      const newSetup = initializeCanvas();
      if (newSetup) {
        Object.assign(setup, newSetup);
      }
    };

    // Optimized event listeners
    const addEventListeners = () => {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("touchmove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
    };

    const removeEventListeners = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };

    // Enhanced animation loop with frame limiting
    const tick = (currentTime) => {
      const deltaTime = currentTime - lastRenderTime;
      
      if (deltaTime >= frameInterval) {
        frame++;
        
        // Smooth interpolation
        const easeSpeed = isMobile ? 0.08 : 0.06;
        pX += (targetPX - pX) * easeSpeed;
        pY += (targetPY - pY) * easeSpeed;

        // Clear canvas efficiently
        ctx.clearRect(0, 0, vw, vh);
        
        // Layer rendering
        drawBackground(ctx, vw, vh, colors.background);
        drawEnhancedFog(ctx, vw, vh, frame, colors);
        drawGlassBridge(ctx, vw, vh, frame, isMobile);
        drawParticles(ctx, particles, vw, vh, frame);
        drawMarbles(ctx, marbles, vw, vh, frame);
        drawSparks(ctx, sparks, vw, vh, frame);
        drawShapes(ctx, shapes, vw, vh, frame, pX, pY, scrollFactor, isMobile);
        drawVignette(ctx, vw, vh, frame);

        lastRenderTime = currentTime;
      }
      
      animationIdRef.current = requestAnimationFrame(tick);
    };

    addEventListeners();
    animationIdRef.current = requestAnimationFrame(tick);

    return () => {
      removeEventListeners();
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [accent, initializeCanvas]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-20"
      style={{ 
        touchAction: 'pan-y',
        willChange: 'transform'
      }}
    />
  );
}

// Enhanced helper functions
const createShapes = (count, vw, vh, isMobile, colors) => {
  const types = ["circle", "triangle", "square"];
  const shapes = [];
  const R = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < count; i++) {
    const shapeType = types[i % types.length];
    shapes.push({
      type: shapeType,
      x: Math.random() * vw,
      y: Math.random() * vh,
      size: R(isMobile ? 25 : 35, isMobile ? 65 : 85),
      speed: R(0.3, 1.2),
      depth: R(0.3, 2.5),
      rot: Math.random() * Math.PI * 2,
      rotSpeed: R(-0.005, 0.005),
      color: shapeType === "circle" ? colors.accent : 
             shapeType === "triangle" ? colors.neonGreen : colors.neonPink,
      glow: R(8, isMobile ? 18 : 28),
      sway: R(0.6, 2.2),
      phase: Math.random() * Math.PI * 2,
      pulsePhase: Math.random() * Math.PI * 2,
      glowIntensity: R(0.7, 1.3)
    });
  }
  return shapes;
};

const createParticles = (count, vw, vh) => {
  const particles = [];
  const R = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      r: R(0.3, 1.8),
      speedY: R(0.05, 0.3),
      alpha: R(0.1, 0.5),
      drift: R(-0.15, 0.15),
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: R(0.02, 0.08)
    });
  }
  return particles;
};

const createMarbles = (count, vw, vh) => {
  const marbles = [];
  const R = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < count; i++) {
    marbles.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      r: R(2, 8),
      speedY: R(0.15, 0.5),
      hue: R(0, 360),
      drift: R(-0.2, 0.2),
      bounce: R(0.8, 1.2),
      trail: []
    });
  }
  return marbles;
};

const createSparks = (count, vw, vh) => {
  const sparks = [];
  const R = (min, max) => min + Math.random() * (max - min);

  for (let i = 0; i < count; i++) {
    sparks.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      vx: R(-0.5, 0.5),
      vy: R(-0.3, 0.3),
      life: R(60, 120),
      maxLife: R(60, 120),
      color: `hsl(${R(0, 60)}, 100%, ${R(60, 90)}%)`
    });
  }
  return sparks;
};

const drawBackground = (ctx, vw, vh, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, vw, vh);
};

const drawEnhancedFog = (ctx, vw, vh, t, colors) => {
  const cx = vw / 2, cy = vh / 2;
  const r = Math.max(vw, vh) * 0.8;
  
  // Primary fog layer
  const hueShift = (Math.sin(t * 0.003) * 30 + 340) % 360;
  const gradient1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  gradient1.addColorStop(0, `hsla(${hueShift}, 100%, 60%, 0.08)`);
  gradient1.addColorStop(0.4, `hsla(${(hueShift + 80) % 360}, 100%, 50%, 0.06)`);
  gradient1.addColorStop(1, "rgba(0,0,0,0.8)");
  
  ctx.globalCompositeOperation = "lighter";
  ctx.fillStyle = gradient1;
  ctx.fillRect(0, 0, vw, vh);
  
  // Secondary fog layer with different timing
  const gradient2 = ctx.createRadialGradient(
    cx + Math.sin(t * 0.001) * 100, 
    cy + Math.cos(t * 0.0015) * 80, 
    0, cx, cy, r * 1.2
  );
  gradient2.addColorStop(0, `hsla(${(hueShift + 120) % 360}, 80%, 70%, 0.04)`);
  gradient2.addColorStop(1, "transparent");
  
  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, vw, vh);
  ctx.globalCompositeOperation = "source-over";
};

const drawGlassBridge = (ctx, vw, vh, t, isMobile) => {
  ctx.save();
  
  // Perspective lines with subtle animation
  const intensity = 0.15 + 0.05 * Math.sin(t * 0.02);
  ctx.strokeStyle = `rgba(100, 200, 255, ${intensity})`;
  ctx.lineWidth = isMobile ? 1 : 1.5;
  const vpY = vh * 0.6;

  for (let i = -6; i <= 6; i++) {
    ctx.beginPath();
    const offset = Math.sin(t * 0.01 + i * 0.5) * 5;
    ctx.moveTo(vw / 2 + i * (isMobile ? 60 : 90) + offset, vh);
    ctx.lineTo(vw / 2 + i * 15, vpY);
    ctx.stroke();
  }

  // Horizontal grid lines
  ctx.strokeStyle = `rgba(255,255,255,${0.1 + 0.03 * Math.sin(t * 0.025)})`;
  for (let y = vpY; y < vh; y += (isMobile ? 50 : 40)) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(t * 0.01 + y * 0.01) * 2);
    ctx.lineTo(vw, y + Math.sin(t * 0.01 + y * 0.01) * 2);
    ctx.stroke();
  }
  
  ctx.restore();
};

const drawParticles = (ctx, particles, vw, vh, frame) => {
  for (const p of particles) {
    p.y -= p.speedY;
    p.x += p.drift;
    p.twinkle += p.twinkleSpeed;
    
    if (p.y < -5) { 
      p.y = vh + 5; 
      p.x = Math.random() * vw; 
    }
    
    const twinkleAlpha = p.alpha * (0.3 + 0.7 * Math.abs(Math.sin(p.twinkle)));
    ctx.globalAlpha = twinkleAlpha;
    ctx.fillStyle = "#ffffff";
    
    // Add subtle glow
    ctx.shadowBlur = 3;
    ctx.shadowColor = "#ffffff";
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
};

const drawMarbles = (ctx, marbles, vw, vh, frame) => {
  for (const m of marbles) {
    m.y += m.speedY * m.bounce;
    m.x += m.drift;
    
    // Add to trail
    m.trail.push({ x: m.x, y: m.y });
    if (m.trail.length > 5) m.trail.shift();
    
    if (m.y > vh + m.r) { 
      m.y = -m.r; 
      m.x = Math.random() * vw;
      m.trail = [];
    }
    
    // Draw trail
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < m.trail.length; i++) {
      const point = m.trail[i];
      const alpha = (i + 1) / m.trail.length * 0.3;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `hsl(${m.hue}, 60%, 50%)`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, m.r * (i + 1) / m.trail.length, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw marble
    ctx.globalAlpha = 1;
    const gradient = ctx.createRadialGradient(m.x - m.r/3, m.y - m.r/3, 0, m.x, m.y, m.r);
    gradient.addColorStop(0, `hsl(${m.hue}, 100%, 80%)`);
    gradient.addColorStop(1, `hsl(${m.hue}, 80%, 40%)`);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    ctx.fill();
  }
};

const drawSparks = (ctx, sparks, vw, vh, frame) => {
  for (const s of sparks) {
    s.x += s.vx;
    s.y += s.vy;
    s.life--;
    
    if (s.life <= 0) {
      s.x = Math.random() * vw;
      s.y = Math.random() * vh;
      s.life = s.maxLife;
    }
    
    const alpha = s.life / s.maxLife;
    ctx.globalAlpha = alpha * 0.6;
    ctx.fillStyle = s.color;
    
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
};

const drawShapes = (ctx, shapes, vw, vh, frame, pX, pY, scrollFactor, isMobile) => {
  const globalPulse = (Math.sin(frame * 0.04) + 1) * 4;

  for (const s of shapes) {
    s.y -= (s.speed + scrollFactor * 0.5) * s.depth;
    s.rot += s.rotSpeed;
    s.x += Math.sin(frame * 0.006 + s.phase) * (0.3 * s.sway);
    
    if (s.y < -s.size * 2) { 
      s.y = vh + s.size; 
      s.x = Math.random() * vw; 
    }
    
    drawEnhancedShape(ctx, s, globalPulse, pX, pY, frame);
  }
};

const drawEnhancedShape = (ctx, s, globalPulse, pX, pY, frame) => {
  const sx = s.x + pX * (s.depth * 0.8);
  const sy = s.y + pY * (s.depth * 0.6);
  
  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(s.rot);
  
  // Enhanced glow effect
  const localPulse = Math.sin(frame * 0.02 + s.pulsePhase) * s.glowIntensity;
  const totalGlow = s.glow + globalPulse * 0.8 + localPulse * 5;
  
  ctx.shadowBlur = totalGlow;
  ctx.shadowColor = s.color;
  ctx.strokeStyle = s.color;
  ctx.lineWidth = 2.5;
  
  const size = s.size + Math.sin(frame * 0.02 + s.phase) * 3;

  // Draw shape with inner glow effect
  ctx.globalCompositeOperation = "lighter";
  
  if (s.type === "circle") {
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.stroke();
    
    // Inner highlight
    ctx.strokeStyle = `rgba(255,255,255,0.3)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, size / 2 - 3, 0, Math.PI * 2);
    ctx.stroke();
    
  } else if (s.type === "triangle") {
    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.lineTo(-size / 2, size / 2);
    ctx.closePath();
    ctx.stroke();
    
  } else if (s.type === "square") {
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    
    // Inner square highlight
    ctx.strokeStyle = `rgba(255,255,255,0.2)`;
    ctx.lineWidth = 1;
    ctx.strokeRect(-size / 2 + 4, -size / 2 + 4, size - 8, size - 8);
  }
  
  ctx.globalCompositeOperation = "source-over";
  ctx.restore();
};

const drawVignette = (ctx, vw, vh, frame) => {
  const intensity = 0.15 + 0.05 * Math.sin(frame * 0.01);
  ctx.fillStyle = `rgba(0,0,0,${intensity})`;
  ctx.fillRect(0, 0, vw, vh);
};