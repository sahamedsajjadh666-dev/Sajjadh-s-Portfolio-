import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import {
  buildWhatsAppUrl,
  clampExcerptPage,
  computeBookTilt,
  computeCursorTilt,
  computeVaporCharTiming,
  filterProjectsByTrack,
  formatWhatsAppMessage,
  generateVaporParticles,
  resolveInitialTheme,
  toggleThemeMode,
  tokenizeHeadlineWords,
  validateContactForm,
} from './portfolioLogic';

test('filterProjectsByTrack returns all, software, or hardware builds', () => {
  assert.equal(filterProjectsByTrack(PORTFOLIO_PROJECTS, 'All').length, 4);
  const software = filterProjectsByTrack(PORTFOLIO_PROJECTS, 'Software');
  assert.equal(software.length, 3);
  const hardware = filterProjectsByTrack(PORTFOLIO_PROJECTS, 'Hardware');
  assert.equal(hardware.length, 1);
  assert.equal(hardware[0].id, 'speed-detection-fine-system');
});

test('computeBookTilt computes neutral center and clamps edges', () => {
  assert.deepEqual(computeBookTilt(0.5, 0.5, 9), { rotateX: 0, rotateY: 0 });
  assert.deepEqual(computeBookTilt(1.5, -0.5, 9), { rotateX: 9, rotateY: 9 });
});

test('computeCursorTilt bounds tilt to 4deg and tracks sheen coordinates', () => {
  assert.deepEqual(computeCursorTilt(0.5, 0.5, 4), {
    rotateX: 0,
    rotateY: 0,
    sheenPercentX: 50,
    sheenPercentY: 50,
  });
  assert.deepEqual(computeCursorTilt(0, 1, 4), {
    rotateX: -4,
    rotateY: -4,
    sheenPercentX: 0,
    sheenPercentY: 100,
  });
  assert.deepEqual(computeCursorTilt(2, -1, 4), {
    rotateX: 4,
    rotateY: 4,
    sheenPercentX: 100,
    sheenPercentY: 0,
  });
});

test('clampExcerptPage bounds page navigation', () => {
  assert.equal(clampExcerptPage(-1, 2), 0);
  assert.equal(clampExcerptPage(1, 2), 1);
  assert.equal(clampExcerptPage(8, 2), 1);
});

test('validateContactForm validates required fields and email syntax', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'invalid-email',
    message: 'hey',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Kabir',
    email: 'kabir@example.com',
    message: 'Would love to collaborate on a computer vision model.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('theme helpers resolve stored preference and toggle between light and dark', () => {
  assert.equal(resolveInitialTheme(null), 'light');
  assert.equal(resolveInitialTheme('light'), 'light');
  assert.equal(resolveInitialTheme('invalid'), 'light');
  assert.equal(resolveInitialTheme('dark'), 'dark');
  assert.equal(toggleThemeMode('light'), 'dark');
  assert.equal(toggleThemeMode('dark'), 'light');
});

test('WhatsApp message formatter and URL builder encode contact fields properly', () => {
  const payload = {
    name: ' Aarav Nair ',
    email: ' aarav@example.com ',
    message: ' Interested in collaborating on a PyTorch & OpenCV project! ',
  };
  const formatted = formatWhatsAppMessage(payload);
  assert.equal(
    formatted,
    'Hello Sajjadh, I reached out from your portfolio.\n\n*Name:* Aarav Nair\n*Email:* aarav@example.com\n*Message:* Interested in collaborating on a PyTorch & OpenCV project!',
  );
  const url = buildWhatsAppUrl(payload, '916369117287');
  assert.ok(url.startsWith('https://wa.me/916369117287?text='));
  assert.equal(
    decodeURIComponent(url.split('?text=')[1]),
    formatted,
  );
});

test('Sakura Vapor helpers compute per-character scatter, word tokens, and vapor particles', () => {
  const tokenized = tokenizeHeadlineWords('S. AHAMED SAJJADH');
  assert.equal(tokenized.words.length, 3);
  assert.equal(tokenized.totalChars, 17);
  assert.equal(tokenized.words[0].chars.length, 2);
  assert.equal(tokenized.words[1].chars[0].globalIndex, 3);
  assert.equal(tokenized.words[1].chars[0].letterOrder, 2);
  assert.equal(tokenized.words[2].chars[0].globalIndex, 10);
  assert.equal(tokenized.words[2].chars[0].letterOrder, 8);

  const t0 = computeVaporCharTiming(0, 0.72, 0.035);
  const t1 = computeVaporCharTiming(1, 0.72, 0.035);
  assert.equal(t0.initialBlur, 14);
  assert.equal(t0.initialScale, 1.28);
  assert.equal(t0.initialY, -14);
  assert.equal(t0.delay, 0.72);
  assert.equal(t1.delay, 0.755);

  const particles = generateVaporParticles(16);
  assert.equal(particles.length, 16);
  assert.ok(particles.some((p) => p.kind === 'wisp'));
  assert.ok(particles.some((p) => p.kind === 'petal'));
  assert.ok(particles.every((p) => p.driftY < 0));
});
