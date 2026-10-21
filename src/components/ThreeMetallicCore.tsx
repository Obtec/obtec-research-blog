import React, { useEffect, useRef } from 'react';

interface BoidsCanvasProps {
  className?: string;
}

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  maxSpeed: number;
  maxForce: number;
  size: number;
  baseAlpha: number;
  shimmerOffset: number;
}

interface AmbientSpeck {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

/**
 * Craig Reynolds (1987) BOIDS Micro-Flocking Simulation
 *
 * Designed to match the Gemini 4 Argon reference aesthetic:
 * - Tiny, crisp directional triangular micro-particles (no cluttering web lines or long tails)
 * - Subtle light-catching shimmer as each micro-triangle rotates along its velocity vector
 * - Emergent flocking swarms governed by Separation, Alignment, and Cohesion
 */
export const BoidsBackgroundCanvas: React.FC<BoidsCanvasProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || 560;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateCanvasSize = () => {
      if (!canvas) return;
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || 560;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();

    // Subtle background micro-specks (like the fine dust/grid specks in the upper-left and lower-right of the reference)
    const speckCount = Math.min(180, Math.max(80, Math.floor((width * height) / 7500)));
    const specks: AmbientSpeck[] = Array.from({ length: speckCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.55 + Math.random() * 0.65,
      alpha: 0.1 + Math.random() * 0.22,
    }));

    // Main Boids population: hundreds of tiny triangular particles
    const boidCount = Math.min(320, Math.max(160, Math.floor((width * height) / 3800)));
    const perceptionRadius = 64;
    const separationRadius = 20;

    const boids: Boid[] = Array.from({ length: boidCount }, (_, idx) => {
      // Seed initial clusters to create natural sweeping streams like the reference image
      const clusterBias = idx % 3;
      let spawnX = Math.random() * width;
      let spawnY = Math.random() * height;
      if (clusterBias === 0) {
        // Center-to-bottom-right stream
        spawnX = width * (0.38 + Math.random() * 0.45);
        spawnY = height * (0.35 + Math.random() * 0.55);
      } else if (clusterBias === 1) {
        // Upper-left-to-center stream
        spawnX = width * (0.08 + Math.random() * 0.45);
        spawnY = height * (0.08 + Math.random() * 0.45);
      }

      const angle = -0.35 + (Math.random() - 0.5) * 1.4;
      const speed = 0.75 + Math.random() * 0.85;

      return {
        x: spawnX,
        y: spawnY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        ax: 0,
        ay: 0,
        maxSpeed: 1.35 + (idx % 5) * 0.16,
        maxForce: 0.038,
        // Small, crisp triangle scale (1.4px ~ 2.7px)
        size: 1.35 + (idx % 4) * 0.42,
        baseAlpha: 0.22 + (idx % 5) * 0.08,
        shimmerOffset: Math.random() * Math.PI * 2,
      };
    });

    // Pointer interaction state
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    const limitVector = (vx: number, vy: number, max: number): [number, number] => {
      const magSq = vx * vx + vy * vy;
      if (magSq > max * max && magSq > 0) {
        const mag = Math.sqrt(magSq);
        return [(vx / mag) * max, (vy / mag) * max];
      }
      return [vx, vy];
    };

    const steerTowards = (
      desiredX: number,
      desiredY: number,
      currentVx: number,
      currentVy: number,
      maxSpeed: number,
      maxForce: number
    ): [number, number] => {
      const mag = Math.hypot(desiredX, desiredY);
      if (mag < 1e-5) return [0, 0];
      const scaledX = (desiredX / mag) * maxSpeed;
      const scaledY = (desiredY / mag) * maxSpeed;
      const steerX = scaledX - currentVx;
      const steerY = scaledY - currentVy;
      return limitVector(steerX, steerY, maxForce);
    };

    let animationFrameId = 0;
    let isVisible = true;
    let tick = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });
    resizeObserver.observe(canvas);

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);
      tick += 0.015;

      ctx.clearRect(0, 0, width, height);

      // 1. Render ultra-fine ambient background specks
      for (let s = 0; s < specks.length; s++) {
        const sp = specks[s];
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 232, 255, ${sp.alpha.toFixed(3)})`;
        ctx.fill();
      }

      const perceptionSq = perceptionRadius * perceptionRadius;
      const separationSq = separationRadius * separationRadius;

      // 2. Compute Craig Reynolds Boids Forces (Separation, Alignment, Cohesion)
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];

        let alignX = 0;
        let alignY = 0;
        let cohesionX = 0;
        let cohesionY = 0;
        let sepX = 0;
        let sepY = 0;
        let neighborCount = 0;
        let sepCount = 0;

        for (let j = 0; j < boids.length; j++) {
          if (i === j) continue;
          const other = boids[j];
          const dx = other.x - b.x;
          const dy = other.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < perceptionSq && distSq > 0.0001) {
            alignX += other.vx;
            alignY += other.vy;
            cohesionX += other.x;
            cohesionY += other.y;
            neighborCount++;

            if (distSq < separationSq) {
              const dist = Math.sqrt(distSq);
              const invDist = 1 / Math.max(dist, 1);
              sepX -= (dx / dist) * invDist;
              sepY -= (dy / dist) * invDist;
              sepCount++;
            }
          }
        }

        let fx = 0;
        let fy = 0;

        if (neighborCount > 0) {
          const [alFx, alFy] = steerTowards(
            alignX / neighborCount,
            alignY / neighborCount,
            b.vx,
            b.vy,
            b.maxSpeed,
            b.maxForce
          );

          const centerX = cohesionX / neighborCount - b.x;
          const centerY = cohesionY / neighborCount - b.y;
          const [coFx, coFy] = steerTowards(
            centerX,
            centerY,
            b.vx,
            b.vy,
            b.maxSpeed,
            b.maxForce
          );

          fx += alFx * 1.15 + coFx * 1.05;
          fy += alFy * 1.15 + coFy * 1.05;
        }

        if (sepCount > 0) {
          const [spFx, spFy] = steerTowards(
            sepX / sepCount,
            sepY / sepCount,
            b.vx,
            b.vy,
            b.maxSpeed,
            b.maxForce
          );
          fx += spFx * 1.65;
          fy += spFy * 1.65;
        }

        // Subtle fluid curl field so flocks glide in organic ribbons across the glass
        const curlAngle =
          Math.sin(b.x * 0.0035 + tick * 0.6) * Math.cos(b.y * 0.0035 - tick * 0.4) * Math.PI;
        fx += Math.cos(curlAngle) * 0.006;
        fy += Math.sin(curlAngle) * 0.006;

        // Interactive cursor swirl/evasion
        if (mouse.active) {
          const mdx = b.x - mouse.x;
          const mdy = b.y - mouse.y;
          const mDistSq = mdx * mdx + mdy * mdy;
          const mouseRadius = 150;
          if (mDistSq < mouseRadius * mouseRadius && mDistSq > 1) {
            const mDist = Math.sqrt(mDistSq);
            const strength = (1 - mDist / mouseRadius) * 0.22;
            const normX = mdx / mDist;
            const normY = mdy / mDist;
            fx += (normX - normY * 0.45) * strength;
            fy += (normY + normX * 0.45) * strength;
          }
        }

        b.ax = fx;
        b.ay = fy;
      }

      // 3. Integrate Kinematics & Render Crisp Micro-Triangles
      for (let i = 0; i < boids.length; i++) {
        const b = boids[i];

        b.vx += b.ax;
        b.vy += b.ay;

        const speed = Math.hypot(b.vx, b.vy);
        const minSpeed = 0.65;
        if (speed > b.maxSpeed) {
          b.vx = (b.vx / speed) * b.maxSpeed;
          b.vy = (b.vy / speed) * b.maxSpeed;
        } else if (speed < minSpeed && speed > 1e-4) {
          b.vx = (b.vx / speed) * minSpeed;
          b.vy = (b.vy / speed) * minSpeed;
        }

        b.x += b.vx;
        b.y += b.vy;

        // Seamless toroidal wrap-around
        const pad = 12;
        if (b.x < -pad) b.x = width + pad;
        else if (b.x > width + pad) b.x = -pad;
        if (b.y < -pad) b.y = height + pad;
        else if (b.y > height + pad) b.y = -pad;

        const heading = Math.atan2(b.vy, b.vx);
        const s = b.size;

        // Subtle angle-dependent specular shimmer (like tiny glass/ice facets catching light)
        const shimmer = Math.sin(heading * 2 + tick + b.shimmerOffset) * 0.14;
        const alpha = Math.max(0.12, Math.min(0.68, b.baseAlpha + shimmer));

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(heading);

        // Draw crisp micro-triangle matching the reference image particles
        ctx.beginPath();
        ctx.moveTo(s * 1.45, 0);
        ctx.lineTo(-s * 1.0, s * 0.82);
        ctx.lineTo(-s * 1.0, -s * 0.82);
        ctx.closePath();

        ctx.fillStyle = `rgba(226, 240, 255, ${alpha.toFixed(3)})`;
        ctx.fill();
        ctx.restore();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};

export const ThreeMetallicCore = BoidsBackgroundCanvas;
export const CalabiYauCore = BoidsBackgroundCanvas;
