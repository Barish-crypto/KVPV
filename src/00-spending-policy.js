
/* General KNB spending stays disabled. The user authorized only native
 * daily-trial inspiration in maps 2051 and 2061. Paid sweeps remain disabled. */

(() => {

  const inspireMaps=Object.freeze([2051,2061]);

  window.KVPV_SPENDING_POLICY=Object.freeze({allowKNB:false,

    dailyInspireKNBMaps:inspireMaps,

    canDailyInspireKNB:map=>inspireMaps.includes(Number(map)),

    reason:'No general KNB spending. User permits native inspiration only in daily trial maps 2051 and 2061.'});

})();

