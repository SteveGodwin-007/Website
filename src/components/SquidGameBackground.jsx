import React, { useEffect, useRef, useCallback } from "react";

export default function SquidGameBackground({ accent = "#FF0050" }) {
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const isMobileRef = useRef(false);
  const isLowEndRef = useRef(false);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    // Early mobile detection for performance decisions
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    isLowEndRef.current = navigator.hardwareConcurrency <= 4 || /Android.*Chrome\/[0-9]{2}\./i.test(navigator.userAgent);

    // Simplified DPR calculation
    const DPR = isMobileRef.current ? Math.min(window.devicePixelRatio || 1, isLowEndRef.current ? 1 : 1.5) : 1;
    
    const width = canvas.width = Math.floor(window.innerWidth * DPR);
    const height = canvas.height = Math.floor(window.innerHeight * DPR);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
      willReadFrequently: false
    });
    ctx.scale(DPR, DPR);
    
    return { 
      ctx, 
      canvas, 
      vw: width / DPR, 
      vh: height / DPR,
      DPR
    };
  }, []);

  useEffect(() => {
    const setup = initializeCanvas();
    if (!setup) return;
    
    const { ctx, vw, vh } = setup;
    const isMobile = isMobileRef.current;
    const isLowEnd = isLowEndRef.current;

    // Simplified color palette
    const colors = {
      accent: accent,
      neonGreen: "#00FF87",
      neonPink: "#FF1B6B",
      background: "#000000",
      glassBlue: "rgba(100, 200, 255, 0.2)"
    };

    // Drastically reduced element counts for mobile
    const SHAPE_COUNT = isLowEnd ? 5 : (isMobile ? 8 : 15);
    const PARTICLE_COUNT = isLowEnd ? 15 : (isMobile ? 25 : 50);
    const MARBLE_COUNT = isLowEnd ? 2 : (isMobile ? 4 : 8);
    const SPARK_COUNT = isLowEnd ? 0 : (isMobile ? 8 : 15);

    // Animation state with simplified tracking
    let targetPX = 0, targetPY = 0;
    let pX = 0, pY = 0;
    let scrollFactor = 0;
    let frame = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    // Initialize elements with simplified properties
    const shapes = createShapes(SHAPE_COUNT, vw, vh, isMobile, colors);
    const particles = createParticles(PARTICLE_COUNT, vw, vh);
    const marbles = createMarbles(MARBLE_COUNT, vw, vh);
    const sparks = createSparks(SPARK_COUNT, vw, vh);

    // Throttled event handlers with passive listeners
    const onMove = (e) => {
      const x = e.clientX ?? (e.touches?.[0]?.clientX) ?? vw / 2;
      const y = e.clientY ?? (e.touches?.[0]?.clientY) ?? vh / 2;
      targetPX = ((x / vw) - 0.5) * (isMobile ? 10 : 20);
      targetPY = ((y / vh) - 0.5) * (isMobile ? 5 : 10);
    };

    const onScroll = () => {
      scrollFactor = Math.min(2, window.scrollY / 500);
    };

    const onResize = () => {
      const newSetup = initializeCanvas();
      if (newSetup) {
        Object.assign(setup, newSetup);
      }
    };

    // Optimized event listeners with debouncing
    const debouncedMove = debounce(onMove, isMobile ? 50 : 30);
    const debouncedScroll = debounce(onScroll, 100);

    const addEventListeners = () => {
      window.addEventListener("mousemove", debouncedMove, { passive: true });
      window.addEventListener("touchmove", debouncedMove, { passive: true });
      window.addEventListener("scroll", debouncedScroll, { passive: true });
      window.addEventListener("resize", debounce(onResize, 200), { passive: true });
    };

    const removeEventListeners = () => {
      window.removeEventListener("mousemove", debouncedMove);
      window.removeEventListener("touchmove", debouncedMove);
      window.removeEventListener("scroll", debouncedScroll);
      window.removeEventListener("resize", debounce(onResize, 200));
    };

    // Simplified animation loop with frame limiting
    const tick = (currentTime) => {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      
      if (deltaTime >= frameInterval) {
        frame++;
        
        // Smoother interpolation for mobile
        const easeSpeed = isMobile ? 0.1 : 0.08;
        pX += (targetPX - pX) * easeSpeed;
        pY += (targetPY - pY) * easeSpeed;

        // Clear canvas once per frame
        ctx.clearRect(0, 0, vw, vh);
        
        // Simplified rendering pipeline
        drawBackground(ctx, vw, vh, colors.background);
        if (!isLowEnd) {
          drawGlassBridge(ctx, vw, vh, frame, isMobile, colors.glassBlue);
        }
        drawParticles(ctx, particles, vw, vh, frame);
        if (!isLowEnd) {
          drawMarbles(ctx, marbles, vw, vh, frame);
          drawSparks(ctx, sparks, vw, vh, frame);
        }
        drawShapes(ctx, shapes, vw, vh, frame, pX, pY, scrollFactor, isMobile);

        lastTimeRef.current = currentTime;
      }
      
      animationIdRef.current = requestAnimationFrame(tick);
    };

    addEventListeners();
    animationIdRef.current = requestAnimationFrame(tick);

    return () => {
      removeEventListeners();
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [accent, initializeCanvas]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-20"
      style={{ 
        touchAction: 'none',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    />
  );
}

// Helper function for debouncing
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Helper functions
const createShapes = (count, vw, vh, isMobile, colors) => {
  const types = ["circle", "triangle", "square"];
  const shapes = [];
  
  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    shapes.push({
      type,
      x: Math.random() * vw,
      y: Math.random() * vh,
      size: 30 + Math.random() * (isMobile ? 30 : 50),
      speed: 0.3 + Math.random() * 0.7,
      depth: 0.5 + Math.random() * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: -0.003 + Math.random() * 0.006,
      color: type === "circle" ? colors.accent : 
             type === "triangle" ? colors.neonGreen : colors.neonPink,
      glow: 5 + Math.random() * (isMobile ? 10 : 15)
    });
  }
  return shapes;
};

const createParticles = (count, vw, vh) => {
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      r: 0.5 + Math.random() * 1.5,
      speedY: 0.1 + Math.random() * 0.2,
      alpha: 0.2 + Math.random() * 0.3,
      drift: -0.1 + Math.random() * 0.2
    });
  }
  return particles;
};

const createMarbles = (count, vw, vh) => {
  const marbles = [];
  
  for (let i = 0; i < count; i++) {
    marbles.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      r: 3 + Math.random() * 5,
      speedY: 0.2 + Math.random() * 0.3,
      hue: Math.random() * 360,
      drift: -0.15 + Math.random() * 0.3
    });
  }
  return marbles;
};

const createSparks = (count, vw, vh) => {
  const sparks = [];
  
  for (let i = 0; i < count; i++) {
    sparks.push({
      x: Math.random() * vw,
      y: Math.random() * vh,
      vx: -0.3 + Math.random() * 0.6,
      vy: -0.2 + Math.random() * 0.4,
      life: 40 + Math.random() * 80,
      maxLife: 40 + Math.random() * 80,
      color: `hsl(${Math.random() * 60}, 100%, ${70 + Math.random() * 20}%)`
    });
  }
  return sparks;
};

const drawBackground = (ctx, vw, vh, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, vw, vh);
};

const drawGlassBridge = (ctx, vw, vh, frame, isMobile, glassColor) => {
  ctx.save();
  
  // Perspective lines
  const intensity = 0.1 + 0.05 * Math.sin(frame * 0.02);
  ctx.strokeStyle = glassColor;
  ctx.lineWidth = isMobile ? 0.8 : 1.2;
  const vpY = vh * 0.7; // Vanishing point Y position

  // Draw fewer lines for mobile
  const lineCount = isMobile ? 5 : 7;
  for (let i = -lineCount; i <= lineCount; i++) {
    ctx.beginPath();
    const offset = Math.sin(frame * 0.01 + i * 0.5) * 2;
    ctx.moveTo(vw / 2 + i * (isMobile ? 80 : 100) + offset, vh);
    ctx.lineTo(vw / 2 + i * 20, vpY);
    ctx.stroke();
  }

  // Horizontal grid lines
  ctx.strokeStyle = `rgba(255,255,255,${0.08 + 0.02 * Math.sin(frame * 0.03)})`;
  const gridSpacing = isMobile ? 60 : 50;
  for (let y = vpY; y < vh; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(frame * 0.01 + y * 0.01) * 1);
    ctx.lineTo(vw, y + Math.sin(frame * 0.01 + y * 0.01) * 1);
    ctx.stroke();
  }
  
  ctx.restore();
};

const drawParticles = (ctx, particles, vw, vh, frame) => {
  ctx.fillStyle = "#ffffff";
  
  for (const p of particles) {
    p.y -= p.speedY;
    p.x += p.drift;
    
    if (p.y < -5) { 
      p.y = vh + 5; 
      p.x = Math.random() * vw; 
    }
    
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
};

const drawMarbles = (ctx, marbles, vw, vh, frame) => {
  for (const m of marbles) {
    m.y += m.speedY;
    m.x += m.drift;
    
    if (m.y > vh + m.r) { 
      m.y = -m.r; 
      m.x = Math.random() * vw;
    }
    
    const gradient = ctx.createRadialGradient(
      m.x - m.r/3, m.y - m.r/3, 0, 
      m.x, m.y, m.r
    );
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
    
    ctx.globalAlpha = (s.life / s.maxLife) * 0.6;
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
};

const drawShapes = (ctx, shapes, vw, vh, frame, pX, pY, scrollFactor, isMobile) => {
  const globalPulse = (Math.sin(frame * 0.04) + 1) * 2;

  for (const s of shapes) {
    s.y -= (s.speed + scrollFactor * 0.3) * s.depth;
    s.rot += s.rotSpeed;
    
    if (s.y < -s.size * 2) { 
      s.y = vh + s.size; 
      s.x = Math.random() * vw; 
    }
    
    const sx = s.x + pX * (s.depth * 0.6);
    const sy = s.y + pY * (s.depth * 0.4);
    
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(s.rot);
    
    ctx.shadowBlur = s.glow + globalPulse * 0.5;
    ctx.shadowColor = s.color;
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2;
    
    if (s.type === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
      ctx.stroke();
    } else if (s.type === "triangle") {
      ctx.beginPath();
      ctx.moveTo(0, -s.size / 2);
      ctx.lineTo(s.size / 2, s.size / 2);
      ctx.lineTo(-s.size / 2, s.size / 2);
      ctx.closePath();
      ctx.stroke();
    } else if (s.type === "square") {
      ctx.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
    }
    
    ctx.restore();
  }
};