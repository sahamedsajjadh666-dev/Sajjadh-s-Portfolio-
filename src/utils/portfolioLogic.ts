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

