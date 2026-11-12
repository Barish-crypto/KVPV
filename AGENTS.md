# KVPV V1 - GitHub Extension

## Project Overview

This repository contains the source code for the KVPV V1 automation tool, designed for the game "KVPV". The tool provides automation for various aspects of gameplay including combat, boss fights, daily activities, and more.

## Repository Structure

```
KVPV_TU_DONG_GITHUB_EXTENSION/
├── src/                  # Legacy source snapshot; not used by builds
├── esm/                  # Canonical ESM modules and runtime entry
├── edge-addon/           # Edge browser extension
├── git-sync/             # GitHub auto-sync tools
├── KVPV_V1_FULL.js       # Generated, consolidated runtime bundle
├── build.cjs             # Build script
├── package.json          # Project metadata and scripts
├── README.md             # Project documentation
└── AGENTS.md             # This file - Project Map
```

## Key Scripts

- `npm run build` - Run the build script to generate FULL, patches, and MANIFEST.json

## Development Workflow

1. Edit canonical source files in `esm/modules/*.mjs`; update `esm/index.mjs` and `esm/manifest.json` when adding, removing, or reordering modules.
2. `npm run build` bundles the ESM entry into FULL, extension, patch, and manifest artifacts.
3. Keep `src/` as a legacy snapshot only; never use it as the source for new changes or builds.

## Red-Dot Automation: Current Refactor Direction

- The dedicated red-dot source of truth is `esm/modules/01-red-dot-module.mjs`. It owns red-dot catalog mappings, active-ID detection, direct red-dot handlers, pending/ACK state, and the red-dot priority gate. `esm/modules/44-red-navigator.mjs` owns UI navigation and parent/child routes. `esm/modules/01-parallel-actions.mjs` is not the place to add new red-dot feature handlers.
- For each feature the user points out, trace the UI hierarchy and exact red-dot ID in the checked-in devtool source before coding. Verify the model, config lookup, item/material requirements, level gates, native RPC signature, and server acknowledgement path; do not infer an ID from a nearby feature.
- Move the requested handler into `esm/modules/01-red-dot-module.mjs`, register it against its verified red-dot ID, and ensure it only runs while that ID is active. Keep per-feature pending, timeout/no-retry, cooldown, safe-scene, user-UI, and popup guards consistent with existing direct handlers.
- After moving a handler, remove or disable only that feature's old registration/handler in its former module so it cannot run twice. Keep unrelated functions in the former module intact. The user may request broader cleanup of old modules later; do not delete whole modules during an individual migration.
- Preserve the verified native RPC and its argument format, server acknowledgement behavior, context gates, rate limits, and material protections. Do not mark an item automatic unless an actual handler exists. Update the red-dot status/catalog route to name the central handler.
- Confirmed Soul/Phụ Hồn red-dot mappings: `27` Thần Binh, `33` Linh Dực, `148` Thời Trang, `155` Linh Tí, and `646` Phi Phong. Keep `646` mapped to Phi Phong; it is not Thần Binh. These are separate from automatic level-up.
- Other confirmed migrated actions: `20` Tiên Thể, `167` Tiên Đơn, and `63` Rã Phù Văn. Keep their model and RPC mappings documented in the red-dot module when changing them.
- User-authorized Ma Thần actions: `657` Huyết Mạch uses `_Ba._u3._ern.ins.SpiritEquipBloodLineage()` only with a valid next level and at least one required item; `656` Phệ Hồn waits for server-synced Hồn Lực and an eligible native red-dot state before `_Ba._u3._ern.ins.SpiritEquipOneKeySoulEatingUP()`. Wait for server state acknowledgement and do not invent a separate claim RPC (none is present in the inspected client network methods).
- User-authorized Linh Thú actions: prioritize red dot `3` Chúc Phúc, and when no automatic red-dot handler is pending also start it if the native one-click material cost is available. Keep `_bolZD=true` across server acknowledgements so native `rankPet()` sends `[1]` and continues while at least one native click cost remains, even after the red dot clears. Restore the prior flag when one-click materials are exhausted, the action times out/errors, or the module stops. Red dot `4` Ảo Hóa sets `_Ba._ogt._egt.inst._mgcSelId` then calls `riseMgcShow([id])` on an already opened item; `5` Tu Luyện uses `riseRefet([type,0])`; `102–104` Pháp Trận use `mgcLv(id)` only on already activated formations. Check materials, level/SVIP gates where applicable, and wait for server state acknowledgement. Leave Bồi Dưỡng red dots `0/1` and legacy illusion ID `10` disabled.
- User-authorized Pháp Thuật → Tuyệt Học quick-up: red dot `19`, native `_Ba._Jtt._unt.ins.addSkillLevelOfAll()` (`TdKP`). Require an active red dot, character level gate, a skill below `maxlv`, and enough `90530001` currency for the native configured skill cost; wait for server skill-state acknowledgement before another request.
- User-authorized Pháp Bảo quick-up: red dot `14`; native `TXio [0]`, only when the game reports an eligible Pháp Bảo that is already activated, below max level, and has enough configured fragments. Wait for server state acknowledgement before another request.
- SVIP free rewards use red dot `325` in the central module: claim one eligible tier reward at a time, then the daily reward through native `getSvipAward(level)` / `getSvipDayAward()`; never purchase or top up. Keep it in the red-dot dispatcher and wait for server state acknowledgement.
- Daily free Treasure uses red dots `260` Trang Bị/type `0`, `261` Pháp Bảo/type `4`, `262` Phù Văn/type `3`, `263` Đỉnh Cao/type `1`, `264` Tinh Thạch/type `2`, `265` Tiên Duyên/type `9`, `266` Thánh Tôn/type `10`, `267` Quái Bàn/type `11`, and `680` Thánh Trang/type `15`. In `esm/modules/01-red-dot-module.mjs`, only call native `c_sendXunBao(0, true, false, type, false)` when that exact red dot is active, the feature is open, and `isFirst(type) === true`; wait for `xbRep` and `isFirst` server acknowledgement. Never consume keys, currency, or 100-draw rewards. `esm/modules/56-free-treasure.mjs` is a compatibility stub and must not send requests.
- User-authorized Biến Thân automation is mapped to `234` level-up, `230`-`233` Ảo Hóa, and `235` skill upgrade/activation. User-authorized Lôi Đình level-up is red dot `238`, using `ThunderEquipUpgrade(id, pos)` only after the native material and prerequisite checks; `239` Lôi Đình rank-up remains disabled. Keep these handlers in `esm/modules/01-red-dot-module.mjs`, verify material/condition gates, and wait for server state to change.
- User-authorized Thú Cưỡi/Ngự Thú actions prioritize red dot `12` Tiến Cấp/Chúc Phúc, and when no automatic red-dot handler is pending also start it if the native one-click material cost is available. Keep `bollZiDong=true` across server acknowledgements so native `rankRide()` sends `[1]` and continues while at least one native click cost remains, even after the red dot clears. Restore the prior flag when one-click materials are exhausted, the action times out/errors, or the module stops. Red dot `8` Ảo Hóa tăng bậc uses native `magicLev(id)`, red dot `13` Tu Luyện uses `riseRideRefine([type, 0])`, and red dots `105`-`107` Pháp Trận levels use native `magicLev(id)`. Use only eligible owned entries with available configured materials and required SVIP; wait for model ACK and do not activate, renew, or purchase. Keep red dot `7` Bồi Dưỡng unchanged and disabled. Disable only the legacy `mount_illusion` V8 registration so the central handlers do not run in parallel.
- Keep the extension runtime behavior in scope. The user said `windows-app` is not needed for this work; do not modify it.
- Preserve the user's upgrade policy: automatic *level-up* is off unless explicitly requested. Keep automatic level-up/breeding disabled for Divine Weapon, Fashion, Ling Ti, and Wings. For Mount/Ngự Thú and Spirit Beast/Linh Thú, only the explicitly authorized red-dot actions listed above are enabled; keep Bồi Dưỡng unchanged and disabled. The user explicitly authorized Biến Thân level-up, Ảo Hóa, skill upgrade/activation, and Lôi Đình level-up through the red-dot handler; Lôi Đình rank-up remains off.
- When `01-quest-priority.mjs` temporarily pauses side work for a verified level-up quest, leave the user's `enableVinhDu` and `enableDaoTri` settings intact so their existing time-window scheduler can preempt quest farming; continue pausing untimed side work and restore saved settings normally. For overlapping eligible events, choose the earliest closing deadline; never overwrite an active event job before its existing ACK/completion path finishes. Manual-only event reservations must remain reminders (never auto-enter) and use the same earliest-closing order.
- For the current red-dot and runtime-diagnostics work, do not run builds, tests, live mode, or open the game/browser until the user explicitly lifts this restriction.

## Runtime Diagnostics and Recovery

- `esm/modules/32-combat-stall.mjs` provides a read-only combat snapshot; `esm/modules/39-executor-report.mjs` includes it in local runtime diagnostics.
- `combatStall.progress` compares repeated target-HP samples. An unchanged target can only be reported as a low-confidence possible stall after at least four samples and 60 seconds; this is not proof of a freeze.
- Diagnostics may report evidence and a suggested next check, but must not issue game commands, trigger recovery, or modify source automatically. Keep any existing recovery allowlisted and explicit.
- Preserve diagnostic privacy and bounds: use the existing actor-scoped report and bounded local diagnostics writer; do not add arbitrary paths, commands, or unbounded history.
- Combat skill observation across maps may record the actor's native `1039` cast signal, map, and bounded skill history. It must not replace or reorder native skill selection, modify cooldowns, or become a competing sender; PvP and map-specific controllers retain ownership.
- In the checked-in client, `selectSkill()` advances the chosen skill row's next-ready timestamp. Before calling it, combat code must read-only preview the native selector result and skip the call if that result is disallowed or near its cooldown boundary. Report that candidate separately from `lastNativeSelectedSkill`, which is reserved for an actual selector call. Call it at most once per attempted attack, only after target/range/cooldown and priority checks, then immediately pass that exact result to native `combat()` without an intervening async boundary.

## Combat Controllers and Ownership

- Keep combat changes in the canonical modules: `09-combat-engine.mjs` owns unified boss combat, `12-basic-outside.mjs` owns outside-map/Road basic combat, `50-companion-combat.mjs` owns companion attacks, `75-pvp-luofeng.mjs` owns Lạc Phong observation/optional dodge, and `84-basic310-universal.mjs` owns the 310-distance and Crystal-map basic controller. Trace startup order and call sites before moving behavior between them.
- Use `KVPV.core.scene.combat.claim()` as the shared dispatch arbiter. Respect its player/companion lanes and priority/settle result; a controller that does not own its lane must not select or cast. Keep target acquisition, movement, and combat-send ownership with their existing controllers; avoid duplicate senders and overlapping hooks.
- The checked-in native selector's `selectSkill()` delegates to `_f7t()`. `_f7t()` can advance a ready row's next-ready timestamp and mutate the selector cursor, so neither method is a read-only preview. Preview by reading the selector state without invoking either; continue scanning past cooling rows so a later ready row is not delayed, then validate the exact candidate against policy and cooldown-boundary rules.
- For companion attacks, preview the selected companion's own native selector state, then set the intended target and pass native target/range/cooldown and ownership checks before calling `selectSkill()` once. If the returned skill differs from the preview, do not cast it. Otherwise pass that exact result immediately to the same companion's native `combat()` in the same synchronous attempt; do not insert an async boundary or invent cooldowns/RPCs.
- Keep Basic310's general-map standoff policy and Crystal-map basic-only policy distinct. Crystal map `2992` / scene type `35` may use only verified native basics `8001–8005`, at native cooldown and range; do not broaden its skill allowlist or bypass native cooldown. Keep controller priority and target/context checks ahead of any selector mutation.
- The user confirms basics `8001–8005` have 0 ms native cooldown and wants them used continuously. Prefer these basics in `12-basic-outside.mjs` and poll at 1 ms while the target is actionable; after a basic cast, `09-combat-engine.mjs` may poll at 1 ms. For a non-basic native selector boundary, the combat engine may estimate the time remaining, apply a bounded EWMA of observed timer overshoot, and use a bounded, progressively shorter poll interval; this is scheduling only, not a readiness override. Companion fallback scanning may adapt between 1 and 8 ms near a native readiness boundary, while its player-cast event path remains immediate. Preserve the native selector readiness rows, `combat.isCooldown()`, target/range checks, and combat ownership. Never write native cooldown rows or issue casts when native readiness is false.
- Outside-map adaptive ranking may use only directly matched, actor- and target-scoped damage samples. Rank by an EWMA over at most 12 recent matched hits (`alpha=2/13`), falling back to lifetime mean; keep its minimum-hit and exploration gates, and never treat an unmatched cast as a miss.
- `12-basic-outside.mjs`'s cooldown/animation forcing remains hard-disabled (`false && ...`). Basic-priority mode does not authorize bypassing native cooldown or forcing animation state; do not remove that guard as a cleanup or performance optimization.
- Lạc Phong PvP remains observe-only unless `start({autoDodge:true})` is explicitly selected. Only use verified PvP opponents and event context; pause under HongHoang/other owners, keep any dodge bounded to native movement, and never turn observed remote skill signals into attack sends or assume they are reliably replicated.
- Keep `75-pvp-luofeng.mjs` separate from PvE combat ownership. PvP controllers and map-specific combat retain ownership; changes must not take over native target selection, reorder the player's skill rotation, or add a competing combat sender.

## Bundle and Source Consistency

- `esm/index.mjs` and `esm/manifest.json` define the ESM module catalog and initialization order; update both when adding or moving a module. `initializedModules` is grouped by startup priority: safety/policy, core/map, red-dot/tasks, combat, daily/rewards, utilities, then PvP. Keep the entry initializer calls in exact manifest order.
- Normally, do not hand-edit generated FULL, patch, or extension bundles; build them from ESM sources with `npm run build`. During the current no-build restriction, make only the surgical bundle synchronization needed for edited source and verify it by reading the corresponding source and bundle sections.
- Avoid unrelated cleanup or changes, especially to `windows-app`, game assets, sync configuration, or existing user modifications.

## GitHub Integration

The project includes a `git-sync/` directory for automatically syncing code from GitHub to Windows. This is configured once and allows automated updates. The sync process involves:

1. Setting up a private GitHub repository with the source code
2. Running `CAI_GITHUB_AUTO_SYNC.bat` to configure automatic sync
3. Pushing changes to the GitHub repository to trigger automatic download and update on Windows

This setup enables automated updates where code changes pushed to GitHub are automatically pulled to Windows within approximately 60 seconds, with Native Host performing checks and updates to the game.

## Key Features

- **Combat Automation**: Fully automated boss fighting using native skills
- **Daily Activities**: Automation for daily quests, events and activities
- **Boss Fighting**: Specific automation for different types of boss encounters
- **Tian Quan (Heavenly Warrior)**: Special automation for Tian Quan battles
- **Eight Floor Event**: Automation for the 8-floor event
- **Honor Target**: Automation for Honor Target events

## Important Notes

- The system uses native game client features for combat instead of external skill selection
- Focus is maintained using `KVPV_GIU_FOCUS.js` to prevent focus-related issues
- The system does not consume KNB (KVN Battle Points) automatically
- Updates are handled through patching or full reload, no F5 needed
- The system is designed to work with Edge browser extensions
