import React from 'react';

interface NotebookIllustrationProps {
  className?: string;
}

export const NotebookIllustration: React.FC<NotebookIllustrationProps> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 520 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[460px] drop-shadow-md select-none"
      >
        <defs>
          {/* Subtle paper shadow */}
          <filter id="hardShadow" x="0" y="0" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="4" dy="4" stdDeviation="0" floodColor="#26351F" floodOpacity="1" />
          </filter>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Background Floating Yellow Sparkles (4-pointed stars) --- */}
        {/* Top-left sparkle */}
        <g transform="translate(48, 45) scale(0.9)" className="animate-pulse">
          <path
            d="M 15 0 C 15 8 18 12 26 15 C 18 18 15 22 15 30 C 15 22 12 18 4 15 C 12 12 15 8 15 0 Z"
            fill="#F5D66E"
            stroke="#26351F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        {/* Top-right sparkle */}
        <g transform="translate(450, 60) scale(1.1)">
          <path
            d="M 15 0 C 15 8 18 12 26 15 C 18 18 15 22 15 30 C 15 22 12 18 4 15 C 12 12 15 8 15 0 Z"
            fill="#F5D66E"
            stroke="#26351F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        {/* Bottom-left small sparkle */}
        <g transform="translate(30, 280) scale(0.75)">
          <path
            d="M 15 0 C 15 8 18 12 26 15 C 18 18 15 22 15 30 C 15 22 12 18 4 15 C 12 12 15 8 15 0 Z"
            fill="#F5D66E"
            stroke="#26351F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>
        {/* Mid-right small sparkle */}
        <g transform="translate(470, 240) scale(0.8)" className="animate-pulse">
          <path
            d="M 15 0 C 15 8 18 12 26 15 C 18 18 15 22 15 30 C 15 22 12 18 4 15 C 12 12 15 8 15 0 Z"
            fill="#F5D66E"
            stroke="#26351F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </g>

        {/* Tiny sparkle dots */}
        <circle cx="75" cy="110" r="3.5" fill="#F5D66E" stroke="#26351F" strokeWidth="1.5" />
        <circle cx="435" cy="150" r="3" fill="#F5D66E" stroke="#26351F" strokeWidth="1.5" />
        <circle cx="445" cy="310" r="4" fill="#F5D66E" stroke="#26351F" strokeWidth="1.5" />

        {/* --- OPEN NOTEBOOK GROUP --- */}
        <g transform="translate(85, 45)">
          {/* Notebook Hard Shadow */}
          <rect
            x="8"
            y="10"
            width="310"
            height="260"
            rx="18"
            fill="#26351F"
          />

          {/* Notebook Back Cover Base (Olive Sage Border) */}
          <rect
            x="0"
            y="2"
            width="310"
            height="260"
            rx="18"
            fill="#C6C99F"
            stroke="#26351F"
            strokeWidth="3.5"
          />

          {/* Left Page (Cream Paper) */}
          <path
            d="M 20 12 
               L 150 12 
               C 152 12 153 14 153 16 
               L 153 250 
               C 153 252 152 254 150 254 
               L 20 254 
               C 12 254 6 248 6 240 
               L 6 26 
               C 6 18 12 12 20 12 Z"
            fill="#FFF8E7"
            stroke="#26351F"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Right Page (Cream Paper) */}
          <path
            d="M 157 16 
               C 157 14 158 12 160 12 
               L 290 12 
               C 298 12 304 18 304 26 
               L 304 240 
               C 304 248 298 254 290 254 
               L 160 254 
               C 158 254 157 252 157 250 
               Z"
            fill="#FFFBF0"
            stroke="#26351F"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Subtle center spine fold shadow */}
          <line x1="155" y1="12" x2="155" y2="254" stroke="#26351F" strokeWidth="2" strokeDasharray="3 3" />

          {/* Left Page Lines & Content */}
          {/* Header "To-do" */}
          <text
            x="32"
            y="48"
            fill="#26351F"
            fontFamily="'Comfortaa', cursive, sans-serif"
            fontWeight="bold"
            fontSize="24"
            letterSpacing="-0.5"
          >
            To-do
          </text>
          {/* Decorative cute curved underline for To-do */}
          <path
            d="M 32 54 Q 68 59 105 53"
            fill="none"
            stroke="#F5A0B7"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Checklist Row 1 */}
          <circle cx="34" cy="85" r="7.5" fill="#FFF8E7" stroke="#26351F" strokeWidth="2.5" />
          {/* Cute Checkmark inside circle 1 */}
          <path
            d="M 30 85 L 33 88 L 39 81"
            fill="none"
            stroke="#707B3B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="50" y1="85" x2="140" y2="85" stroke="#26351F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Checklist Row 2 */}
          <circle cx="34" cy="118" r="7.5" fill="#FFF8E7" stroke="#26351F" strokeWidth="2.5" />
          <path
            d="M 30 118 L 33 121 L 39 114"
            fill="none"
            stroke="#707B3B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="50" y1="118" x2="135" y2="118" stroke="#26351F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Checklist Row 3 */}
          <circle cx="34" cy="151" r="7.5" fill="#FFF8E7" stroke="#26351F" strokeWidth="2.5" />
          <line x1="50" y1="151" x2="142" y2="151" stroke="#26351F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Checklist Row 4 */}
          <circle cx="34" cy="184" r="7.5" fill="#FFF8E7" stroke="#26351F" strokeWidth="2.5" />
          <line x1="50" y1="184" x2="128" y2="184" stroke="#26351F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Checklist Row 5 */}
          <circle cx="34" cy="217" r="7.5" fill="#FFF8E7" stroke="#26351F" strokeWidth="2.5" />
          <line x1="50" y1="217" x2="138" y2="217" stroke="#26351F" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Page Lines & Content */}
          {/* Header mini doodle / notes line */}
          <line x1="175" y1="48" x2="275" y2="48" stroke="#C6C99F" strokeWidth="3" strokeLinecap="round" />
          <line x1="175" y1="76" x2="285" y2="76" stroke="#26351F" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" opacity="0.4" />
          <line x1="175" y1="104" x2="285" y2="104" stroke="#26351F" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" opacity="0.4" />
          <line x1="175" y1="132" x2="285" y2="132" stroke="#26351F" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" opacity="0.4" />
          <line x1="175" y1="160" x2="285" y2="160" stroke="#26351F" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" opacity="0.4" />
          <line x1="175" y1="188" x2="285" y2="188" stroke="#26351F" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" opacity="0.4" />
          <line x1="175" y1="216" x2="285" y2="216" stroke="#26351F" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" opacity="0.4" />

          {/* Mini cartoon doodle on right page: little seedling plant */}
          <g transform="translate(225, 115) scale(0.9)">
            {/* Small pot */}
            <path
              d="M 12 40 L 16 60 C 16 62 18 64 21 64 L 39 64 C 42 64 44 62 44 60 L 48 40 Z"
              fill="#F5A0B7"
              stroke="#26351F"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Sprout stem */}
            <path
              d="M 30 40 Q 30 25 32 18"
              fill="none"
              stroke="#707B3B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Left sprout leaf */}
            <path
              d="M 31 28 C 22 26 20 18 27 16 C 31 16 31 24 31 28 Z"
              fill="#707B3B"
              stroke="#26351F"
              strokeWidth="2"
            />
            {/* Right sprout leaf */}
            <path
              d="M 32 22 C 38 18 45 19 43 27 C 40 30 34 26 32 22 Z"
              fill="#A8C69F"
              stroke="#26351F"
              strokeWidth="2"
            />
          </g>

          {/* --- CUTE PINK FLOWER ON NOTEBOOK (bottom-left corner of the notebook) --- */}
          <g transform="translate(32, 230) scale(1)">
            {/* Petal 1 (top) */}
            <ellipse cx="20" cy="8" rx="8" ry="10" fill="#F5A0B7" stroke="#26351F" strokeWidth="2" />
            {/* Petal 2 (top-right) */}
            <ellipse cx="30" cy="15" rx="8" ry="10" transform="rotate(72 30 15)" fill="#F5A0B7" stroke="#26351F" strokeWidth="2" />
            {/* Petal 3 (bottom-right) */}
            <ellipse cx="26" cy="28" rx="8" ry="10" transform="rotate(144 26 28)" fill="#F5A0B7" stroke="#26351F" strokeWidth="2" />
            {/* Petal 4 (bottom-left) */}
            <ellipse cx="14" cy="28" rx="8" ry="10" transform="rotate(216 14 28)" fill="#F5A0B7" stroke="#26351F" strokeWidth="2" />
            {/* Petal 5 (top-left) */}
            <ellipse cx="10" cy="15" rx="8" ry="10" transform="rotate(288 10 15)" fill="#F5A0B7" stroke="#26351F" strokeWidth="2" />
            {/* Center Yellow Disc */}
            <circle cx="20" cy="20" r="7" fill="#F5D66E" stroke="#26351F" strokeWidth="2" />
            {/* Center tiny smile in flower */}
            <path d="M 18 21 Q 20 23 22 21" stroke="#26351F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </g>

          {/* --- SPIRAL BINDER RINGS --- */}
          {[28, 56, 84, 112, 140, 168, 196, 224].map((y, idx) => (
            <g key={idx}>
              {/* Hole punch marks */}
              <circle cx="147" cy={y} r="3.5" fill="#26351F" />
              <circle cx="163" cy={y} r="3.5" fill="#26351F" />
              {/* Spiral Metal Ring Loop */}
              <path
                d={`M 145 ${y - 4} C 145 ${y - 12} 165 ${y - 12} 165 ${y + 2}`}
                fill="none"
                stroke="#26351F"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={`M 146 ${y - 4} C 146 ${y - 10} 164 ${y - 10} 164 ${y + 1}`}
                fill="none"
                stroke="#FFF8E7"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          ))}
        </g>

        {/* --- YELLOW PENCIL BESIDE THE NOTEBOOK --- */}
        <g transform="translate(415, 115) rotate(16)">
          {/* Pencil Hard Shadow */}
          <path
            d="M 8 8 L 22 8 L 22 170 L 15 192 L 8 170 Z"
            fill="#26351F"
          />
          {/* Main Pencil Body */}
          <path
            d="M 4 2 L 18 2 L 18 162 L 11 184 L 4 162 Z"
            fill="#F5D66E"
            stroke="#26351F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Wood sharpened tip area */}
          <path
            d="M 4 162 L 18 162 L 11 184 Z"
            fill="#FFF8E7"
            stroke="#26351F"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Dark graphite lead tip */}
          <path
            d="M 9 176 L 13 176 L 11 184 Z"
            fill="#26351F"
          />
          {/* Pencil body facets/grooves */}
          <line x1="9" y1="2" x2="9" y2="162" stroke="#26351F" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
          <line x1="13" y1="2" x2="13" y2="162" stroke="#26351F" strokeWidth="1.5" opacity="0.3" />

          {/* Metal Ferrule Band */}
          <rect
            x="4"
            y="-10"
            width="14"
            height="12"
            fill="#C6C99F"
            stroke="#26351F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="4" y1="-4" x2="18" y2="-4" stroke="#26351F" strokeWidth="1.5" />

          {/* Pink Eraser */}
          <path
            d="M 4 -10 C 4 -18 18 -18 18 -10 Z"
            fill="#F5A0B7"
            stroke="#26351F"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
