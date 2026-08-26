'use client';

import React, { useEffect, useRef } from 'react';

export function FullPage3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D parallax
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3D Floating Mesh Particles
    interface Particle3D {
      x: number;
      y: number;
      z: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      speedZ: number;
      type: 'dew' | 'gold' | 'emerald' | 'leaf';
      angle: number;
    }

    const particles: Particle3D[] = [];
    const colors = ['#10B981', '#34D399', '#E4C767', '#F5EFE6', '#059669'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * height * 2.5,
        z: Math.random() * 800 + 100,
        radius: Math.random() * 4 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        speedZ: (Math.random() - 0.5) * 0.3,
        type: i % 4 === 0 ? 'gold' : i % 3 === 0 ? 'emerald' : 'dew',
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Floating 3D Geometric Rings / Cold-Chain Torus
    let torusRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const mouseOffsetNormX = (mouse.x / width - 0.5) * 2;
      const mouseOffsetNormY = (mouse.y / height - 0.5) * 2;

      // Dynamic Radial Spotlight centered on mouse
      const spotlight = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        50,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.6
      );
      spotlight.addColorStop(0, 'rgba(16, 185, 129, 0.09)');
      spotlight.addColorStop(0.3, 'rgba(228, 199, 103, 0.04)');
      spotlight.addColorStop(1, 'rgba(2, 44, 34, 0)');
      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, width, height);

      // 3D Perspective Projection Factor
      const fov = 600;
      const cx = width / 2;
      const cy = height / 2;

      torusRotation += 0.005;

      // 1. Render 3D Background Rotating Rings (Cold-Chain Orbital Zones)
      for (let ring = 0; ring < 3; ring++) {
        const ringRadius = 240 + ring * 120;
        const ringZ = 400 + ring * 80;
        const ringPoints = 28;
        const pts: Array<{ x: number; y: number; z: number }> = [];

        for (let i = 0; i <= ringPoints; i++) {
          const theta = (i / ringPoints) * Math.PI * 2;
          const tilt = ring * 0.4 + torusRotation * (ring % 2 === 0 ? 1 : -1);
          
          const rawX = Math.cos(theta) * ringRadius;
          const rawY = Math.sin(theta) * ringRadius * Math.cos(tilt);
          const rawZ = ringZ + Math.sin(theta) * ringRadius * Math.sin(tilt);

          // Apply mouse parallax
          const pX = rawX - mouseOffsetNormX * 80;
          const pY = rawY - (scrollY * 0.2) % (height * 2) - mouseOffsetNormY * 60;
          const pZ = rawZ;

          const scale = fov / (fov + pZ);
          pts.push({
            x: cx + pX * scale,
            y: cy + pY * scale,
            z: pZ,
          });
        }

        ctx.strokeStyle = ring === 0 ? 'rgba(228, 199, 103, 0.12)' : 'rgba(16, 185, 129, 0.08)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        pts.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }

      // 2. Render 3D Depth-Sorted Particles
      particles.sort((a, b) => b.z - a.z);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;
        p.angle += 0.02;

        // Wrap around bounds
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height * 1.5;
        if (p.y > height * 1.5) p.y = -height;
        if (p.z < 50) p.z = 800;
        if (p.z > 800) p.z = 50;

        // Apply mouse & scroll parallax
        const adjX = p.x - mouseOffsetNormX * (900 - p.z) * 0.12;
        const adjY = p.y - mouseOffsetNormY * (900 - p.z) * 0.12 - (scrollY * 0.4) % (height * 2);

        const scale = fov / (fov + p.z);
        const screenX = cx + adjX * scale;
        const screenY = cy + adjY * scale;

        if (screenX >= -50 && screenX <= width + 50 && screenY >= -50 && screenY <= height + 50) {
          const depthAlpha = Math.max(0.1, Math.min(0.85, (900 - p.z) / 800));
          ctx.globalAlpha = depthAlpha;

          // Glowing radial gradient for particles
          const pGrad = ctx.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            p.radius * scale * 2.5
          );
          pGrad.addColorStop(0, '#FFFFFF');
          pGrad.addColorStop(0.3, p.color);
          pGrad.addColorStop(1, 'transparent');

          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.radius * scale * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
