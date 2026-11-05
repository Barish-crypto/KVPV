
(() => {
  const __KVPV_V1_BUILD = Object.freeze({ "id": "719f8ab47b29", "release": "1.0.0", "recovery": "35-100-observed-ring", "modules": [{ "file": "00-account-policy.js", "apis": ["KVPV_ACCOUNT_POLICY"] }, { "file": "00-boss-recovery.js", "apis": ["KVPV_BOSS_RECOVERY"] }, { "file": "00-boss-session.js", "apis": ["KVPV_BOSS_LOG"] }, { "file": "00-combat-metrics.js", "apis": ["KVPV_COMBAT_METRICS"] }, { "file": "00-daily-clock.js", "apis": ["KVPV_DAILY_CLOCK"] }, { "file": "00-far-scope.js", "apis": ["KVPV_FAR_SCOPE"] }, { "file": "00-manual-entry-policy.js", "apis": ["KVPV_ENTRY_POLICY"] }, { "file": "00-preflight.js", "apis": ["KVPV_CHECK"] }, { "file": "00-skill-pacing.js", "apis": ["KVPV_SKILL_PACING"] }, { "file": "00-skill1008-trial.js", "apis": ["KVPV_SKILL1008_TRIAL"] }, { "file": "00-spending-policy.js", "apis": ["KVPV_SPENDING_POLICY"] }, { "file": "00-territory-loot.js", "apis": ["KVPV_TERRITORY_LOOT"] }, { "file": "00-thienquan-scope.js", "apis": ["KVPV_TQ_SCOPE"] }, { "file": "00-tq-basic-profile.js", "apis": ["KVPV_TQ_BASIC_PROFILE"] }, { "file": "01-identity.js", "apis": [] }, { "file": "01-parallel-actions.js", "apis": ["KVPV_PARALLEL_ACTIONS"] }, { "file": "01-quest-priority.js", "apis": ["KVPV_QUEST_PRIORITY"] }, { "file": "02-scene.js", "apis": [] }, { "file": "03-timeline.js", "apis": [] }, { "file": "04-engine.js", "apis": ["KVPV_TULA27", "KVPV_DAILY", "KVPV_TD925", "KVPV_UPGRADES", "KVPV_TIENVI_AUTO", "KVPV_CUONG_HOA", "KVPV_KHAM_DA_HON", "KVPV_DUC_HON", "KVPV_TIEN_PHU", "KVPV_V8", "KVPV_V81", "KVPV_V82", "KVPV_V83", "KVPV_V84", "KVPV_V85", "KVPV_QUEST_GUARD", "KVPV_V86", "KVPV_V863", "KVPV_V864", "KVPV_V865", "KVPV_V866", "KVPV_V868", "KVPV_V870", "KVPV_V871", "KVPV_QUEST_ATLAS", "KVPV_V873", "KVPV_V874", "KVPV_V875", "KVPV_V876", "KVPV_V877", "KVPV_V878", "KVPV_V878_STRENGTH", "KVPV_V879_STONE", "KVPV_V879_FAST", "KVPV_V880", "KVPV_V881", "KVPV_MAIN_SOLO", "KVPV_SOLO_EXP30", "KVPV_EVENTS13", "KVPV_EVENTS24", "KVPV_EVENTS25", "KVPV_TULA26", "KVPV_AUDIT28", "KVPV_UNIFIED29", "KVPV_BIENTHAN33", "KVPV_HEALTH34", "KVPV_MATHAN32", "KVPV_GEAR36", "KVPV_UNIVERSAL35", "KVPV_UNIVERSAL36", "KVPV_TIANKIEP45", "KVPV_EVENTS9", "KVPV_V9", "KVPV_BOSS921", "KVPV_BOSS92", "KVPV_V921", "KVPV_V92", "KVPV_LINHLUNG922", "KVPV_V922", "KVPV_V923", "KVPV_FOCUS922", "KVPV_ALWAYS923", "KVPV_V924_STAR", "KVPV_TOWER_MANUAL925", "KVPV_FAST926", "KVPV_TU_VUOT", "KVPV_SMELT25", "KVPV_MATHAN_READY", "KVPV_MAIL_AUTO", "KVPV_TU_VUOT_ASYNC", "KVPV_ASYNC_V35", "KVPV_BG_RESOURCES", "KVPV_BOSS_POSITION", "KVPV_V127_HEAL", "KVPV_V125_ORBIT", "KVPV_TQ112", "KVPV_TQ113", "KVPV_V126_SIGNAL", "KVPV_TQ114", "KVPV_TQ115", "KVPV_TQ117", "KVPV_TQ118", "KVPV_TQ119", "KVPV_V122_RETURN", "KVPV_V127_BASIC", "KVPV_V129_RANGE", "KVPV_V12_COMBAT", "KVPV_HITRUN1", "KVPV_HITRUN_AUTO", "KVPV_BUILD_CLEAN", "KVPV_HITRUN_FIX", "KVPV_V121_PERF", "KVPV_V123_SURVIVAL", "KVPV_V124_EFFICIENCY"] }, { "file": "06-range.js", "apis": [] }, { "file": "07-tuyet-hoc.js", "apis": [] }, { "file": "08-range-evidence.js", "apis": ["KVPV_TH300"] }, { "file": "09-modes.js", "apis": ["KVPV_MODE"] }, { "file": "10-experimental-boost.js", "apis": ["KVPV_EXPERIMENTAL_BOOST"] }, { "file": "11-auto-tianquan.js", "apis": [] }, { "file": "12-basic-outside.js", "apis": ["KVPV_BASIC10"] }, { "file": "13-transform-skills.js", "apis": ["KVPV_TRANSFORM10"] }, { "file": "14-eight-floor.js", "apis": ["KVPV_EIGHT_FLOOR"] }, { "file": "15-honor-targets.js", "apis": ["KVPV_HONOR_TARGET"] }, { "file": "16-strongest-team.js", "apis": ["KVPV_STRONGEST_TEAM"] }, { "file": "17-linh-lung-th.js", "apis": ["KVPV_LINHLUNG_TH"] }, { "file": "18-supervisors.js", "apis": ["KVPV_V11_STABLE", "KVPV_V111_COMBAT"] }, { "file": "19-account-features.js", "apis": ["KVPV_TD925", "KVPV_FAST927", "KVPV_ASYNC928", "KVPV_QUEST929", "KVPV_RUNES930", "KVPV_RUNE_INLAY931", "KVPV_STAR_REWARD932", "KVPV_ACCOUNT_FEATURES"] }, { "file": "20-daily-trial.js", "apis": ["KVPV_DAILY_TRIAL"] }, { "file": "21-quick-use.js", "apis": ["KVPV_QUICK_USE"] }, { "file": "22-confirm-popups.js", "apis": ["KVPV_CONFIRM_POPUPS"] }, { "file": "23-beast-island.js", "apis": ["KVPV_BEAST_ISLAND"] }, { "file": "24-summon-boss.js", "apis": ["KVPV_SUMMON_BOSS"] }, { "file": "25-rune-boss.js", "apis": ["KVPV_RUNE_BOSS"] }, { "file": "26-fabao-fast.js", "apis": ["KVPV_FABAO_FAST"] }, { "file": "27-craft-low.js", "apis": ["KVPV_CRAFT_LOW"] }, { "file": "28-appearance-auto.js", "apis": ["KVPV_APPEARANCE_AUTO"] }, { "file": "29-quest-goals.js", "apis": ["KVPV_QUEST_GOALS"] }, { "file": "30-tienvi-goals.js", "apis": ["KVPV_TIENVI_GOALS"] }, { "file": "31-skill-rewards.js", "apis": ["KVPV_SKILL_REWARDS"] }, { "file": "33-progress-planner.js", "apis": ["KVPV_PROGRESS_PLANNER"] }, { "file": "34-fabao-treasure.js", "apis": ["KVPV_FABAO_TREASURE", "KVPV_TREASURE_AUTO"] }, { "file": "35-equipment-treasure.js", "apis": ["KVPV_EQUIPMENT_TREASURE"] }, { "file": "36-fast-actions.js", "apis": [] }, { "file": "37-reborn-goals.js", "apis": ["KVPV_REBORN_GOALS"] }, { "file": "38-reborn-executors.js", "apis": ["KVPV_REBORN_EXECUTORS"] }, { "file": "39-executor-report.js", "apis": ["KVPV_EXECUTOR_REPORT"] }, { "file": "40-soul-stone-fast.js", "apis": ["KVPV_SOUL_STONE_FAST"] }, { "file": "41-season-rewards.js", "apis": ["KVPV_SEASON_REWARDS"] }, { "file": "42-world-eye.js", "apis": ["KVPV_WORLD_EYE"] }, { "file": "43-context-brain.js", "apis": ["KVPV_CONTEXT_BRAIN"] }, { "file": "44-red-navigator.js", "apis": ["KVPV_RED_NAVIGATOR"] }, { "file": "45-monster-plate.js", "apis": ["KVPV_MONSTER_PLATE"] }, { "file": "46-team-coordinator.js", "apis": ["KVPV_TEAM_COORDINATOR"] }, { "file": "47-boss-team.js", "apis": ["KVPV_BOSS_TEAM"] }, { "file": "48-guild-boss.js", "apis": ["KVPV_GUILD_BOSS"] }, { "file": "49-adventure.js", "apis": ["KVPV_ADVENTURE"] }, { "file": "50-companion-combat.js", "apis": ["KVPV_COMPANION_COMBAT"] }, { "file": "51-demon-king-recovery.js", "apis": ["KVPV_DEMON_KING_RECOVERY"] }, { "file": "52-item-trace.js", "apis": ["KVPV_ITEM_TRACE"] }, { "file": "55-crystal-capture.js", "apis": ["KVPV_CRYSTAL_CAPTURE"] }, { "file": "56-free-treasure.js", "apis": ["KVPV_FREE_TREASURE"] }, { "file": "57-free-daily-bag.js", "apis": ["KVPV_FREE_DAILY_BAG"] }, { "file": "58-idle-daily.js", "apis": ["KVPV_IDLE_DAILY"] }, { "file": "59-road-cadence.js", "apis": ["KVPV_ROAD_CADENCE"] }, { "file": "60-quiz-auto.js", "apis": ["KVPV_QUIZ_AUTO"] }, { "file": "61-peak-chest.js", "apis": ["KVPV_PEAK_CHEST"] }, { "file": "62-resume-stage.js", "apis": [] }, { "file": "63-peak-completion.js", "apis": ["KVPV_PEAK_COMPLETION"] }, { "file": "64-eight-chest.js", "apis": ["KVPV_EIGHT_CHEST"] }, { "file": "65-marry-arena.js", "apis": ["KVPV_MARRY_ARENA"] }, { "file": "66-pet-travel.js", "apis": ["KVPV_PET_TRAVEL"] }, { "file": "67-login-streak.js", "apis": ["KVPV_LOGIN_STREAK"] }, { "file": "68-festival-free.js", "apis": ["KVPV_FESTIVAL_FREE"] }, { "file": "69-marry-rewards.js", "apis": ["KVPV_MARRY_REWARDS"] }, { "file": "70-four-worship.js", "apis": ["KVPV_FOUR_WORSHIP"] }, { "file": "71-kiem-khieu.js", "apis": ["KVPV_KIEM_KHIEU"] }, { "file": "72-bag-open-session.js", "apis": ["KVPV_BAG_OPEN_SESSION"] }, { "file": "72-desktop-control.js", "apis": ["KVPV_DESKTOP_CONTROL"] }, { "file": "73-frame-click.js", "apis": [] }, { "file": "74-tien-ton-native-auto.js", "apis": ["KVPV_TIEN_TON_AUTO"] }, { "file": "99-manual-entry.js", "apis": ["KVPV_MANUAL_ENTRY"] }, { "file": "99-z-pb-boss-daily.js", "apis": ["KVPV_DESKTOP_CONTROL", "KVPV_SPENDING_POLICY", "KVPV_ENTRY_POLICY", "KVPV_PB_BOSS_DAILY"] }] });

  if (window.KVPV_V1) {
    const actor = String(window._Ba?._rJ?._O$?.ins?.actorId ?? '');
    if (!actor || actor !== String(window.__KVPV_OWN_ACTOR_ID ?? '') || window.__KVPV_UNIVERSAL_HALTED) {
      console.error('[KVPV V1] Reload blocked: actor changed or session halted.'); return;
    }
    __KVPV_LIVE_UPDATE(); return;
  }



  const __KVPV_V1_READY = (() => {

    'use strict';

    const W = window;

    const actor = typeof _Ba === 'undefined' ? '' : String(_Ba?._rJ?._O$?.ins?.actorId ?? '');

    if (!/^[1-9]\d{4,24}$/.test(actor) || typeof _ft === 'undefined' || typeof _Sa === 'undefined') {

      console.error('[KVPV V1] Chọn game-frame và đợi nhân vật tải xong.');

      return;

    }

    if (W.KVPV_V1 || W.KVPV_MAIN_SOLO?.installed || W.KVPV_V881?.installed ||

      W.__KVPV_UNIVERSAL_HALTED || (W.__KVPV_OWN_ACTOR_ID && W.__KVPV_OWN_ACTOR_ID !== actor)) {

      console.error('[KVPV V1] F5 game trước khi nạp lại hoặc đổi nhân vật.');

      return;

    }



    const errors = [];

    let errorCount = 0;

    const diagnostics = Object.freeze({

      record(error) {

        errorCount++;

        errors.push({ at: Date.now(), message: String(error?.message ?? error).slice(0, 1000) });

        if (errors.length > 100) errors.shift();

      },

      status() { return { total: errorCount, recent: errors.map(item => ({ ...item })) }; },

      clear() { errors.length = 0; errorCount = 0; }

    });



    const intervals = new Map(), timeouts = new Map();

    const timerAPI = Object.freeze({

      setInterval(callback, delay, ...args) {

        const handle = W.setInterval(callback, delay, ...args);

        intervals.set(handle, { delay, name: callback?.name || 'anonymous' });

        return handle;

      },

      clearInterval(handle) {

        intervals.delete(handle); timeouts.delete(handle);

        return W.clearInterval(handle);

      },

      setTimeout(callback, delay, ...args) {



        if (typeof callback !== 'function') return W.setTimeout(callback, delay, ...args);

        const handle = W.setTimeout(function (...values) {

          timeouts.delete(handle);

          return callback.apply(this, values);

        }, delay, ...args);

        timeouts.set(handle, { delay, name: callback.name || 'anonymous' });

        return handle;

      },

      clearTimeout(handle) {

        timeouts.delete(handle); intervals.delete(handle);

        return W.clearTimeout(handle);

      },

      status() {

        return {
          intervals: intervals.size, timeouts: timeouts.size,

          tasks: [...intervals.values()].map(item => ({ ...item }))
        };

      }

    });

    const build = typeof __KVPV_V1_BUILD === 'undefined' ? null : __KVPV_V1_BUILD;

    W.KVPV_V1 = Object.freeze({ version: '1.0.0', build, diagnostics, timers: timerAPI });

    return true;

  })();


  if (!__KVPV_V1_READY) return;
  window.__KVPV_CONTROL_SCHEMA = Object.freeze({ "14-eight-floor.js": "KVPV_EIGHT_FLOOR", "15-honor-targets.js": "KVPV_HONOR_TARGET", "16-strongest-team.js": "KVPV_STRONGEST_TEAM", "17-linh-lung-th.js": "KVPV_LINHLUNG_TH", "20-daily-trial.js": "KVPV_DAILY_TRIAL", "23-beast-island.js": "KVPV_BEAST_ISLAND", "50-companion-combat.js": "KVPV_COMPANION_COMBAT", "56-free-treasure.js": "KVPV_FREE_TREASURE", "57-free-daily-bag.js": "KVPV_FREE_DAILY_BAG", "59-road-cadence.js": "KVPV_ROAD_CADENCE", "60-quiz-auto.js": "KVPV_QUIZ_AUTO", "61-peak-chest.js": "KVPV_PEAK_CHEST", "64-eight-chest.js": "KVPV_EIGHT_CHEST", "65-marry-arena.js": "KVPV_MARRY_ARENA", "66-pet-travel.js": "KVPV_PET_TRAVEL", "67-login-streak.js": "KVPV_LOGIN_STREAK", "68-festival-free.js": "KVPV_FESTIVAL_FREE", "69-marry-rewards.js": "KVPV_MARRY_REWARDS", "70-four-worship.js": "KVPV_FOUR_WORSHIP", "71-kiem-khieu.js": "KVPV_KIEM_KHIEU" }); window.__KVPV_CONTROL_INSTALLERS = Object.freeze({ "14-eight-floor.js": __KVPV_INSTALL_14_eight_floor_js, "15-honor-targets.js": __KVPV_INSTALL_15_honor_targets_js, "16-strongest-team.js": __KVPV_INSTALL_16_strongest_team_js, "17-linh-lung-th.js": __KVPV_INSTALL_17_linh_lung_th_js, "20-daily-trial.js": __KVPV_INSTALL_20_daily_trial_js, "23-beast-island.js": __KVPV_INSTALL_23_beast_island_js, "50-companion-combat.js": __KVPV_INSTALL_50_companion_combat_js, "56-free-treasure.js": __KVPV_INSTALL_56_free_treasure_js, "57-free-daily-bag.js": __KVPV_INSTALL_57_free_daily_bag_js, "59-road-cadence.js": __KVPV_INSTALL_59_road_cadence_js, "60-quiz-auto.js": __KVPV_INSTALL_60_quiz_auto_js, "61-peak-chest.js": __KVPV_INSTALL_61_peak_chest_js, "64-eight-chest.js": __KVPV_INSTALL_64_eight_chest_js, "65-marry-arena.js": __KVPV_INSTALL_65_marry_arena_js, "66-pet-travel.js": __KVPV_INSTALL_66_pet_travel_js, "67-login-streak.js": __KVPV_INSTALL_67_login_streak_js, "68-festival-free.js": __KVPV_INSTALL_68_festival_free_js, "69-marry-rewards.js": __KVPV_INSTALL_69_marry_rewards_js, "70-four-worship.js": __KVPV_INSTALL_70_four_worship_js, "71-kiem-khieu.js": __KVPV_INSTALL_71_kiem_khieu_js });
  // Auto Weapon Enhancement with Control Panel
function __KVPV_INSTALL_35_equipment_treasure_js() {

    (() => {
      'use strict';

      const W = window; W.KVPV_EQUIPMENT_TREASURE?.stop?.();

      const actor = String(W.__KVPV_OWN_ACTOR_ID || ''), S = { enabled: false, timer: null, lastError: '' }, rewardCache = new Map();

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
          
          // Auto weapon upgrade enhancement - Controlled by global toggle
          if (W.KVPV_AUTO_MODE?.WEAPON && W.KVPV_AUTO_WEAPON_UPGRADE) {
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
        S.enabled = false; // Disabled by default
        S.last = 0;
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

// Auto Linh Thú Enhancement with Control Panel
function __KVPV_INSTALL_17_linh_lung_th_js() {

    (() => {
      const W = window; let enabled = false; // Disabled by default

      W.KVPV_LINHLUNG_TH = Object.freeze({
        get enabled() { return enabled; },

        start(options = {}) {
          // Controlled by global toggle
          if (W.KVPV_AUTO_MODE?.LINH_THU) {
            const tower = W.KVPV_LINHLUNG922;
            if (!tower?.start) throw Error('Thiếu bộ vượt Linh Lung Tháp');
            enabled = true; W.KVPV_MODE.armTianQuan(); return tower.start(options);
          } else {
            console.log('Auto Linh Thú: Disabled by control panel');
            return { enabled: false };
          }
        },

        stop() { 
          enabled = false; 
          console.log('Auto Linh Thú: Stopped');
          return { enabled: false }; 
        },

        status() {
          return {
            enabled: W.KVPV_AUTO_MODE?.LINH_THU || false, // Controlled by global toggle
            scope: W.KVPV_FAR_SCOPE?.status?.(), 
            tower: W.KVPV_LINHLUNG922?.status?.(false),
            combat: W.KVPV_TH300?.status?.(false), 
            recovery: { enabled: true, leavePct: 35, returnPct: 100, finishBossHpPct: 2 }
          };
        },
        
        // Auto pet enhancement - Controlled by global toggle
        autoPet() {
          if (W.KVPV_AUTO_MODE?.LINH_THU) {
            try {
              // Auto pet functionality
              console.log('Auto Linh Thú: Activating pet management...');
              // Add your pet management logic here
            } catch (e) {
              console.error('Auto Linh Thú error:', e);
            }
          }
        }
      });
      
      // Auto pet initialization - Controlled by global toggle
      if (W.KVPV_LINHLUNG_TH && W.KVPV_AUTO_MODE?.LINH_THU) {
        W.KVPV_LINHLUNG_TH.autoPet();
      }
    })();
  }

// Companion Combat Enhancement with Control Panel
function __KVPV_INSTALL_50_companion_combat_js() {

    (() => {
      'use strict';

      const W = window, old = W.KVPV_COMPANION_COMBAT, carry = old?._handoff?.();
      try { old?.stop?.(); } catch (e) { W.KVPV_V1?.diagnostics?.record?.(e); }

      const actor = String(W.__KVPV_OWN_ACTOR_ID ?? ''), allowed = new Set(['THIEN_QUAN', 'LINH_LUNG', 'PHU_VAN', 'TRU_TIEN']), scanMs = 50;

      const S = {
        enabled: false, // Disabled by default
        timer: null, role: null, ride: null, mansion: null, mansionAttempts: 0, dispatching: false, reason: 'starting', lastError: '',
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
          
          // Auto pet enhancement - Controlled by global toggle
          if (W.KVPV_AUTO_MODE?.COMPANION && W.KVPV_AUTO_COMPANION) {
            W.KVPV_AUTO_COMPANION();
          }
          
        } catch (e) {
          W.KVPV_V1?.diagnostics?.record?.(e);
          S.lastError = String(e?.message ?? e);
        }
      }

      function start() {
        S.enabled = false; // Disabled by default
        S.reason = 'starting';
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

// Pet Travel Enhancement with Control Panel
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
            const remaining = Number(end) - Date.now(); if (remaining < 10000) continue;
            if (remaining > 10000) {
              const d = new Date(end); 
              const diff = d - Date.now(); 
              const hours = Math.floor(diff / (1000 * 60 * 60)); 
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              if (hours > 0 || minutes > 30) continue;
            }
            S.pending.set(id, { at: Date.now(), kind: 'start', end: Number(end) });
            S.starts++;
            const d = new Date(end); 
            const diff = d - Date.now(); 
            const hours = Math.floor(diff / (1000 * 60 * 60)); 
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            console.log(`Pet Travel: Scheduling travel for ${name} (${level}) in ${hours}h ${minutes}m`);
          }
          
          // Auto pet travel enhancement - Controlled by global toggle
          if (W.KVPV_AUTO_MODE?.PET && W.KVPV_AUTO_PET_TRAVEL) {
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

// AutoWing Enhancement with Control Panel
function __KVPV_INSTALL_99_auto_wing_js() {
    (() => {
      'use strict';
      const W = window;
      
      // Auto wing functionality with control panel
      W.KVPV_AUTO_WING = Object.freeze({
        version: '1.0.0',
        enabled: false, // Disabled by default
        
        start() {
          if (W.KVPV_AUTO_MODE?.WING) {
            console.log('AutoWing: Activating auto wing enhancement...');
            return { enabled: true };
          } else {
            console.log('AutoWing: Disabled by control panel');
            return { enabled: false };
          }
        },
        
        stop() {
          console.log('AutoWing: Stopping auto wing enhancement...');
          return { enabled: false };
        },
        
        status() {
          return {
            enabled: W.KVPV_AUTO_MODE?.WING || false, // Controlled by global toggle
            version: '1.0.0'
          };
        },
        
        // Auto wing upgrade enhancement - Controlled by global toggle
        autoUpgrade() {
          if (W.KVPV_AUTO_MODE?.WING) {
            try {
              console.log('AutoWing: Checking for wing upgrades...');
              // Add wing upgrade logic here
            } catch (e) {
              console.error('AutoWing upgrade error:', e);
            }
          }
        }
      });
      
      // Initialize auto wing - Controlled by global toggle
      if (W.KVPV_AUTO_WING && W.KVPV_AUTO_MODE?.WING) {
        W.KVPV_AUTO_WING.start();
      }
    })();
  }

// Control Panel for All Auto Functions
(function() {
  'use strict';
  
  // Global auto mode control
  W.KVPV_AUTO_MODE = {
    WEAPON: false,
    PET: false,
    WING: false,
    LINH_THU: false,
    COMPANION: false,
    ALL: false
  };
  
  // Create control panel UI
  function createControlPanel() {
    try {
      // Check if panel already exists
      if (document.getElementById('kvpv-control-panel')) return;
      
      const panel = document.createElement('div');
      panel.id = 'kvpv-control-panel';
      panel.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        max-width: 300px;
        border: 1px solid #444;
      `;
      
      panel.innerHTML = `
        <h3 style="margin-top: 0; margin-bottom: 10px; color: #4CAF50;">KVPV Auto Control</h3>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <input type="checkbox" id="auto-all" style="margin-right: 8px;">
          <label for="auto-all" style="font-size: 14px;">Tất cả</label>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <input type="checkbox" id="auto-weapon" style="margin-right: 8px;">
          <label for="auto-weapon" style="font-size: 14px;">Auto Weapon</label>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <input type="checkbox" id="auto-pet" style="margin-right: 8px;">
          <label for="auto-pet" style="font-size: 14px;">Auto Pet</label>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <input type="checkbox" id="auto-wing" style="margin-right: 8px;">
          <label for="auto-wing" style="font-size: 14px;">Auto Wing</label>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <input type="checkbox" id="auto-linhtu" style="margin-right: 8px;">
          <label for="auto-linhtu" style="font-size: 14px;">Auto Linh Thú</label>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <input type="checkbox" id="auto-companion" style="margin-right: 8px;">
          <label for="auto-companion" style="font-size: 14px;">Auto Companion</label>
        </div>
        <button id="auto-save" style="margin-top: 10px; padding: 5px 10px; background: #4CAF50; border: none; border-radius: 4px; color: white; cursor: pointer; width: 100%;">Lưu Cài Đặt</button>
      `;
      
      document.body.appendChild(panel);
      
      // Add event listeners
      document.getElementById('auto-all').addEventListener('change', function() {
        const allCheckboxes = document.querySelectorAll('#kvpv-control-panel input[type="checkbox"]:not(#auto-all)');
        allCheckboxes.forEach(checkbox => {
          checkbox.checked = this.checked;
        });
        updateAutoMode();
      });
      
      document.querySelectorAll('#kvpv-control-panel input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.id !== 'auto-all') {
          checkbox.addEventListener('change', updateAutoMode);
        }
      });
      
      document.getElementById('auto-save').addEventListener('click', function() {
        updateAutoMode();
        alert('Cài đặt đã được lưu!');
      });
      
      // Initialize with current settings
      updateAutoMode();
      
    } catch (e) {
      console.error('Error creating control panel:', e);
    }
  }
  
  // Update auto mode based on UI
  function updateAutoMode() {
    try {
      W.KVPV_AUTO_MODE.WEAPON = document.getElementById('auto-weapon').checked;
      W.KVPV_AUTO_MODE.PET = document.getElementById('auto-pet').checked;
      W.KVPV_AUTO_MODE.WING = document.getElementById('auto-wing').checked;
      W.KVPV_AUTO_MODE.LINH_THU = document.getElementById('auto-linhtu').checked;
      W.KVPV_AUTO_MODE.COMPANION = document.getElementById('auto-companion').checked;
      W.KVPV_AUTO_MODE.ALL = document.getElementById('auto-all').checked;
      
      // Update all checkboxes if "All" is selected
      if (W.KVPV_AUTO_MODE.ALL) {
        const checkboxes = document.querySelectorAll('#kvpv-control-panel input[type="checkbox"]:not(#auto-all)');
        checkboxes.forEach(checkbox => {
          checkbox.checked = true;
        });
      }
      
      console.log('Auto Mode Updated:', W.KVPV_AUTO_MODE);
      
      // Reload modules if needed
      if (W.KVPV_EQUIPMENT_TREASURE && W.KVPV_EQUIPMENT_TREASURE.start) {
        W.KVPV_EQUIPMENT_TREASURE.start();
      }
      
    } catch (e) {
      console.error('Error updating auto mode:', e);
    }
  }
  
  // Initialize control panel when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createControlPanel);
  } else {
    createControlPanel();
  }
  
})();function __KVPV_INSTALL_99_z_pb_boss_daily_js() {


    (() => {
      'use strict'; const W = window, actor = String(W.__KVPV_OWN_ACTOR_ID ?? '');
      if (!actor || actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') || W.__KVPV_UNIVERSAL_HALTED) throw Error('Nạp trong game-frame của acc đã đăng nhập.');
      if (!W.KVPV_DAILY?.config) throw Error('Thiếu bộ FULL. Dùng file KVPV_PB_BOSS_DAILY.js.');
      const previous = W.KVPV_PB_BOSS_DAILY, carry = previous?._handoff?.();
      const S = { enabled: false, actor, startedAt: null, errors: [], started: [] };
      const starters = [['KVPV_DAILY', 'start'], ['KVPV_DAILY', 'tuVuotStart'], ['KVPV_DAILY_TRIAL', 'start'], ['KVPV_BEAST_ISLAND', 'start'], ['KVPV_SUMMON_BOSS', 'start'], ['KVPV_RUNE_BOSS', 'start'], ['KVPV_BASIC10', 'start']];
      const own = () => actor === String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') && !W.__KVPV_UNIVERSAL_HALTED;
      function start() {
        if (!own()) throw Error('Acc đã đổi: mở tab và nạp lại cho acc mới.'); if (S.enabled) return status(); S.errors = []; S.started = [];

        W.KVPV_QUEST_PRIORITY?.stop?.(); W.KVPV_V866?.stop?.();
        for (const name of ['KVPV_EIGHT_FLOOR', 'KVPV_HONOR_TARGET', 'KVPV_MARRY_ARENA', 'KVPV_KIEM_KHIEU']) try { W[name]?.stop?.(); } catch (e) { S.errors.push(name + ': ' + String(e?.message ?? e)); }
        W.KVPV_DESKTOP_CONTROL?.stop?.();
        W.KVPV_DESKTOP_CONTROL = Object.freeze({ receive: () => false, stop() { }, scopeProfile: () => null, distance: () => 302, stageAllowed: () => true, status: () => ({ reason: 'javascript_daily_only', lastError: '', modules: {} }), _handoff: () => ({ actor, desired: null, failedRevision: null }) });
        const c = W.KVPV_DAILY.config;
        Object.assign(c, {
          enableTienDuyen: true, enableTinhThan: true, enableYeuVuong: true, enableHongHoang: true, enableEventSchedule: true, enableTuVuot: true,
          enableVinhDu: false, enableDinhCao: false, enableTuLa: false, enableDaoTri: false, enableCompose: false, enableTienTonTrace: false, tienTonTraceConsole: false, eventConsoleNotices: false
        });

        W.KVPV_SPENDING_POLICY = Object.freeze({ allowKNB: false, dailyInspireKNBMaps: Object.freeze([]), canDailyInspireKNB: () => false, reason: 'PB/Boss daily: không tự tiêu KNB.' });
        W.KVPV_ENTRY_POLICY = Object.freeze({ manual: false, idleDaily: false });
        W.KVPV_TH300?.setBasicOnly?.(false); W.KVPV_TH300?.setBasicHitQuota?.(null); W.KVPV_TH300?.setDistance?.(302); W.KVPV_MODE?.armTianQuan?.();
        for (const [name, method] of starters) try { if (typeof W[name]?.[method] === 'function') { W[name][method](); S.started.push(name + '.' + method); } } catch (e) { S.errors.push(name + ': ' + String(e?.message ?? e)); }
        S.enabled = true; S.startedAt = Date.now(); console.info('[PB + BOSS MỖI NGÀY]', status()); return status();
      }
      function stop() { S.enabled = false; if (!own()) return status(); for (const name of new Set(starters.map(row => row[0]))) try { W[name]?.stop?.(); } catch (e) { S.errors.push(name + ': ' + String(e?.message ?? e)); } return status(); }
      function status() { return { enabled: S.enabled, actor, day: W.KVPV_DAILY_CLOCK?.key?.() ?? null, resetHourVN: 5, allowKNB: false, startedAt: S.startedAt, started: S.started.slice(), errors: S.errors.slice(), daily: W.KVPV_DAILY?.quickState?.(), trial: W.KVPV_DAILY_TRIAL?.status?.()?.reason, scope: 'Các PB/boss đã hỗ trợ và đã mở; tổ đội theo điều kiện game. Giữ tab đăng nhập và máy hoạt động.' }; }
      W.KVPV_PB_BOSS_DAILY = Object.freeze({ start, stop, status, _handoff: () => ({ actor, enabled: S.enabled }) });
      if (carry?.actor !== actor || carry.enabled !== false) start();
    })();

  }
  function __KVPV_LIVE_UPDATE() {

    const W = window;
    if (!W.KVPV_MODE || !W.KVPV_HITRUN_AUTO || !W.KVPV_RANGE281) throw Error("Load V1 first");
    if (W._Ba?._rJ?._O$?.ins?.isDead === true) throw Error("Hồi sinh nhân vật trước khi chạy bản vá");
    if (String(W.__KVPV_OWN_ACTOR_ID) !== String(W._Ba?._rJ?._O$?.ins?.actorId) || W.__KVPV_UNIVERSAL_HALTED) throw Error("Actor/session mismatch");
    W.KVPV_BEAST_ISLAND?.stop?.(); W.KVPV_STRONGEST_TEAM?.stop?.(); W.KVPV_HONOR_TARGET?.stop?.(); W.KVPV_EIGHT_FLOOR?.stop?.(); W.KVPV_BASIC10?.stop?.(); W.KVPV_STAND281?.stop?.(); W.KVPV_MODE.stop("Install live SCAN update");
    window.__KVPV_CONTROL_SCHEMA = Object.freeze({ "14-eight-floor.js": "KVPV_EIGHT_FLOOR", "15-honor-targets.js": "KVPV_HONOR_TARGET", "16-strongest-team.js": "KVPV_STRONGEST_TEAM", "17-linh-lung-th.js": "KVPV_LINHLUNG_TH", "20-daily-trial.js": "KVPV_DAILY_TRIAL", "23-beast-island.js": "KVPV_BEAST_ISLAND", "50-companion-combat.js": "KVPV_COMPANION_COMBAT", "56-free-treasure.js": "KVPV_FREE_TREASURE", "57-free-daily-bag.js": "KVPV_FREE_DAILY_BAG", "59-road-cadence.js": "KVPV_ROAD_CADENCE", "60-quiz-auto.js": "KVPV_QUIZ_AUTO", "61-peak-chest.js": "KVPV_PEAK_CHEST", "64-eight-chest.js": "KVPV_EIGHT_CHEST", "65-marry-arena.js": "KVPV_MARRY_ARENA", "66-pet-travel.js": "KVPV_PET_TRAVEL", "67-login-streak.js": "KVPV_LOGIN_STREAK", "68-festival-free.js": "KVPV_FESTIVAL_FREE", "69-marry-rewards.js": "KVPV_MARRY_REWARDS", "70-four-worship.js": "KVPV_FOUR_WORSHIP", "71-kiem-khieu.js": "KVPV_KIEM_KHIEU" }); window.__KVPV_CONTROL_INSTALLERS = Object.freeze({ "14-eight-floor.js": __KVPV_INSTALL_14_eight_floor_js, "15-honor-targets.js": __KVPV_INSTALL_15_honor_targets_js, "16-strongest-team.js": __KVPV_INSTALL_16_strongest_team_js, "17-linh-lung-th.js": __KVPV_INSTALL_17_linh_lung_th_js, "20-daily-trial.js": __KVPV_INSTALL_20_daily_trial_js, "23-beast-island.js": __KVPV_INSTALL_23_beast_island_js, "50-companion-combat.js": __KVPV_INSTALL_50_companion_combat_js, "56-free-treasure.js": __KVPV_INSTALL_56_free_treasure_js, "57-free-daily-bag.js": __KVPV_INSTALL_57_free_daily_bag_js, "59-road-cadence.js": __KVPV_INSTALL_59_road_cadence_js, "60-quiz-auto.js": __KVPV_INSTALL_60_quiz_auto_js, "61-peak-chest.js": __KVPV_INSTALL_61_peak_chest_js, "64-eight-chest.js": __KVPV_INSTALL_64_eight_chest_js, "65-marry-arena.js": __KVPV_INSTALL_65_marry_arena_js, "66-pet-travel.js": __KVPV_INSTALL_66_pet_travel_js, "67-login-streak.js": __KVPV_INSTALL_67_login_streak_js, "68-festival-free.js": __KVPV_INSTALL_68_festival_free_js, "69-marry-rewards.js": __KVPV_INSTALL_69_marry_rewards_js, "70-four-worship.js": __KVPV_INSTALL_70_four_worship_js, "71-kiem-khieu.js": __KVPV_INSTALL_71_kiem_khieu_js });
    __KVPV_INSTALL_00_daily_clock_js();
    __KVPV_INSTALL_00_manual_entry_policy_js();
    __KVPV_INSTALL_00_spending_policy_js();
    __KVPV_INSTALL_00_account_policy_js();
    __KVPV_INSTALL_00_far_scope_js();
    __KVPV_INSTALL_00_thienquan_scope_js();
    __KVPV_INSTALL_00_combat_metrics_js();
    __KVPV_INSTALL_00_skill1008_trial_js();
    __KVPV_INSTALL_00_skill_pacing_js();
    __KVPV_INSTALL_00_territory_loot_js();
    __KVPV_INSTALL_00_tq_basic_profile_js();
    __KVPV_INSTALL_01_parallel_actions_js();
    __KVPV_INSTALL_01_quest_priority_js();
    __KVPV_INSTALL_02_scene_js();
    __KVPV_INSTALL_06_range_js();
    __KVPV_INSTALL_08_range_evidence_js();
    __KVPV_INSTALL_09_modes_js();
    __KVPV_INSTALL_10_experimental_boost_js();
    __KVPV_INSTALL_11_auto_tianquan_js();
    __KVPV_INSTALL_12_basic_outside_js();
    __KVPV_INSTALL_13_transform_skills_js();
    __KVPV_INSTALL_14_eight_floor_js();
    __KVPV_INSTALL_15_honor_targets_js();
    __KVPV_INSTALL_16_strongest_team_js();
    __KVPV_INSTALL_17_linh_lung_th_js();
    __KVPV_INSTALL_18_supervisors_js();
    __KVPV_INSTALL_19_account_features_js();
    __KVPV_INSTALL_20_daily_trial_js();
    __KVPV_INSTALL_21_quick_use_js();
    __KVPV_INSTALL_22_confirm_popups_js();
    __KVPV_INSTALL_23_beast_island_js();
    __KVPV_INSTALL_24_summon_boss_js();
    __KVPV_INSTALL_25_rune_boss_js();
    __KVPV_INSTALL_26_fabao_fast_js();
    __KVPV_INSTALL_27_craft_low_js();
    __KVPV_INSTALL_28_appearance_auto_js();
    __KVPV_INSTALL_29_quest_goals_js();
    __KVPV_INSTALL_30_tienvi_goals_js();
    __KVPV_INSTALL_31_skill_rewards_js();
    __KVPV_INSTALL_33_progress_planner_js();
    __KVPV_INSTALL_34_fabao_treasure_js();
    __KVPV_INSTALL_35_equipment_treasure_js();
    __KVPV_INSTALL_36_fast_actions_js();
    __KVPV_INSTALL_37_reborn_goals_js();
    __KVPV_INSTALL_38_reborn_executors_js();
    __KVPV_INSTALL_39_executor_report_js();
    __KVPV_INSTALL_40_soul_stone_fast_js();
    __KVPV_INSTALL_41_season_rewards_js();
    __KVPV_INSTALL_42_world_eye_js();
    __KVPV_INSTALL_43_context_brain_js();
    __KVPV_INSTALL_44_red_navigator_js();
    __KVPV_INSTALL_72_bag_open_session_js();
    __KVPV_INSTALL_45_monster_plate_js();
    __KVPV_INSTALL_46_team_coordinator_js();
    __KVPV_INSTALL_47_boss_team_js();
    __KVPV_INSTALL_48_guild_boss_js();
    __KVPV_INSTALL_49_adventure_js();
    __KVPV_INSTALL_50_companion_combat_js();
    __KVPV_INSTALL_51_demon_king_recovery_js();
    __KVPV_INSTALL_52_item_trace_js();
    __KVPV_INSTALL_55_crystal_capture_js();
    __KVPV_INSTALL_56_free_treasure_js();
    __KVPV_INSTALL_57_free_daily_bag_js();
    __KVPV_INSTALL_58_idle_daily_js();
    __KVPV_INSTALL_59_road_cadence_js();
    __KVPV_INSTALL_60_quiz_auto_js();
    __KVPV_INSTALL_61_peak_chest_js();
    __KVPV_INSTALL_62_resume_stage_js();
    __KVPV_INSTALL_63_peak_completion_js();
    __KVPV_INSTALL_64_eight_chest_js();
    __KVPV_INSTALL_65_marry_arena_js();
    __KVPV_INSTALL_66_pet_travel_js();
    __KVPV_INSTALL_67_login_streak_js();
    __KVPV_INSTALL_68_festival_free_js();
    __KVPV_INSTALL_69_marry_rewards_js();
    __KVPV_INSTALL_70_four_worship_js();
    __KVPV_INSTALL_71_kiem_khieu_js();
    __KVPV_INSTALL_72_desktop_control_js();
    __KVPV_INSTALL_73_frame_click_js();
    __KVPV_INSTALL_74_tien_ton_native_auto_js();
    __KVPV_INSTALL_99_manual_entry_js();
    __KVPV_INSTALL_99_z_pb_boss_daily_js();
  }
})();
