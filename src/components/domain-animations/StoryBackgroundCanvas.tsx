import React, { useEffect, useRef } from 'react';
import { DomainType } from '../../types/domain';

interface StoryBackgroundCanvasProps {
  activeScene: number; // 1, 2, 3
  domainKey: DomainType; // 'ai', 'hw', 'quantum', 'systems'
  scrollProgress: number; // 0.0 to 1.0
  onBackgroundClick?: () => void;
}

export const StoryBackgroundCanvas: React.FC<StoryBackgroundCanvasProps> = ({
  activeScene,
  domainKey,
  scrollProgress,
  onBackgroundClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Store latest props in refs to decouple 60fps render loop from React state updates
  const activeSceneRef = useRef(activeScene);
  const domainKeyRef = useRef(domainKey);
  const scrollProgressRef = useRef(scrollProgress);
  const onBackgroundClickRef = useRef(onBackgroundClick);

  useEffect(() => {
    activeSceneRef.current = activeScene;
  }, [activeScene]);

  useEffect(() => {
    domainKeyRef.current = domainKey;
  }, [domainKey]);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    onBackgroundClickRef.current = onBackgroundClick;
  }, [onBackgroundClick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha channel for master canvas for maximum GPU speed
    if (!ctx) return;

    const athensImg = new Image();
    let athensImgLoaded = false;
    athensImg.onload = () => {
      athensImgLoaded = true;
    };
    athensImg.src = '/assets/school-of-athens.jpg';
    if (athensImg.complete) {
      athensImgLoaded = true;
    }

    let animId: number = 0;
    let isVisible = true;
    let isTabVisible = typeof document !== 'undefined' ? document.visibilityState === 'visible' : true;
    let isRunning = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNeuralNetwork(width, height);
      initLogicCircuits(width, height);
      initChalkboard(width, height);
    };
    window.addEventListener('resize', handleResize);

    // =========================================================================
    // SIMULATION DATA STRUCTURES
    // =========================================================================

    // 1. Conway's Game of Life (Systems)
    const cellSize = 22;
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);
    let lifeGrid = Array.from({ length: cols }, () =>
      Array.from({ length: rows }, () => (Math.random() > 0.88 ? 1 : 0))
    );

    for (let g = 0; g < 5; g++) {
      const sx = 4 + Math.floor(Math.random() * Math.max(1, cols - 8));
      const sy = 4 + Math.floor(Math.random() * Math.max(1, rows - 8));
      if (sx + 2 < cols && sy + 2 < rows) {
        lifeGrid[sx][sy] = 1;
        lifeGrid[sx + 1][sy + 1] = 1;
        lifeGrid[sx - 1][sy + 2] = 1;
        lifeGrid[sx][sy + 2] = 1;
        lifeGrid[sx + 1][sy + 2] = 1;
      }
    }

    // =========================================================================
    // 1-B. MATHEMATICIAN CHALKBOARD & FORMULAS SIMULATION (etc)
    // =========================================================================
    interface ChalkDustParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      wobbleSpeed: number;
      wobbleOffset: number;
    }

    interface ChalkSpark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      life: number;
      maxLife: number;
      color: string;
    }

    interface ClickChalkMark {
      x: number;
      y: number;
      alpha: number;
      scale: number;
      life: number;
    }

    const chalkDustCount = 85;
    const chalkDust: ChalkDustParticle[] = Array.from({ length: chalkDustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 10 + 5,
      size: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.4 + 0.15,
      baseAlpha: Math.random() * 0.4 + 0.15,
      wobbleSpeed: Math.random() * 1.5 + 0.6,
      wobbleOffset: Math.random() * Math.PI * 2,
    }));

    const chalkSparks: ChalkSpark[] = [];
    const clickChalkMarks: ClickChalkMark[] = [];

    const initChalkboard = (w: number, h: number) => {
      chalkDust.forEach((d) => {
        d.x = Math.random() * w;
        d.y = Math.random() * h;
      });
    };

    // 2. Quantum / Physics: Photorealistic Solar System Simulation
    let globalSimTime = 0;

    // Deep space background stars for astronomical realism
    const starCount = 140;
    const deepStars = Array.from({ length: starCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.5 + 0.5,
      baseAlpha: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 1.5 + 0.5,
      color: ['#ffffff', '#bae6fd', '#fef08a', '#fed7aa'][Math.floor(Math.random() * 4)],
    }));

    // Asteroid Belt particles between Mars and Jupiter
    const asteroidCount = 60;
    const asteroidBelt = Array.from({ length: asteroidCount }, () => ({
      distRatio: 0.60 + (Math.random() - 0.5) * 0.08,
      angle: Math.random() * Math.PI * 2,
      speed: 0.48 + (Math.random() - 0.5) * 0.08,
      size: Math.random() * 1.6 + 0.7,
      color: Math.random() > 0.4 ? '#9ca3af' : '#78716c',
      alpha: Math.random() * 0.5 + 0.3,
    }));

    interface PlanetDef {
      name: string;
      distRatio: number;
      speed: number;
      radius: number;
      angle: number;
      colorDay: string;
      colorNight: string;
      hasRings?: boolean;
      hasMoon?: boolean;
      hasAtmosphere?: boolean;
      atmosphereColor?: string;
      trail: { x: number; y: number }[];
    }

    const planets: PlanetDef[] = [
      {
        name: 'Mercury',
        distRatio: 0.15,
        speed: 1.65,
        radius: 3.4,
        angle: Math.random() * Math.PI * 2,
        colorDay: '#e5e7eb',
        colorNight: '#1f2937',
        trail: [],
      },
      {
        name: 'Venus',
        distRatio: 0.26,
        speed: 1.25,
        radius: 4.8,
        angle: Math.random() * Math.PI * 2,
        colorDay: '#fef08a',
        colorNight: '#451a03',
        hasAtmosphere: true,
        atmosphereColor: 'rgba(254, 240, 138, 0.4)',
        trail: [],
      },
      {
        name: 'Earth',
        distRatio: 0.39,
        speed: 0.88,
        radius: 5.8,
        angle: Math.random() * Math.PI * 2,
        colorDay: '#38bdf8',
        colorNight: '#0f172a',
        hasMoon: true,
        hasAtmosphere: true,
        atmosphereColor: 'rgba(56, 189, 248, 0.5)',
        trail: [],
      },
      {
        name: 'Mars',
        distRatio: 0.51,
        speed: 0.65,
        radius: 4.2,
        angle: Math.random() * Math.PI * 2,
        colorDay: '#f87171',
        colorNight: '#450a0a',
        trail: [],
      },
      {
        name: 'Jupiter',
        distRatio: 0.72,
        speed: 0.40,
        radius: 12.0,
        angle: Math.random() * Math.PI * 2,
        colorDay: '#fed7aa',
        colorNight: '#431407',
        hasAtmosphere: true,
        atmosphereColor: 'rgba(254, 215, 170, 0.3)',
        trail: [],
      },
      {
        name: 'Saturn',
        distRatio: 0.91,
        speed: 0.26,
        radius: 9.6,
        angle: Math.random() * Math.PI * 2,
        colorDay: '#fef3c7',
        colorNight: '#361e04',
        hasRings: true,
        trail: [],
      },
    ];

    // 3. AI: Layered Artificial Neural Network (Feedforward MLP Architecture)
    const layerSizes = [4, 6, 7, 6, 4];
    interface NeuralNode {
      layerIdx: number;
      nodeIdx: number;
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      activation: number;
      label?: string;
    }

    interface NeuralSynapse {
      fromLayer: number;
      fromNode: number;
      toLayer: number;
      toNode: number;
      weight: number;
    }

    interface NeuralPulse {
      fromLayer: number;
      fromNode: number;
      toLayer: number;
      toNode: number;
      progress: number;
      speed: number;
      color: string;
    }

    const nnNodes: NeuralNode[][] = [];
    const nnSynapses: NeuralSynapse[] = [];
    const nnPulses: NeuralPulse[] = [];

    const initNeuralNetwork = (w: number, h: number) => {
      nnNodes.length = 0;
      nnSynapses.length = 0;
      nnPulses.length = 0;

      const marginX = Math.min(w * 0.15, 180);
      const spanX = w - marginX * 2;
      const centerY = h * 0.5;

      for (let l = 0; l < layerSizes.length; l++) {
        const count = layerSizes[l];
        const layerArr: NeuralNode[] = [];
        const lx = marginX + (l / (layerSizes.length - 1)) * spanX;
        const spacingY = Math.min(68, (h * 0.65) / (count + 0.5));

        for (let n = 0; n < count; n++) {
          const ly = centerY + (n - (count - 1) / 2) * spacingY;
          layerArr.push({
            layerIdx: l,
            nodeIdx: n,
            x: lx,
            y: ly,
            baseX: lx,
            baseY: ly,
            activation: 0,
            label: l === 0 ? `x${n}` : l === layerSizes.length - 1 ? `y${n}` : undefined,
          });
        }
        nnNodes.push(layerArr);
      }

      for (let l = 0; l < layerSizes.length - 1; l++) {
        const currLayer = nnNodes[l];
        const nextLayer = nnNodes[l + 1];
        for (let i = 0; i < currLayer.length; i++) {
          for (let j = 0; j < nextLayer.length; j++) {
            nnSynapses.push({
              fromLayer: l,
              fromNode: i,
              toLayer: l + 1,
              toNode: j,
              weight: 0.25 + Math.random() * 0.75,
            });
          }
        }
      }
    };
    initNeuralNetwork(width, height);

    // 4. Hardware: Digital Logic Circuit (AND, OR, NOT, XOR gates & Binary Pulse Traces)
    interface LogicGate {
      id: string;
      type: 'AND' | 'OR' | 'NOT' | 'XOR';
      x: number;
      y: number;
      width: number;
      height: number;
      activeFlash: number;
      label: string;
    }

    interface CircuitTrace {
      id: string;
      points: { x: number; y: number }[];
      color: string;
      destGateId?: string;
      inputIndex?: number;
    }

    interface BinaryPulse {
      traceIndex: number;
      segIndex: number;
      segProgress: number;
      speed: number;
      bitValue: number;
      color: string;
    }

    const logicGates: LogicGate[] = [];
    const circuitTraces: CircuitTrace[] = [];
    const binaryPulses: BinaryPulse[] = [];

    const initLogicCircuits = (w: number, h: number) => {
      logicGates.length = 0;
      circuitTraces.length = 0;
      binaryPulses.length = 0;

      const cx = w / 2;
      const cy = h / 2;
      const gw = 64;
      const gh = 44;

      const stage1X = Math.max(140, cx - Math.min(320, w * 0.28));
      const stage2X = Math.min(w - 140, cx + Math.min(180, w * 0.16));
      const stage3X = Math.min(w - 90, cx + Math.min(360, w * 0.32));

      logicGates.push({ id: 'g_and1', type: 'AND', x: stage1X, y: cy - 110, width: gw, height: gh, activeFlash: 0, label: 'AND' });
      logicGates.push({ id: 'g_xor1', type: 'XOR', x: stage1X, y: cy + 110, width: gw, height: gh, activeFlash: 0, label: 'XOR' });
      logicGates.push({ id: 'g_not1', type: 'NOT', x: cx - 40, y: cy, width: 52, height: 38, activeFlash: 0, label: 'NOT' });
      logicGates.push({ id: 'g_or1',  type: 'OR',  x: stage2X, y: cy - 60, width: gw, height: gh, activeFlash: 0, label: 'OR' });
      logicGates.push({ id: 'g_and2', type: 'AND', x: stage2X, y: cy + 70, width: gw, height: gh, activeFlash: 0, label: 'AND' });

      circuitTraces.push({
        id: 't_in1',
        points: [{ x: 40, y: cy - 130 }, { x: stage1X - 60, y: cy - 130 }, { x: stage1X - 32, y: cy - 120 }],
        color: '#f87171',
        destGateId: 'g_and1',
        inputIndex: 0,
      });
      circuitTraces.push({
        id: 't_in2',
        points: [{ x: 40, y: cy - 90 }, { x: stage1X - 60, y: cy - 90 }, { x: stage1X - 32, y: cy - 100 }],
        color: '#38bdf8',
        destGateId: 'g_and1',
        inputIndex: 1,
      });
      circuitTraces.push({
        id: 't_in3',
        points: [{ x: 40, y: cy + 90 }, { x: stage1X - 60, y: cy + 90 }, { x: stage1X - 32, y: cy + 100 }],
        color: '#fbbf24',
        destGateId: 'g_xor1',
        inputIndex: 0,
      });
      circuitTraces.push({
        id: 't_in4',
        points: [{ x: 40, y: cy + 130 }, { x: stage1X - 60, y: cy + 130 }, { x: stage1X - 32, y: cy + 120 }],
        color: '#34d399',
        destGateId: 'g_xor1',
        inputIndex: 1,
      });

      circuitTraces.push({
        id: 't_and1_out',
        points: [
          { x: stage1X + 32, y: cy - 110 },
          { x: (stage1X + stage2X) / 2, y: cy - 110 },
          { x: (stage1X + stage2X) / 2, y: cy - 70 },
          { x: stage2X - 32, y: cy - 70 },
        ],
        color: '#f87171',
        destGateId: 'g_or1',
        inputIndex: 0,
      });
      circuitTraces.push({
        id: 't_to_not',
        points: [
          { x: stage1X + 32, y: cy - 110 },
          { x: stage1X + 80, y: cy - 110 },
          { x: stage1X + 80, y: cy },
          { x: cx - 66, y: cy },
        ],
        color: '#f87171',
        destGateId: 'g_not1',
        inputIndex: 0,
      });
      circuitTraces.push({
        id: 't_not_out',
        points: [
          { x: cx - 14, y: cy },
          { x: stage2X - 60, y: cy },
          { x: stage2X - 60, y: cy - 50 },
          { x: stage2X - 32, y: cy - 50 },
        ],
        color: '#a78bfa',
        destGateId: 'g_or1',
        inputIndex: 1,
      });
      circuitTraces.push({
        id: 't_xor1_out',
        points: [
          { x: stage1X + 32, y: cy + 110 },
          { x: stage2X - 60, y: cy + 110 },
          { x: stage2X - 60, y: cy + 60 },
          { x: stage2X - 32, y: cy + 60 },
        ],
        color: '#fbbf24',
        destGateId: 'g_and2',
        inputIndex: 0,
      });

      circuitTraces.push({
        id: 't_or_out',
        points: [
          { x: stage2X + 32, y: cy - 60 },
          { x: stage3X, y: cy - 60 },
          { x: stage3X + 50, y: cy - 60 },
          { x: w - 30, y: cy - 60 },
        ],
        color: '#f87171',
      });
      circuitTraces.push({
        id: 't_and2_out',
        points: [
          { x: stage2X + 32, y: cy + 70 },
          { x: stage3X, y: cy + 70 },
          { x: stage3X + 50, y: cy + 70 },
          { x: w - 30, y: cy + 70 },
        ],
        color: '#fbbf24',
      });
    };
    initLogicCircuits(width, height);

    // 5. Scene 4: Cosmic Horizon Particles & Ripples
    const cosmicCount = 180;
    const cosmicParticles = Array.from({ length: cosmicCount }, (_, i) => {
      const dist = Math.pow(Math.random(), 1.5) * Math.min(width, height) * 0.55 + 50;
      const angle = Math.random() * Math.PI * 2;
      return {
        dist,
        angle,
        speed: (0.12 + Math.random() * 0.25) * (Math.random() > 0.5 ? 1 : -1),
        radius: Math.random() * 2.2 + 0.8,
        baseAlpha: Math.random() * 0.6 + 0.35,
        color: ['#93c5fd', '#c4b5fd', '#fde68a', '#a7f3d0'][i % 4],
      };
    });

    interface CosmicRipple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    const ripples: CosmicRipple[] = [];

    // Mouse coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovered = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isHovered = true;
    };

    const onMouseLeave = () => {
      isHovered = false;
      mouseX = width / 2;
      mouseY = height / 2;
    };

    const onCanvasClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      const curScene = activeSceneRef.current;
      const curDomain = domainKeyRef.current;

      if (curScene === 3) {
        ripples.push({
          x: cx,
          y: cy,
          radius: 12,
          maxRadius: Math.max(width, height) * 0.7,
          alpha: 0.9,
        });
        if (onBackgroundClickRef.current) {
          onBackgroundClickRef.current();
        }
      }

      if (curScene === 2 && (curDomain === 'ai' || curDomain === 'cs')) {
        if (nnNodes[0]) {
          nnNodes[0].forEach((node) => {
            node.activation = 1.0;
            const nextL = nnNodes[1];
            if (nextL) {
              const targetNode = nextL[Math.floor(Math.random() * nextL.length)];
              nnPulses.push({
                fromLayer: 0,
                fromNode: node.nodeIdx,
                toLayer: 1,
                toNode: targetNode.nodeIdx,
                progress: 0,
                speed: 1.8 + Math.random() * 0.8,
                color: '#60a5fa',
              });
            }
          });
        }
      }

      if (curScene === 2 && (curDomain === 'hw' || curDomain === 'semiconductor')) {
        circuitTraces.slice(0, 4).forEach((_, idx) => {
          binaryPulses.push({
            traceIndex: idx,
            segIndex: 0,
            segProgress: 0,
            speed: 1.6 + Math.random() * 0.6,
            bitValue: 1,
            color: '#f87171',
          });
        });
      }

      if (curScene === 2 && (curDomain === 'systems' || curDomain === 'etc' || (curDomain as string) === 'etc.')) {
        clickChalkMarks.push({
          x: cx,
          y: cy,
          alpha: 1.0,
          scale: 0.6,
          life: 0,
        });

        // Burst golden sparks
        for (let s = 0; s < 10; s++) {
          const spAngle = Math.random() * Math.PI * 2;
          const spSpeed = Math.random() * 60 + 20;
          chalkSparks.push({
            x: cx,
            y: cy,
            vx: Math.cos(spAngle) * spSpeed,
            vy: Math.sin(spAngle) * spSpeed - 12,
            size: Math.random() * 2 + 1,
            alpha: 1.0,
            life: 0,
            maxLife: Math.random() * 0.5 + 0.3,
            color: ['#ffffff', '#fef08a', '#fde047'][Math.floor(Math.random() * 3)],
          });
        }
      }

      onBackgroundClickRef.current?.();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    canvas.addEventListener('click', onCanvasClick);

    ripples.push({
      x: width / 2,
      y: height / 2,
      radius: 20,
      maxRadius: Math.max(width, height) * 0.6,
      alpha: 0.7,
    });

    // =========================================================================
    // HIGH-EFFICIENCY DELTA-TIME RENDER LOOP
    // =========================================================================
    let lastTime = performance.now();
    let lifeTimer = 0;
    let aiForwardTimer = 0;
    let hwPulseTimer = 0;

    // Logic gate drawing helpers
    const drawAndGate = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, flash: number) => {
      const halfH = h / 2;
      const left = x - w / 2;
      const right = x + w / 2;
      const arcCenterX = left + w * 0.45;
      const arcRadius = halfH;

      c.beginPath();
      c.moveTo(left, y - halfH);
      c.lineTo(arcCenterX, y - halfH);
      c.arc(arcCenterX, y, arcRadius, -Math.PI / 2, Math.PI / 2, false);
      c.lineTo(left, y + halfH);
      c.closePath();

      c.fillStyle = flash > 0.05 ? `rgba(234, 67, 53, ${0.15 + flash * 0.4})` : 'rgba(15, 23, 42, 0.85)';
      c.fill();
      c.strokeStyle = flash > 0.05 ? `rgba(248, 113, 113, ${0.5 + flash * 0.5})` : 'rgba(234, 67, 53, 0.45)';
      c.lineWidth = 1.8;
      c.stroke();

      c.strokeStyle = 'rgba(234, 67, 53, 0.4)';
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(left - 10, y - halfH * 0.5); c.lineTo(left, y - halfH * 0.5);
      c.moveTo(left - 10, y + halfH * 0.5); c.lineTo(left, y + halfH * 0.5);
      c.moveTo(right, y); c.lineTo(right + 10, y);
      c.stroke();
    };

    const drawOrGate = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, flash: number) => {
      const halfH = h / 2;
      const left = x - w / 2;
      const right = x + w / 2;

      c.beginPath();
      c.moveTo(left, y - halfH);
      c.quadraticCurveTo(left + w * 0.55, y - halfH * 0.9, right, y);
      c.quadraticCurveTo(left + w * 0.55, y + halfH * 0.9, left, y + halfH);
      c.quadraticCurveTo(left + w * 0.28, y, left, y - halfH);
      c.closePath();

      c.fillStyle = flash > 0.05 ? `rgba(56, 189, 248, ${0.15 + flash * 0.4})` : 'rgba(15, 23, 42, 0.85)';
      c.fill();
      c.strokeStyle = flash > 0.05 ? `rgba(125, 211, 252, ${0.5 + flash * 0.5})` : 'rgba(56, 189, 248, 0.45)';
      c.lineWidth = 1.8;
      c.stroke();

      c.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(left - 10, y - halfH * 0.5); c.lineTo(left + 4, y - halfH * 0.5);
      c.moveTo(left - 10, y + halfH * 0.5); c.lineTo(left + 4, y + halfH * 0.5);
      c.moveTo(right, y); c.lineTo(right + 10, y);
      c.stroke();
    };

    const drawNotGate = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, flash: number) => {
      const halfH = h / 2;
      const left = x - w / 2;
      const bubbleR = 4;
      const right = x + w / 2 - bubbleR * 2;

      c.beginPath();
      c.moveTo(left, y - halfH);
      c.lineTo(right, y);
      c.lineTo(left, y + halfH);
      c.closePath();

      c.fillStyle = flash > 0.05 ? `rgba(168, 85, 247, ${0.15 + flash * 0.4})` : 'rgba(15, 23, 42, 0.85)';
      c.fill();
      c.strokeStyle = flash > 0.05 ? `rgba(192, 132, 252, ${0.5 + flash * 0.5})` : 'rgba(168, 85, 247, 0.45)';
      c.lineWidth = 1.8;
      c.stroke();

      c.beginPath();
      c.arc(right + bubbleR, y, bubbleR, 0, Math.PI * 2);
      c.stroke();
      c.fillStyle = flash > 0.05 ? '#ffffff' : 'rgba(15, 23, 42, 0.9)';
      c.fill();

      c.strokeStyle = 'rgba(168, 85, 247, 0.4)';
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(left - 10, y); c.lineTo(left, y);
      c.moveTo(right + bubbleR * 2, y); c.lineTo(right + bubbleR * 2 + 10, y);
      c.stroke();
    };

    const drawXorGate = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, flash: number) => {
      const halfH = h / 2;
      const left = x - w / 2;
      const right = x + w / 2;

      c.beginPath();
      c.moveTo(left + 6, y - halfH);
      c.quadraticCurveTo(left + w * 0.6, y - halfH * 0.9, right, y);
      c.quadraticCurveTo(left + w * 0.6, y + halfH * 0.9, left + 6, y + halfH);
      c.quadraticCurveTo(left + w * 0.32, y, left + 6, y - halfH);
      c.closePath();

      c.fillStyle = flash > 0.05 ? `rgba(251, 191, 36, ${0.15 + flash * 0.4})` : 'rgba(15, 23, 42, 0.85)';
      c.fill();
      c.strokeStyle = flash > 0.05 ? `rgba(252, 211, 77, ${0.5 + flash * 0.5})` : 'rgba(251, 191, 36, 0.45)';
      c.lineWidth = 1.8;
      c.stroke();

      c.beginPath();
      c.moveTo(left - 2, y - halfH);
      c.quadraticCurveTo(left + w * 0.22, y, left - 2, y + halfH);
      c.stroke();

      c.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(left - 12, y - halfH * 0.5); c.lineTo(left - 2, y - halfH * 0.5);
      c.moveTo(left - 12, y + halfH * 0.5); c.lineTo(left - 2, y + halfH * 0.5);
      c.moveTo(right, y); c.lineTo(right + 10, y);
      c.stroke();
    };

    const render = (now: number) => {
      if (!isRunning) return;
      animId = requestAnimationFrame(render);

      const rawDelta = (now - lastTime) / 1000;
      const dt = Math.min(rawDelta, 0.05);
      lastTime = now;

      globalSimTime += dt;
      lifeTimer += dt;
      aiForwardTimer += dt;
      hwPulseTimer += dt;

      const currentScene = activeSceneRef.current;
      const currentDomain = domainKeyRef.current;

      // Solid master background clear
      ctx.fillStyle = '#030408';
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // SCENE 1: Cosmic Intelligence Nebula
      // -----------------------------------------------------------------------
      if (currentScene === 1) {
        const cx = width / 2;
        const cy = height * 0.45;
        const maxR = Math.min(width, height) * 0.55;

        const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, maxR);
        g.addColorStop(0, 'rgba(66, 133, 244, 0.14)');
        g.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);

        cosmicParticles.slice(0, 70).forEach((p) => {
          p.angle += p.speed * dt * 0.5;
          const px = cx + Math.cos(p.angle) * p.dist;
          const py = cy + Math.sin(p.angle) * p.dist * 0.7;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // -----------------------------------------------------------------------
      // SCENE 2: High-Performance Domain Visual Simulation
      // -----------------------------------------------------------------------
      else if (currentScene === 2) {
        
        // 2-A. AI & Computer Science: Artificial Neural Network (Feedforward MLP)
        if (currentDomain === 'ai' || currentDomain === 'cs') {
          if (aiForwardTimer >= 0.75) {
            aiForwardTimer = 0;
            if (nnNodes[0]) {
              const startCount = 1 + Math.floor(Math.random() * 2);
              for (let s = 0; s < startCount; s++) {
                const nodeIdx = Math.floor(Math.random() * nnNodes[0].length);
                const startNode = nnNodes[0][nodeIdx];
                startNode.activation = 1.0;

                const nextLayer = nnNodes[1];
                if (nextLayer) {
                  const targetCount = 1 + Math.floor(Math.random() * 2);
                  for (let t = 0; t < targetCount; t++) {
                    const targetIdx = Math.floor(Math.random() * nextLayer.length);
                    nnPulses.push({
                      fromLayer: 0,
                      fromNode: nodeIdx,
                      toLayer: 1,
                      toNode: targetIdx,
                      progress: 0,
                      speed: 1.6 + Math.random() * 0.5,
                      color: '#60a5fa',
                    });
                  }
                }
              }
            }
          }

          for (let l = 0; l < nnNodes.length; l++) {
            for (let n = 0; n < nnNodes[l].length; n++) {
              const node = nnNodes[l][n];
              const floatOffset = Math.sin(globalSimTime * 1.2 + l * 1.5 + n * 0.8) * 3;
              node.y = node.baseY + floatOffset;

              if (node.activation > 0) {
                node.activation = Math.max(0, node.activation - dt * 2.2);
              }

              if (isHovered) {
                const dx = mouseX - node.x;
                const dy = mouseY - node.y;
                if (dx * dx + dy * dy < 50 * 50) {
                  node.activation = 0.95;
                }
              }
            }
          }

          ctx.lineWidth = 1;
          for (let s = 0; s < nnSynapses.length; s++) {
            const syn = nnSynapses[s];
            const n1 = nnNodes[syn.fromLayer]?.[syn.fromNode];
            const n2 = nnNodes[syn.toLayer]?.[syn.toNode];
            if (!n1 || !n2) continue;

            const alpha = 0.08 + syn.weight * 0.14;
            ctx.strokeStyle = `rgba(66, 133, 244, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }

          for (let p = nnPulses.length - 1; p >= 0; p--) {
            const pulse = nnPulses[p];
            pulse.progress += pulse.speed * dt;

            const n1 = nnNodes[pulse.fromLayer]?.[pulse.fromNode];
            const n2 = nnNodes[pulse.toLayer]?.[pulse.toNode];
            if (!n1 || !n2) {
              nnPulses.splice(p, 1);
              continue;
            }

            if (pulse.progress >= 1.0) {
              n2.activation = 1.0;
              const nextL = pulse.toLayer + 1;
              if (nextL < nnNodes.length) {
                const nextLayerNodes = nnNodes[nextL];
                const forwardCount = 1 + Math.floor(Math.random() * 2);
                for (let k = 0; k < forwardCount; k++) {
                  const targetIdx = Math.floor(Math.random() * nextLayerNodes.length);
                  nnPulses.push({
                    fromLayer: pulse.toLayer,
                    fromNode: pulse.toNode,
                    toLayer: nextL,
                    toNode: targetIdx,
                    progress: 0,
                    speed: 1.7 + Math.random() * 0.5,
                    color: nextL === nnNodes.length - 1 ? '#34d399' : '#818cf8',
                  });
                }
              }
              nnPulses.splice(p, 1);
              continue;
            }

            const px = n1.x + (n2.x - n1.x) * pulse.progress;
            const py = n1.y + (n2.y - n1.y) * pulse.progress;

            ctx.fillStyle = 'rgba(96, 165, 250, 0.45)';
            ctx.beginPath();
            ctx.arc(px, py, 5.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(px, py, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }

          for (let l = 0; l < nnNodes.length; l++) {
            const isOutput = l === nnNodes.length - 1;
            const isInput = l === 0;

            for (let n = 0; n < nnNodes[l].length; n++) {
              const node = nnNodes[l][n];
              const act = node.activation;
              const nodeRadius = 7 + act * 3.5;

              if (act > 0.05) {
                ctx.fillStyle = isOutput 
                  ? `rgba(52, 211, 153, ${act * 0.5})` 
                  : `rgba(96, 165, 250, ${act * 0.5})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, nodeRadius * 2.2, 0, Math.PI * 2);
                ctx.fill();
              }

              ctx.fillStyle = act > 0.05 
                ? (isOutput ? '#059669' : '#2563eb')
                : '#0b1329';
              ctx.beginPath();
              ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = act > 0.05 
                ? '#ffffff' 
                : (isInput ? '#38bdf8' : isOutput ? '#34d399' : '#60a5fa');
              ctx.lineWidth = act > 0.05 ? 2.2 : 1.4;
              ctx.stroke();

              ctx.fillStyle = act > 0.05 ? '#ffffff' : (isOutput ? '#34d399' : '#93c5fd');
              ctx.beginPath();
              ctx.arc(node.x, node.y, act > 0.05 ? 3.5 : 2.0, 0, Math.PI * 2);
              ctx.fill();

              if (node.label) {
                ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
                ctx.font = '10px monospace';
                ctx.textAlign = isInput ? 'right' : 'left';
                ctx.fillText(node.label, isInput ? node.x - 14 : node.x + 14, node.y + 3);
              }
            }
          }

          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
          const layerTitles = ['INPUT LAYER', 'HIDDEN 1', 'HIDDEN 2', 'HIDDEN 3', 'OUTPUT LAYER'];
          for (let l = 0; l < nnNodes.length; l++) {
            if (nnNodes[l][0]) {
              ctx.fillText(layerTitles[l], nnNodes[l][0].x, nnNodes[l][0].baseY - 140);
            }
          }
        }

        // 2-B. Semiconductors & HW: Digital Logic Circuit (AND, OR, NOT, XOR Gates & Binary Pulses)
        else if (currentDomain === 'hw' || currentDomain === 'semiconductor') {
          if (hwPulseTimer >= 0.35) {
            hwPulseTimer = 0;
            const traceIdx = Math.floor(Math.random() * 4);
            binaryPulses.push({
              traceIndex: traceIdx,
              segIndex: 0,
              segProgress: 0,
              speed: 1.4 + Math.random() * 0.8,
              bitValue: Math.random() > 0.2 ? 1 : 0,
              color: ['#f87171', '#38bdf8', '#fbbf24', '#34d399'][traceIdx],
            });
          }

          ctx.strokeStyle = 'rgba(234, 67, 53, 0.04)';
          ctx.lineWidth = 1;
          const waferStep = 48;
          for (let x = 0; x < width; x += waferStep) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 0; y < height; y += waferStep) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          circuitTraces.forEach((trace) => {
            const pts = trace.points;
            if (pts.length < 2) return;

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            for (let i = 1; i < pts.length; i++) {
              ctx.lineTo(pts[i].x, pts[i].y);
            }
            ctx.stroke();

            ctx.strokeStyle = 'rgba(234, 67, 53, 0.25)';
            ctx.lineWidth = 1.0;
            ctx.stroke();

            for (let i = 0; i < pts.length; i++) {
              ctx.fillStyle = 'rgba(234, 67, 53, 0.5)';
              ctx.beginPath();
              ctx.arc(pts[i].x, pts[i].y, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          });

          logicGates.forEach((gate) => {
            if (gate.activeFlash > 0) {
              gate.activeFlash = Math.max(0, gate.activeFlash - dt * 2.8);
            }

            if (gate.type === 'AND') {
              drawAndGate(ctx, gate.x, gate.y, gate.width, gate.height, gate.activeFlash);
            } else if (gate.type === 'OR') {
              drawOrGate(ctx, gate.x, gate.y, gate.width, gate.height, gate.activeFlash);
            } else if (gate.type === 'NOT') {
              drawNotGate(ctx, gate.x, gate.y, gate.width, gate.height, gate.activeFlash);
            } else if (gate.type === 'XOR') {
              drawXorGate(ctx, gate.x, gate.y, gate.width, gate.height, gate.activeFlash);
            }

            ctx.fillStyle = gate.activeFlash > 0.05 ? '#ffffff' : 'rgba(226, 232, 240, 0.65)';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(gate.label, gate.x - 3, gate.y + 3);
          });

          for (let b = binaryPulses.length - 1; b >= 0; b--) {
            const bp = binaryPulses[b];
            const trace = circuitTraces[bp.traceIndex];
            if (!trace) {
              binaryPulses.splice(b, 1);
              continue;
            }

            const pts = trace.points;
            const p1 = pts[bp.segIndex];
            const p2 = pts[bp.segIndex + 1];
            if (!p1 || !p2) {
              binaryPulses.splice(b, 1);
              continue;
            }

            const segDx = p2.x - p1.x;
            const segDy = p2.y - p1.y;
            const segDist = Math.hypot(segDx, segDy);

            bp.segProgress += (bp.speed * 180 * dt) / Math.max(1, segDist);

            if (bp.segProgress >= 1.0) {
              bp.segProgress = 0;
              bp.segIndex++;

              if (bp.segIndex >= pts.length - 1) {
                if (trace.destGateId) {
                  const targetGate = logicGates.find((g) => g.id === trace.destGateId);
                  if (targetGate) {
                    targetGate.activeFlash = 1.0;
                    const outTraceIdx = circuitTraces.findIndex((t) => t.id.startsWith(targetGate.id.replace('g_', 't_')));
                    if (outTraceIdx !== -1) {
                      binaryPulses.push({
                        traceIndex: outTraceIdx,
                        segIndex: 0,
                        segProgress: 0,
                        speed: 1.7 + Math.random() * 0.4,
                        bitValue: 1,
                        color: targetGate.type === 'NOT' ? '#a78bfa' : '#f87171',
                      });
                    }
                  }
                }
                binaryPulses.splice(b, 1);
                continue;
              }
            }

            const curP1 = pts[bp.segIndex];
            const curP2 = pts[bp.segIndex + 1];
            const px = curP1.x + (curP2.x - curP1.x) * bp.segProgress;
            const py = curP1.y + (curP2.y - curP1.y) * bp.segProgress;

            if (bp.bitValue === 1) {
              ctx.fillStyle = 'rgba(234, 67, 53, 0.4)';
              ctx.beginPath();
              ctx.arc(px, py, 6, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = bp.color;
              ctx.beginPath();
              ctx.arc(px, py, 3, 0, Math.PI * 2);
              ctx.fill();

              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(px, py, 1.2, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(234, 67, 53, 0.5)';
          ctx.fillText('DIGITAL LOGIC CIRCUIT & TRANSISTOR GATES (CMOS SIMULATION)', width / 2, 60);
        }

        // 2-C. Quantum & Physics: Photorealistic Solar System Simulation
        else if (currentDomain === 'quantum' || currentDomain === 'physics') {
          const cx = width / 2;
          const cy = height / 2;
          const maxOrbitalRadius = Math.min(width, height) * 0.46;

          // 1. Draw Deep Space Background Stars (Twinkling Far Field)
          deepStars.forEach((star) => {
            const sx = star.x * width;
            const sy = star.y * height;
            const twinkle = Math.sin(globalSimTime * star.pulseSpeed + star.x * 20) * 0.25;
            const alpha = Math.max(0.1, star.baseAlpha + twinkle);

            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(sx, sy, star.radius, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.globalAlpha = 1.0;

          // 2. Draw Soft Background Interstellar Gas Nebula (Subtle realism)
          const nebGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, maxOrbitalRadius * 1.2);
          nebGrad.addColorStop(0, 'rgba(30, 27, 75, 0.25)');
          nebGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.15)');
          nebGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = nebGrad;
          ctx.fillRect(0, 0, width, height);

          // 3. Draw 3D-Tilted Keplerian Planetary Orbit Paths
          planets.forEach((p) => {
            const rx = p.distRatio * maxOrbitalRadius;
            const ry = rx * 0.62; // 3D Perspective Tilt

            ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
            ctx.stroke();
          });

          // 4. Draw Realistic Asteroid Belt (Between Mars & Jupiter)
          asteroidBelt.forEach((ast) => {
            ast.angle += ast.speed * dt * 0.35;
            const arx = ast.distRatio * maxOrbitalRadius;
            const ary = arx * 0.62;
            const ax = cx + Math.cos(ast.angle) * arx;
            const ay = cy + Math.sin(ast.angle) * ary;

            ctx.fillStyle = ast.color;
            ctx.globalAlpha = ast.alpha;
            ctx.beginPath();
            ctx.arc(ax, ay, ast.size, 0, Math.PI * 2);
            ctx.fill();
          });
          ctx.globalAlpha = 1.0;

          // 5. Draw Photorealistic Sun (Photosphere, Dynamic Corona Rays & Flares)
          const sunRadius = 26;

          // Volumetric Shimmering Corona Rays (Dynamic solar wind)
          const rayCount = 14;
          for (let r = 0; r < rayCount; r++) {
            const rayAngle = globalSimTime * 0.12 + (r * (Math.PI * 2)) / rayCount;
            const rayLength = 70 + Math.sin(globalSimTime * 1.8 + r * 2.2) * 18;
            const rx = cx + Math.cos(rayAngle) * rayLength;
            const ry = cy + Math.sin(rayAngle) * rayLength * 0.85;

            const rayGrad = ctx.createLinearGradient(cx, cy, rx, ry);
            rayGrad.addColorStop(0, 'rgba(254, 240, 138, 0.35)');
            rayGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.12)');
            rayGrad.addColorStop(1, 'transparent');

            ctx.strokeStyle = rayGrad;
            ctx.lineWidth = 4 + Math.sin(globalSimTime * 2 + r) * 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(rx, ry);
            ctx.stroke();
          }

          // Broad Spherical Corona Glow
          const coronaRadius = 88;
          const sunGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, coronaRadius);
          sunGlow.addColorStop(0, '#ffffff');
          sunGlow.addColorStop(0.18, '#fef08a');
          sunGlow.addColorStop(0.42, 'rgba(249, 115, 22, 0.45)');
          sunGlow.addColorStop(0.72, 'rgba(220, 38, 38, 0.14)');
          sunGlow.addColorStop(1, 'transparent');

          ctx.fillStyle = sunGlow;
          ctx.beginPath();
          ctx.arc(cx, cy, coronaRadius, 0, Math.PI * 2);
          ctx.fill();

          // High-Intensity Incandescent Core (Photosphere)
          const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunRadius);
          coreGrad.addColorStop(0, '#ffffff');
          coreGrad.addColorStop(0.6, '#fef08a');
          coreGrad.addColorStop(0.9, '#f59e0b');
          coreGrad.addColorStop(1, '#ea580c');

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2);
          ctx.fill();

          // Solar Surface Flare Prominences (Micro swirling granules)
          for (let f = 0; f < 9; f++) {
            const flareAngle = globalSimTime * 0.6 + f * (Math.PI / 4.5);
            const flareDist = sunRadius + 4 + Math.sin(globalSimTime * 2.5 + f * 1.3) * 6;
            const fx = cx + Math.cos(flareAngle) * flareDist;
            const fy = cy + Math.sin(flareAngle) * flareDist * 0.85;

            ctx.fillStyle = 'rgba(254, 215, 170, 0.7)';
            ctx.beginPath();
            ctx.arc(fx, fy, 2.2, 0, Math.PI * 2);
            ctx.fill();
          }

          // 6. Draw Photorealistic Planets with 3D Spherical Phase Lighting
          planets.forEach((p) => {
            const rx = p.distRatio * maxOrbitalRadius;
            const ry = rx * 0.62;

            p.angle += p.speed * dt * 0.52;
            const px = cx + Math.cos(p.angle) * rx;
            const py = cy + Math.sin(p.angle) * ry;

            // Maintain trailing history
            p.trail.push({ x: px, y: py });
            if (p.trail.length > 18) p.trail.shift();

            // Draw smooth orbital wake trail
            for (let t = 0; t < p.trail.length - 1; t++) {
              const alpha = ((t + 1) / p.trail.length) * 0.22;
              ctx.strokeStyle = p.colorDay;
              ctx.globalAlpha = alpha;
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.moveTo(p.trail[t].x, p.trail[t].y);
              ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
              ctx.stroke();
            }
            ctx.globalAlpha = 1.0;

            // Calculate Sun Light Vector for Spherical 3D Lighting & Shading
            const sunDx = cx - px;
            const sunDy = cy - py;
            const sunDist = Math.hypot(sunDx, sunDy);
            const normSunX = sunDist > 0 ? sunDx / sunDist : 0;
            const normSunY = sunDist > 0 ? sunDy / sunDist : 0;

            // Light focal point on the day side
            const lightX = px + normSunX * (p.radius * 0.45);
            const lightY = py + normSunY * (p.radius * 0.45);

            // Special Saturn: Draw BACK HALF of rings before drawing the sphere (Depth sorting)
            if (p.hasRings) {
              const ringTilt = -0.38;
              const ringOuterRx = p.radius * 2.8;
              const ringOuterRy = p.radius * 0.95;
              const ringInnerRx = p.radius * 1.5;

              // Back half of rings (upper arc)
              ctx.save();
              ctx.translate(px, py);
              ctx.rotate(ringTilt);

              ctx.beginPath();
              ctx.ellipse(0, 0, ringOuterRx, ringOuterRy, 0, Math.PI, Math.PI * 2);
              ctx.strokeStyle = 'rgba(254, 215, 170, 0.45)';
              ctx.lineWidth = (ringOuterRx - ringInnerRx) * 0.6;
              ctx.stroke();

              // Cassini Division dark gap in back ring
              ctx.beginPath();
              ctx.ellipse(0, 0, ringOuterRx * 0.82, ringOuterRy * 0.82, 0, Math.PI, Math.PI * 2);
              ctx.strokeStyle = 'rgba(3, 4, 8, 0.7)';
              ctx.lineWidth = 1.8;
              ctx.stroke();

              ctx.restore();
            }

            // Atmosphere Rayleigh Limb Glow (Earth / Venus / Jupiter)
            if (p.hasAtmosphere && p.atmosphereColor) {
              ctx.fillStyle = p.atmosphereColor;
              ctx.beginPath();
              ctx.arc(px, py, p.radius * 1.35, 0, Math.PI * 2);
              ctx.fill();
            }

            // Draw 3D Spherical Planet Body with Day/Night Terminator Shading
            const sphereGrad = ctx.createRadialGradient(
              lightX,
              lightY,
              p.radius * 0.1,
              px,
              py,
              p.radius
            );
            sphereGrad.addColorStop(0, '#ffffff');
            sphereGrad.addColorStop(0.25, p.colorDay);
            sphereGrad.addColorStop(0.75, p.colorNight);
            sphereGrad.addColorStop(1, '#05070e'); // Deep night terminator

            ctx.fillStyle = sphereGrad;
            ctx.beginPath();
            ctx.arc(px, py, p.radius, 0, Math.PI * 2);
            ctx.fill();

            // Planet Specific Physical Features
            // Earth: Continents & Swirling Cloud Wisps
            if (p.name === 'Earth') {
              ctx.save();
              ctx.beginPath();
              ctx.arc(px, py, p.radius, 0, Math.PI * 2);
              ctx.clip();

              // Greenish continent patches
              ctx.fillStyle = 'rgba(21, 128, 61, 0.65)';
              ctx.beginPath();
              ctx.ellipse(px - normSunX * 1.2, py - normSunY * 1.2, p.radius * 0.55, p.radius * 0.35, 0.6, 0, Math.PI * 2);
              ctx.fill();

              // White dynamic cloud swirls
              ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
              ctx.beginPath();
              ctx.ellipse(px + normSunX * 0.8, py + normSunY * 0.8, p.radius * 0.65, p.radius * 0.22, -0.4, 0, Math.PI * 2);
              ctx.fill();

              ctx.restore();

              // Realistic Moon with accurate phase
              if (p.hasMoon) {
                const moonAngle = globalSimTime * 3.8;
                const moonDist = 14;
                const mx = px + Math.cos(moonAngle) * moonDist;
                const my = py + Math.sin(moonAngle) * (moonDist * 0.7);

                const moonSunDx = cx - mx;
                const moonSunDy = cy - my;
                const moonSunDist = Math.hypot(moonSunDx, moonSunDy);
                const mLightX = mx + (moonSunDx / moonSunDist) * 0.8;
                const mLightY = my + (moonSunDy / moonSunDist) * 0.8;

                const moonGrad = ctx.createRadialGradient(mLightX, mLightY, 0.2, mx, my, 1.8);
                moonGrad.addColorStop(0, '#ffffff');
                moonGrad.addColorStop(0.5, '#cbd5e1');
                moonGrad.addColorStop(1, '#0f172a');

                ctx.fillStyle = moonGrad;
                ctx.beginPath();
                ctx.arc(mx, my, 1.8, 0, Math.PI * 2);
                ctx.fill();
              }
            }

            // Mars: White Polar Ice Caps
            else if (p.name === 'Mars') {
              ctx.save();
              ctx.beginPath();
              ctx.arc(px, py, p.radius, 0, Math.PI * 2);
              ctx.clip();

              // Polar ice cap
              ctx.fillStyle = '#ffffff';
              ctx.beginPath();
              ctx.arc(px, py - p.radius * 0.75, p.radius * 0.35, 0, Math.PI * 2);
              ctx.fill();

              ctx.restore();
            }

            // Jupiter: Atmospheric Zonal Bands & Great Red Spot
            else if (p.name === 'Jupiter') {
              ctx.save();
              ctx.beginPath();
              ctx.arc(px, py, p.radius, 0, Math.PI * 2);
              ctx.clip();

              // Atmospheric cloud bands (alternating tan & amber belts)
              const bandStep = p.radius * 0.32;
              for (let b = -p.radius; b <= p.radius; b += bandStep) {
                ctx.fillStyle = Math.abs(b) < bandStep ? 'rgba(180, 83, 9, 0.45)' : 'rgba(254, 215, 170, 0.35)';
                ctx.fillRect(px - p.radius, py + b, p.radius * 2, bandStep * 0.75);
              }

              // Great Red Spot (Anticyclonic Storm)
              ctx.fillStyle = 'rgba(185, 28, 28, 0.85)';
              ctx.beginPath();
              ctx.ellipse(px + normSunX * 2.5, py + p.radius * 0.32, p.radius * 0.32, p.radius * 0.18, 0.1, 0, Math.PI * 2);
              ctx.fill();

              // Multiplied 3D sphere shadow overlay
              const jupShadow = ctx.createRadialGradient(lightX, lightY, p.radius * 0.2, px, py, p.radius);
              jupShadow.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
              jupShadow.addColorStop(0.7, 'rgba(0, 0, 0, 0.25)');
              jupShadow.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
              ctx.fillStyle = jupShadow;
              ctx.fillRect(px - p.radius, py - p.radius, p.radius * 2, p.radius * 2);

              ctx.restore();
            }

            // Saturn: Draw FRONT HALF of rings and cast shadow onto planet
            if (p.hasRings) {
              const ringTilt = -0.38;
              const ringOuterRx = p.radius * 2.8;
              const ringOuterRy = p.radius * 0.95;
              const ringInnerRx = p.radius * 1.5;

              // Front half of rings (lower arc crossing in front of planet)
              ctx.save();
              ctx.translate(px, py);
              ctx.rotate(ringTilt);

              ctx.beginPath();
              ctx.ellipse(0, 0, ringOuterRx, ringOuterRy, 0, 0, Math.PI);
              ctx.strokeStyle = 'rgba(254, 215, 170, 0.75)';
              ctx.lineWidth = (ringOuterRx - ringInnerRx) * 0.6;
              ctx.stroke();

              // Cassini Division dark gap in front ring
              ctx.beginPath();
              ctx.ellipse(0, 0, ringOuterRx * 0.82, ringOuterRy * 0.82, 0, 0, Math.PI);
              ctx.strokeStyle = 'rgba(3, 4, 8, 0.85)';
              ctx.lineWidth = 1.8;
              ctx.stroke();

              ctx.restore();
            }

            // Planet Label
            ctx.fillStyle = 'rgba(226, 232, 240, 0.7)';
            ctx.font = '9px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(p.name, px, py + p.radius + 13);
          });

          // Sun Core Label
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.fillText('SOL', cx, cy + 3);

          // Top Subtitle Header
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
          ctx.fillText('SOLAR SYSTEM ORBITAL GRAVITY SIMULATION (3D KEPLERIAN DYNAMICS)', width / 2, 60);
        }

        // 2-D. Foundations, Diverse Research & Columns (etc.):
        // Raphael's Monumental Renaissance Masterpiece: "The School of Athens" (Scuola di Atene)
        // High-Resolution Living Fresco with Celestial Sunbeam Shafts,
        // Atmospheric Dust Motes, Focal Illuminations & Interactive Geometric Constellations
        else if (currentDomain === 'etc' || (currentDomain as string) === 'etc.' || currentDomain === 'systems') {
          // Responsive Cover Scaling for Raphael's Masterpiece (3820 x 2964)
          const imgW = 3820;
          const imgH = 2964;
          const scale = Math.max(width / imgW, height / imgH);
          const renderW = imgW * scale;
          const renderH = imgH * scale;

          // Gentle Parallax Camera Motion based on mouse position
          const parallaxX = (mouseX / width - 0.5) * (18 * scale);
          const parallaxY = (mouseY / height - 0.5) * (12 * scale);

          const renderX = (width - renderW) / 2 - parallaxX;
          const renderY = Math.min(0, Math.max(height - renderH, (height - renderH) * 0.42)) - parallaxY;

          // 1. Draw Masterpiece Fresco
          if (athensImgLoaded) {
            ctx.drawImage(athensImg, renderX, renderY, renderW, renderH);
          } else {
            // Warm Renaissance fresco terracotta and gold archway fallback
            const fallbackGrad = ctx.createLinearGradient(0, 0, width, height);
            fallbackGrad.addColorStop(0, '#2d1f14');
            fallbackGrad.addColorStop(0.5, '#1e140d');
            fallbackGrad.addColorStop(1, '#0e0906');
            ctx.fillStyle = fallbackGrad;
            ctx.fillRect(0, 0, width, height);
          }

          // 2. Celestial Golden Sunbeam / Divine Intellect Shaft
          // Centered behind Plato and Aristotle in the grand Roman basilica archway
          const centerArchX = renderX + renderW * 0.50;
          const centerArchY = renderY + renderH * 0.38;
          const pulseLight = Math.sin(globalSimTime * 1.5) * 0.03;

          const archGlowR = Math.max(180, Math.min(width, height) * 0.45);
          const archGlow = ctx.createRadialGradient(centerArchX, centerArchY, 20, centerArchX, centerArchY, archGlowR);
          archGlow.addColorStop(0, `rgba(254, 240, 138, ${0.16 + pulseLight})`);
          archGlow.addColorStop(0.35, `rgba(245, 158, 11, ${0.08 + pulseLight * 0.5})`);
          archGlow.addColorStop(0.7, 'rgba(180, 83, 9, 0.02)');
          archGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = archGlow;
          ctx.beginPath();
          ctx.arc(centerArchX, centerArchY, archGlowR, 0, Math.PI * 2);
          ctx.fill();

          // 3. Focal Pulses on the Great Thinkers
          // A. Pythagoras on bottom left (Harmonics & Arithmetic: nx ~ 0.28, ny ~ 0.73)
          const pythagorasX = renderX + renderW * 0.28;
          const pythagorasY = renderY + renderH * 0.73;
          const pyPulse = Math.sin(globalSimTime * 2.2) * 0.04 + 0.08;
          const pyGlow = ctx.createRadialGradient(pythagorasX, pythagorasY, 5, pythagorasX, pythagorasY, 65 * scale);
          pyGlow.addColorStop(0, `rgba(254, 240, 138, ${pyPulse})`);
          pyGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = pyGlow;
          ctx.beginPath();
          ctx.arc(pythagorasX, pythagorasY, 65 * scale, 0, Math.PI * 2);
          ctx.fill();

          // B. Euclid on bottom right (Geometry with compass on floor: nx ~ 0.75, ny ~ 0.79)
          const euclidX = renderX + renderW * 0.75;
          const euclidY = renderY + renderH * 0.79;
          const euclidPulse = Math.cos(globalSimTime * 2.0) * 0.04 + 0.08;
          const euclidGlow = ctx.createRadialGradient(euclidX, euclidY, 5, euclidX, euclidY, 70 * scale);
          euclidGlow.addColorStop(0, `rgba(254, 240, 138, ${euclidPulse})`);
          euclidGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = euclidGlow;
          ctx.beginPath();
          ctx.arc(euclidX, euclidY, 70 * scale, 0, Math.PI * 2);
          ctx.fill();

          // Subtle compass geometric circle rotating slowly on Euclid's slate floor
          ctx.save();
          ctx.translate(euclidX, euclidY);
          ctx.rotate(globalSimTime * 0.3);
          ctx.strokeStyle = `rgba(254, 240, 138, ${0.25 + euclidPulse * 2})`;
          ctx.lineWidth = 1.0 * scale;
          ctx.setLineDash([4 * scale, 4 * scale]);
          ctx.beginPath();
          ctx.ellipse(0, 0, 24 * scale, 12 * scale, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();

          // 4. Floating Golden Dust Motes through the Grand Classical Hall
          chalkDust.forEach((d) => {
            d.y += d.vy * 0.28 * dt;
            d.x += Math.sin(globalSimTime * d.wobbleSpeed + d.wobbleOffset) * 10 * dt;
            if (d.y > height - 10) {
              d.y = 15;
              d.x = Math.random() * width;
            }
            const distCenter = Math.hypot(d.x - centerArchX, d.y - centerArchY);
            const isNearCenter = distCenter < Math.min(width, height) * 0.45;
            const moteA = isNearCenter ? d.alpha * 1.5 : d.alpha * 0.4;
            ctx.fillStyle = isNearCenter ? `rgba(254, 240, 138, ${moteA})` : `rgba(245, 230, 210, ${moteA * 0.5})`;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.size * scale * 0.9, 0, Math.PI * 2);
            ctx.fill();
          });

          // 5. Interactive Click Effects: Subtle Luminous Golden Concentric Rings & Ambient Sparks
          for (let m = clickChalkMarks.length - 1; m >= 0; m--) {
            const mark = clickChalkMarks[m];
            mark.life += dt;
            mark.alpha -= dt * 0.45;
            mark.scale += dt * 0.55;

            if (mark.alpha <= 0) {
              clickChalkMarks.splice(m, 1);
              continue;
            }

            ctx.save();
            ctx.translate(mark.x, mark.y);

            // Expanding outer golden ring
            ctx.strokeStyle = `rgba(245, 158, 11, ${mark.alpha * 0.5})`;
            ctx.lineWidth = 1.2 * scale;
            ctx.beginPath();
            ctx.arc(0, 0, 36 * scale * mark.scale, 0, Math.PI * 2);
            ctx.stroke();

            // Inner soft glow ring
            ctx.strokeStyle = `rgba(254, 240, 138, ${mark.alpha * 0.35})`;
            ctx.lineWidth = 0.8 * scale;
            ctx.beginPath();
            ctx.arc(0, 0, 18 * scale * mark.scale, 0, Math.PI * 2);
            ctx.stroke();

            ctx.restore();
          }

          for (let spIdx = chalkSparks.length - 1; spIdx >= 0; spIdx--) {
            const sp = chalkSparks[spIdx];
            sp.life += dt;
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            sp.alpha = Math.max(0, 1 - sp.life / sp.maxLife);

            if (sp.life >= sp.maxLife) {
              chalkSparks.splice(spIdx, 1);
              continue;
            }

            ctx.fillStyle = `rgba(254, 240, 138, ${sp.alpha})`;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.size * scale, 0, Math.PI * 2);
            ctx.fill();
          }

          // 6. Subtle Vignette around the canvas for rich museum gallery focus
          const vig = ctx.createRadialGradient(width * 0.5, height * 0.5, width * 0.28, width * 0.5, height * 0.5, Math.max(width, height) * 0.78);
          vig.addColorStop(0, 'rgba(0, 0, 0, 0)');
          vig.addColorStop(0.72, 'rgba(5, 4, 3, 0.35)');
          vig.addColorStop(1, 'rgba(3, 2, 2, 0.72)');
          ctx.fillStyle = vig;
          ctx.fillRect(0, 0, width, height);
        }

      }

      // -----------------------------------------------------------------------
      // SCENE 3: Fullscreen The Uncharted Horizon (Cosmic Singularity)
      // -----------------------------------------------------------------------
      else if (currentScene === 3) {
        const cx = width / 2;
        const cy = height / 2;

        const horizonRadius = Math.min(width, height) * 0.28 + Math.sin(globalSimTime * 0.7) * 10;

        const horizonGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, horizonRadius * 2.1);
        horizonGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        horizonGrad.addColorStop(0.12, 'rgba(66, 133, 244, 0.35)');
        horizonGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.2)');
        horizonGrad.addColorStop(0.68, 'rgba(52, 168, 83, 0.06)');
        horizonGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = horizonGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, horizonRadius * 2.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#020306';
        ctx.beginPath();
        ctx.arc(cx, cy, horizonRadius * 0.58, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(66, 133, 244, 0.35)';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(cx, cy, horizonRadius * 0.59, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(191, 219, 254, 0.85)';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(cx, cy, horizonRadius * 0.59 + Math.sin(globalSimTime * 1.8) * 1.5, 0, Math.PI * 2);
        ctx.stroke();

        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.radius += 160 * dt;
          rip.alpha -= 0.35 * dt;

          if (rip.alpha <= 0.01 || rip.radius >= rip.maxRadius) {
            ripples.splice(i, 1);
            continue;
          }

          ctx.strokeStyle = `rgba(168, 85, 247, ${Math.max(0, rip.alpha) * 0.55})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.stroke();
        }

        cosmicParticles.forEach((p) => {
          p.angle += p.speed * dt;

          let px = cx + Math.cos(p.angle) * p.dist;
          let py = cy + Math.sin(p.angle) * p.dist;

          if (isHovered) {
            const dx = mouseX - px;
            const dy = mouseY - py;
            const distSq = dx * dx + dy * dy;
            if (distSq < 220 * 220 && distSq > 4) {
              const dist = Math.sqrt(distSq);
              const pull = (1 - dist / 220) * 32;
              px += (dx / dist) * pull;
              py += (dy / dist) * pull;
            }
          }

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        const beaconAngle = globalSimTime * 0.4;
        const bx = cx + Math.cos(beaconAngle) * (horizonRadius * 1.35);
        const by = cy + Math.sin(beaconAngle) * (horizonRadius * 1.35);

        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.beginPath();
        ctx.arc(bx, by, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const startLoop = () => {
      if (isRunning || !isVisible || !isTabVisible) return;
      isRunning = true;
      lastTime = performance.now();
      animId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (!isRunning) return;
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    // Pause loop when browser tab is hidden/inactive
    const handleVisibilityChange = () => {
      isTabVisible = document.visibilityState === 'visible';
      if (isTabVisible && isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onCanvasClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair z-0 transform-gpu"
      style={{ display: 'block', willChange: 'transform' }}
    />
  );
};
