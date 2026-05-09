// Motion tokens — every animation in the framework uses these values.
// reducedMotion overrides are automatically applied when the system setting is enabled.

export const duration = {
  instant:    50,
  fast:       120,
  normal:     220,
  slow:       380,
  verySlow:   550,
  // Glass-specific: blur fades need slightly longer to feel smooth
  blurIn:     280,
  blurOut:    180,
  // Entrance animations
  enter:      300,
  exit:       200,
  // Spring-based don't use duration — see springs below
} as const;

export const easing = {
  // Cubic bezier definitions for Reanimated's `withTiming`
  // Use `Easing.bezier(x1, y1, x2, y2)` in Reanimated code
  standard:   [0.4, 0.0, 0.2, 1.0],  // most transitions
  decelerate: [0.0, 0.0, 0.2, 1.0],  // elements entering viewport
  accelerate: [0.4, 0.0, 1.0, 1.0],  // elements leaving viewport
  sharp:      [0.4, 0.0, 0.6, 1.0],  // quick attention-grabbing
} as const;

// Spring configs — used with Reanimated's `withSpring`
export const springs = {
  // iOS-style: fast, confident, no overshoot
  snappy: {
    damping:   22,
    stiffness: 420,
    mass:      0.8,
    overshootClamping: false,
  },
  // The liquid glass spring: physical, fluid, slight wobble
  liquid: {
    damping:   15,
    stiffness: 280,
    mass:      1.0,
    overshootClamping: false,
  },
  // Reveal: for blurs fading in, dialogs mounting
  reveal: {
    damping:   30,
    stiffness: 200,
    mass:      1.2,
    overshootClamping: false,
  },
  // Bounce: FAB, badges, notification pops
  bounce: {
    damping:   8,
    stiffness: 340,
    mass:      0.7,
    overshootClamping: false,
  },
  // Precise: sliders, progress — no overshoot
  precise: {
    damping:   40,
    stiffness: 300,
    mass:      1.0,
    overshootClamping: true,
  },
} as const;

// reducedMotion equivalents — same properties but collapsed to near-instant
export const reducedMotion = {
  duration: {
    instant:  0,
    fast:     0,
    normal:   50,
    slow:     80,
    verySlow: 100,
    blurIn:   80,
    blurOut:  60,
    enter:    80,
    exit:     60,
  },
  springs: {
    snappy: { damping: 40, stiffness: 400, mass: 1 },
    liquid: { damping: 40, stiffness: 400, mass: 1 },
    reveal: { damping: 40, stiffness: 400, mass: 1 },
    bounce: { damping: 40, stiffness: 400, mass: 1 },
    precise: { damping: 40, stiffness: 400, mass: 1 },
  },
} as const;

export const motion = { duration, easing, springs, reducedMotion } as const;
export type Motion = typeof motion;
export type SpringConfig = (typeof springs)[keyof typeof springs];
