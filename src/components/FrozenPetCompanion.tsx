import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, MessageSquare, ChevronRight, ChevronLeft, Volume2, Move, Heart, RefreshCw } from 'lucide-react';

const DIALOGUES = [
  {
    title: 'Alerta da Dupla!',
    text: 'Oi Pedro & Eduardo! ⛄ Vamos fazer as questões de hoje para descongelar as aulas!',
    tag: 'Foco Total',
  },
  {
    title: 'Recuperar Sequência 🔥',
    text: 'A sequência caiu para 0 dias! Bora reativar o fogo dos estudos agora!',
    tag: 'Streak',
  },
  {
    title: 'Subir no Ranking 🚀',
    text: 'Estamos em 12º lugar com 3,4%. O topo do TJAM nos espera!',
    tag: 'Ranking',
  },
  {
    title: 'Dica do Frosty 💡',
    text: 'Resolva pelo menos 10 questões de Português e Direito hoje!',
    tag: 'Metas',
  },
  {
    title: 'IA TJAM Disponível ✨',
    text: 'Dúvidas em alguma matéria? Clique no botão da IA lá no topo!',
    tag: 'Suporte',
  },
  {
    title: 'Constância é Tudo 🎯',
    text: 'Quem estuda todo dia passa mais rápido. Bora com tudo, dupla!',
    tag: 'Motivação',
  },
];

const STORAGE_KEY_POS = 'tjam_frosty_pet_pos_v2';
const STORAGE_KEY_BUBBLE = 'tjam_frosty_pet_bubble_v2';

export const FrozenPetCompanion: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showBubble, setShowBubble] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BUBBLE);
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isClickedAnimation, setIsClickedAnimation] = useState(false);
  const petRef = useRef<HTMLDivElement>(null);

  // Initialize and persist position
  useEffect(() => {
    try {
      const savedPos = localStorage.getItem(STORAGE_KEY_POS);
      if (savedPos) {
        const parsed = JSON.parse(savedPos);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          // Clamp to current viewport
          const clampedX = Math.min(Math.max(10, parsed.x), window.innerWidth - 120);
          const clampedY = Math.min(Math.max(60, parsed.y), window.innerHeight - 150);
          setPosition({ x: clampedX, y: clampedY });
          return;
        }
      }
    } catch {
      // fallback
    }

    // Default position: bottom-right
    const defaultX = Math.max(15, window.innerWidth - 125);
    const defaultY = Math.max(80, window.innerHeight - 170);
    setPosition({ x: defaultX, y: defaultY });
  }, []);

  // Save bubble state
  const toggleBubble = (forceState?: boolean) => {
    setShowBubble((prev) => {
      const next = typeof forceState === 'boolean' ? forceState : !prev;
      try {
        localStorage.setItem(STORAGE_KEY_BUBBLE, String(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  // Dragging event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (position?.x || 0),
      y: e.clientY - (position?.y || 0),
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.no-drag')) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - (position?.x || 0),
        y: e.touches[0].clientY - (position?.y || 0),
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = Math.min(Math.max(10, e.clientX - dragStart.x), window.innerWidth - 120);
      const newY = Math.min(Math.max(60, e.clientY - dragStart.y), window.innerHeight - 145);
      setPosition({ x: newX, y: newY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const newX = Math.min(Math.max(10, e.touches[0].clientX - dragStart.x), window.innerWidth - 120);
      const newY = Math.min(Math.max(60, e.touches[0].clientY - dragStart.y), window.innerHeight - 145);
      setPosition({ x: newX, y: newY });
    };

    const handleEnd = () => {
      if (isDragging && position) {
        try {
          localStorage.setItem(STORAGE_KEY_POS, JSON.stringify(position));
        } catch {
          // ignore
        }
      }
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragStart, position]);

  const handlePetClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    e.stopPropagation();
    setIsClickedAnimation(true);
    setTimeout(() => setIsClickedAnimation(false), 600);
    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
    if (!showBubble) {
      toggleBubble(true);
    }
  };

  const handleNextDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogueIndex((prev) => (prev + 1) % DIALOGUES.length);
  };

  const handlePrevDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogueIndex((prev) => (prev - 1 + DIALOGUES.length) % DIALOGUES.length);
  };

  if (!position) return null;

  const currentDialogue = DIALOGUES[dialogueIndex];

  return (
    <div
      ref={petRef}
      id="frozen-pet-frosty"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={`fixed z-40 select-none touch-none cursor-grab active:cursor-grabbing transition-transform ${
        isDragging ? 'scale-105 shadow-2xl' : ''
      }`}
      aria-label="Pet Frosty - Mascote dos Estudos TJAM"
    >
      {/* Interactive Clean Speech Balloon */}
      {showBubble && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="no-drag absolute -top-32 sm:-top-28 -left-44 sm:-left-48 w-52 sm:w-56 bg-slate-900/95 border border-sky-400/40 rounded-2xl p-3 shadow-2xl backdrop-blur-lg text-slate-100 transition-all hover:border-sky-300"
        >
          {/* Header of Balloon */}
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px]">
            <div className="flex items-center gap-1.5 font-bold text-sky-300">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>{currentDialogue.title}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 text-[9px] font-semibold">
                {currentDialogue.tag}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBubble(false);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Fechar balão de fala"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Dialogue Message Content */}
          <p className="text-[11px] font-medium text-slate-200 mt-1.5 leading-relaxed">
            {currentDialogue.text}
          </p>

          {/* Dialog Navigation Buttons */}
          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-800/80 text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevDialogue}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                title="Mensagem anterior"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <span className="text-[9px] font-mono text-slate-400">
                {dialogueIndex + 1}/{DIALOGUES.length}
              </span>
              <button
                onClick={handleNextDialogue}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-sky-300 transition-colors cursor-pointer"
                title="Próxima mensagem"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={handleNextDialogue}
              className="text-[9px] font-bold text-sky-400 hover:text-sky-300 hover:underline cursor-pointer"
            >
              Mudar Frase
            </button>
          </div>

          {/* Balloon tail pointer */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-slate-900 border-b border-r border-sky-400/40 rotate-45" />
        </div>
      )}

      {/* Snowman Character Card Container */}
      <div className="relative group">
        {/* Subtle Ambient Ice Radial Glow */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500/25 via-cyan-400/20 to-indigo-500/25 rounded-3xl blur-lg opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Outer Card Container */}
        <div className="relative w-20 h-25 sm:w-22 sm:h-27 flex flex-col items-center justify-between p-1.5 rounded-2xl bg-slate-900/90 border border-sky-400/40 hover:border-sky-300 shadow-xl backdrop-blur-md transition-all">
          {/* Top Quick Actions Bar (Toggle speech balloon & Drag hint) */}
          <div className="w-full flex items-center justify-between px-1 text-slate-400">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBubble();
              }}
              className={`no-drag p-0.5 rounded transition-all cursor-pointer ${
                showBubble
                  ? 'text-sky-300 bg-sky-500/20'
                  : 'text-slate-400 hover:text-sky-300 hover:bg-slate-800'
              }`}
              title={showBubble ? 'Ocultar balão de fala' : 'Abrir balão de fala'}
            >
              <MessageSquare className="w-3 h-3" />
            </button>

            <span
              className="text-[8px] font-bold text-sky-400/70 opacity-60 group-hover:opacity-100 flex items-center gap-0.5"
              title="Arraste para mover o Frosty"
            >
              <Move className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* Premium Vector Animated Snowman Character */}
          <div
            onClick={handlePetClick}
            className={`w-15 h-17 sm:w-17 sm:h-19 relative cursor-pointer ${
              isClickedAnimation ? 'scale-110 -translate-y-1' : 'animate-pet-bounce'
            } transition-transform duration-300`}
            title="Frosty ⛄ - Clique para interagir e mudar a fala"
          >
            <svg
              viewBox="0 0 120 130"
              className="w-full h-full drop-shadow-[0_4px_12px_rgba(56,189,248,0.45)] overflow-visible"
            >
              <defs>
                {/* 3D Snow Spheres Gradients */}
                <radialGradient id="frostyBodyGrad" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="55%" stopColor="#f0f9ff" />
                  <stop offset="85%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </radialGradient>

                <radialGradient id="frostyHeadGrad" cx="35%" cy="28%" r="68%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#f0f9ff" />
                  <stop offset="88%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </radialGradient>

                {/* Royal Winter Beanie / Hat Gradients */}
                <linearGradient id="beanieBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="40%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>

                <linearGradient id="beanieRim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>

                {/* Silk Knitted Scarf Gradients */}
                <linearGradient id="scarfFabric" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>

                {/* Carrot Nose 3D Gradient */}
                <linearGradient id="carrotGrad" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="70%" stopColor="#ea580c" />
                  <stop offset="100%" stopColor="#9a3412" />
                </linearGradient>

                {/* Subtle drop shadows */}
                <filter id="snowShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#0284c7" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* Sparkle Crystal Aura Particles */}
              <g className="animate-pulse" opacity="0.8">
                <circle cx="20" cy="35" r="1.5" fill="#bae6fd" />
                <circle cx="102" cy="40" r="1.5" fill="#bae6fd" />
                <circle cx="15" cy="85" r="1.2" fill="#7dd3fc" />
                <circle cx="105" cy="90" r="1.2" fill="#7dd3fc" />
              </g>

              {/* Left Branch Arm (Cozy Pose) */}
              <g>
                <path
                  d="M 34 78 Q 18 72 10 65"
                  stroke="#78350f"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 18 72 Q 14 60 12 55"
                  stroke="#78350f"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 14 69 Q 8 72 4 70"
                  stroke="#78350f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Bottom Big Snowball Sphere */}
              <circle
                cx="60"
                cy="92"
                r="30"
                fill="url(#frostyBodyGrad)"
                stroke="#38bdf8"
                strokeWidth="1.2"
                filter="url(#snowShadow)"
              />

              {/* Spherical Gloss Specular Highlight Bottom */}
              <ellipse cx="50" cy="74" rx="10" ry="4" fill="#ffffff" opacity="0.6" />

              {/* Coal Obsidian Buttons with Glass Reflection */}
              <g>
                {/* Top Button */}
                <circle cx="60" cy="84" r="2.8" fill="#0f172a" />
                <circle cx="61" cy="83" r="0.9" fill="#94a3b8" />
                {/* Middle Button */}
                <circle cx="60" cy="94" r="2.8" fill="#0f172a" />
                <circle cx="61" cy="93" r="0.9" fill="#94a3b8" />
                {/* Bottom Button */}
                <circle cx="60" cy="104" r="2.8" fill="#0f172a" />
                <circle cx="61" cy="103" r="0.9" fill="#94a3b8" />
              </g>

              {/* Scarf Back Tail with Golden Trim */}
              <path
                d="M 66 68 C 72 78, 76 90, 78 102"
                stroke="url(#scarfFabric)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              {/* Scarf Fringe Tassels */}
              <line x1="75" y1="102" x2="75" y2="108" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="78" y1="103" x2="78" y2="109" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="81" y1="102" x2="81" y2="108" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />

              {/* Head Snowball Sphere */}
              <circle
                cx="60"
                cy="48"
                r="22"
                fill="url(#frostyHeadGrad)"
                stroke="#38bdf8"
                strokeWidth="1.2"
                filter="url(#snowShadow)"
              />

              {/* Head Specular Highlight */}
              <ellipse cx="52" cy="34" rx="8" ry="3.5" fill="#ffffff" opacity="0.65" />

              {/* Scarf Front Wrap Collar */}
              <path
                d="M 40 64 C 54 72, 68 72, 80 64 C 80 70, 40 70, 40 64 Z"
                fill="url(#scarfFabric)"
                stroke="#0284c7"
                strokeWidth="1"
              />
              {/* Scarf Brooch Jewel */}
              <circle cx="60" cy="67" r="2.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />

              {/* Cute Expressive Eyes with Dual Reflections */}
              <g>
                {/* Left Eye */}
                <ellipse cx="51" cy="44" rx="3.2" ry="3.8" fill="#0f172a" />
                <circle cx="52.2" cy="42.8" r="1.3" fill="#ffffff" />
                <circle cx="49.8" cy="45.5" r="0.7" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="69" cy="44" rx="3.2" ry="3.8" fill="#0f172a" />
                <circle cx="70.2" cy="42.8" r="1.3" fill="#ffffff" />
                <circle cx="67.8" cy="45.5" r="0.7" fill="#ffffff" />
              </g>

              {/* Rosy Glowing Cheeks */}
              <ellipse cx="45" cy="51" rx="3.5" ry="2.2" fill="#fb7185" opacity="0.45" />
              <ellipse cx="75" cy="51" rx="3.5" ry="2.2" fill="#fb7185" opacity="0.45" />

              {/* 3D Curved Carrot Nose with Ridges */}
              <g>
                <polygon points="58,49 58,54 75,52" fill="url(#carrotGrad)" stroke="#c2410c" strokeWidth="0.4" />
                <line x1="62" y1="50" x2="62" y2="53" stroke="#c2410c" strokeWidth="0.5" strokeLinecap="round" />
                <line x1="66" y1="51" x2="66" y2="53" stroke="#c2410c" strokeWidth="0.5" strokeLinecap="round" />
              </g>

              {/* Warm Cheerful Smile */}
              <path
                d="M 53 56 Q 60 61 67 56"
                stroke="#0f172a"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Stylish Winter Hat / Beanie */}
              <g>
                <path
                  d="M 40 36 Q 60 18 80 36"
                  fill="url(#beanieBody)"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                />
                {/* Beanie Fluffy Rim Band */}
                <rect x="37" y="34" width="46" height="6.5" rx="3.2" fill="url(#beanieRim)" stroke="#0369a1" strokeWidth="0.8" />
                {/* Fluffy Crown Pom-Pom */}
                <circle cx="60" cy="18" r="6" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1" />
                <circle cx="60" cy="18" r="4" fill="#ffffff" opacity="0.8" />
              </g>

              {/* Right Branch Hand - Energetic Waving Motion */}
              <g className="animate-wave" style={{ transformOrigin: '84px 76px' }}>
                <path
                  d="M 84 76 Q 100 60 108 42"
                  stroke="#78350f"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 98 56 Q 108 52 112 50"
                  stroke="#78350f"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Cozy Cyan Knitted Mitten Waving with Thumb */}
                <ellipse cx="109" cy="40" rx="5.5" ry="6.5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.2" />
                <circle cx="104" cy="43" r="2.8" fill="#38bdf8" stroke="#0284c7" strokeWidth="0.8" />
                {/* Mitten Snowflake Symbol */}
                <text x="106.5" y="42.5" fontSize="5" fill="#ffffff" fontWeight="bold">❄</text>
              </g>
            </svg>
          </div>

          {/* Mascot Label Pill with Status Dot */}
          <div
            onClick={handlePetClick}
            className="no-drag w-full py-0.5 px-1.5 rounded-lg bg-sky-950/80 border border-sky-400/30 text-[9px] font-bold text-sky-300 flex items-center justify-center gap-1 cursor-pointer hover:bg-sky-900/80 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span className="truncate">Frosty ⛄</span>
          </div>
        </div>
      </div>
    </div>
  );
};
