// Auto Weapon Enhancement
function __KVPV_INSTALL_35_equipment_treasure_js() {

    (() => {
      'use strict';

      const W = window; W.KVPV_EQUIPMENT_TREASURE?.stop?.();

      const actor = String(W.__KVPV_OWN_ACTOR_ID || ''), S = { enabled: true, timer: null, lastError: '' }, rewardCache = new Map();

      const categories = [{ type: 0, panel: 93, name: 'Trang Bị' }, { type: 3, panel: 393, name: 'Phù Văn' },
      { type: 1, panel: 115, name: 'Đỉnh Cao' }, { type: 2, panel: 116, name: 'Chí Tôn' }];

      const norm = x => String(x || '').replace(/<[^>]*>/g, '').normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase();

      const owned = () => actor && actor === String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') && !W.__KVPV_UNIVERSAL_HALTED;

      function classify(name) {
        const n = norm(name); if (/phap bao/.test(n)) return 4; if (/phu van/.test(n)) return 3;
        if (/dinh cao/.test(n)) return 1; if (/chi ton/.test(n)) return 2; if (/trang bi|vu khi|non|bao tay|day chuyen|vong tay/.test(n)) return 0; return null;
      }

      function cache(id, item, type) {
        const key = `${type}-${id}`;
        rewardCache.set(key, { item, at: Date.now() });
        if (rewardCache.size > 1000) {
          const oldest = [...rewardCache.entries()].sort((a, b) => a[1].at - b[1].at)[0];
          rewardCache.delete(oldest[0]);
        }
      }

      function scan() {
        try {
          if (!owned()) return;
          const d = W._ft?._vZ?.ins?.d; if (!d) return;
          const c = W._d?._Yct?.Eet; if (!c) return;
          const actor = W._C?._Ba?.instance?.getRole?.(W.__KVPV_OWN_ACTOR_ID); if (!actor) return;
          const selector = actor?.getComponent?.(c); if (!selector) return;
          const current = selector?._rtt?.map(row => Number(row?.[0]))?.filter(Number.isSafeInteger) || [];
          
          // Auto weapon upgrade enhancement
          if (W.KVPV_AUTO_WEAPON_UPGRADE) {
            W.KVPV_AUTO_WEAPON_UPGRADE();
          }
          
        } catch (e) {
          W.KVPV_V1?.diagnostics?.record?.(e);
          S.lastError = String(e?.message ?? e);
        }
      }

      function tick() {
        if (!S.enabled || !owned()) return;
        const d = W._ft?._vZ?.ins?.d; if (!d) return;
        const now = Date.now();
        const delay = now - (S.last || 0) >= 3000 ? 0 : 3000 - (now - (S.last || 0));
        if (delay) return;
        S.last = now;
        scan();
      }

      function start() {
        S.enabled = true; S.last = 0;
        if (S.timer) W.clearTimeout(S.timer);
        S.timer = W.setInterval(tick, 3000);
        return S;
      }

      function stop() {
        S.enabled = false;
        if (S.timer) {
          W.clearInterval(S.timer);
          S.timer = null;
        }
        return S;
      }

      W.KVPV_EQUIPMENT_TREASURE = Object.freeze({
        version: '1.0.0',
        start,
        stop,
        status() {
          return { ...S, actorId: actor, playerLoaded: !!W._C?._Ba?.instance?.getRole?.(actor) };
        },
        _handoff() { return S; }
      });
      
      // Auto weapon upgrade initialization
      W.KVPV_AUTO_WEAPON_UPGRADE = function() {
        try {
          // Implementation for auto weapon upgrade
          console.log('Auto Weapon Upgrade: Checking for equipment upgrades...');
          // Add your upgrade logic here
        } catch (e) {
          console.error('Auto Weapon Upgrade error:', e);
        }
      };

    })();
  }

// Auto Linh Thú Enhancement
function __KVPV_INSTALL_17_linh_lung_th_js() {

    (() => {
      const W = window; let enabled = W.KVPV_LINHLUNG_TH?.enabled !== false;

      W.KVPV_LINHLUNG_TH = Object.freeze({
        get enabled() { return enabled; },

        start(options = {}) {
          const tower = W.KVPV_LINHLUNG922;

          if (!tower?.start) throw Error('Thiếu bộ vượt Linh Lung Tháp');

          enabled = true; W.KVPV_MODE.armTianQuan(); return tower.start(options);
        },

        stop() { enabled = false; const result = W.KVPV_LINHLUNG922?.stop?.('Dừng vượt Linh Lung Tuyệt Học'); W.KVPV_MODE?.syncMap?.(); return result; },

        status() {
          return {
            enabled, scope: W.KVPV_FAR_SCOPE?.status?.(), tower: W.KVPV_LINHLUNG922?.status?.(false),
            combat: W.KVPV_TH300?.status?.(false), recovery: { enabled: true, leavePct: 35, returnPct: 100, finishBossHpPct: 2 }
          };
        },
        
        // Auto pet enhancement
        autoPet() {
          try {
            // Auto pet functionality
            console.log('Auto Linh Thú: Activating pet management...');
            // Add your pet management logic here
          } catch (e) {
            console.error('Auto Linh Thú error:', e);
          }
        }
      });
      
      // Auto pet initialization
      if (W.KVPV_LINHLUNG_TH) {
        W.KVPV_LINHLUNG_TH.autoPet();
      }
    })();
  }

// Companion Combat Enhancement
function __KVPV_INSTALL_50_companion_combat_js() {

    (() => {
      'use strict';

      const W = window, old = W.KVPV_COMPANION_COMBAT, carry = old?._handoff?.();
      try { old?.stop?.(); } catch (e) { W.KVPV_V1?.diagnostics?.record?.(e); }

      const actor = String(W.__KVPV_OWN_ACTOR_ID ?? ''), allowed = new Set(['THIEN_QUAN', 'LINH_LUNG', 'PHU_VAN', 'TRU_TIEN']), scanMs = 50;

      const S = {
        enabled: true, timer: null, role: null, ride: null, mansion: null, mansionAttempts: 0, dispatching: false, reason: 'starting', lastError: '',
        attempts: carry?.actor === actor ? Number(carry.attempts) || 0 : 0, nativeCastSignals: carry?.actor === actor ? Number(carry.nativeCastSignals) || 0 : 0, lastSkill: null, lastTarget: null
      };

      const prop = (r, k) => r?.property?.get?.(k), types = () => W._d?._Yct;
      const component = (r, k) => types()?.[k] ? r?.getComponent?.(types()[k]) : null;
      const identity = r => String(r?.id ?? prop(r, 'id') ?? '');

      function getRole() {
        const r = W._C?._Ba?.instance?.getRole?.(actor); if (!r) return null;
        const t = types(); const c = component(r, 'Bjt'); const d = component(r, 'Eet');
        return { role: r, type: t, component: { skill: c, selector: d } };
      }

      function tick() {
        try {
          if (!S.enabled || !actor) return;
          if (!W.KVPV_ACCOUNT_POLICY?.status?.()?.playerLoaded) return;
          const role = getRole(); if (!role) return;
          const d = W._ft?._vZ?.ins?.d; if (!d) return;
          
          // Auto pet enhancement
          if (W.KVPV_AUTO_COMPANION) {
            W.KVPV_AUTO_COMPANION();
          }
          
        } catch (e) {
          W.KVPV_V1?.diagnostics?.record?.(e);
          S.lastError = String(e?.message ?? e);
        }
      }

      function start() {
        S.enabled = true; S.reason = 'starting';
        if (S.timer) W.clearTimeout(S.timer);
        S.timer = W.setInterval(tick, scanMs);
        return S;
      }

      function stop() {
        S.enabled = false;
        if (S.timer) {
          W.clearInterval(S.timer);
          S.timer = null;
        }
        return S;
      }

      W.KVPV_COMPANION_COMBAT = Object.freeze({
        version: '1.0.0',
        start,
        stop,
        status() {
          return { ...S, actorId: actor, playerLoaded: !!W._C?._Ba?.instance?.getRole?.(actor) };
        },
        _handoff() { return S; }
      });
      
      // Auto companion enhancement
      W.KVPV_AUTO_COMPANION = function() {
        try {
          // Auto companion functionality
          console.log('Auto Companion: Managing companion combat...');
          // Add your companion management logic here
        } catch (e) {
          console.error('Auto Companion error:', e);
        }
      };
    })();
  }

// Pet Travel Enhancement
function __KVPV_INSTALL_66_pet_travel_js() {

    (() => {
      'use strict'; const W = window, old = W.KVPV_PET_TRAVEL, c = old?._handoff?.(); old?.stop?.(); const actor = String(W.__KVPV_OWN_ACTOR_ID || ''), same = c?.actor === actor;
      const S = { timer: null, pending: new Map(same ? c.pending : []), queries: new Set(same ? c.queries : []), last: -Infinity, starts: same ? c.starts : 0, claims: same ? c.claims : 0, confirmed: same ? c.confirmed : 0, reason: 'waiting', error: '' };

      const m = () => W._Ba?._Q9?._ttt?.ins, r = () => W._Ba?._Q9?._$dt?.ins;
      const own = () => actor && actor === String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') && !W.__KVPV_UNIVERSAL_HALTED;
      const safe = () => Date.now() >= Number(W.__KVPV_USER_UI_UNTIL || 0) && W.KVPV_DAILY?.quickState?.()?.running === true && !W.KVPV_BOSS_TEAM?.priority?.();

      function query(id, key) { if (S.queries.has(key) || typeof r()?.getSpiritAnimalTravel !== 'function') return; S.queries.add(key); if (S.queries.size > 200) S.queries.delete(S.queries.values().next().value); r().getSpiritAnimalTravel([id]); }

      function tick() {
        try {
          if (!own() || !m() || !r()) return; const ids = W._ft?._vZ?.ins?.ids; if (!Array.isArray(ids)) return;

          for (const [id, p] of S.pending) { const row = m().getPetInfos?.(id); if (row && ((p.kind === 'start' && row[3] === 1 && Number(row[4]) > p.end) || (p.kind === 'claim' && row[3] === 0))) { S.pending.delete(id); S.confirmed++; } else if (Date.now() - p.at >= 10000) query(id, 'pending/' + id + '/' + p.at); }

          if (!safe()) { S.reason = 'yield_user_or_disabled_daily'; return; } if (Date.now() - S.last < 1500) return;

          for (const id of ids.slice(0, 4)) {
            const row = m().getPetInfos?.(id); if (!row) { query(id, 'initial/' + id); continue; } if (S.pending.has(id)) continue;
            const [name, level, type, status, end, duration, start] = row; if (Number(status) === 0) continue;
            const now = Date.now(); const remaining = Number(end) - now; if (remaining < 10000) continue;
            if (remaining > 10000) {
              const d = new Date(end); const now = new Date(); const diff = d - now; const hours = Math.floor(diff / (1000 * 60 * 60)); const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              if (hours > 0 || minutes > 30) continue;
            }
            S.pending.set(id, { at: now, kind: 'start', end: Number(end) });
            S.starts++;
            const d = new Date(end); const now = new Date(); const diff = d - now; const hours = Math.floor(diff / (1000 * 60 * 60)); const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            console.log(`Pet Travel: Scheduling travel for ${name} (${level}) in ${hours}h ${minutes}m`);
          }
          
          // Auto pet travel enhancement
          if (W.KVPV_AUTO_PET_TRAVEL) {
            W.KVPV_AUTO_PET_TRAVEL();
          }

        } catch (e) {
          S.error = String(e?.message ?? e); W.KVPV_V1?.diagnostics?.record?.(e);
        }
      }

      function start() {
        if (S.timer) W.clearTimeout(S.timer);
        S.timer = W.setInterval(tick, 1000);
        return S;
      }

      function stop() {
        if (S.timer) {
          W.clearInterval(S.timer);
          S.timer = null;
        }
        return S;
      }

      W.KVPV_PET_TRAVEL = Object.freeze({
        version: '1.0.0',
        start,
        stop,
        status() {
          return { ...S, actorId: actor, playerLoaded: !!W._C?._Ba?.instance?.getRole?.(actor) };
        },
        _handoff() { return S; }
      });
      
      // Auto pet travel enhancement
      W.KVPV_AUTO_PET_TRAVEL = function() {
        try {
          // Auto pet travel functionality
          console.log('Auto Pet Travel: Scheduling pet travel...');
          // Add your pet travel logic here
        } catch (e) {
          console.error('Auto Pet Travel error:', e);
        }
      };
    })();
  }

// AutoWing Enhancement (if it exists or needs to be added)
function __KVPV_INSTALL_99_auto_wing_js() {
    (() => {
      'use strict';
      const W = window;
      
      // Auto wing functionality
      W.KVPV_AUTO_WING = Object.freeze({
        version: '1.0.0',
        enabled: true,
        
        start() {
          console.log('AutoWing: Activating auto wing enhancement...');
          // Add wing auto functionality here
          return { enabled: true };
        },
        
        stop() {
          console.log('AutoWing: Stopping auto wing enhancement...');
          return { enabled: false };
        },
        
        status() {
          return {
            enabled: W.KVPV_AUTO_WING?.enabled,
            version: '1.0.0'
          };
        },
        
        // Auto wing upgrade enhancement
        autoUpgrade() {
          try {
            console.log('AutoWing: Checking for wing upgrades...');
            // Add wing upgrade logic here
          } catch (e) {
            console.error('AutoWing upgrade error:', e);
          }
        }
      });
      
      // Initialize auto wing
      if (W.KVPV_AUTO_WING) {
        W.KVPV_AUTO_WING.start();
      }
    })();
  }