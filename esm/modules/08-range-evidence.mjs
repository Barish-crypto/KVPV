import {getKVPV_ACCOUNT_POLICY as __getKVPV0,getKVPV_BASIC10 as __getKVPV1,getKVPV_COMBAT_METRICS as __getKVPV2,getKVPV_DESKTOP_CONTROL as __getKVPV3,getKVPV_FAR_SCOPE as __getKVPV4,getKVPV_HITRUN1 as __getKVPV5,getKVPV_MODE as __getKVPV6,getKVPV_RANGE281 as __getKVPV7,getKVPV_SKILL_PACING as __getKVPV9,getKVPV_TH300 as __getKVPV10,getKVPV_TQ112 as __getKVPV11,getKVPV_TQ113 as __getKVPV12,getKVPV_TQ_BASIC_FORCE as __getKVPV14,getKVPV_TQ_BASIC_PROFILE as __getKVPV15,getKVPV_TQ_POSITION_ONLY as __getKVPV16,getKVPV_TQ_SCOPE as __getKVPV17,getKVPV_TQ_SINGLE_STRONGEST_TH as __getKVPV18,getKVPV_TRANSFORM10 as __getKVPV19,getKVPV_V1 as __getKVPV20} from '../api.mjs';
import {call_KVPV_TRANSFORM10_status as __callKVPV0} from "./13-transform-skills.mjs";
import {call_KVPV_FAR_SCOPE_eligible as __callKVPV1} from "./00-far-scope.mjs";
import {call_KVPV_TRANSFORM10_has as __callKVPV2} from "./13-transform-skills.mjs";
import {call_KVPV_TRANSFORM10_select as __callKVPV3} from "./13-transform-skills.mjs";
import {call_KVPV_TRANSFORM10_skills as __callKVPV4} from "./13-transform-skills.mjs";
export function call_KVPV_TQ_BASIC_PROFILE_create(...args){const target=globalThis["KVPV_TQ_BASIC_PROFILE"];const fn=globalThis["KVPV_TQ_BASIC_PROFILE"]?.["create"];if(typeof fn!=='function')throw Error("KVPV_TQ_BASIC_PROFILE.create is not available");return Reflect.apply(fn,target,args);}
function __captureESMFunction(fn,name){
  if(fn.name!==name)Object.defineProperty(fn,"name",{value:name,configurable:true});
  return fn;
}
function __captureESMMethod(receiver,key,kind){
  let owner=receiver;
  while(owner!==null&&(typeof owner==="object"||typeof owner==="function")&&!Object.prototype.hasOwnProperty.call(owner,key))owner=Object.getPrototypeOf(owner);
  if(owner===null)return undefined;
  const descriptor=Object.getOwnPropertyDescriptor(owner,key);
  return kind==="get"?descriptor.get:kind==="set"?descriptor.set:descriptor.value;
}
let __esmLocal33;
let __esmLocal34;
let __esmLocal35;
let __esmLocal36;
let __esmLocal37;
let __esmLocal38;
let __esmLocal39;
let __esmLocal40;
let __esmLocal41;
let __esmLocal42;
let __esmLocal43;
let __esmLocal44;
let __esmLocal45;
let __esmLocal46;
let __esmLocal47;
let __esmLocal48;
let __esmLocal49;
let __esmLocal50;
let __esmLocal51;
let __esmLocal52;
let __esmLocal53;
let __esmLocal54;
let __esmLocal55;
let __esmLocal56;
let __esmLocal57;
let __esmLocal58;
let __esmLocal59;
let __esmLocal60;
let __esmLocal61;
let __esmLocal62;
let __esmLocal63;
let __esmLocal64;
let __esmLocal65;
let __esmLocal67;
let __esmLocal68;
let __esmLocal70;
let __esmLocal71;
let __esmLocal72;
let __esmLocal73;
let __esmLocal74;
let __esmLocal75;
let __esmLocal76;
let __esmLocal77;
let __esmLocal78;
let __esmLocal79;
let __esmLocal80;
let __esmLocal81;
let __esmLocal82;
let __esmLocal83;
let __esmLocal84;
let __esmLocal85;
let __esmLocal86;
let __esmLocal87;
let __esmLocal88;
let __esmLocal89;
let __esmLocal90;
let __esmLocal91;
let __esmLocal92;
let __esmLocal93;
let __esmLocal94;
let __esmLocal95;
let __esmLocal96;
let __esmLocal97;
let __esmLocal98;
let __esmLocal99;
let __esmLocal100;
let __esmLocal101;
let __esmLocal102;
let __esmLocal103;
let __esmLocal111;
let __esmLocal117;
let __esmLocal122;
let __esmLocal123;
let __esmLocal124;
let __esmLocal125;
let __esmLocal126;
let __esmLocal127;
let __esmLocal128;
let __esmLocal129;
let __esmLocal130;
let __esmLocal131;
let __esmLocal132;
let __esmLocal133;
let __esmLocal134;
let __esmLocal135;
let __esmLocal136;
let __esmLocal137;
let __esmLocal138;
let __esmLocal139;
let __esmLocal140;
let __esmLocal141;
let __esmLocal142;
let __esmLocal143;
let __esmLocal144;
let __esmLocal145;
let __esmLocal146;
let __esmLocal147;
let __esmLocal148;
let __esmLocal149;
let __esmLocal157;
let __esmLocal158;
let __esmLocal159;
let __esmLocal160;
let __esmLocal161;
let __esmLocal162;
let __esmLocal163;
let __esmLocal164;
let __esmLocal165;
let __esmLocal166;
let __esmLocal167;
let __esmLocal168;
let __esmLocal169;
let __esmLocal170;
let __esmLocal171;
let __esmLocal172;
let __esmLocal173;
let __esmLocal174;
let __esmLocal175;
let __esmLocal176;
let __esmLocal177;
let __esmLocal178;
let __esmLocal179;
let __esmLocal180;
let __esmLocal181;
let __esmLocal182;
let __esmLocal183;
let __esmLocal184;
let __esmLocal185;
let __esmLocal186;
let __esmLocal187;
let __esmLocal188;
let __esmLocal189;
let __esmLocal190;
let __esmLocal191;
let __esmLocal192;
let __esmLocal194;
let __esmLocal195;
let __esmLocal196;
let __esmLocal197;
let __esmLocal198;
let __esmLocal199;
let __esmLocal200;
let __esmLocal201;
let __esmLocal202;
let __esmLocal203;
let __esmLocal204;
let __esmLocal205;
let __esmLocal206;
let __esmLocal207;
let __esmLocal208;
let __esmLocal209;
let __esmLocal210;
let __esmLocal211;
let __esmLocal212;
let __esmLocal213;
let __esmLocal214;
let __esmLocal215;
let __esmLocal216;
let __esmLocal217;
let __esmLocal218;
let __esmLocal219;
let __esmLocal220;
let __esmLocal221;
let __esmLocal222;
let __esmLocal223;
let __esmLocal224;
let __esmLocal225;
let __esmLocal226;
let __esmLocal227;
let __esmLocal228;
let __esmLocal229;
let __esmLocal230;
let __esmLocal231;
let __esmLocal232;
let __esmLocal233;
let __esmLocal234;
let __esmLocal236;
let __esmLocal237;
let __esmLocal238;
let __esmLocal239;
let __esmLocal240;
let __esmLocal241;
let __esmLocal242;
let __esmLocal243;
let __esmLocal244;
let __esmLocal245;
let __esmLocal246;
let __esmLocal247;
let __esmLocal257;
let __esmLocal258;
let __esmLocal259;
let __esmLocal260;
let __esmLocal261;
let __esmLocal262;
let __esmLocal263;
let __esmLocal264;
let __esmLocal265;
let __esmLocal266;
let __esmLocal267;
let __esmLocal268;
let __esmLocal269;
let __esmLocal270;
let __esmLocal271;
let __esmLocal272;
let __esmLocal273;
let __esmLocal274;
let __esmLocal275;
let __esmLocal276;
let __esmLocal277;
let __esmLocal278;
let __esmLocal279;
let __esmLocal280;
let __esmLocal281;
let __esmLocal282;
let __esmLocal283;
let __esmLocal284;
let __esmLocal285;
let __esmLocal286;
let __esmLocal287;
let __esmLocal288;
let __esmLocal289;
let __esmLocal290;
let __esmLocal291;
let __esmLocal292;
let __esmLocal293;
let __esmLocal294;
let __esmLocal295;
let __esmLocal296;
let __esmLocal297;
let __esmLocal298;
let __esmLocal299;
let __esmLocal300;
let __esmLocal301;
let __esmLocal302;
let __esmLocal303;
let __esmLocal304;
let __esmLocal305;
let __esmLocal306;
let __esmLocal307;
let __esmLocal308;
let __esmLocal309;
let __esmLocal310;
let __esmLocal311;
let __esmLocal312;
let __esmLocal313;
let __esmLocal314;
let __esmLocal315;
let __esmLocal316;
let __esmLocal317;
let __esmLocal318;
let __esmLocal319;
let __esmLocal320;
let __esmLocal321;
let __esmLocal322;
let __esmLocal325;
let __esmLocal326;
let __esmLocal327;
let __esmLocal328;
let __esmLocal329;
let __esmLocal330;
let __esmLocal331;
let __esmLocal332;
let __esmLocal333;
let __esmLocal334;
let __esmLocal335;
let __esmLocal336;
let __esmLocal337;
let __esmLocal338;
let __esmLocal339;
let __esmLocal340;
let __esmLocal341;
let __esmLocal342;
let __esmLocal343;
let __esmLocal344;
let __esmLocal345;
let __esmLocal346;
let __esmLocal347;
let __esmLocal348;
let __esmLocal349;
let __esmLocal350;
let __esmLocal351;
let __esmLocal352;
let __esmLocal354;
let __esmLocal355;
let __esmLocal356;
let __esmLocal357;
let __esmLocal358;
let __esmLocal359;
let __esmLocal360;
let __esmLocal361;
let __esmLocal362;
let __esmLocal363;
let __esmLocal364;
let __esmLocal365;
let __esmLocal366;
let __esmLocal367;
let __esmLocal368;
let __esmLocal369;
let __esmLocal370;
let __esmLocal371;
let __esmLocal372;
let __esmLocal373;
let __esmLocal374;
let __esmLocal375;
let __esmLocal376;
let __esmLocal377;
let __esmLocal378;
let __esmLocal379;
let __esmLocal380;
let __esmLocal381;
let __esmLocal382;
let __esmLocal383;
let __esmLocal384;
let __esmLocal385;
let __esmLocal386;
let __esmLocal389;
let __esmLocal393;
let __esmLocal394;
let __esmLocal395;
export {__esmLocal33 as local_anonymous_55_1_33};
export {__esmLocal34 as local_scopedCombat_34};
export {__esmLocal35 as local_tqDistanceOnly_35};
export {__esmLocal36 as local_tqConfiguredGoal_36};
export {__esmLocal37 as local_get_37};
export {__esmLocal38 as local_set_38};
export {__esmLocal39 as local_transforming_39};
export {__esmLocal40 as local_isTransformSkill_40};
export {__esmLocal41 as local_currentPace_41};
export {__esmLocal42 as local_setClientPace_42};
export {__esmLocal43 as local_setScanInterval_43};
export {__esmLocal44 as local_luoFengActive_44};
export {__esmLocal45 as local_keepRecentHit_45};
export {__esmLocal46 as local_apexDamage_46};
export {__esmLocal47 as local_anonymous_130_26_47};
export {__esmLocal48 as local_apexRobustDamage_48};
export {__esmLocal49 as local_anonymous_138_30_49};
export {__esmLocal50 as local_anonymous_138_63_50};
export {__esmLocal51 as local_anonymous_142_23_51};
export {__esmLocal52 as local_resetApexRhythm_52};
export {__esmLocal53 as local_observeApexRhythm_53};
export {__esmLocal54 as local_apexRhythmReport_54};
export {__esmLocal55 as local_anonymous_172_46_55};
export {__esmLocal56 as local_median_56};
export {__esmLocal57 as local_anonymous_175_69_57};
export {__esmLocal58 as local_pilot4100Active_58};
export {__esmLocal59 as local_resetPilot4100_59};
export {__esmLocal60 as local_pilot4100THOnly_60};
export {__esmLocal61 as local_observePilot4100_61};
export {__esmLocal62 as local_pilot4100Status_62};
export {__esmLocal63 as local_basicSolo4100Active_63};
export {__esmLocal64 as local_setTianQuan4100BasicSolo_64};
export {__esmLocal65 as local_basicSolo4100Status_65};
export {__esmLocal67 as local_localLogCleanupStatus_67};
export {__esmLocal68 as local_setLocalLogAutoClear_68};
export {__esmLocal70 as local_localLogCleanupSync_70};
export {__esmLocal71 as local_cosmicActive_71};
export {__esmLocal72 as local_cosmicReset_72};
export {__esmLocal73 as local_cosmicScore_73};
export {__esmLocal74 as local_cosmicRank_74};
export {__esmLocal75 as local_anonymous_307_21_75};
export {__esmLocal76 as local_resetThGap_76};
export {__esmLocal77 as local_thGapActive_77};
export {__esmLocal78 as local_thGapNativeReady_78};
export {__esmLocal79 as local_strongestThGapBasic_79};
export {__esmLocal80 as local_anonymous_322_64_80};
export {__esmLocal81 as local_anonymous_322_130_81};
export {__esmLocal82 as local_anonymous_323_14_82};
export {__esmLocal83 as local_scope_83};
export {__esmLocal84 as local_context_84};
export {__esmLocal85 as local_phase_85};
export {__esmLocal86 as local_hp_86};
export {__esmLocal87 as local_learned_87};
export {__esmLocal88 as local_anonymous_325_417_88};
export {__esmLocal89 as local_get_89};
export {__esmLocal90 as local_set_90};
export {__esmLocal91 as local_isBasic_91};
export {__esmLocal92 as local_selectedBasic_92};
export {__esmLocal93 as local_learnedBasics_93};
export {__esmLocal94 as local_anonymous_338_103_94};
export {__esmLocal95 as local_anonymous_338_129_95};
export {__esmLocal96 as local_anonymous_338_198_96};
export {__esmLocal97 as local_ensureTianQuanRotation_97};
export {__esmLocal98 as local_anonymous_348_67_98};
export {__esmLocal99 as local_anonymous_350_17_99};
export {__esmLocal100 as local_basicRotation_100};
export {__esmLocal101 as local_anonymous_356_118_101};
export {__esmLocal102 as local_basicQuota_102};
export {__esmLocal103 as local_primaryBasicId_103};
export {__esmLocal111 as local_setConfirmedTailCut_111};
export {__esmLocal117 as local_restoreSpeedClips_117};
export {__esmLocal122 as local_animationTrialCall_122};
export {__esmLocal123 as local_wrapped_123};
export {__esmLocal124 as local_onNativeCast_124};
export {__esmLocal125 as local_detachDispatch_125};
export {__esmLocal126 as local_attachDispatch_126};
export {__esmLocal127 as local_invokeNative_127};
export {__esmLocal128 as local_prop_128};
export {__esmLocal129 as local_identity_129};
export {__esmLocal130 as local_loc_130};
export {__esmLocal131 as local_radius_131};
export {__esmLocal132 as local_role_132};
export {__esmLocal133 as local_stageOcc_133};
export {__esmLocal134 as local_eligible_134};
export {__esmLocal135 as local_key_135};
export {__esmLocal136 as local_scene_136};
export {__esmLocal137 as local_skill1008Info_137};
export {__esmLocal138 as local_read_138};
export {__esmLocal139 as local_pack_139};
export {__esmLocal140 as local_anonymous_646_169_140};
export {__esmLocal141 as local_anonymous_647_17_141};
export {__esmLocal142 as local_anonymous_647_42_142};
export {__esmLocal143 as local_anonymous_647_116_143};
export {__esmLocal144 as local_anonymous_648_22_144};
export {__esmLocal145 as local_anonymous_648_89_145};
export {__esmLocal146 as local_anonymous_649_261_146};
export {__esmLocal147 as local_anonymous_649_294_147};
export {__esmLocal148 as local_anonymous_649_324_148};
export {__esmLocal149 as local_anonymous_649_386_149};
export {__esmLocal157 as local_candidate_157};
export {__esmLocal158 as local_anonymous_666_53_158};
export {__esmLocal159 as local_anonymous_666_90_159};
export {__esmLocal160 as local_isTuyetHocSkill_160};
export {__esmLocal161 as local_tianQuanThMode_161};
export {__esmLocal162 as local_tuyetHocCalibration_162};
export {__esmLocal163 as local_anonymous_675_34_163};
export {__esmLocal164 as local_anonymous_676_26_164};
export {__esmLocal165 as local_anonymous_678_45_165};
export {__esmLocal166 as local_anonymous_679_31_166};
export {__esmLocal167 as local_anonymous_680_12_167};
export {__esmLocal168 as local_updateTuyetHocCalibration_168};
export {__esmLocal169 as local_anonymous_693_31_169};
export {__esmLocal170 as local_hangMaSkillName_170};
export {__esmLocal171 as local_anonymous_703_79_171};
export {__esmLocal172 as local_tqMpackExtraAllowed_172};
export {__esmLocal173 as local_anonymous_721_52_173};
export {__esmLocal174 as local_anonymous_730_18_174};
export {__esmLocal175 as local_tqActiveExtraIds_175};
export {__esmLocal176 as local_anonymous_737_56_176};
export {__esmLocal177 as local_anonymous_738_36_177};
export {__esmLocal178 as local_anonymous_739_48_178};
export {__esmLocal179 as local_tqSelectableNative_179};
export {__esmLocal180 as local_setTianQuanMpackExtras_180};
export {__esmLocal181 as local_bossRange_181};
export {__esmLocal182 as local_outside_182};
export {__esmLocal183 as local_combatOwner_183};
export {__esmLocal184 as local_towerFinish_184};
export {__esmLocal185 as local_canFight_185};
export {__esmLocal186 as local_stats_186};
export {__esmLocal187 as local_settle_187};
export {__esmLocal188 as local_expire_188};
export {__esmLocal189 as local_supportedDistance_189};
export {__esmLocal190 as local_anonymous_807_84_190};
export {__esmLocal191 as local_anonymous_807_132_191};
export {__esmLocal192 as local_verified_192};
export {__esmLocal194 as local_basicPendingBlocks_194};
export {__esmLocal195 as local_anonymous_819_306_195};
export {__esmLocal196 as local_basicQuotaSatisfied_196};
export {__esmLocal197 as local_allowed_197};
export {__esmLocal198 as local_anonymous_823_760_198};
export {__esmLocal199 as local_anonymous_823_797_199};
export {__esmLocal200 as local_anonymous_825_19_200};
export {__esmLocal201 as local_anonymous_829_48_201};
export {__esmLocal202 as local_anonymous_830_36_202};
export {__esmLocal203 as local_tqNativeReadyRepeat_203};
export {__esmLocal204 as local_anonymous_852_59_204};
export {__esmLocal205 as local_anonymous_863_39_205};
export {__esmLocal206 as local_targetDistance_206};
export {__esmLocal207 as local_anonymous_873_55_207};
export {__esmLocal208 as local_anonymous_873_82_208};
export {__esmLocal209 as local_note_209};
export {__esmLocal210 as local_restore_210};
export {__esmLocal211 as local_hook_211};
export {__esmLocal212 as local_legacy_212};
export {__esmLocal213 as local_unbind_213};
export {__esmLocal214 as local_atPosition_214};
export {__esmLocal215 as local_castReady_215};
export {__esmLocal216 as local_guardMovement_216};
export {__esmLocal217 as local_entryGuard_217};
export {__esmLocal218 as local_anonymous_971_31_218};
export {__esmLocal219 as local_anonymous_971_39_219};
export {__esmLocal220 as local_anonymous_991_37_220};
export {__esmLocal221 as local_anonymous_991_45_221};
export {__esmLocal222 as local_animationPlaying_222};
export {__esmLocal223 as local_basicTailReady_223};
export {__esmLocal224 as local_confirmedTailSkill_224};
export {__esmLocal225 as local_nativeReady_225};
export {__esmLocal226 as local_anonymous_1027_37_226};
export {__esmLocal227 as local_tqBasicDispatchReady_227};
export {__esmLocal228 as local_burstCast_228};
export {__esmLocal229 as local_anonymous_1065_53_229};
export {__esmLocal230 as local_anonymous_1066_47_230};
export {__esmLocal231 as local_anonymous_1068_13_231};
export {__esmLocal232 as local_anonymous_1069_30_232};
export {__esmLocal233 as local_anonymous_1069_46_233};
export {__esmLocal234 as local_anonymous_1101_74_234};
export {__esmLocal236 as local_thGapCast_236};
export {__esmLocal237 as local_fastCast_237};
export {__esmLocal238 as local_dungeonFinishBasic_238};
export {__esmLocal239 as local_anonymous_1182_65_239};
export {__esmLocal240 as local_onHit_240};
export {__esmLocal241 as local_reject_241};
export {__esmLocal242 as local_anonymous_1227_54_242};
export {__esmLocal243 as local_anonymous_1237_41_243};
export {__esmLocal244 as local_anonymous_1239_40_244};
export {__esmLocal245 as local_anonymous_1258_58_245};
export {__esmLocal246 as local_unlisten_246};
export {__esmLocal247 as local_listen_247};
export {__esmLocal257 as local_selectBasic_257};
export {__esmLocal258 as local_basicFallback_258};
export {__esmLocal259 as local_anonymous_1309_26_259};
export {__esmLocal260 as local_anonymous_1311_11_260};
export {__esmLocal261 as local_anonymous_1317_14_261};
export {__esmLocal262 as local_anonymous_1319_12_262};
export {__esmLocal263 as local_anonymous_1325_46_263};
export {__esmLocal264 as local_anonymous_1325_129_264};
export {__esmLocal265 as local_anonymous_1329_50_265};
export {__esmLocal266 as local_bind_266};
export {__esmLocal267 as local_anonymous_1353_28_267};
export {__esmLocal268 as local_anonymous_1353_36_268};
export {__esmLocal269 as local_pickBasic_269};
export {__esmLocal270 as local_anonymous_1358_34_270};
export {__esmLocal271 as local_anonymous_1364_38_271};
export {__esmLocal272 as local_pickTH_272};
export {__esmLocal273 as local_anonymous_1367_43_273};
export {__esmLocal274 as local_anonymous_1367_182_274};
export {__esmLocal275 as local_anonymous_1369_23_275};
export {__esmLocal276 as local_anonymous_1382_102_276};
export {__esmLocal277 as local_filter_277};
export {__esmLocal278 as local_anonymous_1392_59_278};
export {__esmLocal279 as local_filter_279};
export {__esmLocal280 as local_anonymous_1404_64_280};
export {__esmLocal281 as local_filter_281};
export {__esmLocal282 as local_anonymous_1434_55_282};
export {__esmLocal283 as local_anonymous_1440_36_283};
export {__esmLocal284 as local_anonymous_1440_52_284};
export {__esmLocal285 as local_score_285};
export {__esmLocal286 as local_ranked_286};
export {__esmLocal287 as local_anonymous_1448_43_287};
export {__esmLocal288 as local_anonymous_1472_30_288};
export {__esmLocal289 as local_anonymous_1472_38_289};
export {__esmLocal290 as local_anonymous_1490_50_290};
export {__esmLocal291 as local_anonymous_1512_38_291};
export {__esmLocal292 as local_anonymous_1523_26_292};
export {__esmLocal293 as local_tick_293};
export {__esmLocal294 as local_skillNames_294};
export {__esmLocal295 as local_anonymous_1859_154_295};
export {__esmLocal296 as local_anonymous_1859_205_296};
export {__esmLocal297 as local_anonymous_1861_19_297};
export {__esmLocal298 as local_anonymous_1861_111_298};
export {__esmLocal299 as local_status_299};
export {__esmLocal300 as local_statusImpl_300};
export {__esmLocal301 as local_anonymous_1869_93_301};
export {__esmLocal302 as local_anonymous_1869_120_302};
export {__esmLocal303 as local_anonymous_1871_118_303};
export {__esmLocal304 as local_anonymous_1871_151_304};
export {__esmLocal305 as local_anonymous_1882_456_305};
export {__esmLocal306 as local_anonymous_1886_23_306};
export {__esmLocal307 as local_anonymous_1899_50_307};
export {__esmLocal308 as local_anonymous_1899_74_308};
export {__esmLocal309 as local_anonymous_1900_53_309};
export {__esmLocal310 as local_anonymous_1909_44_310};
export {__esmLocal311 as local_anonymous_1910_45_311};
export {__esmLocal312 as local_anonymous_1915_41_312};
export {__esmLocal313 as local_anonymous_1922_73_313};
export {__esmLocal314 as local_anonymous_1922_93_314};
export {__esmLocal315 as local_anonymous_1942_37_315};
export {__esmLocal316 as local_start_316};
export {__esmLocal317 as local_repairPolling_317};
export {__esmLocal318 as local_stop_318};
export {__esmLocal319 as local_report_319};
export {__esmLocal320 as local_anonymous_1996_212_320};
export {__esmLocal321 as local_anonymous_1996_254_321};
export {__esmLocal322 as local_anonymous_1996_310_322};
export {__esmLocal325 as local_setDistance_325};
export {__esmLocal326 as local_performance_326};
export {__esmLocal327 as local_bossInfo_327};
export {__esmLocal328 as local_read_328};
export {__esmLocal329 as local_snapshot_329};
export {__esmLocal330 as local_anonymous_2015_31_330};
export {__esmLocal331 as local_raw_331};
export {__esmLocal332 as local_anonymous_2016_58_332};
export {__esmLocal333 as local_anonymous_2017_17_333};
export {__esmLocal334 as local_anonymous_2018_26_334};
export {__esmLocal335 as local_anonymous_2023_19_335};
export {__esmLocal336 as local_anonymous_2024_18_336};
export {__esmLocal337 as local_anonymous_2024_65_337};
export {__esmLocal338 as local_anonymous_2025_20_338};
export {__esmLocal339 as local_anonymous_2025_67_339};
export {__esmLocal340 as local_anonymous_2030_39_340};
export {__esmLocal341 as local_anonymous_2030_77_341};
export {__esmLocal342 as local_anonymous_2030_147_342};
export {__esmLocal343 as local_anonymous_2031_25_343};
export {__esmLocal344 as local_anonymous_2032_22_344};
export {__esmLocal345 as local_anonymous_2032_71_345};
export {__esmLocal346 as local_anonymous_2033_201_346};
export {__esmLocal347 as local_anonymous_2033_310_347};
export {__esmLocal348 as local_anonymous_2036_379_348};
export {__esmLocal349 as local_dps_349};
export {__esmLocal350 as local_anonymous_2039_331_350};
export {__esmLocal351 as local_anonymous_2039_406_351};
export {__esmLocal352 as local_setBurst_352};
export {__esmLocal354 as local_setInterleaved_354};
export {__esmLocal355 as local_setBasicPace_355};
export {__esmLocal356 as local_setPrimaryBasic_356};
export {__esmLocal357 as local_setAfterTHWait_357};
export {__esmLocal358 as local_setBasicHitQuota_358};
export {__esmLocal359 as local_setBasicRotation_359};
export {__esmLocal360 as local_anonymous_2065_193_360};
export {__esmLocal361 as local_releaseOutsideScope_361};
export {__esmLocal362 as local_setBasicOnly_362};
export {__esmLocal363 as local_tianQuan4100Diagnosis_363};
export {__esmLocal364 as local_anonymous_2090_42_364};
export {__esmLocal365 as local_anonymous_2091_66_365};
export {__esmLocal366 as local_anonymous_2092_61_366};
export {__esmLocal367 as local_anonymous_2093_25_367};
export {__esmLocal368 as local_groupInfo_368};
export {__esmLocal369 as local_anonymous_2094_46_369};
export {__esmLocal370 as local_anonymous_2095_29_370};
export {__esmLocal371 as local_anonymous_2095_72_371};
export {__esmLocal372 as local_anonymous_2096_31_372};
export {__esmLocal373 as local_spent_373};
export {__esmLocal374 as local_setTianQuan4100Pilot_374};
export {__esmLocal375 as local_setTianQuanLuoFeng_375};
export {__esmLocal376 as local_setTianQuanCosmic_376};
export {__esmLocal377 as local_setTianQuanIdleFill_377};
export {__esmLocal378 as local_setTianQuanTHGapBasics_378};
export {__esmLocal379 as local_setTianQuanTuyetHocVisualSpeed_379};
export {__esmLocal380 as local_setTianQuanBasicVisualSpeed_380};
export {__esmLocal381 as local_setTianQuanVisualSpeed_381};
export {__esmLocal382 as local_setBasicAnimationSpeed_382};
export {__esmLocal383 as local_setTianQuanFiveBasics_383};
export {__esmLocal384 as local_setTianQuanFourBasics_384};
export {__esmLocal385 as local_setTianQuanThreeBasics_385};
export {__esmLocal386 as local_setTianQuanTuyetHoc_386};
export {__esmLocal389 as local_setSkillPriority_389};
export {__esmLocal393 as local_isBasicOnly_393};
export {__esmLocal394 as local_export_394};
export {__esmLocal395 as local_history_395};
export function initialize(){
/* ===========================================================================
 * KVPV V12.9.6 — 300+ TUYET HOC RANGE VERIFICATION
 * Distinguishes cast-start range from damage callback range. STRICT only uses
 * skills with >=2 independent matching cast->hit pairs, both observed >300.
 * SCAN observes native non-basic active skills at a configurable distance.
 * No radius in static skill config has been confirmed; measured =/= guaranteed.
 * =========================================================================== */

(__captureESMFunction((__esmLocal33=(() => {

  'use strict';

  const W=window,TAG='[TH300 V12.9.6]',actorId=String(W.__KVPV_OWN_ACTOR_ID||'');

  __getKVPV1()?.release?.();

  try{__getKVPV10()?.stop?.('reload');}catch(_){__getKVPV20()?.diagnostics?.record(_);}

  const Skill=W._d?._Yct?._Eet,Combat=W._d?._Yct?._Het,Move=W._d?._Yct?._zet;

  if(!actorId||!Skill||!Combat||!Move){console?.warn?.(TAG,'Chưa vào game-frame');return;}

  

  const CFG={min:300,max:312,goal:302,tolerance:5,scanMs:100,basicOnly:false,basicAnimationSpeed:1,tqBasicVisualSpeed:1,tqTuyetHocVisualSpeed:99,clientPaceMs:null,afterTHWaitMs:0,moveWaitMs:150,castTtlMs:3500,minCastConfirmations:2,paceMs:75};
  let statusReentrant=false;

  const scopedCombat=__captureESMFunction((__esmLocal34=(()=>__getKVPV3()?.scopeProfile?.(__getKVPV4()?.status?.()?.kind)??null)),"scopedCombat");
  const tqDistanceOnly=__captureESMFunction((__esmLocal35=(()=>__getKVPV16()?.enabled===true&&__getKVPV4()?.status?.()?.kind==='THIEN_QUAN')),"tqDistanceOnly");
  // Honor the explicitly configured Tian Quan goal even when an older desktop
  // combat profile still supplies distance 302; leave its mode/pace settings alone.
  const tqConfiguredGoal=__captureESMFunction((__esmLocal36=(()=>{const p=__getKVPV16(),d=Number(p?.distance);return p?.enabled===false&&__getKVPV4()?.status?.()?.kind==='THIEN_QUAN'&&Number.isFinite(d)&&d>280&&d<=600?d:null;})),"tqConfiguredGoal");

  for(const key of ['goal','min','max','basicOnly']){let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){
__esmLocal37=__captureESMMethod(this,"get","init");
if(tqDistanceOnly()){if(key==='goal')return 310;if(key==='min')return 300;if(key==='max')return 320;}const fixed=tqConfiguredGoal();if(fixed!==null&&key!=='basicOnly'){if(key==='goal')return fixed;if(key==='max')return fixed+10;return fixed===300?295:fixed>300?300:280;}const p=scopedCombat();if(!p)return base;if(key==='basicOnly')return p.mode==='basic8001';if(key==='goal')return p.distance;if(key==='max')return p.distance+10;return p.distance===300?295:p.distance>300?300:280;},set(value){
__esmLocal38=__captureESMMethod(this,"set","init");
base=value;}});}

  const metrics=__getKVPV2()?.create?.()??null;

  const pacer=__getKVPV9()?.create?.()??null;

  const transforming=__captureESMFunction((__esmLocal39=(()=>__getKVPV19()?.transformed?.()&&__getKVPV19()?.isEnabled?.()===true)),"transforming");
  const isTransformSkill=__captureESMFunction((__esmLocal40=(id=>transforming()&&__getKVPV19()?.has?.(Number(id))===true)),"isTransformSkill");

  const currentPace=__captureESMFunction((__esmLocal41=(()=>mixed.enabled&&skillPriority==='interleaved'&&
    ['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(__getKVPV4()?.status?.()?.kind)?0:
    (tqFive?.active()?tqFive.wait():scopedCombat()?.intervalMs??CFG.clientPaceMs??(transforming()?10:(mixed.enabled&&mixed.wantBasic&&mixed.basicPaceMs!==null?mixed.basicPaceMs:(pacer?.pace()??CFG.paceMs)))))),"currentPace");

  function setClientPace(value=1){if(value===null){CFG.clientPaceMs=null;return {clientPaceMs:null};}const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Client pace must be 0..1000 ms');CFG.clientPaceMs=n;return {clientPaceMs:n};}
__esmLocal42=setClientPace;

  function setScanInterval(value=100){const n=Number(value);if(!Number.isInteger(n)||n<1||n>100)throw Error('Scan interval must be 1..100 ms');CFG.scanMs=n;if(ST.timer!==null){(__getKVPV20()?.timers?.clearInterval??W.clearInterval)(ST.timer);const schedule=__getKVPV20()?.timers?.setInterval??W.setInterval;ST.timer=typeof schedule==='function'?schedule(tick,CFG.scanMs):null;}return {scanMs:CFG.scanMs,running:ST.running,nativeCooldownPreserved:true};}
__esmLocal43=setScanInterval;


  const ST={running:false,mode:'OFF',s:null,c:null,target:null,targetOcc:null,owner:{},lastMove:0,

    timer:null,lastTickAt:null,timerRepairs:0,casts:[],proofs:new Map(),evidence:new Map(),stats:new Map(),seen:new Set(),blocked:0,skillWaits:0,

    moves:0,castAttempts:0,confirmedPairs:0,basicImpactSerial:null,basicTailReleases:0,lastDistance:null,lastHitDistance:null,

    arrivalSample:null,arrivalSnap:false,positionSample:null,positionRetries:0,positionOffset:0,positionCommands:0,positionPause:null,positionRecovery:0,movement:[],positioning:true,ownMove:false,moveGoal:null,lastInvocation:-Infinity,lastTHAt:-Infinity,fastCasts:0,blockedSteering:0,

    finishTarget:null,finishCursor:0,finishLastMove:-Infinity,finishMoveAttempts:0,lastBackgroundTick:-Infinity,skillCursor:0,lastOwnerPhase:null,resumes:0,lastReason:'off',lastError:'',tqSelectedBasic:null,scaledTowerSkillAnimations:0,scaledTowerBasicAnimations:0,history:[]};
  const thCalibration={autoLocked:false,skillId:null,completedAt:null,reason:'not_started',minHitsPerSkill:3,maxUnconfirmedPerSkill:3};

  const mixed={enabled:false,primary:false,primaryStreak:0,hitQuota:null,confirmedSinceTH:0,thCycles:0,rotation:[],rotationCursor:0,wantBasic:false,suspended:false,unconfirmed:0,basicPaceMs:null,ready:new Map(),attempts:0,hits:0,damage:0,examples:[]};
  let mixedTargetKey=null;
  let skillPriority='interleaved';
  // The 3.5s hit-correlation TTL is not a server cooldown. In verified
  // Tian Quan SCAN only, permit one bounded native-ready TH retry while a
  // previous cast still awaits damage. Ambiguous overlaps never create STRICT
  // range proofs. No cooldown rewrite, native selector hook override or RPC.
  const tqIdleFill={enabled:true,minRepeatMs:180,maxPendingPerTH:2,
    repeatCalls:0,deniedPending:0,ambiguousHits:0};
  // Cosmic learning uses only confirmed direct hits against the current Boss.
  const cosmic={enabled:true,thCasts:0,basicCasts:0,lastNativeAt:null,lastNativeSkill:null,
    thMeasured:new Map(),thRanked:0,basicRanked:0,exploration:0};
  // Luo Feng Apex: bounded recent-hit memory; never modifies native skill state.
  const luoFeng={enabled:false,sampleWindow:12,idleThresholdMs:650,
    robustMinHits:5,trimPerTail:1,lastExploreTH:-1,lastExploreBasic:-1};
  const luoFengActive=__captureESMFunction((__esmLocal44=(()=>luoFeng.enabled&&cosmicActive())),"luoFengActive");
  function keepRecentHit(row,damage){
    if(!Array.isArray(row.recent))row.recent=[];
    const v=Number(damage);if(!Number.isFinite(v)||v<=0)return;
    row.recent.push(v);
    if(row.recent.length>luoFeng.sampleWindow)row.recent.splice(0,row.recent.length-luoFeng.sampleWindow);
  }
__esmLocal45=keepRecentHit;

  const apexDamage=__captureESMFunction((__esmLocal46=((sample)=>luoFengActive()&&Array.isArray(sample?.recent)&&sample.recent.length>=2
    ?sample.recent.reduce(__captureESMFunction((__esmLocal47=((n,v)=>n+v)),""),0)/sample.recent.length
    :sample?.hits>=2&&sample.damage>0?sample.damage/sample.hits:null)),"apexDamage");
  // Apex V2: a single extreme critical hit must not dominate skill choice.
  // The displayed rolling mean remains untrimmed for transparent diagnostics.
  function apexRobustDamage(sample){
    const recent=sample?.recent;
    if(!luoFengActive()||!Array.isArray(recent)||recent.length<luoFeng.robustMinHits)
      return apexDamage(sample);
    const valid=recent.filter(__captureESMFunction((__esmLocal49=(v=>Number.isFinite(v)&&v>0)),"")).sort(__captureESMFunction((__esmLocal50=((a,b)=>a-b)),""));
    const trim=luoFeng.trimPerTail;
    if(valid.length<luoFeng.robustMinHits||valid.length<=trim*2)return apexDamage(sample);
    const kept=valid.slice(trim,valid.length-trim);
    return kept.reduce(__captureESMFunction((__esmLocal51=((sum,v)=>sum+v)),""),0)/kept.length;
  }
__esmLocal48=apexRobustDamage;

  // Apex V3 observer, read only. HP loss may be from a non-Boss source.
  const apexRhythm={key:null,hp:null,lossAt:null,sampleAt:-Infinity,losses:0,
    intervals:[],minMs:1200,maxMs:12000,debounceMs:700};
  function resetApexRhythm(){apexRhythm.key=null;apexRhythm.hp=null;
    apexRhythm.lossAt=null;apexRhythm.sampleAt=-Infinity;
    apexRhythm.losses=0;apexRhythm.intervals=[];}
__esmLocal52=resetApexRhythm;

  function observeApexRhythm(key,hp,now=Date.now()){
    if(!luoFengActive()||!key){resetApexRhythm();return;}
    if(apexRhythm.key!==key){resetApexRhythm();apexRhythm.key=key;}
    const v=Number(hp);
    if(!Number.isFinite(v)||v<0||!Number.isFinite(now)||now-apexRhythm.sampleAt<80)return;
    apexRhythm.sampleAt=now;
    if(apexRhythm.hp!==null&&v<apexRhythm.hp){
      const last=apexRhythm.lossAt,dt=last===null?null:now-last;
      if(dt===null||dt>=apexRhythm.debounceMs){
        apexRhythm.losses++;
        if(dt!==null){
          if(dt>=apexRhythm.minMs&&dt<=apexRhythm.maxMs){
            apexRhythm.intervals.push(dt);
            if(apexRhythm.intervals.length>8)apexRhythm.intervals.shift();
          }else apexRhythm.intervals=[];
        }
        apexRhythm.lossAt=now;
      }
    }
    apexRhythm.hp=v;
  }
__esmLocal53=observeApexRhythm;

  function apexRhythmReport(now=Date.now()){
    const a=apexRhythm.intervals.slice().sort(__captureESMFunction((__esmLocal55=((x,y)=>x-y)),""));
    const median=__captureESMFunction((__esmLocal56=(arr=>arr.length?arr.length%2?arr[arr.length>>1]:
      (arr[arr.length/2-1]+arr[arr.length/2])/2:null)),"median");
    const cycle=median(a),jitter=cycle===null?null:Math.max(...a.map(__captureESMFunction((__esmLocal57=(x=>Math.abs(x-cycle))),"")));
    const regular=luoFengActive()&&a.length>=3&&jitter<=Math.max(250,cycle*.15);
    const age=apexRhythm.lossAt===null?null:now-apexRhythm.lossAt;
    const predicted=regular&&age>=0&&age<=cycle?apexRhythm.lossAt+cycle:null;
    return {active:luoFengActive(),observedHpLosses:apexRhythm.losses,
      intervalSamples:a.length,estimatedCycleMs:cycle,jitterMs:jitter,
      confidence:regular?'tentative-rhythmic':'insufficient',
      predictedNextHpLossAt:predicted,msUntilPrediction:predicted===null?null:predicted-now,
      source:'player_hp_loss_unattributed',advisoryOnly:true};
  }
__esmLocal54=apexRhythmReport;

  // Apex V4: opt-in Boss-HP DPS A/B at stage 4100; does not modify native cooldown.
  const pilot4100={enabled:false,key:null,phase:'off',phaseMs:18000,
    elapsed:0,drop:0,lastHP:null,lastAt:null,combo:null,thOnly:null,
    choice:'combo',skipped:0,missing:0};
  const pilot4100Active=__captureESMFunction((__esmLocal58=(()=>pilot4100.enabled&&luoFengActive()&&
    Number(W._Ba?._Co?._Mo?.ins?.curLv)===4100&&
    __getKVPV4()?.status?.()?.kind==='THIEN_QUAN')),"pilot4100Active");
  function resetPilot4100(){
    pilot4100.key=null;pilot4100.phase=pilot4100.enabled?'waiting':'off';
    pilot4100.elapsed=0;pilot4100.drop=0;pilot4100.lastHP=null;pilot4100.lastAt=null;
    pilot4100.combo=null;pilot4100.thOnly=null;pilot4100.choice='combo';
    pilot4100.skipped=0;pilot4100.missing=0;
  }
__esmLocal59=resetPilot4100;

  const pilot4100THOnly=__captureESMFunction((__esmLocal60=(()=>pilot4100Active()&&
    (pilot4100.phase==='thOnly'||pilot4100.phase==='chosen'&&pilot4100.choice==='thOnly'))),"pilot4100THOnly");
  function observePilot4100(){
    if(!pilot4100Active()||!ST.targetKey){if(pilot4100.key!==null)resetPilot4100();return;}
    if(pilot4100.key!==ST.targetKey){resetPilot4100();pilot4100.key=ST.targetKey;pilot4100.phase='combo';}
    const hp=prop(ST.target,'hp'),now=Date.now(),
      cur=Array.isArray(hp)?Number(hp[0]):NaN,max=Array.isArray(hp)?Number(hp[1]):NaN;
    if(!Number.isFinite(cur)||!Number.isFinite(max)||max<=0||cur<0||cur>max){
      pilot4100.missing++;pilot4100.lastHP=null;pilot4100.lastAt=null;return;
    }
    const previous=pilot4100.lastHP,at=pilot4100.lastAt;
    pilot4100.lastHP=cur;pilot4100.lastAt=now;
    if(previous===null||at===null||pilot4100.phase==='chosen')return;
    const dt=now-at;
    if(dt<=0||dt>2500||!canFight()||!atPosition(role())){pilot4100.skipped++;return;}
    pilot4100.elapsed+=dt;pilot4100.drop+=Math.max(0,previous-cur);
    if(pilot4100.elapsed<pilot4100.phaseMs)return;
    const result={durationMs:pilot4100.elapsed,hpDrop:pilot4100.drop,
      observedHpDps:pilot4100.drop*1000/pilot4100.elapsed};
    if(pilot4100.phase==='combo'){
      pilot4100.combo=result;pilot4100.phase='thOnly';
      pilot4100.elapsed=0;pilot4100.drop=0;return;
    }
    if(pilot4100.phase==='thOnly'){
      pilot4100.thOnly=result;
      const a=pilot4100.combo?.observedHpDps??0,b=result.observedHpDps;
      pilot4100.choice=b>0&&b>a*1.12?'thOnly':'combo';
      pilot4100.phase='chosen';pilot4100.elapsed=0;pilot4100.drop=0;
    }
  }
__esmLocal61=observePilot4100;

  function pilot4100Status(){return {enabled:pilot4100.enabled,active:pilot4100Active(),
    phase:pilot4100.phase,bossKey:pilot4100.key,
    activeMode:pilot4100THOnly()?'thOnly':'combo',selectedMode:pilot4100.phase==='chosen'?pilot4100.choice:null,
    phaseElapsedMs:pilot4100.elapsed,phaseDurationMs:pilot4100.phaseMs,
    phaseHpDrop:pilot4100.drop,combo:pilot4100.combo,thOnly:pilot4100.thOnly,
    skippedSamples:pilot4100.skipped,missingHpSamples:pilot4100.missing,
    requirement:'TH-only must exceed combo observed HP DPS by 12% to be chosen',
    note:'Stage 4100 only; Boss HP can include other damage sources. No new casts, cooldown bypass, or range edits.'};}
__esmLocal62=pilot4100Status;

  // Solo 4100: native basics first, without changing other Tian Quan stages.
  // No extra combat dispatch and no cooldown/skill timestamp mutation.
  const basicSolo4100={enabled:false,blockedTH:0};
  // Observed Boss 4100 single-target preference; real matched-hit ranking takes over.
  const basicSolo4100Prior=Object.freeze([8005,8004,8002,8003,8001]);
  const basicSolo4100Active=__captureESMFunction((__esmLocal63=(()=>basicSolo4100.enabled&&
    Number(W._Ba?._Co?._Mo?.ins?.curLv)===4100&&tqDistanceOnly()&&
    tqFive?.active()&&luoFengActive()&&!transforming())),"basicSolo4100Active");
  function setTianQuan4100BasicSolo(enabled=true){
    basicSolo4100.enabled=enabled===true;
    if(basicSolo4100.enabled){pilot4100.enabled=false;resetPilot4100();}
    return basicSolo4100Status();
  }
__esmLocal64=setTianQuan4100BasicSolo;

  function basicSolo4100Status(){
    return {enabled:basicSolo4100.enabled,active:basicSolo4100Active(),
      stage:Number(W._Ba?._Co?._Mo?.ins?.curLv)||null,
      skillIds:[8001,8002,8003,8004,8005],startupPreference:basicSolo4100Prior.slice(),blockedTH:basicSolo4100.blockedTH,
      configuredDistance:CFG.goal,nativeCooldownPreserved:true,
      note:'Basic attacks only while stage 4100 Tian Quan is active. Native cooldown is preserved; range/hits still require confirmation.'};
  }
__esmLocal65=basicSolo4100Status;

  // Script-owned diagnostic buffers only. This cannot clear DevTools WS frames.
  const localLogCleanup={enabled:false,intervalMs:10000,nextAt:Infinity,clears:0};
  function localLogCleanupStatus(){return {enabled:localLogCleanup.enabled,
    intervalMs:localLogCleanup.intervalMs,clears:localLogCleanup.clears,
    nextInMs:localLogCleanup.enabled?Math.max(0,localLogCleanup.nextAt-Date.now()):null,
    onlyLocalDiagnostics:true,chromeDevToolsWebSocketFramesCleared:false,
    countersAndMatchedDpsPreserved:true};}
__esmLocal67=localLogCleanupStatus;

  function setLocalLogAutoClear(enabled=true,intervalMs=10000){
    if(!Number.isInteger(intervalMs)||intervalMs<1000||intervalMs>120000)
      throw Error('Local-log interval must be 1000..120000ms');
    localLogCleanup.enabled=enabled===true;localLogCleanup.intervalMs=intervalMs;
    localLogCleanup.nextAt=localLogCleanup.enabled?Date.now()+intervalMs:Infinity;
    return localLogCleanupStatus();
  }
__esmLocal68=setLocalLogAutoClear;

  function localLogCleanupSync(){
    if(!localLogCleanup.enabled||Date.now()<localLogCleanup.nextAt)return;
    localLogCleanup.nextAt=Date.now()+localLogCleanup.intervalMs;
    ST.history.length=0;dispatch.recent.length=0;hitDiagnostics.recent.length=0;
    localLogCleanup.clears++;
  }
__esmLocal70=localLogCleanupSync;

  const cosmicActive=__captureESMFunction((__esmLocal71=(()=>cosmic.enabled&&tqFive?.active()&&!transforming()&&ST.running)),"cosmicActive");
  function cosmicReset(){cosmic.thCasts=0;cosmic.basicCasts=0;cosmic.lastNativeAt=null;cosmic.lastNativeSkill=null;
    cosmic.thMeasured.clear();cosmic.thRanked=0;cosmic.basicRanked=0;cosmic.exploration=0;
    luoFeng.lastExploreTH=-1;luoFeng.lastExploreBasic=-1;resetApexRhythm();resetPilot4100();}
__esmLocal72=cosmicReset;

  const cosmicScore=__captureESMFunction((__esmLocal73=((map,id)=>apexRobustDamage(map.get(Number(id))))),"cosmicScore");
  function cosmicRank(rows,kind,fallback){
    if(!cosmicActive()||thGap.picking)return rows.sort(fallback);
    const samples=kind==='th'?cosmic.thMeasured:thGap.measured,
      casts=kind==='th'?cosmic.thCasts:cosmic.basicCasts,explore=casts>0&&casts%7===6;
    if(explore){
      const key=kind==='th'?'lastExploreTH':'lastExploreBasic';
      if(!luoFengActive()||luoFeng[key]!==casts){
        cosmic.exploration++;if(luoFengActive())luoFeng[key]=casts;
      }
    }else if(kind==='th')cosmic.thRanked++;else cosmic.basicRanked++;
    return rows.sort(__captureESMFunction((__esmLocal75=((a,b)=>{
      const aid=Number(a[0]),bid=Number(b[0]),ah=samples.get(aid)?.hits||0,bh=samples.get(bid)?.hits||0;
      if(explore&&ah!==bh)return ah-bh;
      if(!explore){const as=cosmicScore(samples,aid),bs=cosmicScore(samples,bid);
        if(as!==null||bs!==null){if(as===null)return 1;if(bs===null)return -1;if(as!==bs)return bs-as;}}
      return fallback(a,b);
    })),""));
  }
__esmLocal74=cosmicRank;

  // One native-ready basic may fill the TH visual tail without touching server cooldown.
  const thGap={enabled:false,windowMs:1200,lastAt:-Infinity,lastTarget:'',lastSerial:0,picking:false,attempts:0,accepted:0,blockedCooldown:0,lastBasic:null,measured:new Map()};
  function resetThGap(){thGap.lastAt=-Infinity;thGap.lastTarget='';thGap.lastSerial=0;thGap.picking=false;thGap.lastBasic=null;thGap.measured.clear();}
__esmLocal76=resetThGap;

  function thGapActive(c=role().c){return thGap.enabled&&tqDistanceOnly()&&ST.running&&tqFive?.active()&&tqFive.allowsTuyetHoc()&&!transforming()&&
    ST.targetKey===thGap.lastTarget&&thGap.lastSerial===ST.castAttempts&&Date.now()-thGap.lastAt>=0&&Date.now()-thGap.lastAt<=thGap.windowMs&&
    animationPlaying(c)&&canFight()&&castReady();}
__esmLocal77=thGapActive;

  const thGapNativeReady=__captureESMFunction((__esmLocal78=(c=>typeof c?.isCooldown==='function'&&c.isCooldown()===false)),"thGapNativeReady");
  function strongestThGapBasic(){const rows=basicRotation().map(__captureESMFunction((__esmLocal80=(id=>({id,...(thGap.measured.get(id)||{hits:0,damage:0})}))),"")).filter(__captureESMFunction((__esmLocal81=(r=>r.hits>=2)),""));
    rows.sort(__captureESMFunction((__esmLocal82=((a,b)=>(apexRobustDamage(b)??0)-(apexRobustDamage(a)??0)||a.id-b.id)),""));return rows[0]?.id??null;}
__esmLocal79=strongestThGapBasic;


  const tqFive=__getKVPV15()?.create?.({scope:__captureESMFunction((__esmLocal83=(()=>__getKVPV4()?.status?.()?.kind??(__getKVPV17()?.inside?.()===true?'THIEN_QUAN':'OUTSIDE'))),"scope"),context:__captureESMFunction((__esmLocal84=(()=>scene()+'/'+identity(role().c?.target))),"context"),phase:__captureESMFunction((__esmLocal85=(()=>combatOwner()?.phase)),"phase"),hp:__captureESMFunction((__esmLocal86=(()=>{const h=prop(role().a,'hp');return Array.isArray(h)&&Number(h[1])>0?Number(h[0])/Number(h[1])*100:null;})),"hp"),learned:__captureESMFunction((__esmLocal87=(()=>[...(role().s?._rtt??[]),...(role().s?._wet??[])].map(__captureESMFunction((__esmLocal88=(r=>Number(r?.[0]))),"")))),"learned")})??null;
    for(const key of ['goal','min','max','scanMs']){const descriptor=Object.getOwnPropertyDescriptor(CFG,key);let base=CFG[key];Object.defineProperty(CFG,key,{enumerable:true,configurable:true,get(){
__esmLocal89=__captureESMMethod(this,"get","init");
if(tqDistanceOnly()&&key!=='scanMs')return key==='goal'?310:key==='min'?300:320;if(key==='scanMs'&&tqFive?.active())return Math.max(1,tqFive.wait());return descriptor.get?descriptor.get():base;},set(value){
__esmLocal90=__captureESMMethod(this,"set","init");
if(descriptor.set)descriptor.set(value);else base=value;}});}

  const isBasic=__captureESMFunction((__esmLocal91=(id=>Number.isSafeInteger(Number(id))&&Number(id)>=8001&&Number(id)<=8009)),"isBasic");

  const excludedBasics=new Set([8002]);

  const selectedBasic=__captureESMFunction((__esmLocal92=(id=>tqFive?.active()?tqFive.ids().includes(Number(id)):!excludedBasics.has(Number(id))&&(!mixed.primary||!mixed.rotation.length||mixed.rotation.includes(Number(id))))),"selectedBasic");

  function learnedBasics(){const s=role().s;return [...new Set([...(s?._rtt??[]),...(s?._wet??[])].map(__captureESMFunction((__esmLocal94=(r=>Number(r?.[0]))),"")).filter(__captureESMFunction((__esmLocal95=(id=>isBasic(id)&&(tqFive?.active()||!excludedBasics.has(id)))),"")))].sort(__captureESMFunction((__esmLocal96=((a,b)=>a-b)),""));}
__esmLocal93=learnedBasics;


  function ensureTianQuanRotation(){
    if(__getKVPV4()?.status?.()?.kind!=='THIEN_QUAN'||!tqFive)return;
    const ids=[8001,8002,8003,8004,8005],p=tqFive.report();
    // A configured Tuyet Hoc burst owns its selection policy. Do not replace
    // its chosen basic roster or re-enable mixed basic-first rotation per tick.
    if(burst.enabled&&p.enabled&&p.tuyetHocEnabled&&p.waitClientMs===0){
      mixed.enabled=false;mixed.wantBasic=false;return;
    }
    if(p.enabled&&p.waitClientMs===0&&p.tuyetHocEnabled&&ids.every(__captureESMFunction((__esmLocal98=(id=>p.ids.includes(id))),""))&&
       mixed.enabled&&mixed.primary&&mixed.basicPaceMs===0&&mixed.rotation.length===ids.length&&
       ids.every(__captureESMFunction((__esmLocal99=(id=>mixed.rotation.includes(id))),"")))return;
    tqFive.configure(true,0,ids);tqFive.setTuyetHoc(true);
    mixed.enabled=true;mixed.primary=true;mixed.primaryStreak=0;mixed.rotation=ids.slice();
    mixed.rotationCursor=0;mixed.wantBasic=true;mixed.suspended=false;mixed.basicPaceMs=0;mixed.ready.clear();
    CFG.clientPaceMs=0;CFG.afterTHWaitMs=0;
  }
__esmLocal97=ensureTianQuanRotation;

  function basicRotation(){const learned=learnedBasics();return (tqFive?.active()?tqFive.ids():mixed.rotation).filter(__captureESMFunction((__esmLocal101=(id=>learned.includes(id))),""));}
__esmLocal100=basicRotation;


  function basicQuota(){return basicRotation().length||3;}
__esmLocal102=basicQuota;


  function primaryBasicId(){const order=basicRotation();return order.length?order[mixed.rotationCursor%order.length]:learnedBasics()[0]??null;}
__esmLocal103=primaryBasicId;

  const burst={enabled:false,dispatch:false,desired:null,nextAt:0,serial:0,active:null,lastPass:null,history:[]};

  const hitDiagnostics={received:0,accepted:0,rejected:{},recent:[]};

  let confirmedTailCut=false,confirmedTailCuts=0;

  function setConfirmedTailCut(enabled=true){confirmedTailCut=!!enabled;return {enabled:confirmedTailCut,onlyAfterMatchedHit:true};}
__esmLocal111=setConfirmedTailCut;


  

  const dispatch={actor:null,pending:null,calls:0,signals:0,silent:0,recent:[]};

  const speedClips=new Map();
  let thVisualCalls=0,thVisualScaled=0,thVisualUnavailable=0,thVisualLastSkill=null;
  let tqBasicVisualCalls=0,tqBasicVisualScaled=0,tqBasicVisualUnavailable=0,tqBasicVisualLastSkill=null;

  function restoreSpeedClips(){for(const [clip,s]of speedClips)try{if(clip?._nt===s.applied||clip?.timeScale===s.applied)clip.timeScale=s.before;}catch(e){ST.lastError=String(e);}speedClips.clear();}
__esmLocal117=restoreSpeedClips;


  function animationCall(native,self,args){
    const id=Number(args[0]),avatar=self?._Qrt,
      scope=__getKVPV4()?.status?.()?.kind,inTower=['THIEN_QUAN','LINH_LUNG','PHU_VAN'].includes(scope),
      inTQ=scope==='THIEN_QUAN'&&tqFive?.active()&&ST.running,
      thVisual=id>=1001&&id<=1008&&inTQ&&tqFive.allowsTuyetHoc()===true&&CFG.tqTuyetHocVisualSpeed>1,
      tqBasicVisual=inTQ&&id>=8001&&id<=8005&&CFG.tqBasicVisualSpeed>1,
      towerSkillVisual=inTower&&!isBasic(id)&&candidate(id)&&CFG.basicAnimationSpeed>1,
      towerBasicVisual=inTower&&id>=8001&&id<=8005&&CFG.basicAnimationSpeed>1,
      basicVisual=id===8001&&CFG.basicOnly,
      factor=thVisual?CFG.tqTuyetHocVisualSpeed:tqBasicVisual?CFG.tqBasicVisualSpeed:CFG.basicAnimationSpeed;
    if(factor<=1||(!thVisual&&!tqBasicVisual&&!towerSkillVisual&&!towerBasicVisual&&!basicVisual)||self.owner!==dispatch.actor||
       !canFight()||typeof avatar?.getActionTween!=='function')return native.apply(self,args);
    let action;try{action=self._mvt?.(id)?.[5];}catch(_){action=null;}
    if(thVisual){thVisualCalls++;thVisualLastSkill=id;}
    if(tqBasicVisual){tqBasicVisualCalls++;tqBasicVisualLastSkill=id;}
    // For the Tian Quan 13-skill roster, never guess which action belongs to the skill.
    if((thVisual||tqBasicVisual||towerSkillVisual||towerBasicVisual)&&(typeof action!=='string'||!action.trim())){
      if(thVisual)thVisualUnavailable++;
      if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    const original=avatar.getActionTween,expectedAction=String(action||'attack');
    const wrapped=__captureESMFunction((__esmLocal123=(function(...a){
      if(a[0]!==expectedAction)return original.apply(this,a);
      const before=Number(a[2]??1);if(!Number.isFinite(before)||before<=0)return original.apply(this,a);
      a[2]=Math.min(factor,before*factor);
      const tween=original.apply(this,a),clip=this.getCurAction;
      if(clip&&typeof clip==='object'&&speedClips.size<32)speedClips.set(clip,{before,applied:a[2]});
      if(thVisual)thVisualScaled++;
      else if(tqBasicVisual)tqBasicVisualScaled++;
      else if(towerSkillVisual)ST.scaledTowerSkillAnimations++;
      else if(towerBasicVisual)ST.scaledTowerBasicAnimations++;
      else ST.scaledBasicAnimations=(ST.scaledBasicAnimations??0)+1;
      return tween;
    })),"wrapped");
    // Avoid overwriting unexpected non-writable instance hooks.
    const own=Object.getOwnPropertyDescriptor(avatar,'getActionTween');
    if(own&&own.writable===false&&own.configurable===false){
      if(thVisual)thVisualUnavailable++;if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    try{avatar.getActionTween=wrapped;}catch(_){
      if(thVisual)thVisualUnavailable++;if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    if(avatar.getActionTween!==wrapped){
      if(thVisual)thVisualUnavailable++;if(tqBasicVisual)tqBasicVisualUnavailable++;
      return native.apply(self,args);
    }
    try{return native.apply(self,args);}
    finally{if(avatar.getActionTween===wrapped){
      if(own&&'value' in own&&own.writable===true){
        avatar.getActionTween=original;
        Object.defineProperty(avatar,'getActionTween',own);
      }else if(own)Object.defineProperty(avatar,'getActionTween',own);
      else delete avatar.getActionTween;
    }}
  }
__esmLocal122=animationCall;

  function onNativeCast(targetId,skillId){const p=dispatch.pending;if(p){if(p.events.length<4)p.events.push({targetId:String(targetId),id:Number(skillId)});if(String(targetId)===p.targetId&&Number(skillId)===p.id)p.signaled=true;}}
__esmLocal124=onNativeCast;


  function detachDispatch(){if(dispatch.actor){dispatch.actor.off?.(1039,ST.owner,onNativeCast);dispatch.actor=null;}}
__esmLocal125=detachDispatch;


  function attachDispatch(a){if(dispatch.actor===a)return;detachDispatch();if(typeof a?.on==='function'&&typeof a?.off==='function'){a.on(1039,ST.owner,onNativeCast);dispatch.actor=a;}}
__esmLocal126=attachDispatch;


  function invokeNative(native,self,args){

    if(!ST.running||!dispatch.actor)return native.apply(self,args);

    

    

    dispatch.actor.off(1039,ST.owner,onNativeCast);dispatch.actor.on(1039,ST.owner,onNativeCast);

    const pending={id:Number(args[0]),targetId:identity(self.target),signaled:false,events:[]};dispatch.pending=pending;dispatch.calls++;

    try{return animationCall(native,self,args);}finally{

      if(pending.signaled){dispatch.signals++;
        if(ST.targetKey===identity(self.target)+'/'+String(prop(self.target,'occ'))+'/'+scene()){
          cosmic.lastNativeAt=Date.now();cosmic.lastNativeSkill=pending.id;
          if(isBasic(pending.id))cosmic.basicCasts++;
          else if(pending.id>=1001&&pending.id<=1008)cosmic.thCasts++;
        }
        if(thGap.picking&&isBasic(pending.id)){thGap.accepted++;thGap.lastBasic=pending.id;}
        if(pending.id>=1001&&pending.id<=1008){ST.lastTHAt=Date.now();thGap.lastAt=ST.lastTHAt;
          thGap.lastTarget=ST.targetKey;thGap.lastSerial=ST.castAttempts;}if(mixed.hitQuota!==null&&pending.id>=1001&&pending.id<=1008){mixed.confirmedSinceTH=0;mixed.thCycles++;mixed.wantBasic=true;}}else dispatch.silent++;

      let silentDetail=null;

      if(!pending.signaled){

        let effect=null,effectError='';try{if(typeof self._mvt==='function')effect=!!self._mvt(pending.id);}catch(e){effectError=String(e?.message||e);}

        silentDetail={ownerId:identity(self.owner),ownerType:prop(self.owner,'type'),ownerMatchesActor:self.owner===dispatch.actor,

          validTarget:self.isValidTarget?.()??null,effectAvailable:effect,effectError,

          nativeFunction:Function.prototype.toString.call(native).slice(0,240)};

      }

      dispatch.recent.push({at:Date.now(),id:pending.id,targetId:pending.targetId,signaled:pending.signaled,events:pending.events,silentDetail});if(dispatch.recent.length>16)dispatch.recent.shift();

      dispatch.pending=null;

    }

  }
__esmLocal127=invokeNative;


  const prop=__captureESMFunction((__esmLocal128=((o,k)=>{try{return o?.property?.get?.(k)??null;}catch(_){return null;}})),"prop");

  const identity=__captureESMFunction((__esmLocal129=(o=>String(prop(o,'id')??o?.id??''))),"identity");

  const loc=__captureESMFunction((__esmLocal130=(o=>{const p=prop(o,'position');const x=Number(p?.x),y=Number(p?.y);return Number.isFinite(x)&&Number.isFinite(y)?{x,y}:null;})),"loc");

  const radius=__captureESMFunction((__esmLocal131=((a,b)=>{const p=loc(a),q=loc(b);return p&&q?Math.hypot(p.x-q.x,p.y-q.y):null;})),"radius");

  

  function role(){const world=W._C?._Ba?.instance;const a=world?.getRole?.(Number(actorId))??world?.getRole?.(actorId);return {a,s:a?.getComponent?.(Skill),c:a?.getComponent?.(Combat),m:a?.getComponent?.(Move)};}
__esmLocal132=role;


  

  function stageOcc(){if(['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(__getKVPV4()?.status?.().kind)){const t=role().c?.target;return __callKVPV1(t)?Number(prop(t,'occ')):null;}try{const lv=Number(W._Ba?._Co?._Mo?.ins?.curLv),c=W._ft?._h$?.ins?.getCfgByLv?.(lv);const n=c?Number(W._ft._h$.ins.occ(c,lv)):NaN;return Number.isSafeInteger(n)&&n>0?n:null;}catch(_){return null;}}
__esmLocal133=stageOcc;


  function eligible(t){if(!t||t.isValid===false)return false;const scope=__getKVPV4()?.status?.();const type=Number(prop(t,'type'));if(type!==1&&!(scope?.inside&&scope.kind==='TRU_TIEN'&&type===3))return false;return stageOcc()!==null&&Number(prop(t,'occ'))===stageOcc();}
__esmLocal134=eligible;


  function key(occ,id){return String(occ)+'/'+String(id);}
__esmLocal135=key;


  const scene=__captureESMFunction((__esmLocal136=(()=>String(W._Ba?._$a?._yo?.ins?.intoSce?.[0]??''))),"scene");

  

  function skill1008Info(show=true){
    const read=__captureESMFunction((__esmLocal138=(fn=>{try{return fn()??null;}catch{return null;}})),"read");
    const pack=__captureESMFunction((__esmLocal139=((v,depth=0)=>{if(v===null||['number','string','boolean'].includes(typeof v))return v;if(depth>=3)return null;if(Array.isArray(v))return v.slice(0,96).map(__captureESMFunction((__esmLocal140=(x=>pack(x,depth+1))),""));return null;})),"pack");
    const r=read(__captureESMFunction((__esmLocal141=(()=>role())),"")),learned=read(__captureESMFunction((__esmLocal142=(()=>W._Ba?._rJ?._O$?.ins?.skills)),"")),row=Array.isArray(learned)?learned.find(__captureESMFunction((__esmLocal143=(x=>Number(x?.[0])===1008)),"")):null,level=Number(row?.[1]);
    const native=read(__captureESMFunction((__esmLocal144=(()=>r?.c?._mvt?.(1008))),"")),table=Number.isFinite(level)&&level>0?read(__captureESMFunction((__esmLocal145=(()=>W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(1008,level))),"")):null;
    const result={skillId:1008,at:Date.now(),level:Number.isFinite(level)?level:null,name:typeof (native??table)?.[2]==='string'?(native??table)[2]:null,nativeConfigRaw:pack(native),learnedLevelConfigRaw:pack(table),selectorRows:[r?.s?._rtt,r?.s?._wet].flatMap(__captureESMFunction((__esmLocal146=(x=>Array.isArray(x)?x:[])),"")).filter(__captureESMFunction((__esmLocal147=(x=>Number(x?.[0])===1008)),"")).map(__captureESMFunction((__esmLocal148=(x=>pack(x))),"")),observed:metrics?.report()?.current?.skills?.find(__captureESMFunction((__esmLocal149=(x=>x.id===1008)),""))??null,effectInterpretation:'Raw native/learned-level config only. Unmapped columns are not interpreted as buffs, duration, range or damage. No confirmed buff-effect mapping available.'};
    if(show)console.log('[Skill 1008]',result);return result;
  }
__esmLocal137=skill1008Info;

  function candidate(id){

    if(__getKVPV19()?.transformed?.())return __callKVPV2(id);

    if(!Number.isSafeInteger(id)||id<=0||(id>=8001&&id<=8009))return false;

    const r=role();return [r.s?._rtt,r.s?._wet].some(__captureESMFunction((__esmLocal158=(rows=>Array.isArray(rows)&&rows.some(__captureESMFunction((__esmLocal159=(row=>Number(row?.[0])===id)),"")))),""));

  }
__esmLocal157=candidate;

  const isTuyetHocSkill=__captureESMFunction((__esmLocal160=(id=>Number.isSafeInteger(Number(id))&&Number(id)>=1001&&Number(id)<=1008)),"isTuyetHocSkill");
  const tianQuanThMode=__captureESMFunction((__esmLocal161=(()=>['SCAN','STRICT'].includes(ST.mode)&&
    __getKVPV18()===true&&
    ['BOSS_TH300_SCAN','BOSS_TH300'].includes(__getKVPV6()?.status?.(false)?.mode)&&
    __getKVPV4()?.status?.()?.kind==='THIEN_QUAN')),"tianQuanThMode");
  function tuyetHocCalibration(occ=ST.targetOcc){
    const roster=skillNames().map(__captureESMFunction((__esmLocal163=(x=>Number(x.id))),"")).filter(isTuyetHocSkill);
    const rows=roster.map(__captureESMFunction((__esmLocal164=(id=>{const m=stats(occ,id);return {id,hits:m.hits,attempts:m.attempts,unconfirmed:m.unconfirmed,
      averageDamage:m.hits?m.damage/m.hits:0,verified:verified(occ,id),verifiedDistance:supportedDistance(occ,id)};})),""));
    const complete=rows.length>0&&rows.every(__captureESMFunction((__esmLocal165=(x=>x.hits>=thCalibration.minHitsPerSkill||x.unconfirmed>=thCalibration.maxUnconfirmedPerSkill)),""));
    const eligible=rows.filter(__captureESMFunction((__esmLocal166=(x=>x.hits>=thCalibration.minHitsPerSkill&&x.verified&&x.verifiedDistance>=300)),""))
      .sort(__captureESMFunction((__esmLocal167=((a,b)=>b.averageDamage-a.averageDamage||a.id-b.id)),""));
    return {complete,locked:thCalibration.autoLocked,selectedSkillId:thCalibration.skillId,
      minHitsPerSkill:thCalibration.minHitsPerSkill,rows,best:eligible[0]??null,
      reason:thCalibration.reason};
  }
__esmLocal162=tuyetHocCalibration;

  function updateTuyetHocCalibration(){
    if(!tianQuanThMode()||ST.mode!=='SCAN'||thCalibration.autoLocked)return;
    const result=tuyetHocCalibration();if(!result.complete)return;
    thCalibration.autoLocked=true;thCalibration.skillId=result.best?.id??null;
    thCalibration.completedAt=Date.now();thCalibration.reason=result.best?
      'locked_highest_confirmed_average_damage':'no_skill_confirmed_at_scan_range';
    ST.mode='STRICT';ST.skillCursor=0;
    note('TUYET_HOC_LOCKED',{skillId:thCalibration.skillId,averageDamage:result.best?.averageDamage??null,
      measured:result.rows.map(__captureESMFunction((__esmLocal169=(x=>({id:x.id,hits:x.hits,unconfirmed:x.unconfirmed,averageDamage:x.averageDamage,verifiedDistance:x.verifiedDistance}))),""))});
  }
__esmLocal168=updateTuyetHocCalibration;


  

  // MPACK is a game-wide database, NOT a list of equippable player skills.
  // Only select learned player active skills already offered by native selector.
  // Passive 3021/3031 and their proc-generated 3022/3032 are not manual casts.
  const tqMpack={enabled:true};
  const hangMaSkillName=__captureESMFunction((__esmLocal170=(id=>{
    const learned=(W._Ba?._rJ?._O$?.ins?.skills??[]),level=Number(learned.find(__captureESMFunction((__esmLocal171=(row=>Number(row?.[0])===Number(id))),""))?.[1]);
    if(!Number.isSafeInteger(level)||level<1)return false;
    let name='';try{name=String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(Number(id),level)?.[2]??'');}catch(_){}
    const normalized=name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    return normalized.includes('hang ma chan quyet');
  })),"hangMaSkillName");
  function tqMpackExtraAllowed(value){
    const id=Number(value);
    if(!tqMpack.enabled||!tqFive?.active()||!tqFive.allowsTuyetHoc()||
       basicSolo4100Active()||transforming()||
       __getKVPV4()?.status?.()?.kind!=='THIEN_QUAN'||
       !Number.isSafeInteger(id)||id<1||isBasic(id)||id>=1001&&id<=1008)return false;
    if(!candidate(id)||!hangMaSkillName(id))return false;
    // Real native _c7t() builds selector rows from _vX.ins.skills, not
    // the parallel player model which can be incomplete or stale.
    const nativeList=(typeof _vX!=='undefined'?_vX?.ins?.skills:null)??W._vX?.ins?.skills;
    const playerList=W._Ba?._rJ?._O$?.ins?.skills;
    const learned=Array.isArray(nativeList)?nativeList:playerList;
    const entry=Array.isArray(learned)?learned.find(__captureESMFunction((__esmLocal173=(row=>Number(row?.[0])===id)),"")):null;
    const lv=Number(entry?.[1]);
    if(!entry||!Number.isSafeInteger(lv)||lv<1)return false;
    let cfg;
    try{cfg=W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,lv);}catch(_){return false;}
    if(!Array.isArray(cfg)||Number(cfg[1])!==id||Number(cfg[4])!==1||
       /chủ động\s*$/i.test(String(cfg[2]??'')))return false;
    const maps=cfg[17];
    if(Array.isArray(maps)&&maps.length&&
       !maps.some(__captureESMFunction((__esmLocal174=(m=>Number(m)===Number(scene()))),"")))return false;
    return true;
  }
__esmLocal172=tqMpackExtraAllowed;

  function tqActiveExtraIds(){
    if(!tqMpack.enabled||!tqFive?.active()||!tqFive.allowsTuyetHoc()||
       __getKVPV4()?.status?.()?.kind!=='THIEN_QUAN')return [];
    const r=role();
    const ids=[...new Set([r.s?._rtt,r.s?._wet].flatMap(__captureESMFunction((__esmLocal176=(rows=>
       Array.isArray(rows)?rows.map(__captureESMFunction((__esmLocal177=(row=>Number(row?.[0]))),"")):[])),"")))];
    return ids.filter(tqMpackExtraAllowed).sort(__captureESMFunction((__esmLocal178=((a,b)=>a-b)),""));
  }
__esmLocal175=tqActiveExtraIds;

  // The native Tuyet Hoc roster is the complete 1001..1008 group. Do not
  // filter that roster by the name of one specific skill (1007); native row
  // presence is the eligibility check. Extra MPACK rows remain name/config gated.
  const tqSelectableNative=__captureESMFunction((__esmLocal179=(id=>{
    const skillId=Number(id);
    return isTuyetHocSkill(skillId)?candidate(skillId):tqMpackExtraAllowed(skillId)&&hangMaSkillName(skillId);
  })),"tqSelectableNative");
  function setTianQuanMpackExtras(enabled=true){
    tqMpack.enabled=enabled===true;
    return {enabled:tqMpack.enabled,extraIds:tqActiveExtraIds(),nativeOnly:true};
  }
__esmLocal180=setTianQuanMpackExtras;

  function bossRange(){const cfg=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(role().c?.target,'occ')))?.[3])||0;

    const observed=Number(__getKVPV5()?.status?.(false)?.observedDangerRadius)||0;return Math.max(cfg,observed);}
__esmLocal181=bossRange;


  

  function outside(d){return Number.isFinite(d)&&d>CFG.min&&d<=CFG.max;}
__esmLocal182=outside;


  

  

  function combatOwner(){

    return tqDistanceOnly()?{running:true,phase:'FIGHT',owner:'TQ_DISTANCE_ONLY',leavePct:0}:
      __getKVPV5()?.status?.(false);

  }
__esmLocal183=combatOwner;


  

  function towerFinish(){

    const threshold=null;

    if(threshold===null)return false;

    const t=role().c?.target,h=prop(t,'hp'),current=Number(h?.[0]),max=Number(h?.[1]);

    return eligible(t)&&Array.isArray(h)&&Number.isFinite(current)&&Number.isFinite(max)&&max>0&&current>0&&current/max<=threshold;

  }
__esmLocal184=towerFinish;


  function canFight(){if(W._Ba?._rJ?._O$?.ins?.isDead===true||(__getKVPV4()??__getKVPV17())?.inside?.()===false)return false;const hr=combatOwner(),r=role(),hp=prop(r.a,'hp');

    const pct=Array.isArray(hp)&&Number(hp[1])>0?Number(hp[0])/Number(hp[1])*100:hr?.hpPct;

    return hr?.running===true&&hr.phase==='FIGHT'&&Number.isFinite(pct)&&pct>Number(hr.leavePct??35)&&r.m?._fut!==3&&r.m?._fut!==4;}
__esmLocal185=canFight;


  function stats(occ,id){const k=key(occ,id);if(!ST.stats.has(k))ST.stats.set(k,{attempts:0,hits:0,damage:0,unconfirmed:0});return ST.stats.get(k);}
__esmLocal186=stats;


  

  function settle(c,hit){pacer?.observe(hit,c.tuningEligible===true&&canFight()&&atPosition(role())&&c.targetId===identity(role().c?.target)&&c.scene===scene());}
__esmLocal187=settle;


  

  function expire(){const t=Date.now();for(const c of ST.casts)if(!c.used&&t-c.time>CFG.castTtlMs){c.used=true;stats(c.occ,c.id).unconfirmed++;metrics?.result(c.serial,false,0,c.metricsInterrupted===true);

      if(c.mixedBasic&&!c.metricsInterrupted&&c.targetId===identity(ST.target)&&!tqFive?.active()){mixed.unconfirmed++;if(mixed.hits===0&&mixed.unconfirmed>=3&&!mixed.suspended){mixed.suspended=true;mixed.wantBasic=false;note('BASIC-SUSPENDED',{reason:'three_unconfirmed_basic_results',bossId:c.targetId});}}

      settle(c,false);}}
__esmLocal188=expire;


  

  function supportedDistance(occ,id){const a=(ST.evidence.get(key(occ,id))||[]).map(__captureESMFunction((__esmLocal190=(x=>Math.min(x.castDistance,x.hitDistance))),"")).sort(__captureESMFunction((__esmLocal191=((a,b)=>b-a)),""));return a[CFG.minCastConfirmations-1]??0;}
__esmLocal189=supportedDistance;


  

  function verified(occ,id){return (ST.proofs.get(key(occ,id))?.size||0)>=CFG.minCastConfirmations;}
__esmLocal192=verified;


  

  // Keep unresolved hit records; after a completed native cycle they need not stall the next basic.

  function basicPendingBlocks(c){const combat=role().c;if(tqFive?.active())return animationPlaying(combat);if(CFG.basicOnly)return animationPlaying(combat)||combat?.isCooldown?.()!==false;if(mixed.hitQuota===null)return true;const rows=[...(role().s?._rtt||[]),...(role().s?._wet||[])];const row=rows.find(__captureESMFunction((__esmLocal195=(r=>Number(r[0])===c.id)),""));const wait=Math.max(500,Number(row?.[2])||0);return Date.now()-c.time<wait||animationPlaying(combat)||combat?.isCooldown?.()!==false;}
__esmLocal194=basicPendingBlocks;


  
  const basicQuotaSatisfied=__captureESMFunction((__esmLocal196=(id=>mixed.suspended||mixed.hitQuota===null||Number(id)<1001||Number(id)>1008||mixed.confirmedSinceTH>=mixed.hitQuota)),"basicQuotaSatisfied");
  function allowed(id,occ,d){const transformSkill=isTransformSkill(id);if(!transformSkill&&tianQuanThMode()&&(!isTuyetHocSkill(Number(id))||ST.mode==='STRICT'&&thCalibration.autoLocked&&Number(id)!==thCalibration.skillId))return false;if(!transformSkill&&tqFive?.active()&&(isBasic(id)?!tqFive.ids().includes(Number(id)):!tqFive.allowsTuyetHoc()||!tqSelectableNative(id)))return false;if(isBasic(id))return selectedBasic(id)&&(tqFive?.active()||mixed.enabled&&!mixed.suspended)&&[role().s?._rtt,role().s?._wet].some(__captureESMFunction((__esmLocal198=(rows=>Array.isArray(rows)&&rows.some(__captureESMFunction((__esmLocal199=(row=>Number(row?.[0])===Number(id))),"")))),""))&&

    !ST.casts.some(__captureESMFunction((__esmLocal200=(c=>!c.used&&c.basicCast&&basicPendingBlocks(c)&&c.id===Number(id)&&c.targetId===identity(role().c?.target)&&c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs)),""));

    return (isTransformSkill(id)||basicQuotaSatisfied(id))&&candidate(Number(id))&&

    !((burst.enabled||pacer)&&!transforming()&&(__captureESMFunction((__esmLocal201=(()=>{
      const pending=ST.casts.filter(__captureESMFunction((__esmLocal202=(c=>!c.used&&c.id===Number(id)&&
        c.targetId===identity(role().c?.target)&&c.scene===scene()&&
        Date.now()-c.time<=CFG.castTtlMs)),""));
      if(!pending.length)return false;
      const allowedRetry=tqNativeReadyRepeat(Number(id),pending);
      if(!allowedRetry&&tqIdleFill.enabled&&tqFive?.active()&&tqDistanceOnly()&&
        Number(id)>=1001&&Number(id)<=1008)tqIdleFill.deniedPending++;
      return !allowedRetry;
    })),""))())&&

    (ST.mode==='SCAN'||(verified(occ,id)&&Number.isFinite(d)&&d<=supportedDistance(occ,id)+0.01));}
__esmLocal197=allowed;


  // Native skill readiness wins over delayed damage observation only in TQ SCAN.
  // Limit overlapping pending records to avoid a 1ms flood when the browser
  // exposes a ready row but the server has not confirmed any of the attempts.
  function tqNativeReadyRepeat(id,pending){
    if(!tqIdleFill.enabled||ST.mode!=='SCAN'||!tqFive?.active()||
      !tqDistanceOnly()||!Number.isSafeInteger(id)||id<1001||id>1008)return false;
    if(pending.length>=tqIdleFill.maxPendingPerTH)return false;
    const r=role(),now=Date.now(),c=r.c;
    if(typeof c?.isCooldown!=='function'||c.isCooldown()!==false||
       animationPlaying(c)||!castReady())return false;
    const row=[...(r.s?._rtt??[]),...(r.s?._wet??[])].find(__captureESMFunction((__esmLocal204=(x=>Number(x?.[0])===id)),""));
    // Native selector may advance row[1] before combat(id) executes. A one-shot
    // selection token carries proof it chose this exact ID from a ready row.
    const token=ST.tqSelectedNative;
    const selectedNow=token?.id===id&&token.targetId===identity(c?.target)&&
      token.scene===scene()&&now-token.at>=0&&now-token.at<=40;
    if(!row||!Number.isFinite(Number(row[1]))||
      (Number(row[1])>=now&&!selectedNow))return false;
    const duration=Number(row[2]);
    const minGap=Math.max(tqIdleFill.minRepeatMs,
      Number.isFinite(duration)&&duration>0?Math.min(1000,duration):0);
    return now-Math.max(...pending.map(__captureESMFunction((__esmLocal205=(x=>x.time)),"")))>=minGap;
  }
__esmLocal203=tqNativeReadyRepeat;

  

  function targetDistance(){
    if(tqDistanceOnly())return 310;
    if(tqFive?.active())return CFG.goal;

    if(ST.mode!=='STRICT')return CFG.goal;

    const occ=stageOcc(),distances=skillNames().filter(__captureESMFunction((__esmLocal207=(x=>verified(occ,x.id))),"")).map(__captureESMFunction((__esmLocal208=(x=>supportedDistance(occ,x.id))),""));

    if(!distances.length)return null;

    return Math.min(CFG.goal,Math.max(...distances)-0.2);

  }
__esmLocal206=targetDistance;


  

  function note(type,data){ST.history.push({time:Date.now(),type,data});if(ST.history.length>60)ST.history.shift();}
__esmLocal209=note;


  

  function restore(h){if(!h)return;const {obj,k,fn,own}=h;if(obj[k]!==fn){ST.lastError='Hook replaced externally: '+k;return;}try{if(own)Object.defineProperty(obj,k,own);else delete obj[k];}catch(e){ST.lastError=String(e);}}
__esmLocal210=restore;


  

  function hook(obj,k,mk){

    if(typeof obj?.[k]!=='function')return null;

    let own=Object.getOwnPropertyDescriptor(obj,k);if(own&&!own.configurable)return null;

    let base=obj[k];const seen=new Set();

    

    while(typeof base?.__KVPV_TH300_PARENT==='function'&&!seen.has(base)){seen.add(base);base=base.__KVPV_TH300_PARENT;}

    const legacy=__captureESMFunction((__esmLocal212=(fn=>{const text=Function.prototype.toString.call(fn);

      return k==='combat'?text.startsWith('function(skillId){')&&text.includes('ST.running&&this===r.c')&&text.includes('ST.lastInvocation=Date.now()'):

        k==='_f7t'&&text.startsWith('function(active,common,mode){')&&text.includes('ST.running&&this===r.s')&&text.includes('ST.skillWaits');})),"legacy");

    

    

    if(legacy(base)){

      let proto=Object.getPrototypeOf(obj),candidate;

      while(proto){const d=Object.getOwnPropertyDescriptor(proto,k);if(typeof d?.value==='function'){candidate=d.value;break;}proto=Object.getPrototypeOf(proto);}

      if(!candidate||legacy(candidate)){ST.lastError='Cannot safely unwrap legacy TH300 '+k;return null;}

      base=candidate;

    }

    if(base!==obj[k]){

      const inherited=Object.getPrototypeOf(obj)?.[k];

      own=base===inherited?undefined:{value:base,writable:true,configurable:true,enumerable:!!own?.enumerable};

      note('HOOK-DEDUP',{method:k});

    }

    const wrapped=mk(base);Object.defineProperty(wrapped,'__KVPV_TH300_PARENT',{value:base});

    Object.defineProperty(obj,k,{value:wrapped,writable:true,configurable:true,enumerable:!!own?.enumerable});return {obj,k,fn:wrapped,own};

  }
__esmLocal211=hook;


  

  function unbind(){ST.basicImpactSerial=null;detachDispatch();for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];restore(ST.s);restore(ST.c);ST.s=null;ST.c=null;ST.positioning=false;}
__esmLocal213=unbind;


  

  function atPosition(r){if(__getKVPV4()?.status?.()?.kind==='TRU_TIEN')return r.c?.target?.isValidRange?.()===true;const d=radius(r.a,r.c?.target),goal=targetDistance();return goal!==null&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+(ST.mode==='SCAN'&&ST.arrivalSnap?1:0)&&(ST.mode!=='STRICT'||d<=goal+0.2);}
__esmLocal214=atPosition;


  

  function castReady(){const r=role();return canFight()&&!ST.positioning&&atPosition(r);}
__esmLocal215=castReady;


  

  function guardMovement(r){

    

    

    const entryGuard=__captureESMFunction((__esmLocal217=(()=>{const hr=combatOwner(),hp=prop(r.a,'hp');return ST.running&&

      __getKVPV4()?.status?.()?.kind==='THIEN_QUAN'&&!hr?.running&&

      W._Ba?._rJ?._O$?.ins?.isDead!==true&&Array.isArray(hp)&&Number(hp[1])>0&&Number(hp[0])/Number(hp[1])*100>35;})),"entryGuard");

    for(const method of ['moveTo','moveToCoordinate','moveByPath']){

    if(typeof r.m[method]!=='function')continue;

    const move=hook(r.m,method,__captureESMFunction((__esmLocal218=(native=>__captureESMFunction((__esmLocal219=(function(...args){

      // Keep ownership while holding the firing position too: native AI otherwise

      // immediately chases back into its original attack radius after arrival.

      if(ST.running&&__getKVPV4()?.status?.()?.kind!=='TRU_TIEN'&&(canFight()||entryGuard())&&eligible(r.c?.target)&&!towerFinish()&&!ST.ownMove){ST.blockedSteering++;return undefined;}

      return native.apply(this,args);

    })),""))),""));

    if(!move){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(move);

    }

    if(!ST.movement.length)return false;

    if(typeof r.m.stop==='function'){

      const stopHook=hook(r.m,'stop',__captureESMFunction((__esmLocal220=(native=>__captureESMFunction((__esmLocal221=(function(...args){

        if(ST.running&&__getKVPV4()?.status?.()?.kind!=='TRU_TIEN'&&ST.positioning&&canFight()&&!towerFinish()&&!ST.ownMove&&!atPosition(r)){ST.blockedSteering++;return undefined;}

        return native.apply(this,args);

      })),""))),""));

      if(!stopHook){for(const h of ST.movement.slice().reverse())restore(h);ST.movement=[];return false;}ST.movement.push(stopHook);

    }

    return true;

  }
__esmLocal216=guardMovement;


  

  

  const animationPlaying=__captureESMFunction((__esmLocal222=(c=>c?._jh?.isPlaying===true)),"animationPlaying");

  

  

  const basicTailReady=__captureESMFunction((__esmLocal223=(()=>mixed.enabled&&ST.basicImpactSerial===ST.castAttempts&&ST.basicImpactSerial!==null)),"basicTailReady");
  // TQ: only matched damage may release the tails of 8001..8005; other maps keep 8001/8005.
  const confirmedTailSkill=__captureESMFunction((__esmLocal224=(id=>tqFive?.active()?tqFive.ids().includes(Number(id)):[8001,8005].includes(Number(id)))),"confirmedTailSkill");

  function nativeReady(c){

    if(confirmedTailCut&&basicTailReady()&&canFight()){

      const cast=ST.casts.findLast?.(__captureESMFunction((__esmLocal226=(x=>x.serial===ST.basicImpactSerial)),"")),tween=c?._jh;

      if(cast?.used&&!cast.tailCut&&confirmedTailSkill(cast.id)&&cast.targetId===identity(c.target)&&cast.scene===scene()&&tween?.isPlaying===true&&typeof tween.stop==='function'){

        cast.tailCut=true;try{tween.stop();if(c._jh===tween)c._jh=null;confirmedTailCuts++;}

        catch(e){confirmedTailCut=false;ST.lastError=String(e?.message||e);}

      }

    }

    return (!animationPlaying(c)||basicTailReady())&&(typeof c?.isCooldown!=='function'||c.isCooldown()===false);

  }
__esmLocal225=nativeReady;


  // In Tian Quan, let a basic skill with a native-ready selector row through
  // the extension's component-wide cooldown gate. Tuyet Hoc keeps native gating.
  function tqBasicDispatchReady(id,c){
    const token=ST.tqSelectedBasic,now=Date.now();
    return tqFive?.active()&&isBasic(id)&&token?.id===Number(id)&&
      token.targetId===identity(c?.target)&&token.scene===scene()&&
      now-token.at>=0&&now-token.at<=80&&(!animationPlaying(c)||basicTailReady());
  }
__esmLocal227=tqBasicDispatchReady;

  

  

  function burstCast(r){

    const now=Date.now(),batchGap=Math.max(100,CFG.scanMs);if(now<burst.nextAt){ST.lastReason='waiting_burst_gap';return;}

    if(!nativeReady(r.c)){ST.lastReason='waiting_native_cooldown';return;}

    

    if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return;}

    const selectorRows=[r.s?._rtt,r.s?._wet].flatMap(__captureESMFunction((__esmLocal229=(rows=>Array.isArray(rows)?rows:[])),"")),
      readyIds=[...new Set(selectorRows.filter(__captureESMFunction((__esmLocal230=(row=>isTuyetHocSkill(Number(row?.[0]))&&
        Number.isFinite(Number(row?.[1]))&&Number(row[1])<now&&tqSelectableNative(Number(row[0])))),""))
        .map(__captureESMFunction((__esmLocal231=(row=>Number(row[0]))),"")))],
      roster=skillNames().map(__captureESMFunction((__esmLocal232=(x=>x.id)),"")).filter(__captureESMFunction((__esmLocal233=(id=>readyIds.includes(id))),"")),
      offset=roster.length?ST.skillCursor%roster.length:0,
      ids=roster.slice(offset).concat(roster.slice(0,offset));
    if(!ids.length){ST.lastReason='waiting_ready_tuyet_hoc';burst.lastPass={at:now,readyIds:[],attempted:[],selectorRejected:[],blockedBy:'no_native_ready_rows'};burst.nextAt=now+batchGap;return;}

    const group={serial:burst.serial+1,at:now,bossId:identity(r.c.target),scene:scene(),readyIds:ids.slice(),attempted:[],selectorRejected:[],confirmed:[],matchedDamage:0};

    burst.history.push(group);burst.active=group;

    burst.dispatch=true;burst.nextAt=now+batchGap;burst.lastPass=group;

    try{

      for(const id of ids){

        if(!castReady()||!eligible(r.c.target)||identity(r.c.target)!==group.bossId||scene()!==group.scene)break;

        if(W.KVPV?.core?.scene?.combat?.claim?.('08-range-evidence',80)!==true){ST.lastReason='combat_dispatch_wait';break;}
        burst.desired=id;const selected=Number(r.s.selectSkill?.());

        if(selected!==id){group.selectorRejected.push({id,selected:Number.isFinite(selected)?selected:null});continue;}

        const before=ST.castAttempts;r.c.combat(id);

        if(ST.castAttempts>before){group.attempted.push(id);ST.fastCasts++;}

      }

    }finally{burst.dispatch=false;burst.desired=null;burst.active=null;

      if(!group.attempted.length)burst.history.pop();
      else{burst.serial++;if(burst.history.length>30)burst.history.shift();}}

    ST.lastReason=group.attempted.length?'burst_dispatched':ST.casts.some(__captureESMFunction((__esmLocal234=(c=>!c.used&&c.targetId===identity(r.c.target)&&c.scene===scene())),""))?'burst_waiting_results':'waiting_ready_tuyet_hoc';

  }
__esmLocal228=burstCast;


  

  function thGapCast(r){
    if(basicSolo4100Active()||pilot4100THOnly()||!thGapActive(r.c))return false;
    if(!thGapNativeReady(r.c)){thGap.blockedCooldown++;ST.lastReason='th_gap_native_cooldown';return true;}
    if(r.c.isValidTarget?.()!==true){ST.lastReason='native_target_invalid';return true;}
    if(W.KVPV?.core?.scene?.combat?.claim?.('08-range-evidence',80)!==true){ST.lastReason='combat_dispatch_wait';return true;}
    thGap.picking=true;
    try{
      const id=Number(r.s.selectSkill?.()),occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
      if(!isBasic(id)||id>8005||!allowed(id,occ,d)){ST.lastReason='th_gap_no_ready_basic';return true;}
      const before=ST.castAttempts;r.c.combat(id);
      if(ST.castAttempts>before){thGap.attempts++;ST.fastCasts++;ST.lastReason='th_gap_basic_native_attempt';}
      else ST.lastReason='th_gap_basic_blocked';
      return true;
    }finally{thGap.picking=false;}
  }
__esmLocal236=thGapCast;

  function fastCast(r){

    const pace=currentPace();

    if(!castReady())return;

    if(burst.enabled&&!transforming())return burstCast(r);

    if(Date.now()-ST.lastInvocation<pace){ST.lastReason='waiting_pace';return;}
    if(thGapCast(r))return;

    if(typeof r.c.isCooldown!=='function'){ST.lastReason='native_cooldown_unavailable';return;}

    if(!nativeReady(r.c)){ST.lastReason=animationPlaying(r.c)?'waiting_native_animation':'waiting_native_cooldown';return;}

    if(typeof r.c.isValidTarget!=='function'||r.c.isValidTarget()!==true){ST.lastReason='native_target_invalid';return;}

    if(W.KVPV?.core?.scene?.combat?.claim?.('08-range-evidence',80)!==true){ST.lastReason='combat_dispatch_wait';return;}
    const skill=Number(r.s.selectSkill?.());

    if(allowed(skill,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target))){r.c.combat(skill);ST.fastCasts++;ST.lastReason='casting_native_skill';}

    else ST.lastReason=CFG.basicOnly?'waiting_ready_basic_'+String(basicRotation()[0]??mixed.rotation[0]??8001):basicSolo4100Active()?'waiting_ready_basic':'waiting_ready_tuyet_hoc';

  }
__esmLocal237=fastCast;


  // At the last 2% HP of a native dungeon Boss, the far-ring selector
  // cannot run. Cast learned native basics in melee through the owned combat
  // method, without changing native cooldown rows or sending custom RPCs.
  function dungeonFinishBasic(r){
    if(!towerFinish()||!canFight()||!eligible(r.c?.target))return false;
    if(typeof r.c?.isValidTarget==='function'&&r.c.isValidTarget()!==true){
      ST.lastReason='dungeon_finish_invalid_target';return false;
    }
    if(typeof r.c?.isValidRange==='function'&&r.c.isValidRange()!==true){
      ST.lastReason='dungeon_finish_out_of_native_range';return false;
    }
    const now=Date.now();
    if(now-ST.lastInvocation<Math.max(1,currentPace())){
      ST.lastReason='dungeon_finish_waiting_pace';return false;
    }
    if(!nativeReady(r.c)){
      ST.lastReason='dungeon_finish_waiting_native_ready';return false;
    }
    const learned=[...(r.s?._rtt??[]),...(r.s?._wet??[])].filter(__captureESMFunction((__esmLocal239=(row=>
      Array.isArray(row)&&Number.isSafeInteger(Number(row[0]))&&
      Number(row[0])>=8001&&Number(row[0])<=8005&&
      selectedBasic(Number(row[0]))&&
      Number.isFinite(Number(row[1]))&&Number(row[1])<now)),""));
    if(!learned.length){
      ST.lastReason='dungeon_finish_waiting_basic_ready';return false;
    }
    const id=Number(learned[ST.finishCursor%learned.length][0]);
    ST.finishCursor=(ST.finishCursor+1)%5;
    if(W.KVPV?.core?.scene?.combat?.claim?.('08-range-evidence',80)!==true){ST.lastReason='combat_dispatch_wait';return true;}
    r.c.combat(id); // through the existing native finish combat wrapper
    ST.lastInvocation=now;ST.fastCasts++;
    ST.lastReason='dungeon_finish_basic_cast';
    return true;
  }
__esmLocal238=dungeonFinishBasic;

  

  function onHit(source,marker,damage,flags,receiver){

    if(!ST.running)return;hitDiagnostics.received++;

    const reject=__captureESMFunction((__esmLocal241=(reason=>{hitDiagnostics.rejected[reason]=(hitDiagnostics.rejected[reason]||0)+1;

      if(String(source)===actorId){hitDiagnostics.recent.push({at:Date.now(),reason,source:String(source),receiver:String(receiver),marker:Number(marker),damage:Number(damage),flags:Number(flags)});if(hitDiagnostics.recent.length>16)hitDiagnostics.recent.shift();}})),"reject");

    if(String(source)!==actorId){reject('foreign_source');return;}

    if(String(receiver)!==identity(ST.target)){reject('wrong_receiver');return;}

    if(!(Number(damage)>0)){reject('nonpositive_damage');return;}

    const raw=Number(marker),id=raw/10000,fl=Number(flags)||0;

    

    if(!Number.isSafeInteger(raw)||raw%10000){reject('unsupported_marker');return;}

    if(!candidate(id)&&!isBasic(id)){reject('unsupported_skill');return;}

    if(fl&(4|16|32|64|128|256)){reject('auxiliary_flags');return;}

    const d=radius(role().a,ST.target);ST.lastHitDistance=d==null?null:+d.toFixed(2);

    const closeBasic=id===8001&&mixed.hitQuota!==null&&towerFinish()&&canFight();if(!outside(d)&&!closeBasic){reject('hit_outside_trial_band');return;}

    const t=Date.now();const cast=ST.casts.findLast?.(__captureESMFunction((__esmLocal242=(c=>!c.used&&c.targetId===identity(ST.target)&&c.scene===scene()&&c.occ===ST.targetOcc&&c.id===id&&t-c.time>=0&&t-c.time<=CFG.castTtlMs&&(outside(c.distance)||closeBasic&&c.finishBasic))),""));

    if(!cast){reject('no_matching_pending_cast');return;}hitDiagnostics.accepted++;

    if(cast.basicCast){
      if(tqFive?.active()&&isBasic(id)){const sample=thGap.measured.get(id)||{hits:0,damage:0};sample.hits++;sample.damage+=Number(damage);keepRecentHit(sample,damage);thGap.measured.set(id,sample);}
      if(cast.mixedBasic&&id===8001&&mixed.hitQuota!==null){mixed.confirmedSinceTH++;mixed.wantBasic=mixed.confirmedSinceTH<mixed.hitQuota;}
      cast.used=true;
      if(cast.mixedBasic&&cast.serial===ST.castAttempts)ST.basicImpactSerial=cast.serial;
      const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
      metrics?.result(cast.serial,true,damage);mixed.hits++;mixed.damage+=Number(damage);
      mixed.examples.push({id,bossId:cast.targetId,scene:cast.scene,castDistance:cast.distance,hitDistance:d,damage:Number(damage)});
      if(mixed.examples.length>30)mixed.examples.shift();
      mixed.suspended=false;note('BASIC-CONFIRMED',mixed.examples.at(-1));return;
    }

    cast.used=true;
    if(cast.ambiguousTH){
      // Correlate damage for DPS only, not to any single unique TH cast.
      tqIdleFill.ambiguousHits++;
      metrics?.result(cast.serial,true,damage);
      const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
      note('TH-OVERLAP-HIT-AMBIGUOUS',{id,damage:Number(damage)});
      return;
    }
    ST.confirmedPairs++;

    if(cast.burstSerial!=null){const g=burst.history.find(__captureESMFunction((__esmLocal245=(x=>x.serial===cast.burstSerial)),""));if(g){g.confirmed.push(id);g.matchedDamage+=Number(damage);}}

    metrics?.result(cast.serial,true,damage);settle(cast,true);

    const k=key(cast.occ,id),set=ST.proofs.get(k)||new Set();set.add(cast.serial);ST.proofs.set(k,set);

    const observations=ST.evidence.get(k)||[];observations.push({castDistance:cast.distance,hitDistance:d});if(observations.length>100)observations.shift();ST.evidence.set(k,observations);

    const metric=stats(cast.occ,id);metric.hits++;metric.damage+=Number(damage);
    if(tqFive?.active()&&id>=1001&&id<=1008){const row=cosmic.thMeasured.get(id)||{hits:0,damage:0};
      row.hits++;row.damage+=Number(damage);keepRecentHit(row,damage);cosmic.thMeasured.set(id,row);}

    note('CONFIRMED',{id,castDistance:cast.distance,hitDistance:+d.toFixed(2),pairs:set.size});

  }
__esmLocal240=onHit;


  

  function unlisten(){ST.tqSelectedNative=null;resetThGap();cosmicReset();metrics?.close(ST.running?'target_changed':'stopped');if(ST.target){try{ST.target.off?.(1012,ST.owner,onHit);}catch(_){__getKVPV20()?.diagnostics?.record(_);}}ST.target=null;ST.targetOcc=null;ST.targetKey=null;ST.casts=[];}
__esmLocal246=unlisten;


  

  function listen(t){
    const targetKey=identity(t)+'/'+String(prop(t,'occ'))+'/'+scene();
    if(t===ST.target&&targetKey===ST.targetKey)return;
    const previousTargetKey=ST.targetKey;
    unlisten();
    if(!eligible(t))return;
    if(previousTargetKey&&targetKey!==previousTargetKey&&thCalibration.autoLocked){
      thCalibration.autoLocked=false;thCalibration.skillId=null;thCalibration.completedAt=null;
      thCalibration.reason='new_boss_recalibration';ST.mode='SCAN';
    }
    ST.target=t;ST.targetKey=targetKey;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;
    ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;
    ST.basicImpactSerial=null;ST.lastInvocation=-Infinity;ST.skillCursor=0;ST.moveGoal=null;ST.lastMove=-Infinity;
    ST.positioning=true;ST.lastOwnerPhase=null;burst.nextAt=0;
    if(mixedTargetKey!==targetKey){
      mixedTargetKey=targetKey;mixed.primaryStreak=0;mixed.rotationCursor=0;
      mixed.wantBasic=mixed.primary&&(mixed.hitQuota===null||mixed.confirmedSinceTH<mixed.hitQuota);
      mixed.suspended=false;mixed.unconfirmed=0;mixed.ready.clear();hitDiagnostics.received=0;
      hitDiagnostics.accepted=0;hitDiagnostics.rejected={};hitDiagnostics.recent=[];
      mixed.attempts=0;mixed.hits=0;mixed.damage=0;mixed.examples=[];
    }
    ST.targetOcc=Number(prop(t,'occ'));
    metrics?.open({key:targetKey,bossId:identity(t),bossName:String(prop(t,'name')??''),actor:actorId,occ:ST.targetOcc,scene:scene()});
    try{t.on?.(1012,ST.owner,onHit);}catch(e){ST.lastError='listen: '+String(e);}
  }
__esmLocal247=listen;


  

  

  function selectBasic(native,selector,all,mode,occ,d){

    const basicWait=tqFive?.active()?tqFive.wait():mixed.basicPaceMs,now=Date.now(),trial=(tqFive?.active()||mixed.enabled)&&basicWait!==null;

    const rotation=basicRotation(),order=rotation.slice(mixed.rotationCursor).concat(rotation.slice(0,mixed.rotationCursor));
    const basicFallback=__captureESMFunction((__esmLocal258=((a,b)=>{
      if(basicSolo4100Active()){
        const ai=basicSolo4100Prior.indexOf(Number(a[0])),bi=basicSolo4100Prior.indexOf(Number(b[0]));
        if(ai!==bi&&ai>=0&&bi>=0)return ai-bi;
      }
      return rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(a[0])-Number(b[0]);
    })),"basicFallback");

    const basicRowEligible=__captureESMFunction((__esmLocal259=(row=>isBasic(row?.[0])&&(!mixed.primary||(rotation.length?rotation.includes(Number(row[0])):Number(row[0])===primaryBasicId()))&&allowed(Number(row[0]),occ,d)&&Number.isFinite(Number(row[1]))&&(!basicSolo4100Active()||Number(row[1])<now))),"");
    const rows=all.filter(basicRowEligible)

      .map(__captureESMFunction((__esmLocal260=(row=>{if(!trial)return row;const id=Number(row[0]),copy=row.slice();

        if(!mixed.ready.has(id))mixed.ready.set(id,Number(row[1])<now?0:now+Math.min(basicWait,Math.max(0,Number(row[1])-now)));

        copy[1]=mixed.ready.get(id);copy[2]=basicWait;return copy;})),""))

      .filter(__captureESMFunction((__esmLocal261=(row=>Number(row[1])<now)),""))

      .sort(__captureESMFunction((__esmLocal262=((a,b)=>{
        if(thGap.picking){const best=strongestThGapBasic();if(best!==null){const ap=Number(a[0])===best,bp=Number(b[0])===best;if(ap!==bp)return ap?-1:1;}}
        return basicSolo4100Active()?basicFallback(a,b):rotation.length?order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])):Number(stats(occ,Number(b[0])).hits>0)-Number(stats(occ,Number(a[0])).hits>0);
      })),""));
    if(cosmicActive()&&!thGap.picking)cosmicRank(rows,'basic',basicFallback);

    const nativeBasicReady=new Set(all.filter(__captureESMFunction((__esmLocal263=(row=>isBasic(row?.[0])&&Number.isFinite(Number(row?.[1]))&&Number(row[1])<now)),"")).map(__captureESMFunction((__esmLocal264=(row=>Number(row[0]))),"")));
    const id=Number(native.call(selector,rows,[],mode));
    ST.tqSelectedBasic=isBasic(id)&&nativeBasicReady.has(id)?{id,at:Date.now(),targetId:identity(role().c?.target),scene:scene()}:null;

    if(trial&&isBasic(id)){const picked=rows.find(__captureESMFunction((__esmLocal265=(row=>Number(row[0])===id)),""));if(picked)mixed.ready.set(id,Math.max(now+basicWait,Number(picked[1])||0));}

    return id;

  }
__esmLocal257=selectBasic;


  function bind(r){__getKVPV1()?.release?.();if(ST.s?.obj===r.s&&ST.c?.obj===r.c&&r.s?._f7t===ST.s.fn&&r.c?.combat===ST.c.fn)return true;

    if(ST.s?.obj===r.s&&ST.c?.obj===r.c){

      // HitRun temporarily wraps our function while dodging/healing. Keep that

      // exact chain intact; rewrapping it would multiply attempts each scan.

      if(r.s?._f7t===ST.s.fn&&r.c?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)return true;

      ST.lastError='Unexpected external skill/combat hook; refresh before resuming';return false;

    }

    unbind();

    attachDispatch(r.a);

    const s=hook(r.s,'_f7t',__captureESMFunction((__esmLocal267=(native=>__captureESMFunction((__esmLocal268=(function(active,common,mode){
      if(tqFive?.active()&&ST.running&&this===r.s&&!transforming()){
        const all=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])],occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);
        const pickBasic=__captureESMFunction((__esmLocal269=(()=>selectBasic(native,this,all,mode,occ,d))),"pickBasic");
        const cooldownReady=thGap.picking?thGapNativeReady(r.c):nativeReady(r.c);
        const readyBasic=all.some(__captureESMFunction((__esmLocal270=(row=>isBasic(row?.[0])&&Number.isFinite(Number(row?.[1]))&&Number(row[1])<Date.now())),""));
        if(mode!==1||!eligible(r.c?.target)||!castReady()||(!cooldownReady&&(!readyBasic||animationPlaying(r.c)))||Date.now()-ST.lastInvocation<currentPace())return -1;
        // A component cooldown can reflect a different skill. When the native
        // basic row is ready, pick only that basic until the component is clear.
        if(!cooldownReady)return pickBasic();
        if(basicSolo4100Active()||!tqFive.allowsTuyetHoc()||thGap.picking)return pickBasic();
        const roster=skillNames().map(__captureESMFunction((__esmLocal271=(x=>x.id)),"")).filter(tqSelectableNative),offset=roster.length?ST.skillCursor%roster.length:0,order=roster.slice(offset).concat(roster.slice(0,offset));
        const pickTH=__captureESMFunction((__esmLocal272=(()=>{
          ST.tqSelectedNative=null;
          const rows=cosmicRank(all.filter(__captureESMFunction((__esmLocal273=(row=>tqSelectableNative(Number(row?.[0]))&&Number.isFinite(Number(row[1]))&&Number(row[1])<Date.now()&&allowed(Number(row[0]),occ,d))),"")),'th',__captureESMFunction((__esmLocal274=((a,b)=>order.indexOf(Number(a[0]))-order.indexOf(Number(b[0])))),""));
          const id=Number(native.call(this,rows,[],mode));
          if(rows.some(__captureESMFunction((__esmLocal275=(row=>Number(row?.[0])===id)),"")))
            ST.tqSelectedNative={id,at:Date.now(),targetId:identity(r.c?.target),scene:scene()};
          return id;
        })),"pickTH");
        if(pilot4100THOnly())return pickTH();
        const first=mixed.wantBasic?pickBasic:pickTH,second=mixed.wantBasic?pickTH:pickBasic,id=first();return isBasic(id)||tqSelectableNative(id)?id:second();
      }

      if(CFG.basicOnly&&ST.running&&this===r.s&&(__getKVPV4()??__getKVPV17())?.inside?.()!==false){

        if(__getKVPV4()?.status?.()?.kind==='TRU_TIEN'&&!eligible(r.c?.target))return native.call(this,active,common,mode); // Let native acquire a target; no forced casting.
        if(!eligible(r.c?.target)||!(towerFinish()?canFight():castReady())||!nativeReady(r.c))return -1;

        const rows=[...(Array.isArray(active)?active:[]),...(Array.isArray(common)?common:[])].filter(__captureESMFunction((__esmLocal276=(row=>Number(row?.[0])===(basicRotation()[0]??mixed.rotation[0]??8001))),""));

        return selectBasic(native,this,rows,mode,Number(prop(r.c.target,'occ')),radius(r.a,r.c.target));

      }

      if(ST.running&&this===r.s&&!transforming()&&!burst.dispatch&&(__getKVPV4()??__getKVPV17())?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs)return -1;

      if(ST.running&&this===r.s&&towerFinish()&&canFight()&&!transforming()){

        const filter=__captureESMFunction((__esmLocal277=(rows=>Array.isArray(rows)?rows.filter(__captureESMFunction((__esmLocal278=(row=>isBasic(row?.[0])?selectedBasic(row[0]):mixed.hitQuota===null||Number(row[0])<1001||Number(row[0])>1008||mixed.confirmedSinceTH>=mixed.hitQuota)),"")):rows)),"filter");

        return native.call(this,filter(active),filter(common),mode);

      }

      if(ST.running&&this===r.s&&mode===2&&transforming()&&(__getKVPV4()??__getKVPV17())?.inside?.()!==false){

        if(!eligible(r.c?.target)||!castReady()||!nativeReady(r.c)||((pacer||scopedCombat()||tqFive?.active())&&Date.now()-ST.lastInvocation<currentPace()))return -1;

        const occ=Number(prop(r.c.target,'occ')),dist=radius(r.a,r.c.target);

        const filter=__captureESMFunction((__esmLocal279=(rows=>(Array.isArray(rows)?rows:[]).filter(__captureESMFunction((__esmLocal280=(row=>allowed(Number(row?.[0]),occ,dist))),"")))),"filter");

        return __callKVPV3(native,this,filter(active),filter(common),mode);

      }

      if(!ST.running||this!==r.s||mode!==1||(__getKVPV4()??__getKVPV17())?.inside?.()===false)return native.apply(this,arguments);

      if(!eligible(r.c?.target)||!Array.isArray(active))return -1;

      if(mixed.enabled&&!mixed.suspended&&mixed.wantBasic&&skillPriority==='interleaved'){

        if(!castReady()||!nativeReady(r.c))return -1;

        const occ=Number(prop(r.c.target,'occ')),d=radius(r.a,r.c.target);

        const picked=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,d);

        if(isBasic(picked))return picked;

        

      }

      const dist=radius(r.a,r.c.target),occ=Number(prop(r.c.target,'occ'));

      if(!castReady()||(!burst.dispatch&&!nativeReady(r.c))||!outside(dist)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.skillWaits++;return -1;}

    const filter=__captureESMFunction((__esmLocal281=(rows=>Array.isArray(rows)?rows.filter(__captureESMFunction((__esmLocal282=(x=>!isBasic(x?.[0])&&(!tianQuanThMode()||isTuyetHocSkill(Number(x?.[0]))&&!(ST.mode==='STRICT'&&thCalibration.autoLocked&&(thCalibration.skillId===null||Number(x?.[0])!==thCalibration.skillId)))&&allowed(Number(x?.[0]),occ,dist)&&(!burst.dispatch||(Number(x[0])===burst.desired&&Number.isFinite(Number(x[1]))&&Number(x[1])<Date.now())))),"")):[])),"filter");

      // Rotate the original native rows so SCAN exercises the whole ready kit.

      // Rows and their cooldown timestamps are never copied or rewritten.

      const roster=skillNames().map(__captureESMFunction((__esmLocal283=(x=>x.id)),"")).filter(__captureESMFunction((__esmLocal284=(id=>!tianQuanThMode()||isTuyetHocSkill(Number(id)))),"")),offset=roster.length?ST.skillCursor%roster.length:0;

      const order=roster.slice(offset).concat(roster.slice(0,offset));

      const tower=['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(__getKVPV4()?.status?.().kind),fairTurn=ST.castAttempts%4===0;

      const score=__captureESMFunction((__esmLocal285=(id=>{const m=stats(occ,Number(id));return m.hits>=2?m.damage/m.hits:0;})),"score");

      const ranked=__captureESMFunction((__esmLocal286=(rows=>filter(rows).sort(__captureESMFunction((__esmLocal287=((a,b)=>{

        if((skillPriority==='tuyet_hoc_first'||tower&&!mixed.enabled)&&!fairTurn){const delta=score(b[0])-score(a[0]);if(delta)return delta;}

        return order.indexOf(Number(a[0]))-order.indexOf(Number(b[0]));

      })),"")))),"ranked");

      const picked=Number(native.call(this,ranked(active),ranked(common),mode));

      if(allowed(picked,occ,dist)){ST.seen.add(picked);return picked;}

      if(mixed.enabled&&!mixed.suspended&&nativeReady(r.c)){

        const basic=selectBasic(native,this,[...active,...(Array.isArray(common)?common:[])],mode,occ,dist);if(isBasic(basic))return basic;

      }

      ST.skillWaits++;return -1;

    })),""))),""));

    if(!s){ST.lastError='Selector hook unavailable';return false;}

    const c=hook(r.c,'combat',__captureESMFunction((__esmLocal288=(native=>__captureESMFunction((__esmLocal289=(function(skillId){
      if(ST.running&&this===r.c&&basicSolo4100Active()&&Number(skillId)>=1001&&Number(skillId)<=1008){basicSolo4100.blockedTH++;ST.blocked++;return undefined;}
      if(CFG.basicOnly&&!tqFive?.active()&&ST.running&&this===r.c&&(__getKVPV4()??__getKVPV17())?.inside?.()!==false&&Number(skillId)!==(basicRotation()[0]??8001)){ST.blocked++;return undefined;}

      if(ST.running&&this===r.c&&!transforming()&&!burst.dispatch&&(__getKVPV4()??__getKVPV17())?.inside?.()!==false&&Date.now()-ST.lastTHAt<CFG.afterTHWaitMs){ST.blocked++;return;}

      if(ST.running&&this===r.c&&(__getKVPV4()??__getKVPV17())?.inside?.()!==false&&isBasic(skillId)&&!selectedBasic(skillId)){ST.blocked++;return undefined;}

      if(ST.running&&this===r.c&&towerFinish()&&canFight()&&!transforming()){

        const id=Number(skillId);

        if(mixed.hitQuota!==null){

          if(id>=1001&&id<=1008&&!isTransformSkill(id)&&mixed.confirmedSinceTH<mixed.hitQuota){ST.blocked++;return;}

          if(id===8001){expire();if(ST.casts.some(__captureESMFunction((__esmLocal290=(c=>!c.used&&basicPendingBlocks(c)&&c.id===id&&c.targetId===identity(this.target)&&Date.now()-c.time<=CFG.castTtlMs)),""))){ST.blocked++;return;}

            ST.castAttempts++;mixed.attempts++;ST.casts.push({serial:ST.castAttempts,id,occ:Number(prop(this.target,'occ')),targetId:identity(this.target),scene:scene(),time:Date.now(),distance:radius(r.a,this.target),used:false,basicCast:true,mixedBasic:true,finishBasic:true});}

        }

        return invokeNative(native,this,arguments);

      }

      if(ST.running&&this===r.c&&(__getKVPV4()??__getKVPV17())?.inside?.()!==false){

        const id=Number(skillId),occ=Number(prop(this.target,'occ')),d=radius(r.a,this.target);
        const gapBasic=thGap.picking&&isBasic(id)&&id<=8005&&thGapActive(this)&&thGapNativeReady(this);

        const basicCooldownReady=tqBasicDispatchReady(id,this);
        if(!eligible(this.target)||!castReady()||(!burst.dispatch&&!gapBasic&&!basicCooldownReady&&!nativeReady(this))||!allowed(id,occ,d)||!outside(d)||((pacer||scopedCombat()||tqFive?.active())&&!burst.dispatch&&Date.now()-ST.lastInvocation<currentPace())){ST.blocked++;return undefined;}

        if(animationPlaying(this)&&basicTailReady())ST.basicTailReleases++;

        ST.lastInvocation=Date.now();

        const roster=skillNames().map(__captureESMFunction((__esmLocal291=(x=>x.id)),""));if(!isBasic(id))ST.skillCursor=Math.max(0,roster.indexOf(id)+1);

        if(mixed.enabled){const order=basicRotation();if(order.includes(id))mixed.rotationCursor=(order.indexOf(id)+1)%order.length;mixed.primaryStreak=isBasic(id)?mixed.primaryStreak+1:0;mixed.wantBasic=(mixed.primary?(mixed.hitQuota!==null?mixed.confirmedSinceTH<mixed.hitQuota:mixed.primaryStreak<basicQuota()):!isBasic(id))&&!mixed.suspended;if(isBasic(id))mixed.attempts++;}

        expire();stats(occ,id).attempts++;

        // Overlapping same-ID pending casts have ambiguous cast-to-hit identity.
        // They can count toward observed damage but never independent TH range proof.
        const overlap=tqIdleFill.enabled&&ST.tqSelectedNative?.id===id&&
          ST.tqSelectedNative.targetId===identity(this.target)&&
          !isBasic(id)&&tqFive?.active()&&tqDistanceOnly()&&
          ST.casts.filter(__captureESMFunction((__esmLocal292=(c=>!c.used&&c.id===id&&c.targetId===identity(this.target)&&
            c.scene===scene()&&Date.now()-c.time<=CFG.castTtlMs)),""))||[];
        if(overlap.length){for(const previous of overlap)previous.ambiguousTH=true;tqIdleFill.repeatCalls++;}
        ST.castAttempts++;ST.casts.push({serial:ST.castAttempts,id,occ,targetId:identity(this.target),scene:scene(),time:Date.now(),distance:d,used:false,ambiguousTH:overlap.length>0,basicCast:mixed.enabled&&isBasic(id),mixedBasic:mixed.enabled&&isBasic(id),burstSerial:burst.active?.serial??null,tuningEligible:!isBasic(id)&&!burst.dispatch&&!transforming()&&verified(occ,id)});

        ST.tqSelectedNative=null;ST.tqSelectedBasic=null;
        if(tqFive?.active()&&isBasic(id)){ST.casts.at(-1).basicCast=true;ST.casts.at(-1).mixedBasic=true;mixed.rotationCursor=(tqFive.ids().indexOf(id)+1)%tqFive.ids().length;}

        metrics?.cast(ST.castAttempts,id,currentPace());

        if(ST.casts.length>250)ST.casts.splice(0,ST.casts.length-250);

      }

      return invokeNative(native,this,arguments);

    })),""))),""));

    if(!c){restore(s);ST.lastError='Combat hook unavailable';return false;}

    ST.s=s;ST.c=c;

    if(!guardMovement(r)){unbind();ST.lastError='Movement ownership unavailable';return false;}

    return true;

  }
__esmLocal266=bind;


  

  function tick(){if(!ST.running)return;__getKVPV14()?.sync?.();localLogCleanupSync();
    ensureTianQuanRotation();

    ST.lastTickAt=Date.now();

    
    // User-requested: no extension-side polling gap. Native cooldown gates remain intact.
    ST.lastBackgroundTick=Date.now();

    try{

      if(!canFight()||!atPosition(role()))for(const c of ST.casts)if(!c.used){c.tuningEligible=false;c.metricsInterrupted=true;}

        expire();updateTuyetHocCalibration();

      if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId||W.__KVPV_UNIVERSAL_HALTED){stop('actor changed');return;}

      if((__getKVPV4()??__getKVPV17())?.inside?.()===false){releaseOutsideScope();ST.lastReason='outside_tianquan_native_combat';return;}

      const r=role();if(!r.a||!r.s||!r.c||!r.m){ST.lastReason='missing_components';return;}

      const owner=combatOwner(),previousPhase=ST.lastOwnerPhase;

      ST.lastOwnerPhase=owner?.phase??'OFF';

      if(!bind(r)){ST.lastReason='hook_failed';return;}

      if(!eligible(r.c.target)){unlisten();ST.lastReason=__getKVPV4()?.status?.()?.kind==='TRU_TIEN'?'trutien_waiting_native_monster_target':'not_tianquan_boss';return;}

      

      pacer?.context(identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene()+'/'+(transforming()?'transform':'native'));

      const newPositionTarget=ST.target!==r.c.target||ST.targetKey!==identity(r.c.target)+'/'+String(prop(r.c.target,'occ'))+'/'+scene();

      listen(r.c.target);
      observeApexRhythm(ST.targetKey,prop(r.a,'hp')?.[0]);
      observePilot4100();

      

      

      if(newPositionTarget&&__getKVPV4()?.status?.()?.kind!=='TRU_TIEN'&&((owner?.running&&owner.phase==='FIGHT'&&canFight())||

        (!owner?.running&&__getKVPV4()?.status?.()?.kind==='THIEN_QUAN'&&W._Ba?._rJ?._O$?.ins?.isDead!==true))){

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

      }

      if(towerFinish()&&canFight()){
        ST.positioning=false;ST.moveGoal=null;
        const kind=__getKVPV4()?.status?.()?.kind,
          targetKey=kind+'/'+scene()+'/'+identity(r.c.target),
          a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
        const nativeRange=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target,'occ')))?.[3]);
        if(ST.finishTarget!==targetKey){
          ST.finishTarget=targetKey;ST.finishCursor=0;
          ST.finishLastMove=-Infinity;ST.finishMoveAttempts=0;
        }
        if(!a||!b||!Number.isFinite(d)||!(Number.isFinite(nativeRange)&&nativeRange>0)){
          ST.lastReason='dungeon_finish_waiting_position_or_native_range';return;
        }
        ST.lastDistance=+d.toFixed(2);
        const validRange=typeof r.c.isValidRange==='function'?r.c.isValidRange()===true:true;
        const goal=nativeRange*.8;
        // Re-approach if the Boss moves, but never fight over HitRun recovery.
        if(d>goal+CFG.tolerance||!validRange){
          const now=Date.now(),moving=r.m.running?.()===true;
          if(moving||now-ST.finishLastMove<600||ST.finishMoveAttempts>=6){
            ST.lastReason=moving?'dungeon_finish_approaching':ST.finishMoveAttempts>=6?
              'dungeon_finish_approach_paused':'dungeon_finish_move_wait';
            return;
          }
          const nextGoal=!validRange&&d<=goal+CFG.tolerance?Math.max(1,d-20):goal;
          if(typeof r.m.moveTo!=='function'){ST.lastReason='dungeon_finish_no_mover';return;}
          ST.ownMove=true;
          try{
            r.m.stop?.();
            r.m.moveTo(b.x+(a.x-b.x)/Math.max(d,1)*nextGoal,
                       b.y+(a.y-b.y)/Math.max(d,1)*nextGoal);
            ST.moves++;ST.finishMoveAttempts++;ST.finishLastMove=now;
          }finally{ST.ownMove=false;}
          ST.lastReason='dungeon_finish_approaching';return;
        }
        dungeonFinishBasic(r);return;
      }
// Finish phase ends only when native Boss HP rises above 2% or Boss changes.
      ST.finishTarget=null;ST.finishCursor=0;ST.finishMoveAttempts=0;ST.finishLastMove=-Infinity;

      // Tru Tien uses native chase/range, not the Tian Quan 310-position controller.
      if(__getKVPV4()?.status?.()?.kind==='TRU_TIEN'){
        ST.positioning=false;ST.moveGoal=null;ST.lastDistance=radius(r.a,r.c.target);
        if(!canFight()){ST.lastReason='trutien_hitrun_wait';return;}
        if(atPosition(r)){ST.lastReason='trutien_native_range';fastCast(r);}
        else {
          // HitRun may enter FIGHT without requesting a native chase.
          // Issue a bounded waypoint only when idle; never override user UI or recovery.
          const a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);
          const nativeRange=Number(W._ft?._tY?.ins?.getCfgById?.(Number(prop(r.c.target,'occ')))?.[3]);
          const goal=Number.isFinite(nativeRange)&&nativeRange>0?Math.min(80,nativeRange*.7):40;
          const now=Date.now();
          if(a&&b&&Number.isFinite(d)&&d>goal+5&&
             now-ST.lastMove>=1000&&
             r.m.running?.()!==true&&
             now>=Number(W.__KVPV_USER_UI_UNTIL||0)&&
             !W._Ba?._K_t?._Z7t?.ins?.gathering&&
             typeof r.m.moveTo==='function'){
            ST.ownMove=true;
            try{r.m.moveTo(b.x+(a.x-b.x)/Math.max(d,1)*goal,
                           b.y+(a.y-b.y)/Math.max(d,1)*goal);
                ST.lastMove=now;ST.moves++;ST.lastReason='trutien_chase_commanded';}
            finally{ST.ownMove=false;}
          }else ST.lastReason='trutien_native_approach';
        }
        return;
      }
      const goal=targetDistance();

      if(goal===null){ST.lastReason='waiting_verified_skill';return;}

      if(goal<=CFG.min){ST.lastReason='goal_inside_boss_range';return;}

      const hr=owner;

      

      if(!hr?.running||hr.phase!=='FIGHT'){ST.basicImpactSerial=null;ST.positioning=false;ST.lastReason='hitrun_'+(hr?.phase||'off');return;}

      if(!canFight()){ST.positioning=false;ST.lastReason='low_hp_or_disabled';return;}

      

      if(previousPhase&&previousPhase!=='FIGHT'){

        // HitRun releases guards at full HP but its last orbit path may still

        // be running. Cancel it and discard pre-recovery positioning state.

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

        ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.arrivalSample=null;ST.arrivalSnap=false;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positioning=true;if(previousPhase==='RETREAT')ST.resumes++;

        if(previousPhase==='RETREAT')metrics?.resume();

        note('RESUME',{from:previousPhase,bossId:identity(r.c.target),goal});

      }

      if(W.document?.hidden&&__getKVPV0()?.config?.pauseWhenHidden===true){ST.lastReason='hidden_tab';return;}

      const a=loc(r.a),b=loc(r.c.target),d=radius(r.a,r.c.target);

      ST.lastDistance=d==null?null:+d.toFixed(2);

      if(!a||!b||d==null){ST.lastReason='unknown_position';return;}

      

      

      

      const snapCandidate=ST.mode==='SCAN'&&(ST.moveGoal||ST.arrivalSnap)&&outside(d)&&Math.abs(d-goal)<=CFG.tolerance+1;

      if(!snapCandidate){ST.arrivalSample=null;ST.arrivalSnap=false;}

      else{

        const sample=ST.arrivalSample;

        if(!sample||Math.hypot(a.x-sample.ax,a.y-sample.ay)>.25||Math.hypot(b.x-sample.bx,b.y-sample.by)>.25){

          ST.arrivalSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};ST.arrivalSnap=false;

        }else if(!ST.arrivalSnap&&Date.now()-sample.at>=1000){

          ST.arrivalSnap=true;note('NATIVE-ARRIVAL-SNAP',{distance:d,goal,extraTolerance:1});

        }

      }

      if(atPosition(r)){

        // Arrival is measured from the moving Boss, not from path completion.

        // Stop our remaining path before casting so it cannot carry us past it.

        if(ST.positioning&&ST.moveGoal){ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}}

        ST.positioning=false;ST.moveGoal=null;ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;ST.lastReason='holding_far';fastCast(r);return;

      }

      ST.positioning=true;

      if(ST.positionPause){

        if(Math.hypot(b.x-ST.positionPause.x,b.y-ST.positionPause.y)<20&&Date.now()-ST.positionPause.at<8000){ST.lastReason=ST.positionPause.reason;return;}

        ST.positionPause=null;ST.positionCommands=0;ST.positionRetries=0;ST.positionOffset=0;

        ST.positionSample=null;ST.moveGoal=null;ST.lastMove=-Infinity;ST.positionRecovery++;

        note('POSITION-RECOVERY',{cycle:ST.positionRecovery,distance:d});

      }

      if(ST.positionCommands>=24){

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

        ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_oscillation_bounded'};ST.lastReason='position_oscillation_bounded';

        note('POSITION-OSCILLATION-PAUSED',{distance:d,goal,commands:ST.positionCommands});return;

      }

      

      

      

      const progress=ST.positionSample;

      if(!progress||Math.hypot(a.x-progress.ax,a.y-progress.ay)>.75||Math.hypot(b.x-progress.bx,b.y-progress.by)>.75)

        ST.positionSample={ax:a.x,ay:a.y,bx:b.x,by:b.y,at:Date.now()};

      else if(ST.moveGoal&&Date.now()-progress.at>=1800&&ST.positionRetries<6){

        ST.positionRetries++;
        // Native path may stop short on either side of the 310-radius ring.
        // For a too-distant actor, request a slightly *closer* waypoint; do not widen attack range.
        ST.positionOffset=d<goal?Math.min(32,ST.positionRetries*8):d>goal+CFG.tolerance?-Math.min(24,ST.positionRetries*8):0;

        ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

        ST.lastMove=-Infinity;ST.moveGoal=null;ST.positionSample.at=Date.now();

        note('POSITION-RETRY',{distance:d,goal,attempt:ST.positionRetries,waypointExtra:ST.positionOffset});

      }

      if(ST.positionRetries>=6&&ST.positionSample&&Date.now()-ST.positionSample.at>=1800){

        if(ST.lastReason!=='position_stalled_bounded'){

          ST.ownMove=true;try{r.m.stop?.();}finally{ST.ownMove=false;}

          note('POSITION-PAUSED',{distance:d,goal,attempts:ST.positionRetries});

        }

        ST.positionPause={x:b.x,y:b.y,at:Date.now(),reason:'position_stalled_bounded'};ST.lastReason='position_stalled_bounded';return;

      }

      

      const ux=d>=1?(a.x-b.x)/d:1,uy=d>=1?(a.y-b.y)/d:0;

      const recoveryAngle=ST.positionRecovery?(ST.positionRecovery%2?1:-1)*Math.min(90,Math.ceil(ST.positionRecovery/2)*30)*Math.PI/180:0;

      const angle=recoveryAngle+(ST.positionRetries>=3?(ST.positionRetries%2?1:-1)*Math.min(30,(ST.positionRetries-2)*15)*Math.PI/180:0);

      const waypointRadius=goal+ST.positionOffset;

      const x=b.x+(ux*Math.cos(angle)-uy*Math.sin(angle))*waypointRadius,

        y=b.y+(ux*Math.sin(angle)+uy*Math.cos(angle))*waypointRadius;

      

      if(typeof r.m.running==='function'&&r.m.running()&&ST.moveGoal&&Date.now()-ST.lastMove<4500&&

         Math.hypot(ST.moveGoal.x-x,ST.moveGoal.y-y)<15){ST.lastReason='positioning_in_progress';return;}

      if(Date.now()-ST.lastMove<CFG.moveWaitMs){ST.lastReason='move_wait';return;}

      if(typeof r.m.moveTo!=='function'){ST.lastReason='no_mover';return;}

      ST.ownMove=true;try{r.m.moveTo(x,y);}finally{ST.ownMove=false;}

      ST.moveGoal={x,y};ST.positionCommands++;ST.moves++;ST.lastMove=Date.now();ST.lastReason='positioning_far';

    }catch(e){ST.lastError=String(e?.message||e);ST.lastReason='error';}

    finally{metrics?.state(ST.lastReason,ST.lastOwnerPhase,currentPace(),pacer?.status()?.lastAction);}

  }
__esmLocal293=tick;


  

  function skillNames(){if(__getKVPV19()?.transformed?.())return __callKVPV4();const r=role();const rows=[r.s?._rtt,r.s?._wet].flatMap(__captureESMFunction((__esmLocal295=(x=>Array.isArray(x)?x:[])),"")),ids=[...new Set(rows.map(__captureESMFunction((__esmLocal296=(x=>Number(x?.[0]))),"")).filter(candidate))];

    return ids.map(__captureESMFunction((__esmLocal297=(id=>{let name='';try{const arr=W._Ba?._rJ?._O$?.ins?.skills||[];const level=Number(arr.find(__captureESMFunction((__esmLocal298=(x=>Number(x?.[0])===id)),""))?.[1])||1;name=String(W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(id,level)?.[2]||'');}catch(_){__getKVPV20()?.diagnostics?.record(_);}return {id,name};})),""));}
__esmLocal294=skillNames;


  

  function status(show=false){
    if(statusReentrant)return {version:'1.0.0',running:ST.running,operation:ST.mode,statusReentrant:true,modeStatus:null};
    statusReentrant=true;try{return statusImpl(show);}finally{statusReentrant=false;}
  }
__esmLocal299=status;

  function statusImpl(show=false){const occ=stageOcc(),ready=skillNames(),proved=ready.filter(__captureESMFunction((__esmLocal301=(x=>verified(occ,x.id))),"")).map(__captureESMFunction((__esmLocal302=(x=>({...x,confirmations:ST.proofs.get(key(occ,x.id))?.size||0}))),""));

    const tqIds=tqFive?.active()?[...basicRotation(),...(!basicSolo4100Active()&&tqFive.allowsTuyetHoc()?ready.filter(__captureESMFunction((__esmLocal303=(x=>tqSelectableNative(x.id))),"")).map(__captureESMFunction((__esmLocal304=(x=>x.id)),"")):[])]:null;
    const ret={basicAnimationSpeed:CFG.basicAnimationSpeed,
       tqTuyetHocVisualSpeed:CFG.tqTuyetHocVisualSpeed,
        tqBasicVisualSpeed:CFG.tqBasicVisualSpeed,tqBasicVisualCalls,tqBasicVisualScaled,tqBasicVisualUnavailable,tqBasicVisualLastSkill,
       tqTuyetHocVisualCalls:thVisualCalls,tqTuyetHocVisualScaled:thVisualScaled,
       tqTuyetHocVisualUnavailable:thVisualUnavailable,tqTuyetHocVisualLastSkill:thVisualLastSkill,
       modeStatus:null, // Avoid calling KVPV_MODE.status(): its inspect path reads this status again.
       scaledBasicAnimations:ST.scaledBasicAnimations??0,scaledTowerSkillAnimations:ST.scaledTowerSkillAnimations,scaledTowerBasicAnimations:ST.scaledTowerBasicAnimations,basicOnly:tqFive?.active()?(basicSolo4100Active()||!tqFive.allowsTuyetHoc()):CFG.basicOnly,playerSkillIds:tqFive?.active()?tqIds:CFG.basicOnly?[basicRotation()[0]??8001]:null,interleavedBasic:tqFive?.active()||mixed.enabled,version:'1.0.0',running:ST.running,operation:ST.mode,goalDistance:targetDistance()??CFG.goal,requestedDistance:CFG.goal,

      requireDistanceGreaterThan:CFG.min,clientRangeLimit:CFG.max,

      nativeTuyetHoc:ready,tuyetHocCalibration:tuyetHocCalibration(occ),tianQuanMpackExtras:{enabled:tqMpack.enabled,ids:tqActiveExtraIds(),source:'native _vX.ins.skills (fallback player model) + native selector + MPACK active category; no passive/proc/scene bypass',learnedSource:Array.isArray((typeof _vX!=='undefined'?_vX?.ins?.skills:null)??W._vX?.ins?.skills)?'native_vX':'player_model_fallback'},confirmedSkills:proved,confirmedOver300:proved.filter(__captureESMFunction((__esmLocal305=(x=>supportedDistance(occ,x.id)>300)),"")),

      bossClientRange:bossRange(),minimumDistance:CFG.min,

      skills:ready.map(__captureESMFunction((__esmLocal306=(x=>({...x,...stats(occ,x.id),verifiedDistance:supportedDistance(occ,x.id),verified:verified(occ,x.id)}))),"")),

      afterTHWaitMs:CFG.afterTHWaitMs,basicHitQuota:mixed.hitQuota,confirmedSinceTH:mixed.confirmedSinceTH,thCycles:mixed.thCycles,primaryBasicEnabled:tqFive?.active()||mixed.primary,primaryBasicSkillId:primaryBasicId(),primaryBasicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,primaryBasicNativeCooldown:!tqFive?.active()&&mixed.basicPaceMs===null,primaryBasicBurstBeforeSkill:basicQuota(),basicRotation:basicRotation(),

      excludedBasicSkillIds:tqFive?.active()?[]:[...excludedBasics],tianQuanFiveBasics:tqFive?.report()??null,

      cosmic:{enabled:cosmic.enabled,active:cosmicActive(),thCasts:cosmic.thCasts,basicCasts:cosmic.basicCasts,
        supportedScopes:['THIEN_QUAN','LINH_LUNG','PHU_VAN'],requiresTQFiveBasics:true,
        lastNativeSkill:cosmic.lastNativeSkill,
        sinceNativeCastMs:cosmic.lastNativeAt===null?null:Math.max(0,Date.now()-cosmic.lastNativeAt),
        waitingReason:ST.lastReason,animationPlaying:animationPlaying(role().c),
        rankedTH:cosmic.thRanked,rankedBasic:cosmic.basicRanked,explorationChecks:cosmic.exploration,
        strongestTH:[...cosmic.thMeasured].filter(__captureESMFunction((__esmLocal307=(([,x])=>x.hits>=2)),"")).sort(__captureESMFunction((__esmLocal308=((a,b)=>b[1].damage/b[1].hits-a[1].damage/a[1].hits)),""))[0]?.[0]??null,
        skillObservations:[...cosmic.thMeasured].map(__captureESMFunction((__esmLocal309=(([id,x])=>({id,hits:x.hits,meanDamage:x.hits?x.damage/x.hits:null}))),"")),
        note:'Confirmed direct hits on current Boss; explores less-observed native-ready skills periodically. No cooldown modification.'},
      luoFeng:{enabled:luoFeng.enabled,active:luoFengActive(),profile:'LA_PHONG_DINH_PHONG',
        sampleWindow:luoFeng.sampleWindow,idleThresholdMs:luoFeng.idleThresholdMs,
        robustMinHits:luoFeng.robustMinHits,trimPerTail:luoFeng.trimPerTail,
        lastNativeSkill:cosmic.lastNativeSkill,
        idleMs:cosmic.lastNativeAt==null?null:Math.max(0,Date.now()-cosmic.lastNativeAt),
        possibleIdle:luoFengActive()&&cosmic.lastNativeAt!==null&&Date.now()-cosmic.lastNativeAt>=luoFeng.idleThresholdMs,
        lastReason:ST.lastReason,rhythm:apexRhythmReport(),dpsPilot4100:pilot4100Status(),basicSolo4100:basicSolo4100Status(),
        recentTH:[...cosmic.thMeasured].map(__captureESMFunction((__esmLocal310=(([id,x])=>({id,hits:x.hits,recentHits:x.recent?.length??0,recentMeanDamage:apexDamage(x),robustScore:apexRobustDamage(x)}))),"")),
        recentBasics:[...thGap.measured].map(__captureESMFunction((__esmLocal311=(([id,x])=>({id,hits:x.hits,recentHits:x.recent?.length??0,recentMeanDamage:apexDamage(x),robustScore:apexRobustDamage(x)}))),"")),
        note:'Apex V3: robust damage ranking and HP-loss rhythm observation only; not confirmed Boss attacks. No auto-dodge, native cooldown or movement changes.'},
      tqIdleFill:{...tqIdleFill,scope:'THIEN_QUAN_SCAN',nativeReadyOnly:true,strictProofProtected:true},
      thGapBasics:{enabled:thGap.enabled,windowMs:thGap.windowMs,active:thGapActive(),strongestVerifiedBasic:strongestThGapBasic(),
        attempts:thGap.attempts,nativeAccepted:thGap.accepted,blockedCooldown:thGap.blockedCooldown,lastBasic:thGap.lastBasic,
        measured:[...thGap.measured].map(__captureESMFunction((__esmLocal312=(([id,x])=>({id,hits:x.hits,meanDamage:x.hits?x.damage/x.hits:null}))),""))},
      confirmedBasicTailCut:confirmedTailCut,confirmedBasicTailCuts:confirmedTailCuts,confirmedTailSkillIds:tqFive?.active()?tqFive.ids():[8001,8005],

      skillPriority:tqFive?.active()?(basicSolo4100Active()?'4100_native_basics_only':tqFive.allowsTuyetHoc()?'five_basics_plus_tuyet_hoc_10ms':'five_basics_10ms'):CFG.basicOnly?'basic8001':skillPriority==='tuyet_hoc_first'?'ready_tuyet_hoc_observed_damage_then_basic':mixed.enabled?(mixed.primary?(basicRotation().length?'native_basic_rotation_then_tuyet_hoc':'three_primary_basics_then_tuyet_hoc'):'alternating_native_rotation'):['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(__getKVPV4()?.status?.().kind)?'observed_damage_with_fair_rotation':'native_rotation',

      eligibleSkillIds:tqFive?.active()?tqIds:ST.mode==='SCAN'?ready.map(__captureESMFunction((__esmLocal313=(x=>x.id)),"")):proved.map(__captureESMFunction((__esmLocal314=(x=>x.id)),"")),

      lastDistance:ST.lastDistance,currentDistance:radius(role().a,role().c?.target),lastHitDistance:ST.lastHitDistance,

      combatRunning:ST.running&&combatOwner()?.running===true,combatPhase:ST.running?combatOwner()?.phase:'OFF',

      recoveryEnabled:!tqDistanceOnly(),distanceOnly310:tqDistanceOnly(),finishBossHpPct:['LINH_LUNG','PHU_VAN','TRU_TIEN'].includes(__getKVPV4()?.status?.().kind)?2:null,combatOwner:combatOwner()?.owner??'HITRUN',

      positionTolerance:CFG.tolerance,positionRetries:ST.positionRetries,positionWaypointExtra:ST.positionOffset,nativeArrivalSnap:ST.arrivalSnap,nativeArrivalExtraTolerance:ST.arrivalSnap?1:0,movementCommands:ST.moves,recoveryResumes:ST.resumes,hitrunPhase:ST.lastOwnerPhase,

      positioning:ST.positioning,paceMs:currentPace(),adaptivePacing:pacer?.status()??null,fastCasts:ST.fastCasts,blockedNativeSteering:ST.blockedSteering,

      castAttempts:ST.castAttempts,confirmedCastHitPairs:ST.confirmedPairs,blockedOtherSkills:ST.blocked,

      lastReason:ST.lastReason,lastError:ST.lastError,localLogCleanup:localLogCleanupStatus(),

      timerActive:ST.timer!=null,lastTickAt:ST.lastTickAt,tickAgeMs:ST.lastTickAt===null?null:Math.max(0,Date.now()-ST.lastTickAt),timerRepairs:ST.timerRepairs,

      warning:proved.length===0?'No independently verified skill at this distance yet. STRICT will wait; use SCAN to observe combat.':'Observed matching skill damage at tested distance; this does not guarantee safety from Boss attacks.'};

    if(show){console.table(ready.map(__captureESMFunction((__esmLocal315=(x=>({...x,verified:verified(occ,x.id),pairs:ST.proofs.get(key(occ,x.id))?.size||0}))),"")));console.log(TAG,ret);}return ret;

  }
__esmLocal300=statusImpl;


  

  function start(mode='STRICT'){if(mode!=='STRICT'&&mode!=='SCAN')throw Error('Use STRICT or SCAN');

    if(String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)throw Error('wrong actor');

    if(CFG.goal>600)throw Error('Boss danger range exceeds the bounded far-skill trial');

    __getKVPV7()?.setTrialRange?.(CFG.max);

    ST.positionSample=null;ST.positionRetries=0;ST.positionOffset=0;ST.positionCommands=0;ST.positionPause=null;ST.positionRecovery=0;if(mode==='SCAN'){thCalibration.autoLocked=false;thCalibration.skillId=null;thCalibration.completedAt=null;thCalibration.reason='measuring_confirmed_damage';}ST.mode=mode;ST.running=true;ST.positioning=true;ST.moveGoal=null;ST.lastMove=-Infinity;ST.lastOwnerPhase=null;ST.lastReason='starting';ST.lastError='';

    if(ST.timer==null){const schedule=__getKVPV20()?.timers?.setInterval??W.setInterval;if(typeof schedule==='function')ST.timer=schedule(tick,CFG.scanMs);}tick();return status(false);

  }
__esmLocal316=start;


  

  

  function repairPolling(){

    if(!ST.running||W.document?.hidden===true||W.__KVPV_UNIVERSAL_HALTED||

      String(W._Ba?._rJ?._O$?.ins?.actorId??'')!==actorId)return false;

    if(ST.timer!=null&&ST.lastTickAt!==null&&Date.now()-ST.lastTickAt<2500)return false;

    if(ST.timer!=null)(__getKVPV20()?.timers?.clearInterval??W.clearInterval)(ST.timer);

    ST.timer=typeof (__getKVPV20()?.timers?.setInterval??W.setInterval)==='function'?(__getKVPV20()?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;

    ST.timerRepairs++;tick();return true;

  }
__esmLocal317=repairPolling;


  function stop(reason='user'){if(reason==='user'||String(reason).startsWith('Người dùng dừng'))__getKVPV14()?.stop?.('th300_manual_stop');else __getKVPV14()?.suspend?.('th300_paused');localLogCleanup.enabled=false;const ownPositioning=ST.positioning&&ST.moveGoal,r=role();ST.running=false;ST.mode='OFF';if(ST.timer!=null){(__getKVPV20()?.timers?.clearInterval ?? W.clearInterval)(ST.timer);ST.timer=null;}

    restoreSpeedClips();

    if(ST.c && ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)__getKVPV5()?.stop?.('Release guarded far-skill hook');

    unbind();unlisten();if(ownPositioning)r.m?.stop?.();ST.moveGoal=null;ST.lastReason=reason;return status(false);}
__esmLocal318=stop;


  

  function report(){
    expire();
    const combat=role().c,cooldown=typeof combat?.isCooldown==='function'?combat.isCooldown():null;
    const animating=animationPlaying(combat);
    const tuyetHocRows=[role().s?._rtt,role().s?._wet].flatMap(rows=>Array.isArray(rows)?rows:[])
      .filter(row=>isTuyetHocSkill(Number(row?.[0]))).slice(0,16)
      .map(row=>({id:Number(row[0]),readyAt:Number(row[1]),ready:Number.isFinite(Number(row[1]))&&Number(row[1])<Date.now()}));
    return {
      hitDiagnostics:JSON.parse(JSON.stringify(hitDiagnostics)),
      nativeCombat:{
        dispatch:{observed:!!dispatch.actor,calls:dispatch.calls,signals:dispatch.signals,silent:dispatch.silent,recent:dispatch.recent.slice()},
        targetId:identity(combat?.target),trackedTargetId:identity(ST.target),internalTargetId:identity(combat?._wft),
        selectorOwned:role().s?._f7t===ST.s?.fn,
        combatOwned:combat?.combat===ST.c?.fn||combat?.combat?.__KVPV_GUARD_PARENT===ST.c?.fn,
        cooldown,animationPlaying:animating
      },
      nativeGate:{blockedBy:[...(cooldown===true?['cooldown']:[]),...(animating?['animation']:[])],cooldown,animationPlaying:animating,lastReason:ST.lastReason},
      interleaved:{
        enabled:tqFive?.active()||mixed.enabled,basicClientWaitMs:tqFive?.active()?tqFive.wait():mixed.basicPaceMs,
        basicSuspended:mixed.suspended,basicUnconfirmed:mixed.unconfirmed,nativeAnimationGate:true,scanMs:CFG.scanMs,
        nextPreferred:mixed.wantBasic?'basic':'tuyet_hoc',basicAttempts:mixed.attempts,basicConfirmedHits:mixed.hits,
        confirmedHitTailRelease:true,basicTailReleases:ST.basicTailReleases,basicMatchedDamage:mixed.damage,
        examples:mixed.examples.map(x=>({...x}))
      },
      burst:{
        enabled:burst.enabled,experimental:true,minBatchGapMs:Math.max(100,CFG.scanMs),maxSkillsPerBatch:8,
        resultWaitScope:'per_skill',nativeRows:tuyetHocRows,lastPass:JSON.parse(JSON.stringify(burst.lastPass)),
        batches:JSON.parse(JSON.stringify(burst.history)),
        note:'Client calls in one JS turn; matched damage is required for each skill. Not guaranteed simultaneous server execution. Native per-skill readiness is preserved.'
      },
      performance:metrics?.report()??null,build:__getKVPV20()?.build??null,
      controllerBuild:typeof __KVPV_V1_BUILD==='undefined'?null:__KVPV_V1_BUILD,
      ...status(false),history:ST.history.slice(),scope:__getKVPV4()?.status?.()??null,
      interpretation:'attempts are client combat calls; only matched damage confirms a hit. Unconfirmed does not prove a server range limit.'
    };
  }
__esmLocal319=report;


  

  function setDistance(value){const d=tqDistanceOnly()?310:Number(value);if(!Number.isFinite(d)||d<=280||d>600)throw Error('Distance must be in (280,600]');

    __getKVPV7()?.setTrialRange?.(d+10);CFG.goal=d;CFG.min=d===300?295:d>300?300:280;CFG.max=d+10;

    ST.lastMove=-Infinity;ST.moveGoal=null;ST.positioning=true;if(ST.running)tick();return status(false);}
__esmLocal325=setDistance;


  

  function performance(){const p=metrics?.report()??null;console.table(p?.current?.skills??[]);console.log(TAG,p);return p;}
__esmLocal326=performance;

  function bossInfo(show=true){
    const read=__captureESMFunction((__esmLocal328=(fn=>{try{return fn()??null;}catch{return null;}})),"read");
    const snapshot=__captureESMFunction((__esmLocal329=(value=>read(__captureESMFunction((__esmLocal330=(()=>JSON.parse(JSON.stringify(value)))),"")))),"snapshot");
    const raw=__captureESMFunction((__esmLocal331=(row=>Array.isArray(row)?row.slice(0,24).map(__captureESMFunction((__esmLocal332=(v=>v===null||['string','number','boolean'].includes(typeof v)?v:null)),"")):null)),"raw");
    const r=read(__captureESMFunction((__esmLocal333=(()=>role())),"")),boss=r?.c?.target,bossId=identity(boss),occ=Number(prop(boss,'occ'));
    const nativeBoss=read(__captureESMFunction((__esmLocal334=(()=>W._ft?._tY?.ins?.isBoss?.(occ))),""));
    if(!boss||boss.isValid===false||!bossId||Number(prop(boss,'type'))!==1||![true,1].includes(nativeBoss)){
      const result={at:Date.now(),available:false,reason:'no_selected_native_boss'};
      if(show)console.log('[Boss]',result);return result;
    }
    const cfg=read(__captureESMFunction((__esmLocal335=(()=>W._ft?._tY?.ins?.getCfgById?.(occ))),""));
    const bc=read(__captureESMFunction((__esmLocal336=(()=>boss.getComponent?.(Combat))),"")),selector=read(__captureESMFunction((__esmLocal337=(()=>boss.getComponent?.(Skill))),""));
    const cast=read(__captureESMFunction((__esmLocal338=(()=>__getKVPV12()?.status?.(false))),"")),impact=read(__captureESMFunction((__esmLocal339=(()=>__getKVPV11()?.status?.(false))),""));
    const castModel=String(cast?.bossId??'')===bossId?cast:null;
    const impactModel=String(impact?.selectedBoss??'')===bossId?impact:null;
    const rows=[...(Array.isArray(selector?._rtt)?selector._rtt:[]),...(Array.isArray(selector?._wet)?selector._wet:[])].slice(0,64);
    const trained=Array.isArray(castModel?.trained)?castModel.trained:[];
    const ids=[...new Set([...rows.map(__captureESMFunction((__esmLocal340=(row=>Number(row?.[0]))),"")),...trained.map(__captureESMFunction((__esmLocal341=(row=>Number(row.skillId))),"")),Number(castModel?.pending?.skillId)].filter(__captureESMFunction((__esmLocal342=(id=>Number.isSafeInteger(id)&&id>0)),"")))].slice(0,32);
    const skills=ids.map(__captureESMFunction((__esmLocal343=(skillId=>{
      const live=read(__captureESMFunction((__esmLocal344=(()=>bc?._mvt?.(skillId))),"")),fallback=live?null:read(__captureESMFunction((__esmLocal345=(()=>W._ft?._nY?.ins?.getCfgBySkillIdAndLv?.(skillId,1))),"")),config=live??fallback;
      return {skillId,name:typeof config?.[2]==='string'?config[2]:null,configSource:live?'boss_native_config':fallback?'level_1_fallback_not_confirmed_boss_level':'unavailable',nativeRows:rows.filter(__captureESMFunction((__esmLocal346=(row=>Number(row?.[0])===skillId)),"")).map(raw),configRaw:raw(config),observedCastToDamageMs:snapshot(trained.find(__captureESMFunction((__esmLocal347=(row=>Number(row.skillId)===skillId)),""))?.castToImpactMs??[])};
    })),""));
    const hp=snapshot(prop(boss,'hp')),hpNow=Array.isArray(hp)?Number(hp[0]):NaN,hpMax=Array.isArray(hp)?Number(hp[1]):NaN;
    const result=snapshot({version:1,at:Date.now(),available:true,actor:actorId,bossId,occ,name:prop(boss,'name'),scene:scene(),hp,hpPct:Number.isFinite(hpNow)&&Number.isFinite(hpMax)&&hpMax>0?100*hpNow/hpMax:null,distance:radius(r.a,boss),nativeBossRange:Number.isFinite(Number(cfg?.[3]))&&Number(cfg?.[3])>0?Number(cfg[3]):null,bossConfigRaw:raw(cfg),bossAnimationPlaying:read(__captureESMFunction((__esmLocal348=(()=>bc?._jh?.isPlaying)),"")),skills,existingCastModel:castModel,existingImpactModel:impactModel,limits:'Read-only snapshot using existing observations. No new timers or combat hooks. Configured range is not a guaranteed dodge boundary; static config is not cast windup. Missing skills/signals remain unknown.'});
    if(show){console.table([{name:result.name,bossId,occ,hpPct:result.hpPct,distance:result.distance,nativeBossRange:result.nativeBossRange}]);console.table(result.skills);console.log('[Boss]',result);}return result;
  }
__esmLocal327=bossInfo;

  function dps(show=true){const p=metrics?.report()??null;if(p){const boss=bossInfo(false);p.bossInfo=boss;p.skill1008=skill1008Info(false);p.bossMatchesEncounter=!!boss.available&&String(p.current?.bossId??'')===boss.bossId;}if(show){if(p?.current){console.table(Object.entries(p.current.groups).map(__captureESMFunction((__esmLocal350=(([group,values])=>({group,...values}))),"")));console.table(p.current.skills.map(__captureESMFunction((__esmLocal351=(r=>({id:r.id,group:r.group,hits:r.hits,matchedDamage:r.matchedDamage,matchedDps:r.matchedDps,rolling10sMatchedDps:r.rolling10sMatchedDps,averageMatchedDamage:r.averageMatchedDamage,animationWaitMs:r.animationWaitMs,animationWaitAverageMs:r.animationWaitAverageMs,animationWaitMaxMs:r.animationWaitMaxMs,unconfirmed:r.unconfirmed}))),"")));}console.log('[DPS matched]',p);}return p;}
__esmLocal349=dps;


  function setBurst(enabled=true){burst.enabled=!!enabled;if(burst.enabled){mixed.enabled=false;mixed.wantBasic=false;}burst.nextAt=0;return {enabled:burst.enabled,experimental:true,maps:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN']};}
__esmLocal352=setBurst;


  function setInterleaved(enabled=true,distance=302){mixed.enabled=!!enabled;mixed.wantBasic=false;mixed.suspended=false;mixed.unconfirmed=0;

    if(mixed.enabled){burst.enabled=false;setDistance(distance);}

    return {enabled:mixed.enabled,distance:CFG.goal,burst:burst.enabled};}
__esmLocal354=setInterleaved;


  function setBasicPace(value=1){if(value===null){mixed.basicPaceMs=null;mixed.ready.clear();return {enabled:false};}

    const n=Number(value);if(!Number.isFinite(n)||n<0||n>1000)throw Error('Basic client wait must be 0..1000 ms');

    mixed.basicPaceMs=n;mixed.ready.clear();return {enabled:true,clientWaitMs:n,nativeAnimationGate:true};}
__esmLocal355=setBasicPace;


  function setPrimaryBasic(enabled=true){mixed.primary=!!enabled;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;mixed.ready.clear();return {enabled:mixed.primary,skillId:primaryBasicId(),clientWaitMs:mixed.basicPaceMs,nativeCombatGate:true};}
__esmLocal356=setPrimaryBasic;


  function setAfterTHWait(value=1){if(!Number.isFinite(value)||value<0||value>1000)throw Error('TH wait must be 0..1000 ms');CFG.afterTHWaitMs=value;return value;}
__esmLocal357=setAfterTHWait;


  function setBasicHitQuota(value=null){if(value!==null&&(!Number.isSafeInteger(value)||value<1))throw Error('Hit quota must be a positive integer');mixed.hitQuota=value;mixed.confirmedSinceTH=0;mixed.thCycles=0;mixed.wantBasic=mixed.primary;return value;}
__esmLocal358=setBasicHitQuota;


  function setBasicRotation(ids=[]){const solo8002=Array.isArray(ids)&&ids.length===1&&Number(ids[0])===8002&&__getKVPV4()?.status?.()?.kind==='THIEN_QUAN';if(!Array.isArray(ids)||ids.some(__captureESMFunction((__esmLocal360=(id=>!isBasic(id)||(excludedBasics.has(Number(id))&&!tqFive?.report()?.enabled&&!solo8002))),"")))throw Error('Rotation requires allowed native basic IDs');if(solo8002)excludedBasics.delete(8002);else excludedBasics.add(8002);mixed.rotation=[...new Set(ids.map(Number))];mixed.rotationCursor=0;mixed.primaryStreak=0;mixed.wantBasic=mixed.primary&&!mixed.suspended;return basicRotation();}
__esmLocal359=setBasicRotation;


  function releaseOutsideScope(){if((__getKVPV4()??__getKVPV17())?.inside?.()!==false)return false;

    if(!ST.s&&!ST.c&&!ST.target&&!ST.movement.length)return true;

    if(ST.c&&ST.c.obj?.combat?.__KVPV_GUARD_PARENT===ST.c.fn)__getKVPV5()?.stop?.('Leave far-map hook ownership');

    unbind();unlisten();ST.moveGoal=null;return true;

  }
__esmLocal361=releaseOutsideScope;


  function setBasicOnly(enabled=true){CFG.basicOnly=!!enabled;CFG.scanMs=100;

    if(enabled){mixed.enabled=true;mixed.primary=true;mixed.rotation=[8001];mixed.rotationCursor=0;mixed.wantBasic=true;mixed.basicPaceMs=0;mixed.ready.clear();burst.enabled=false;CFG.clientPaceMs=0;}

    if(ST.timer!==null){(__getKVPV20()?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (__getKVPV20()?.timers?.setInterval??W.setInterval)==='function'?(__getKVPV20()?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}

    return {enabled:CFG.basicOnly,skillId:8001,scanMs:CFG.scanMs,addedClientWaitMs:CFG.clientPaceMs,serverMultiplierVerified:false};}
__esmLocal362=setBasicOnly;


  // 1 restores native visuals. 9/30/99 reduce only Tuyet Hoc visual duration.
  // On-demand intelligence report only; never called on the 1ms combat loop.
  function tianQuan4100Diagnosis(show=true){
    const current=metrics?.report()?.current??null,pilot=pilot4100Status(),
      states=current?.timeMs??{},elapsedMs=current?.elapsedMs??null;
    const rows=Object.entries(states).map(__captureESMFunction((__esmLocal364=(([reason,ms])=>({reason,ms,
      pct:elapsedMs>0?+(ms/elapsedMs*100).toFixed(1):null}))),"")).sort(__captureESMFunction((__esmLocal365=((a,b)=>b.ms-a.ms)),""));
    const relevant=current?.skills??[],basic=relevant.filter(__captureESMFunction((__esmLocal366=(r=>r.group==='basic')),"")),
      th=relevant.filter(__captureESMFunction((__esmLocal367=(r=>r.group==='tuyetHoc')),""));
    const groupInfo=__captureESMFunction((__esmLocal368=(rows=>({casts:rows.reduce(__captureESMFunction((__esmLocal369=((n,r)=>n+r.attempts)),""),0),
      directHits:rows.reduce(__captureESMFunction((__esmLocal370=((n,r)=>n+r.hits)),""),0),unconfirmed:rows.reduce(__captureESMFunction((__esmLocal371=((n,r)=>n+r.unconfirmed)),""),0),
      directDamage:rows.reduce(__captureESMFunction((__esmLocal372=((n,r)=>n+r.matchedDamage)),""),0)}))),"groupInfo");
    const recommendations=[];
    const spent=__captureESMFunction((__esmLocal373=(key=>Number(states[key]||0))),"spent");
    if(spent('positioning')>0.2*Number(elapsedMs||0))
      recommendations.push('Positioning is costly: inspect moving Boss/orbit/retries before changing damage rotation.');
    if(spent('waiting_native_animation')>0.2*Number(elapsedMs||0))
      recommendations.push('Native animation gate dominates: inspect animationWaitMs, never assume client visual speed reduces server cooldown.');
    if(spent('native_cooldown')+spent('waiting_native_cooldown')>0.2*Number(elapsedMs||0))
      recommendations.push('Native cooldown dominates: prioritize higher confirmed damage on ready skills; 1ms polling cannot shorten server cooldown.');
    if(spent('skill_readiness')+spent('waiting_ready_tuyet_hoc')>0.2*Number(elapsedMs||0))
      recommendations.push('Skill readiness dominates: inspect verified TH range and client/native pending casts.');
    if(pilot.phase==='chosen')
      recommendations.push('Boss HP A/B selected '+pilot.selectedMode+'; improvement is observed, not guaranteed on the next Boss.');
    if(!recommendations.length)
      recommendations.push('Need more confirmed Boss-HP and cast-hit observations before choosing a safe acceleration.');
    const out={stage:Number(W._Ba?._Co?._Mo?.ins?.curLv)||null,scope:__getKVPV4()?.status?.()?.kind??null,
      distance:radius(role().a,role().c?.target),configuredBossRange:bossRange(),
      elapsedMs,topTimeCosts:rows.slice(0,8),directMatchedDps:current?.summary?.matchedDps??null,
      rolling10sMatchedDps:current?.summary?.rolling10sMatchedDps??null,
      skillGroups:{basic:groupInfo(basic),tuyetHoc:groupInfo(th)},
      dpsPilot:pilot,recommendations,
      warning:'Client matched-hit DPS omits some damage sources; Boss HP drops can include companions/other players. No server speed guarantee.'};
    if(show){console.table(out.topTimeCosts);console.table(out.skillGroups);console.log('[La Phong 4100]',out);}return out;
  }
__esmLocal363=tianQuan4100Diagnosis;

  function setTianQuan4100Pilot(enabled=true){pilot4100.enabled=enabled===true;
    if(pilot4100.enabled)basicSolo4100.enabled=false;
    resetPilot4100();return pilot4100Status();}
__esmLocal374=setTianQuan4100Pilot;

  function setTianQuanLuoFeng(enabled=true){
    luoFeng.enabled=!!enabled;
    if(enabled)cosmic.enabled=true;else resetApexRhythm();
    return {enabled:luoFeng.enabled,scope:'THIEN_QUAN',sampleWindow:luoFeng.sampleWindow,
      inheritedCosmic:cosmic.enabled,nativeCooldownUnchanged:true};
  }
__esmLocal375=setTianQuanLuoFeng;

  function setTianQuanCosmic(enabled=true){cosmic.enabled=!!enabled;
    return {enabled:cosmic.enabled,scope:['THIEN_QUAN','LINH_LUNG','PHU_VAN'],requiresTQFiveBasics:true,nativeOnly:true,requiresMatchedHits:2,exploreEvery:7};}
__esmLocal376=setTianQuanCosmic;

  function setTianQuanIdleFill(enabled=true){
    tqIdleFill.enabled=enabled===true;
    return {enabled:tqIdleFill.enabled,minRepeatMs:tqIdleFill.minRepeatMs,
      maxPendingPerTH:tqIdleFill.maxPendingPerTH,scope:'THIEN_QUAN_SCAN',nativeOnly:true};
  }
__esmLocal377=setTianQuanIdleFill;

  function setTianQuanTHGapBasics(enabled=true,windowMs=1200){
    if(!Number.isInteger(windowMs)||windowMs<100||windowMs>2000)throw Error('TH gap window must be 100..2000ms');
    thGap.enabled=!!enabled;thGap.windowMs=windowMs;if(!thGap.enabled)resetThGap();
    return {enabled:thGap.enabled,windowMs:thGap.windowMs,nativeReadyOnly:true,perTHLimit:1};
  }
__esmLocal378=setTianQuanTHGapBasics;

  function setTianQuanTuyetHocVisualSpeed(factor=99){
    if(![1,9,30,99,99999].includes(factor))throw Error('TH visual speed must be 1, 9, 30, 99 or 99999');
    CFG.tqTuyetHocVisualSpeed=factor;
    if(factor===1)restoreSpeedClips();
    return {factor,scope:'THIEN_QUAN',ids:[1001,1002,1003,1004,1005,1006,1007,1008],visualOnly:true,serverCooldownUnchanged:true};
  }
__esmLocal379=setTianQuanTuyetHocVisualSpeed;

  function setTianQuanBasicVisualSpeed(factor=1){
    if(![1,9,30,99,9999,99999].includes(factor))throw Error('TQ basic visual speed must be 1, 9, 30, 99, 9999 or 99999');
    CFG.tqBasicVisualSpeed=factor;
    if(factor===1)restoreSpeedClips();
    return {factor,scope:'THIEN_QUAN',ids:[8001,8002,8003,8004,8005],visualOnly:true,serverCooldownUnchanged:true};
  }
__esmLocal380=setTianQuanBasicVisualSpeed;

  function setTianQuanVisualSpeed(factor=9999){
    if(![1,9,30,99,9999,99999].includes(factor))throw Error('Unsupported visual speed');
    if(factor===9999||factor===99999){
      CFG.tqTuyetHocVisualSpeed=factor;
    }else setTianQuanTuyetHocVisualSpeed(factor);
    setTianQuanBasicVisualSpeed(factor);
    return {factor,scope:'THIEN_QUAN',basic:[8001,8002,8003,8004,8005],tuyetHoc:[1001,1002,1003,1004,1005,1006,1007,1008],visualOnly:true,serverCooldownUnchanged:true};
  }
__esmLocal381=setTianQuanVisualSpeed;

  function setBasicAnimationSpeed(factor=1){if(![1,9,99,99999].includes(factor))throw Error('Native animation factor must be 1, 9, 99 or 99999');restoreSpeedClips();CFG.basicAnimationSpeed=factor;return {factor,scope:['THIEN_QUAN','LINH_LUNG','PHU_VAN','TRU_TIEN'],playerSkillId:8001,serverDamageMultiplierVerified:false};}
__esmLocal382=setBasicAnimationSpeed;


  function setTianQuanFiveBasics(enabled=true,wait=10){if(!tqFive)return {enabled:false,available:false,reason:'five_basics_profile_not_loaded'};const out=tqFive.configure(enabled,wait);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(__getKVPV20()?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (__getKVPV20()?.timers?.setInterval??W.setInterval)==='function'?(__getKVPV20()?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}return out;}
__esmLocal383=setTianQuanFiveBasics;

  function setTianQuanFourBasics(enabled=true,wait=1){if(!tqFive)return {enabled:false,available:false,reason:'four_basics_profile_not_loaded'};const out=tqFive.configure(enabled,wait,enabled?[8001,8002,8003,8004]:null);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(__getKVPV20()?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (__getKVPV20()?.timers?.setInterval??W.setInterval)==='function'?(__getKVPV20()?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}return out;}
__esmLocal384=setTianQuanFourBasics;

  function setTianQuanThreeBasics(enabled=true,wait=1){if(!tqFive)return {enabled:false,available:false,reason:'three_basics_profile_not_loaded'};const out=tqFive.configure(enabled,wait,enabled?[8001,8002,8003]:null);mixed.ready.clear();mixed.rotationCursor=0;if(ST.timer!==null){(__getKVPV20()?.timers?.clearInterval??W.clearInterval)(ST.timer);ST.timer=typeof (__getKVPV20()?.timers?.setInterval??W.setInterval)==='function'?(__getKVPV20()?.timers?.setInterval??W.setInterval)(tick,CFG.scanMs):null;}return out;}
__esmLocal385=setTianQuanThreeBasics;

  function setTianQuanTuyetHoc(enabled=true){if(!tqFive)return {enabled:false,available:false,reason:'five_basics_profile_not_loaded'};return tqFive.setTuyetHoc(enabled);}
__esmLocal386=setTianQuanTuyetHoc;

  function setSkillPriority(value='tuyet_hoc_first'){
    if(!['tuyet_hoc_first','interleaved'].includes(value))throw Error('Skill priority must be tuyet_hoc_first or interleaved');
    skillPriority=value;return {skillPriority};
  }
__esmLocal389=setSkillPriority;

  const api={setLocalLogAutoClear,tianQuan4100Diagnosis,setTianQuan4100BasicSolo,setTianQuan4100Pilot,setTianQuanLuoFeng,setTianQuanCosmic,setTianQuanIdleFill,setTianQuanTHGapBasics,setTianQuanTuyetHocVisualSpeed,setTianQuanBasicVisualSpeed,setTianQuanVisualSpeed,setTianQuanTuyetHoc,setTianQuanMpackExtras,setTianQuanFiveBasics,setTianQuanFourBasics,setTianQuanThreeBasics,setSkillPriority,setBasicAnimationSpeed,setBasicOnly,isBasicOnly:__captureESMFunction((__esmLocal393=(()=>tqFive?.active()?(basicSolo4100Active()||!tqFive.allowsTuyetHoc()):CFG.basicOnly)),"isBasicOnly"),releaseOutsideScope,setClientPace,setScanInterval,setConfirmedTailCut,setAfterTHWait,setBasicHitQuota,setBasicRotation,setPrimaryBasic,setBasicPace,setInterleaved,setBurst,performance,dps,bossInfo,skill1008Info,version:'1.0.0',start,stop,status,report,setDistance,repairPolling,sync:tick,export:__captureESMFunction((__esmLocal394=(()=>JSON.stringify(report(),null,2))),"export"),history:__captureESMFunction((__esmLocal395=(()=>ST.history.slice())),"history")};

  W.KVPV_TH300=api;

  console?.info?.(TAG,'READY/OFF. START: KVPV_MODE.start("BOSS_TH300_SCAN") then KVPV_MODE.start("BOSS_TH300")');

})),""))();


}
export {getKVPV_TH300} from '../api.mjs';
export {getKVPV_TQ_BASIC_PROFILE} from '../api.mjs';
export {getKVPV_TQ_SINGLE_STRONGEST_TH} from '../api.mjs';
export const api=Object.freeze({
  get KVPV_TH300(){return globalThis.KVPV_TH300;},
  get KVPV_TQ_BASIC_PROFILE(){return globalThis.KVPV_TQ_BASIC_PROFILE;},
  get KVPV_TQ_SINGLE_STRONGEST_TH(){return globalThis.KVPV_TQ_SINGLE_STRONGEST_TH;},
});