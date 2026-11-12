# KVPV Local Dashboard

This local dashboard shows connected characters and lets you toggle the allowed modules for each one.

## Start

Double-click `start-dashboard.bat`, or run from the repository root:

```powershell
npm.cmd run dashboard
```

Open `http://127.0.0.1:4177` in a browser. Press `Ctrl+C` in the terminal to stop it. Set `KVPV_DASHBOARD_PORT` to a free port between 1024 and 65535 to use a different port.

The server binds only to `127.0.0.1`. Character IDs are masked; the browser receives a temporary opaque reference instead of the full ID. Module settings are saved per character and relayed to the matching game tab by the browser extension/native host. Checkbox changes are saved automatically and applied on the next extension relay cycle; an offline character's profile is applied when it syncs again.

The page checks dashboard health and refreshes connection reports every five seconds. The header indicates whether the local app responds; the footer distinguishes connected, stale, and offline character reports.

The standalone local CDP watcher has been removed. The dashboard does not open or manage browser windows; keep the browser extension connected to relay profile changes.

The dashboard lists modules with a stoppable runtime API, alongside the existing Combat, Hằng ngày, and PvP controls. “Chỉ bật bộ Hằng ngày” enables the regular modules cataloged in the Hằng ngày group and turns off other regular modules for the selected character; it leaves red-dot selections unchanged. These modules remain enabled across daily resets and rely on game/server state to decide when a daily task is available or already complete; this preset does not impose its own once-per-day timer. “Bật tất cả module” enables every regular module without changing red-dot selections. “Bật tất cả red-dot” separately enables every group in that character’s red-dot catalog. The extension loads a runtime bundle containing the baseline and all selectable module installers. The saved per-character profile controls which modules are running; changing a checkbox starts or stops the module in the already-open game tab without reloading it. Modules omitted from old profiles are treated as off. A build (`npm.cmd run build`) is required to install the hot-toggle runtime. Only changed settings are sent, and unchanged module settings are preserved. At most eight character profiles are stored in `.kvpv-live\desktop-controls.json`.

If a tab is still running a legacy runtime that lacks installers for newly selected modules, it reports that a one-time reload is needed to install the hot-toggle runtime. Subsequent checkbox changes do not reload the game tab.

When the combat controller is enabled, it applies an x99 client-side movement-speed multiplier on every map for the controlled character; it does not require a boss target or boss scope. It restores the previous speed when disabled or when the controlled actor is no longer valid. Server acceptance is unverified.

The combat controller and Lạc Phong PvP may both be enabled. Their movement-speed boosts coordinate so only one applies x99 at a time; the active boost is reused, and the other controller can take over when its owner stops.

Red-dot automatic actions can also be toggled by group or individually in the expandable red-dot section. All red-dot actions default to off; only checked groups or items can run. Selecting an action automatically enables the shared red-dot dispatcher as a dependency. Group changes reset individual overrides in that group; an individual checkbox can then override its group. Explicit saved choices are preserved, while unset choices default to off. Rebuild the runtime before applying module or red-dot settings; dashboard controls reject the profile until the compatible runtime is installed in the game tab.

The dashboard uses existing `.kvpv-live\diagnostics` files. The dashboard considers a tab connected while its latest heartbeat is no more than 30 seconds old. If a browser context stalls, the extension can carry forward the last detected actor heartbeat for up to two minutes while that game context remains attached; diagnostic data can be older and is shown as stale separately. It does not start a browser or build the project. Keep the dashboard on localhost; it has no login and must not be exposed to a LAN or public network.
