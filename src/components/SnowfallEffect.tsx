import React, { useMemo } from 'react';

export const SnowfallEffect: React.FC = () => {
  // Generate a minimal set of delicate, subtle snowflakes
  const snowflakes = useMemo(() => {
    return Array.from({ length: 14 }).map((_, index) => {
      const size = Math.random() * 8 + 8; // 8px to 16px
      const left = Math.random() * 100; // 0 to 100vw
      const animationDuration = Math.random() * 10 + 10; // 10s to 20s (slow and calm)
      const animationDelay = Math.random() * 8;
      const opacity = Math.random() * 0.25 + 0.15; // 0.15 to 0.40 (very subtle)
      const glyph = ['❄', '•', '✧'][index % 3];

      return {
        id: index,
        size,
        left,
        animationDuration,
        animationDelay,
        opacity,
        glyph,
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Floating Gentle Snowflakes */}
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute animate-snow text-sky-200/50"
          style={{
            left: `${flake.left}%`,
            top: '-20px',
            fontSize: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            opacity: flake.opacity,
          }}
        >
          {flake.glyph}
        </span>
      ))}
    </div>
  );
};

