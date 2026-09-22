import React, { useState, useEffect } from 'react';

interface AnalogClockProps {
  compact?: boolean;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({ compact = false }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const timeString = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div
      id="swavy-analog-clock"
      className="inline-flex items-center gap-2.5 sm:gap-3.5 bg-white/95 border-2 border-black rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-md select-none group hover-glow cursor-pointer transition-all duration-300"
      title={`Current Time: ${timeString}`}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
          {/* Dial Background */}
          <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#111114" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.75" />

          {/* Minute tick marks */}
          {[...Array(60)].map((_, i) =>
            i % 5 === 0 ? null : (
              <line
                key={`min-${i}`}
                x1="50"
                y1="7"
                x2="50"
                y2="9.5"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="0.8"
                transform={`rotate(${i * 6} 50 50)`}
              />
            )
          )}

          {/* Hour tick marks */}
          {[...Array(12)].map((_, i) => {
            const isMajor = i % 3 === 0;
            return (
              <line
                key={`hour-${i}`}
                x1="50"
                y1="6"
                x2="50"
                y2={isMajor ? '13' : '10'}
                stroke="#111114"
                strokeWidth={isMajor ? '2.5' : '1.5'}
                strokeLinecap="round"
                transform={`rotate(${i * 30} 50 50)`}
              />
            );
          })}

          {/* Clock Numerals */}
          <text x="50" y="23" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" fill="#111114">12</text>
          <text x="79" y="53" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" fill="#111114">3</text>
          <text x="50" y="82" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" fill="#111114">6</text>
          <text x="21" y="53" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily="'Space Grotesk', sans-serif" fill="#111114">9</text>

          {/* Brand Mark */}
          <text x="50" y="36" textAnchor="middle" fontSize="4.2" fontWeight="900" letterSpacing="0.6" fontFamily="'Space Grotesk', sans-serif" fill="#111114" opacity="0.85">
            SWAVY GADGET
          </text>
          <text x="50" y="41" textAnchor="middle" fontSize="3" fontWeight="700" letterSpacing="0.4" fontFamily="'Space Grotesk', sans-serif" fill="#2563eb">
            LAGOS • ABK
          </text>

          {/* Hour Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="28"
            stroke="#111114"
            strokeWidth="3.2"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 50 50)`}
          />

          {/* Minute Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            stroke="#111114"
            strokeWidth="2.2"
            strokeLinecap="round"
            transform={`rotate(${minDeg} 50 50)`}
          />

          {/* Second Hand (Accent Royal Blue from Flyer) */}
          <line
            x1="50"
            y1="60"
            x2="50"
            y2="13"
            stroke="#2563eb"
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${secDeg} 50 50)`}
          />
          <circle cx="50" cy="58" r="2" fill="#2563eb" transform={`rotate(${secDeg} 50 50)`} />

          {/* Center Pin */}
          <circle cx="50" cy="50" r="3.2" fill="#111114" stroke="#ffffff" strokeWidth="1" />
        </svg>
      </div>

      <div className="flex flex-col pr-1 sm:pr-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span className="text-[9.5px] sm:text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
            STORES OPEN
          </span>
        </div>
        <span className="font-mono text-xs sm:text-sm font-black tracking-tight text-[#0f172a]">
          {timeString}
        </span>
        <span className="text-[9px] font-bold text-[#2563eb] uppercase tracking-wider">
          WAT / NIGERIA TIME
        </span>
      </div>
    </div>
  );
};
