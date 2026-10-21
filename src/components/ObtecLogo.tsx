import React from 'react';

interface ObtecLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  glow?: boolean;
}

export const ObtecLogo: React.FC<ObtecLogoProps> = ({
  size = 'md',
  className = '',
  glow = true,
}) => {
  const sizeMap: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number> = {
    xs: 20,
    sm: 26,
    md: 34,
    lg: 48,
    xl: 76,
  };

  const pixelSize = typeof size === 'number' ? size : sizeMap[size] || 34;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      aria-label="Obtec Research Logo"
    >
      {/* Ambient Radial Core Bloom */}
      {glow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-70 animate-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(37, 99, 235, 0.25) 45%, transparent 75%)',
            filter: `blur(${Math.max(4, pixelSize * 0.18)}px)`,
          }}
        />
      )}

      {/* High-Precision Frontier Science Vector Insignia */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 transition-transform duration-500 hover:rotate-45"
      >
        <defs>
          {/* Linear gradient for orbital arc 1 */}
          <linearGradient id="obtecGrad1" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>

          {/* Linear gradient for orbital arc 2 */}
          <linearGradient id="obtecGrad2" x1="85" y1="20" x2="20" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Core Singularity Radial Gradient */}
          <radialGradient id="obtecCore" cx="50" cy="50" r="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#7DD3FC" />
            <stop offset="70%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#0F172A" />
          </radialGradient>

          {/* Subtle Outer Bevel Glow Filter */}
          <filter id="obtecBevel" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#38BDF8" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. Outer Coordinate Precision Caliper Ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
        />
        <circle
          cx="50"
          cy="50"
          r="41"
          stroke="rgba(56, 189, 248, 0.22)"
          strokeWidth="0.8"
        />

        {/* 2. Micro Coordinate Cardinal Ticks (12, 3, 6, 9 o'clock) */}
        <line x1="50" y1="2" x2="50" y2="7" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="93" x2="50" y2="98" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="50" x2="7" y2="50" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="93" y1="50" x2="98" y2="50" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />

        {/* 3. Interlocking Quantum Orbital Bands (The "O" Möbius Nexus) */}
        {/* Orbital Band A - Upper Right to Lower Left */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="17"
          transform="rotate(-28 50 50)"
          stroke="url(#obtecGrad1)"
          strokeWidth="2.8"
          strokeLinecap="round"
          filter="url(#obtecBevel)"
        />

        {/* Orbital Band B - Upper Left to Lower Right */}
        <ellipse
          cx="50"
          cy="50"
          rx="38"
          ry="17"
          transform="rotate(38 50 50)"
          stroke="url(#obtecGrad2)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Orbital Band C - Transverse Resonance Loop */}
        <ellipse
          cx="50"
          cy="50"
          rx="32"
          ry="14"
          transform="rotate(84 50 50)"
          stroke="rgba(224, 242, 254, 0.45)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* 4. Silicon Lattice / Tensor Node Intersections */}
        <circle cx="21" cy="35" r="2.2" fill="#E0F2FE" />
        <circle cx="79" cy="65" r="2.2" fill="#38BDF8" />
        <circle cx="34" cy="74" r="2.2" fill="#93C5FD" />
        <circle cx="66" cy="26" r="2.2" fill="#E0F2FE" />

        {/* 5. Central Radiant Singularity / Quantum Core */}
        <g filter="url(#obtecBevel)">
          {/* Outer Core Ring */}
          <circle cx="50" cy="50" r="10" fill="url(#obtecCore)" stroke="#FFFFFF" strokeWidth="1.2" />

          {/* Central Prismatic Spark */}
          <polygon
            points="50,42 52.8,47.8 58,50 52.8,52.2 50,58 47.2,52.2 42,50 47.2,47.8"
            fill="#FFFFFF"
          />
        </g>
      </svg>
    </div>
  );
};
