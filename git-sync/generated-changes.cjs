/* Only known derived files are safe to leave modified in the working tree.
 * Deletions, staged changes, renames and source edits still block Git auto-pull.
 * git status must be called with --porcelain=v1 -z and its stdout untrimmed.
 */
'use strict';
const GENERATED_TRACKED = new Set([
  'KVPV_V1_FULL.js',
  'KVPV_PB_BOSS_DAILY.js',
  'KVPV_SCAN_LIVE_PATCH.js',
  'MANIFEST.json',
  'android/KVPV_ANDROID.user.js',
  'android/KVPV_ANDROID.zip',
  'edge-addon/core.js',
  'edge-addon/native/host-manifest.json',
  'edge-addon/native/node-path.txt'
]);
function blockingTrackedChanges(porcelain) {
  return String(porcelain||'').split('\0').filter(Boolean).filter(entry =>
    !(entry.slice(0,2)===' M' && GENERATED_TRACKED.has(entry.slice(3))));
}
module.exports={blockingTrackedChanges};
