import type { ProjectItem, ProjectTrack } from '../data/portfolioData';

export interface TiltResult {
  rotateX: number;
  rotateY: number;
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export function filterProjectsByTrack(
  projects: ProjectItem[],
  track: ProjectTrack,
): ProjectItem[] {
  if (track === 'All') {
    return projects;
  }
  return projects.filter((project) => project.track === track);
}

/**
 * Computes bounded 3D book cover tilt angles in degrees from normalized pointer coordinates.
 */
export function computeBookTilt(
  normalizedX: number,
  normalizedY: number,
  maxTiltDegrees = 9,
): TiltResult {
  const clampedX = Math.max(0, Math.min(1, normalizedX));
  const clampedY = Math.max(0, Math.min(1, normalizedY));

  const rotateY = Number(((clampedX - 0.5) * 2 * maxTiltDegrees).toFixed(2));
  const rotateX = Number(((0.5 - clampedY) * 2 * maxTiltDegrees).toFixed(2));

  return { rotateX, rotateY };
}

export interface CursorTiltResult extends TiltResult {
  sheenPercentX: number;
  sheenPercentY: number;
}

/**
 * Computes bounded 3D card tilt (up to maxTiltDegrees) and cursor sheen coordinates.
 */
export function computeCursorTilt(
  normalizedX: number,
  normalizedY: number,
  maxTiltDegrees = 4,
): CursorTiltResult {
  const clampedX = Math.max(0, Math.min(1, normalizedX));
  const clampedY = Math.max(0, Math.min(1, normalizedY));
  const { rotateX, rotateY } = computeBookTilt(clampedX, clampedY, maxTiltDegrees);

  return {
    rotateX,
    rotateY,
    sheenPercentX: Number((clampedX * 100).toFixed(1)),
    sheenPercentY: Number((clampedY * 100).toFixed(1)),
  };
}

export function clampExcerptPage(pageIndex: number, totalPages: number): number {
  if (totalPages <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(totalPages - 1, pageIndex));
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  input: ContactFormInput,
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  if (!input.name.trim()) {
    errors.name = 'Please enter your name.';
  }

  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!input.message.trim() || input.message.trim().length < 10) {
    errors.message = 'Please enter a message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export type ThemeMode = 'light' | 'dark';

export function resolveInitialTheme(storedValue: string | null | undefined): ThemeMode {
  return storedValue === 'dark' ? 'dark' : 'light';
}

export function toggleThemeMode(current: ThemeMode): ThemeMode {
  return current === 'dark' ? 'light' : 'dark';
}

export function formatWhatsAppMessage(input: ContactFormInput): string {
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  return [
    'Hello Sajjadh, I reached out from your portfolio.',
    '',
    `*Name:* ${trimmedName}`,
    `*Email:* ${trimmedEmail}`,
    `*Message:* ${trimmedMessage}`,
  ].join('\n');
}

export function buildWhatsAppUrl(
  input: ContactFormInput,
  phoneNumber = '916369117287',
): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(formatWhatsAppMessage(input));
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export interface VaporCharTiming {
  initialX: number;
  initialY: number;
  initialScale: number;
  initialBlur: number;
  delay: number;
}

export interface HeadlineWordToken {
  word: string;
  wordIndex: number;
  chars: Array<{
    char: string;
    globalIndex: number;
    letterOrder: number;
  }>;
}

export interface VaporParticleSpec {
  id: number;
  kind: 'wisp' | 'petal';
  leftPercent: number;
  topPercent: number;
  width: number;
  height: number;
  driftX: number;
  driftY: number;
  rotate: number;
  delayOffset: number;
  duration: number;
  toneIndex: 0 | 1;
}

/**
 * Computes deterministic initial vapor-scatter coordinates and stagger delay per character.
 */
export function computeVaporCharTiming(
  letterOrder: number,
  baseDelay = 0,
  staggerStep = 0.035,
): VaporCharTiming {
  const safeOrder = Math.max(0, letterOrder);
  const initialX = Number((Math.sin(safeOrder * 2.17 + 0.7) * 9).toFixed(2));
  return {
    initialX,
    initialY: -14,
    initialScale: 1.28,
    initialBlur: 14,
    delay: Number((baseDelay + safeOrder * staggerStep).toFixed(4)),
  };
}

/**
 * Splits a headline into word groups with sequential global character and non-space letter indices.
 */
export function tokenizeHeadlineWords(text: string): {
  words: HeadlineWordToken[];
  totalChars: number;
} {
  const rawWords = text.split(' ');
  let globalIndex = 0;
  let letterOrder = 0;

  const words = rawWords.map((word, wordIndex) => {
    const chars = Array.from(word).map((char) => {
      const token = {
        char,
        globalIndex,
        letterOrder,
      };
      globalIndex += 1;
      letterOrder += 1;
      return token;
    });

    if (wordIndex < rawWords.length - 1) {
      globalIndex += 1;
    }

    return {
      word,
      wordIndex,
      chars,
    };
  });

  return { words, totalChars: globalIndex };
}

/**
 * Generates deterministic translucent sakura vapor wisps and tiny petal specks around the headline.
 */
export function generateVaporParticles(count = 16): VaporParticleSpec[] {
  const safeCount = Math.max(1, count);
  return Array.from({ length: safeCount }, (_, index) => {
    const kind: 'wisp' | 'petal' = index % 3 === 0 ? 'wisp' : 'petal';
    const progress = safeCount === 1 ? 0.5 : index / (safeCount - 1);
    const leftPercent = Number((4 + progress * 92 + Math.sin(index * 3.1) * 2.5).toFixed(1));
    const topPercent = Number((38 + Math.cos(index * 2.4) * 26).toFixed(1));
    const driftX = Number((Math.sin(index * 1.9 + 0.4) * 18).toFixed(1));
    const driftY = Number((-28 - ((index * 7) % 24)).toFixed(1));
    const rotate = Math.round(Math.sin(index * 2.7) * 55);
    const delayOffset = Number((progress * 0.52).toFixed(3));
    const duration = kind === 'wisp' ? 1.15 : 1.05 + (index % 3) * 0.14;

    return {
      id: index,
      kind,
      leftPercent: Math.max(2, Math.min(98, leftPercent)),
      topPercent,
      width: kind === 'wisp' ? 30 + (index % 4) * 9 : 7 + (index % 3) * 2,
      height: kind === 'wisp' ? 11 + (index % 3) * 4 : 7 + (index % 3) * 2,
      driftX,
      driftY,
      rotate,
      delayOffset,
      duration: Number(duration.toFixed(2)),
      toneIndex: (index % 2) as 0 | 1,
    };
  });
}

