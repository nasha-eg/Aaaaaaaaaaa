
import React, { useState, useRef } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ 
  beforeImage, 
  afterImage,
  beforeLabel = "Original",
  afterLabel = "Capital Standard"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] overflow-hidden cursor-col-resize select-none border-2 border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] group rounded-2xl"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* After Image */}
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Before Image */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover grayscale" />
      </div>

      {/* Luxury Handle */}
      <div 
        className="absolute inset-y-0 z-10 w-[2px] gold-gradient pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900 border-2 border-[#d4af37] rounded-none rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          <div className="-rotate-45 flex space-x-1">
             <div className="w-1.5 h-1.5 rounded-full gold-gradient"></div>
             <div className="w-1.5 h-1.5 rounded-full gold-gradient"></div>
          </div>
        </div>
      </div>

      {/* Floating Labels */}
      <div className="absolute top-6 left-6 z-20 pointer-events-none">
        <span className="px-4 py-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.3em] border border-white/10">{beforeLabel}</span>
      </div>
      <div className="absolute top-6 right-6 z-20 pointer-events-none">
        <span className="px-4 py-2 gold-gradient text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] shadow-lg">{afterLabel}</span>
      </div>
    </div>
  );
};
