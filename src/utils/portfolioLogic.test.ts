import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import {
  clampExcerptPage,
  computeBookTilt,
  computeCursorTilt,
  filterProjectsByTrack,
  resolveInitialTheme,
  toggleThemeMode,
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
