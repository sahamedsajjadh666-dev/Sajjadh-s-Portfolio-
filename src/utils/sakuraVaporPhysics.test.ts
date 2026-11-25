import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeVaporAlpha,
  createVaporEmitter,
  DARK_VAPOR_PALETTE,
  emitCursorTrail,
  getVaporPalette,
  LIGHT_VAPOR_PALETTE,
  sampleThemeGradientColor,
  stepVaporEmitter,
  triggerVaporWave,
  type GlyphAnchor,
} from './sakuraVaporPhysics';

function makeTestAnchors(count = 600): GlyphAnchor[] {
  const anchors: GlyphAnchor[] = [];
  for (let i = 0; i < count; i += 1) {
    const u = i / (count - 1);
    anchors.push({
      x: 40 + u * 640,
      y: 80 + ((i % 7) - 3) * 4,
      u,
      seed: ((i * 37) % 97) / 97,
    });
  }
  return anchors;
}

test('mist palettes match soft sakura pink (Light) and rose gold (Dark) without harsh accents', () => {
  assert.deepEqual(getVaporPalette('light'), ['#F472B6', '#FBCFE8']);
  assert.deepEqual(getVaporPalette('dark'), ['#FDA4AF', '#FDE68A']);
  assert.equal(LIGHT_VAPOR_PALETTE.length, 2);
  assert.equal(DARK_VAPOR_PALETTE.length, 2);

  assert.deepEqual(sampleThemeGradientColor(0.05, 'light'), { r: 15, g: 23, b: 42 });
  assert.deepEqual(sampleThemeGradientColor(1.0, 'light'), { r: 220, g: 38, b: 38 });
  assert.deepEqual(sampleThemeGradientColor(0.1, 'dark'), { r: 248, g: 250, b: 252 });
  assert.deepEqual(sampleThemeGradientColor(1.0, 'dark'), { r: 234, g: 179, b: 8 });
});

test('mist grains are microscopic (0.8px-1.4px), tightly capped at 18px-26px rise, and fade rapidly', () => {
  const anchors = makeTestAnchors(1200);
  const emitter = createVaporEmitter(anchors, 1600);

  triggerVaporWave(emitter);

  let peakActive = 0;
  let maxObservedRise = 0;
  let phase = stepVaporEmitter(emitter, 0.016);
  assert.equal(phase, 'sweeping');

  for (let f = 0; f < 65; f += 1) {
    phase = stepVaporEmitter(emitter, 0.016);
    peakActive = Math.max(peakActive, emitter.activeCount);

    for (let i = 0; i < emitter.capacity; i += 1) {
      if (!emitter.active[i]) continue;
      assert.ok(emitter.size[i] >= 0.8 && emitter.size[i] <= 1.4, `size ${emitter.size[i]} out of [0.8, 1.4]`);
      assert.ok(emitter.peakAlpha[i] >= 0.18 && emitter.peakAlpha[i] <= 0.45);
      assert.ok(emitter.maxLife[i] >= 27 / 60 && emitter.maxLife[i] <= 37 / 60);
      const rise = emitter.originY[i] - emitter.y[i];
      maxObservedRise = Math.max(maxObservedRise, rise);
      assert.ok(rise <= 26.01, `rise ${rise} exceeded 26px cap`);
    }
  }

  assert.ok(peakActive >= 160, `expected dense mist wave, got ${peakActive}`);
  assert.ok(maxObservedRise > 10 && maxObservedRise <= 26.01);

  // Rapid 28-36 frame fadeout settles quickly once wave finishes
  for (let f = 0; f < 50; f += 1) {
    phase = stepVaporEmitter(emitter, 0.016);
  }
  assert.equal(phase, 'idle');
  assert.equal(emitter.activeCount, 0);
});

test('emitCursorTrail spawns localized low-opacity mist near cursor and dissolves within ~0.65s', () => {
  const anchors = makeTestAnchors(400);
  const emitter = createVaporEmitter(anchors, 1600);

  const spawned = emitCursorTrail(emitter, 360, 80, 200, -10, 44, 14);
  assert.ok(spawned >= 6 && spawned <= 14);

  let phase = stepVaporEmitter(emitter, 0.016);
  assert.equal(phase, 'emitting');

  // 42 frames (~0.67s) > maxLife (~0.60s) -> completely dissolved
  for (let f = 0; f < 42; f += 1) {
    phase = stepVaporEmitter(emitter, 0.016);
  }
  assert.equal(phase, 'idle');
  assert.equal(emitter.activeCount, 0);
});

test('computeVaporAlpha stays strictly bounded to low mist opacity <= 0.45', () => {
  assert.equal(computeVaporAlpha(0, 0.55, 0.45), 0);
  const peak = computeVaporAlpha(0.09, 0.55, 0.45);
  assert.ok(peak > 0.2 && peak <= 0.45);
  assert.equal(computeVaporAlpha(0.55, 0.55, 0.45), 0);
});
