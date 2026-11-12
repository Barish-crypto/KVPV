/* Tian Quan: trigger owned Ma Than transformation once per free full-rage charge. No skill acceleration or purchase. */
(() => {
    'use strict';
    const W = window, old = W.KVPV_TQ_MA_THAN, carry = old?._handoff?.(); old?.stop?.('reload');
    const actor = String(W.__KVPV_OWN_ACTOR_ID ?? '');
    const S = { enabled: true, timer: null, lastAt: carry?.actor === actor ? carry.lastAt : 0, pending: carry?.actor === actor ? carry.pending : null, spent: carry?.actor === actor ? carry.spent : false, lastStrength: carry?.actor === actor ? carry.lastStrength : null, requests: carry?.actor === actor ? carry.requests : 0, reason: 'armed', lastError: '' };
    function scope() { const s = W.KVPV_FAR_SCOPE?.status?.(); return s?.inside === true && s.kind === 'THIEN_QUAN' && W.KVPV_TH300?.status?.(false)?.running === true; }
    function tick() {
        if (!S.enabled) return;
        try {
            if (actor !== String(W._Ba?._rJ?._O$?.ins?.actorId ?? '') || W.__KVPV_UNIVERSAL_HALTED) { S.reason = 'actor_mismatch'; return; }
            if (!scope()) { S.reason = 'outside_tianquan'; return; }
            const m = W._Ba?._s3?._ZJ?.ins, need = Number(W._ft?._gY?.ins?.getCfgById?.(92001)?.[2]?.[0]), energy = Number(m?.curStrength), form = Number(m?.curFightShowId);
            if (m?.isTransforming?.() === true || Number(m?.curShowId) > 0) { S.spent = true; S.pending = null; S.reason = 'native_form_active'; return; }
            if (!Number.isFinite(need) || need <= 0 || !Number.isFinite(energy)) { S.reason = 'native_strength_unavailable'; return; }
            if (energy < need) { S.spent = false; S.pending = null; S.reason = 'charging_rage'; S.lastStrength = energy; return; }
            if (S.spent) { S.reason = 'already_requested_this_charge'; return; }
            if (S.pending) { S.reason = 'awaiting_native_ack_no_retry'; return; }
            const role = W._C?._Ba?.instance?.getRole?.(Number(actor)), combat = role?.getComponent?.(W._d?._Yct?._Het), target = combat?.target;
            if (W._Ba?._rJ?._O$?.ins?.isDead !== false || Number(target?.property?.get?.('type')) !== 1 || combat?.isValidTarget?.() !== true || Date.now() < Number(W.__KVPV_USER_UI_UNTIL || 0) || W.KVPV_EVENT_PRIORITY?.hold?.()) { S.reason = 'waiting_boss_ready'; return; }
            if (!Number.isSafeInteger(form) || form <= 0 || !m?.huanhuaList?.()?.[form] || m?.sendTrans || W._Ba?._Do?._Ho?.inst?.getFcIsOpen?.(327) !== true) { S.reason = 'native_form_unavailable'; return; }
            const rpc = W._Ba?._s3?._Kyt?.ins; if (typeof rpc?.Transforming !== 'function') { S.reason = 'native_rpc_unavailable'; return; }
            if (Date.now() - S.lastAt < 3000) return;
            S.lastAt = Date.now(); S.requests++; S.spent = true; S.pending = { at: S.lastAt, form, strength: energy };
            rpc.Transforming(); S.reason = 'native_transform_requested';
        } catch (e) { S.lastError = String(e?.message ?? e); S.reason = 'native_error_no_retry'; }
    }
    function stop(reason = 'manual') { S.enabled = false; if (S.timer != null) (W.KVPV_V1?.timers?.clearInterval ?? W.clearInterval)?.(S.timer); S.timer = null; S.reason = reason; }
    function status() { return { enabled: S.enabled, scope: scope(), reason: S.reason, requests: S.requests, pending: S.pending, lastError: S.lastError, allowKNB: false }; }
    W.KVPV_TQ_MA_THAN = Object.freeze({ status, tick, stop, _handoff: () => ({ actor, lastAt: S.lastAt, pending: S.pending, spent: S.spent, lastStrength: S.lastStrength, requests: S.requests }) });
    const schedule = W.KVPV_V1?.timers?.setInterval ?? W.setInterval;
    if (typeof W.setInterval === 'function' && typeof schedule === 'function') S.timer = schedule(tick, 250);
    tick();
})();