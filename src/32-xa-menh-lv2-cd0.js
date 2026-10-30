/*
 * KVPV — Xa Menh Nhat Kich Lv2: client-only cooldown experiment.
 * Row 30310002, skill 3031, level 2, skill[6]: 30000 -> 0.
 * OFF by default. No timers, packet sends, combat hooks or spending.
 * Use KVPV_XA_MENH_LV2.enable() / .status() / .restore().
 */
(() => {
  'use strict';
  const W = window;
  const KEY = 'KVPV_XA_MENH_LV2';
  const RECORD = 30310002;
  const SKILL = 3031;
  const LEVEL = 2;
  const EXPECTED_CD = 30000;

  // Preserve explicit opt-in across a legitimate live module replacement.
  const previous = W[KEY];
  let resume = false;
  try {
    resume = previous?.status?.().enabled === true;
    previous?.restore?.();
  } catch (error) {
    console.warn('[Xa Menh Lv2] Previous instance cleanup:', error);
  }

  let patchedRow = null;
  let originalMs = null;

  function locate() {
    const manager = W._ft?._nY?.ins;
    if (typeof manager?.getCfgBySkillIdAndLv !== 'function') {
      throw new Error('Skill config unavailable. Select the game frame and wait for loading.');
    }
    const row = manager.getCfgBySkillIdAndLv(SKILL, LEVEL);
    if (!Array.isArray(row) || Number(row[0]) !== RECORD ||
        Number(row[1]) !== SKILL || Number(row[3]) !== LEVEL ||
        !Number.isFinite(row[6])) {
      throw new Error('Unexpected Lv2 skill row; no changes applied.');
    }
    return row;
  }

  function status() {
    try {
      const row = locate();
      return {
        skillId: SKILL, level: LEVEL, recordId: row[0],
        configCooldownMs: row[6],
        enabled: patchedRow === row && row[6] === 0,
        originalMs: originalMs ?? EXPECTED_CD,
        serverBypassConfirmed: false
      };
    } catch (error) {
      return { enabled: false, error: String(error.message || error) };
    }
  }

  function restore() {
    if (patchedRow) {
      if (patchedRow[6] === 0) patchedRow[6] = originalMs;
      else if (patchedRow[6] !== originalMs)
        console.warn('[Xa Menh Lv2] Config changed elsewhere; not overwriting it.');
    }
    patchedRow = null;
    originalMs = null;
    return status();
  }

  function enable() {
    const row = locate();
    if (patchedRow === row && row[6] === 0) return status();
    if (patchedRow) restore();
    if (row[6] !== EXPECTED_CD)
      throw new Error('Expected ' + EXPECTED_CD + 'ms, found ' + row[6] + 'ms. No changes applied.');
    patchedRow = row;
    originalMs = row[6];
    row[6] = 0;
    console.info('[Xa Menh Lv2] Client config 30000ms -> 0ms; server behavior UNVERIFIED.');
    return status();
  }

  W[KEY] = Object.freeze({ version: 2, status, enable, restore, stop: restore });
  if (resume) {
    try { enable(); }
    catch (error) { console.warn('[Xa Menh Lv2] Could not resume:', error); }
  }
})();
