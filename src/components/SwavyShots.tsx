import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2, Upload, Check } from 'lucide-react';
import { SwavyShot } from '../types';
import { SWAVY_SHOTS_DATA } from '../data/shots';
import { ManageShotsModal } from './ManageShotsModal';
import { loadCustomShots, saveCustomShots, clearCustomShots } from '../utils/shotsStorage';
import { sanitizeShot } from '../utils/shotNamer';

export const SwavyShots: React.FC = () => {
  const [shots, setShots] = useState<SwavyShot[]>(SWAVY_SHOTS_DATA);
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set());
  const [activeShotIndex, setActiveShotIndex] = useState<number | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isCustomLoaded, setIsCustomLoaded] = useState(false);

  // Load custom shots saved by user if any and migrate legacy default titles
  useEffect(() => {
    loadCustomShots().then((custom) => {
      if (custom && custom.length > 0) {
        const legacyDefaultMap: Record<string, { title: string; filename: string; caption: string }> = {
          'Studio Portrait in Warm Sunlight': {
            title: 'The Magenta Silk Wrap & Pleated Gele',
            filename: 'look_01_magenta_silk_satin_pleated_gele.jpg',
            caption: 'Lustrous magenta silk-satin wrap dress complemented by an architectural pleated gele headpiece, accented with warm ambient studio lighting.'
          },
          'Urban Rhythm: Marina Sunset Dusk': {
            title: 'Embroidered Royal Agbada & Coral Beads',
            filename: 'look_02_embroidered_agbada_coral_beads.jpg',
            caption: 'Hand-embroidered emerald agbada robe paired with authentic multi-strand royal coral beads and a matching velvet fila cap.'
          },
          'High-Key Studio Portrait': {
            title: 'Cream Ribbed Knit Turtleneck & Gold Hoops',
            filename: 'look_03_cream_ribbed_knit_turtleneck_hoops.jpg',
            caption: 'Sculptural high-neck cream ribbed knit pullover styled with polished gold hoop earrings and radiant high-key rim falloff.'
          },
          'Outdoor Ambient Natural Light': {
            title: 'Crisp White Linen Button-Down & Spread Collar',
            filename: 'look_04_crisp_white_linen_spread_collar.jpg',
            caption: 'Breathable open-weave pure white linen shirt with a relaxed spread collar, styled effortlessly under natural afternoon canopy.'
          },
          'Afro-Modernist Elegance': {
            title: 'Sleeveless Sculpted Scoop Top & Brushed Brass',
            filename: 'look_05_sleeveless_sculpted_scoop_brass.jpg',
            caption: 'Minimalist chocolate-toned sleeveless scoop-neck top paired with geometric brushed brass drop earrings and deep tonal richness.'
          },
          'Candid Street Documentary': {
            title: 'Vintage Stonewash Denim Trucker & Layered Tee',
            filename: 'look_06_vintage_stonewash_denim_trucker.jpg',
            caption: 'Relaxed vintage-wash denim trucker jacket layered over a crisp cotton base with loose city streetwear tailoring.'
          },
          'Sculptural Studio Shadows': {
            title: 'Midnight Black Fitted Crewneck & Sculptural Form',
            filename: 'look_07_midnight_black_fitted_crewneck.jpg',
            caption: 'Form-fitting premium midnight black cotton crewneck tee highlighting clean collar lines and stark directional shadows.'
          },
          'Golden Glow Editorial': {
            title: 'Oversized Shearling Aviator Jacket & Gold Accents',
            filename: 'look_08_oversized_shearling_aviator_jacket.jpg',
            caption: 'Textured heavyweight shearling-lined aviator jacket styled with polished gold hoops and golden-hour cinematic glow.'
          }
        };

        const migrated = custom.map((s, idx) => {
          if (legacyDefaultMap[s.title]) {
            return sanitizeShot({
              ...s,
              title: legacyDefaultMap[s.title].title,
              filename: legacyDefaultMap[s.title].filename,
              caption: legacyDefaultMap[s.title].caption
            }, idx);
          }
          return sanitizeShot(s, idx);
        });

        setShots(migrated);
        setIsCustomLoaded(true);
      }
    });
  }, []);

  // Filter out any frames that have no image or failed to load, clean titles, and dynamically renumber them
  const visibleShots = shots
    .filter((shot) => !failedImageIds.has(shot.id) && shot.image && shot.image.trim() !== '')
    .map((shot, idx) => sanitizeShot(shot, idx));

  const activeShot = activeShotIndex !== null ? visibleShots[activeShotIndex] : null;

  const handleNext = () => {
    if (activeShotIndex !== null && visibleShots.length > 0) {
      setActiveShotIndex((prev) => (prev! + 1) % visibleShots.length);
    }
  };

  const handlePrev = () => {
    if (activeShotIndex !== null && visibleShots.length > 0) {
      setActiveShotIndex((prev) => (prev! - 1 + visibleShots.length) % visibleShots.length);
    }
  };

  const handleSaveShots = async (updatedShots: SwavyShot[]) => {
    setShots(updatedShots);
    setFailedImageIds(new Set());
    setIsCustomLoaded(true);
    await saveCustomShots(updatedShots);
  };

  const handleResetShots = async () => {
    await clearCustomShots();
    setShots(SWAVY_SHOTS_DATA);
    setFailedImageIds(new Set());
    setIsCustomLoaded(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeShotIndex === null) return;
      if (e.key === 'Escape') setActiveShotIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (activeShotIndex !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeShotIndex, visibleShots.length]);

  return (
    <section
      id="swavy-shots"
      className="w-full bg-[#07090e] text-white py-16 sm:py-24 border-t-2 border-black relative select-none"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-white/10 pb-8" data-reveal>
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-4">
              <Camera size={14} className="text-[#38bdf8]" />
              <span>PHOTOGRAPHY ARCHIVE • RAW CAPTURES</span>
            </div>

            <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.88]">
              SWAVY_SHOTS.
            </h2>

            <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mt-4 font-normal leading-relaxed">
              Raw, unedited photographic works captured through the lens of Swavy. Curated exhibition of portraiture, street documentary, and authentic cultural elegance.
            </p>
          </div>

          {/* Owner Self-Input Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              id="upload-manage-shots-btn"
              onClick={() => setIsManageModalOpen(true)}
              className="bg-white hover:bg-[#38bdf8] text-black font-mono font-bold text-xs uppercase tracking-wider px-4 sm:px-5 py-3 rounded-2xl flex items-center gap-2 border border-white/20 shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Upload size={15} />
              <span>Input & Manage Shots</span>
              <span className="bg-black text-white px-2 py-0.5 rounded-md text-[10px]">
                {visibleShots.length}
              </span>
            </button>

            {isCustomLoaded ? (
              <span className="text-[11px] font-mono text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <Check size={12} className="stroke-[3]" />
                <span>Custom Photos Active</span>
              </span>
            ) : (
              <div className="flex items-center gap-2 font-mono text-xs text-white/60 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>{visibleShots.length} RAW FRAMES</span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Photographs Gallery Grid: Only frames with valid images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6" data-reveal>
          {visibleShots.map((shot, index) => (
            <div
              key={shot.id}
              onClick={() => setActiveShotIndex(index)}
              className="group relative bg-[#0e131d] border border-white/10 hover:border-white/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/5 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-9/14 sm:aspect-9/13 w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={shot.image}
                  alt={shot.title}
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    // Instantly remove frames that fail to load
                    setFailedImageIds((prev) => new Set(prev).add(shot.id));
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Reticle Viewfinder Corner Marks */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-white/50 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-white/50 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-white/50 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-white/50 pointer-events-none" />

                {/* Top Sequential Serial Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-black/80 backdrop-blur-md text-[11px] font-mono font-black text-white px-2.5 py-1 rounded-lg border border-white/15">
                    LOOK {shot.serial}
                  </span>
                </div>

                {/* Hover Maximize Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="bg-white text-black p-3 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </div>

              {/* Minimal Caption Card: Pure Photograph Info */}
              <div className="p-4 bg-[#0d121c] border-t border-white/10 flex flex-col justify-between grow">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-sans font-bold text-sm text-white group-hover:text-[#38bdf8] transition-colors truncate">
                    {shot.title}
                  </h3>
                  <span className="text-[10px] font-mono text-white/40 shrink-0 ml-2">
                    LOOK {shot.serial}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-normal line-clamp-2 leading-relaxed">
                  {shot.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {visibleShots.length === 0 && (
          <div className="text-center py-16 bg-[#0e131d] border border-white/10 rounded-3xl p-8 max-w-md mx-auto">
            <Camera size={32} className="text-white/40 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-white mb-1">No Frames Available</h3>
            <p className="text-xs text-slate-400 mb-4">
              Add your raw photographs using the button above to populate the exhibition.
            </p>
            <button
              type="button"
              onClick={() => setIsManageModalOpen(true)}
              className="bg-white text-black font-mono font-bold text-xs uppercase px-5 py-2.5 rounded-xl cursor-pointer hover:bg-[#38bdf8]"
            >
              Upload Photos
            </button>
          </div>
        )}
      </div>

      {/* Full-Screen Pure Photo Lightbox Modal */}
      {activeShot && activeShotIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveShotIndex(null)}
        >
          {/* Top Header Bar */}
          <div
            className="w-full max-w-6xl flex items-center justify-between z-20 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-white bg-white/10 border border-white/20 px-3 py-1 rounded-full">
                LOOK {activeShot.serial} / {visibleShots.length.toString().padStart(2, '0')}
              </span>
              <span className="font-sans font-bold text-sm sm:text-base text-white truncate max-w-xs sm:max-w-md">
                {activeShot.title}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveShotIndex(null)}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-white/20 active:scale-90"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Central Image Canvas with Next / Prev Controls */}
          <div
            className="relative w-full max-w-5xl flex items-center justify-center my-auto px-2 sm:px-12 min-h-0 grow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-1 sm:left-2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/20 shadow-xl transition-all cursor-pointer active:scale-90"
              aria-label="Previous Photograph"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Raw Photo */}
            <div className="relative max-h-[75vh] sm:max-h-[82vh] w-auto overflow-hidden rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center bg-black">
              <img
                src={activeShot.image}
                alt={activeShot.title}
                className="max-h-[75vh] sm:max-h-[82vh] w-auto object-contain rounded-2xl"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-1 sm:right-2 z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/70 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/20 shadow-xl transition-all cursor-pointer active:scale-90"
              aria-label="Next Photograph"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-4xl text-center py-3 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs font-mono text-[#38bdf8] font-bold uppercase tracking-wider mb-1">
              LOOK {activeShot.serial} • {activeShot.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
              {activeShot.caption}
            </p>
          </div>
        </div>
      )}

      {/* Owner Photo Management Modal */}
      <ManageShotsModal
        shots={visibleShots}
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        onSave={handleSaveShots}
        onReset={handleResetShots}
      />
    </section>
  );
};
