import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
//  Proper gear SVG – teeth generated mathematically (white)
// ─────────────────────────────────────────────────────────────
function GearSVG({
  size = 120,
  teeth = 10,
  color = 'white',
}: {
  size?: number;
  teeth?: number;
  color?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR  = size * 0.46;   // tip of tooth
  const pitchR  = size * 0.36;   // base of tooth
  const holeR   = size * 0.14;   // center hole
  const hubR    = size * 0.20;   // hub disc

  // Build a path that draws the gear outline (teeth + troughs)
  const toothAngle  = (2 * Math.PI) / teeth;
  const halfTooth   = toothAngle * 0.22;   // width of tooth top
  const halfTrough  = toothAngle * 0.28;   // width of trough

  let d = '';
  for (let i = 0; i < teeth; i++) {
    const base = i * toothAngle - Math.PI / 2;

    // 4 points per tooth: trough-start, tooth-left, tooth-right, trough-end
    const angles = [
      base - halfTrough,          // trough start (inner)
      base - halfTooth,           // tooth left  (outer)
      base + halfTooth,           // tooth right (outer)
      base + halfTrough,          // trough end  (inner)
    ];
    const radii = [pitchR, outerR, outerR, pitchR];

    angles.forEach((a, j) => {
      const x = cx + radii[j] * Math.cos(a);
      const y = cy + radii[j] * Math.sin(a);
      d += i === 0 && j === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)} ` : `L ${x.toFixed(2)} ${y.toFixed(2)} `;
    });
  }
  d += 'Z';

  // Hole path (counter-clockwise to cut out)
  const holePoints = 60;
  let holePath = '';
  for (let i = 0; i <= holePoints; i++) {
    const a = (i / holePoints) * 2 * Math.PI;
    const x = cx + holeR * Math.cos(a);
    const y = cy + holeR * Math.sin(a);
    holePath += i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
  }
  holePath += 'Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <defs>
        <filter id={`glow-${size}-${teeth}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Gear body (fills with gear outline – hole subtracted via clip/evenodd) */}
      <path
        d={`${d} ${holePath}`}
        fill={color}
        fillRule="evenodd"
        filter={`url(#glow-${size}-${teeth})`}
        opacity={0.95}
      />
      {/* Hub ring */}
      <circle cx={cx} cy={cy} r={hubR} fill={color} opacity={0.95}
        filter={`url(#glow-${size}-${teeth})`} />
      <circle cx={cx} cy={cy} r={holeR} fill="#0d0d0d" />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={size * 0.05} fill={color} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
//  Floating particle
// ─────────────────────────────────────────────────────────────
function Particle({
  delay, duration, x, y, size,
}: { delay: number; duration: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: [0, 0.55, 0], y: [-10, -50, -90] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
//  Letter-by-letter animated text
// ─────────────────────────────────────────────────────────────
const LINE1 = 'FarmGear';
const LINE2 = 'Connect';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [showTagline, setShowTagline]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTagline(true), 1100);
    const t2 = setTimeout(() => setIsVisible(false), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: (i * 0.19) % 3.5,
    duration: 2.0 + (i % 6) * 0.35,
    x: `${4 + (i * 4.8) % 90}%`,
    y: `${15 + (i * 6.7) % 70}%`,
    size: 2 + (i % 3),
  }));

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#0d0d0d' }}
        >
          {/* ── Soft white radial glow behind gears ── */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 380, height: 380,
              background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)',
              filter: 'blur(24px)',
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── Concentric ring pulses ── */}
          {[200, 300, 420].map((w, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-white/10"
              style={{ width: w, height: w }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.22, 0.08] }}
              transition={{ duration: 2.8 + i * 0.6, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
            />
          ))}

          {/* ── Floating dust particles ── */}
          {particles.map((p) => <Particle key={p.id} {...p} />)}

          {/* ── Gear assembly ── */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
            animate={{ scale: 1,   opacity: 1, rotate: 0   }}
            transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.05 }}
            style={{ width: 200, height: 180, marginBottom: '1.5rem' }}
          >
            {/* Large gear — clockwise */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', left: 0, top: 20 }}
            >
              <GearSVG size={138} teeth={12} color="white" />
            </motion.div>

            {/* Small gear — counter-clockwise, meshing at top-right */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4.67, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', right: 0, top: 55 }}
            >
              <GearSVG size={88} teeth={8} color="white" />
            </motion.div>

            {/* Rotating shimmer halo */}
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 190, height: 190,
                background: 'conic-gradient(transparent 0deg, rgba(255,255,255,0.06) 45deg, transparent 90deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* ── Brand text ── */}
          <div className="relative z-10 flex flex-col items-center select-none">

            {/* "FarmGear" — letter by letter */}
            <div className="flex" aria-label="FarmGear">
              {LINE1.split('').map((ch, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ opacity: 0, y: 20, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0,  scale: 1   }}
                  transition={{
                    delay: 0.35 + i * 0.055,
                    type: 'spring',
                    stiffness: 180,
                    damping: 18,
                  }}
                  style={{
                    fontSize: '2.6rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                    textShadow: '0 0 18px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.2)',
                    display: 'inline-block',
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* "Connect" — slides up with slight delay */}
            <div className="flex" aria-label="Connect">
              {LINE2.split('').map((ch, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0  }}
                  transition={{
                    delay: 0.75 + i * 0.06,
                    type: 'spring',
                    stiffness: 160,
                    damping: 20,
                  }}
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.65)',
                    letterSpacing: '0.28em',
                    lineHeight: 1,
                    textShadow: '0 0 10px rgba(255,255,255,0.3)',
                    display: 'inline-block',
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Divider shimmer */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1,   opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7, ease: 'easeOut' }}
              style={{
                marginTop: '1rem',
                height: 1,
                width: 160,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
                transformOrigin: 'left',
              }}
            />

            {/* Tagline */}
            <AnimatePresence>
              {showTagline && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    letterSpacing: '0.25em',
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Rent · Earn · Grow
                </motion.p>
              )}
            </AnimatePresence>

            {/* Loading sweep bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: '1.8rem',
                width: 160,
                height: 2,
                borderRadius: 99,
                background: 'rgba(255,255,255,0.12)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ x: '-110%' }}
                animate={{ x:  '110%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '55%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)',
                  boxShadow: '0 0 12px rgba(255,255,255,0.8)',
                  borderRadius: 99,
                }}
              />
            </motion.div>
          </div>

          {/* ── Version tag ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            style={{
              position: 'absolute',
              bottom: 36,
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.25)',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            v1.0 · Beta
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
