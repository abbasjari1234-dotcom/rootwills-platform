'use client';

import React, { useEffect, useRef } from 'react';

export function FullPage3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Smooth Mouse tracking with lerp
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth scroll tracking
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Pre-render glowing particle textures (Offscreen hardware-accelerated sprites)
    const colors = ['#10B981', '#34D399', '#E4C767', '#F5EFE6', '#059669'];
    const spriteSize = 32;
    const sprites: HTMLCanvasElement[] = colors.map((color) => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = spriteSize;
      offCanvas.height = spriteSize;
      const offCtx = offCanvas.getContext('2d');
      if (offCtx) {
        const rad = spriteSize / 2;
        const grad = offCtx.createRadialGradient(rad, rad, 0, rad, rad, rad);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.35, color);
        grad.addColorStop(1, 'transparent');
        offCtx.fillStyle = grad;
        offCtx.beginPath();
        offCtx.arc(rad, rad, rad, 0, Math.PI * 2);
        offCtx.fill();
      }
      return offCanvas;
    });

    // 3D Floating Mesh Particles
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      radius: number;
      spriteIdx: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      baseAlpha: number;
    }

    const particleCount = 50;
    const particles: Particle3D[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.6,
        y: (Math.random() - 0.5) * height * 2.2,
        z: Math.random() * 700 + 100,
        radius: Math.random() * 3.5 + 2,
        spriteIdx: Math.floor(Math.random() * colors.length),
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        speedZ: (Math.random() - 0.5) * 0.25,
        baseAlpha: Math.random() * 0.6 + 0.3,
      });
    }

    // 3D Torus rotation
    let torusRotation = 0;
    const fov = 600;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse & scroll interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;

      const mouseOffsetNormX = (mouse.x / width - 0.5) * 2;
      const mouseOffsetNormY = (mouse.y / height - 0.5) * 2;
      const cx = width / 2;
      const cy = height / 2;

      torusRotation += 0.004;

      // 1. Subtle Orbital Rings (Cold-Chain Orbital Zones)
      for (let ring = 0; ring < 2; ring++) {
        const ringRadius = 260 + ring * 140;
        const ringZ = 450 + ring * 90;
        const ringPoints = 24;

        ctx.strokeStyle = ring === 0 ? 'rgba(228, 199, 103, 0.1)' : 'rgba(16, 185, 129, 0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let i = 0; i <= ringPoints; i++) {
          const theta = (i / ringPoints) * Math.PI * 2;
          const tilt = ring * 0.4 + torusRotation * (ring % 2 === 0 ? 1 : -1);

          const rawX = Math.cos(theta) * ringRadius;
          const rawY = Math.sin(theta) * ringRadius * Math.cos(tilt);
          const rawZ = ringZ + Math.sin(theta) * ringRadius * Math.sin(tilt);

          const pX = rawX - mouseOffsetNormX * 60;
          const pY = rawY - (currentScrollY * 0.15) % (height * 2) - mouseOffsetNormY * 40;
          const scale = fov / (fov + rawZ);

          const screenX = cx + pX * scale;
          const screenY = cy + pY * scale;

          if (i === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();
      }

      // 2. High-Performance Hardware-Sprite Particle Render
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;

        // Wrap around bounds
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height * 1.5;
        if (p.y > height * 1.5) p.y = -height;
        if (p.z < 50) p.z = 750;
        if (p.z > 750) p.z = 50;

        const adjX = p.x - mouseOffsetNormX * (800 - p.z) * 0.08;
        const adjY = p.y - mouseOffsetNormY * (800 - p.z) * 0.08 - (currentScrollY * 0.25) % (height * 2);

        const scale = fov / (fov + p.z);
        const screenX = cx + adjX * scale;
        const screenY = cy + adjY * scale;
        const drawSize = p.radius * scale * 4;

        if (
          screenX >= -drawSize &&
          screenX <= width + drawSize &&
          screenY >= -drawSize &&
          screenY <= height + drawSize
        ) {
          const depthAlpha = Math.max(0.15, Math.min(0.8, (800 - p.z) / 700)) * p.baseAlpha;
          ctx.globalAlpha = depthAlpha;
          ctx.drawImage(
            sprites[p.spriteIdx],
            screenX - drawSize / 2,
            screenY - drawSize / 2,
            drawSize,
            drawSize
          );
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full [contain:strict] [transform:translateZ(0)]"
      style={{ width: '100vw', height: '100vh', willChange: 'transform' }}
    />
  );
}
