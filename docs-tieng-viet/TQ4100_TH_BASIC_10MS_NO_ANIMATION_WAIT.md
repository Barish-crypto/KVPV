# TQ4100 La Phong: Tuyet Hoc + 5 don tay 10 ms; skip client animation gate

## Thay doi
- src/11-auto-tianquan.js: auto startup THIEN_QUAN dung ca Tuyet Hoc 1001-1008 va 5 don tay 8001-8005 tai tang 4100. Che do chi danh tay 4100 duoc tat mac dinh nhung van bat duoc thu cong.
- Scan / client pace duoc cai 10ms qua setClientPace(10), setBasicPace(10), setTianQuanFiveBasics(true,10). Khong con 1ms hold them sau TH: setAfterTHWait(0).
- setTianQuan4100SkipAnimation(true) bo qua dieeu kien `_jh.isPlaying===true` trong phep KIEM TRA san sang client, CHI khi dang chien dau tai TQ4100, khong bien hinh.
- Moi lan thu danh van phai qua isCooldown() native === false, target/range/scope/HP/HitRun gate va pacing. Neu thieu API cooldown native thi khong bo qua gate.
- Khong viet lai method isCooldown; khong ep server cooldown false, khong sua thong tin hang skill native, khong can thiep WebSocket, khong tu huy hoat anh.
- Day la bo qua CHO HOAT ANH native trong combat controller, khong tat hieu ung ve tren man hinh. Server co the khong nhan cac lenh den trong khi animation va cooldown cua server dang chan.
- Ngoai tang 4100, gate hoat anh giu nguyen; nhung client cadence TH+5 basics trong cau hinh startup la 10ms o cac tang TQ duoc bat, dung theo yeu cau.

## Quan sat sau khi da build/nap ban moi
  KVPV_TH300.status(false).animation4100
  KVPV_TH300.status(false).paceMs
  KVPV_TH300.status(false).afterTHWaitMs
  KVPV_TH300.dps(false).current

## Tat thu nghiem ngay ma khong dung auto
  KVPV_TH300.setTianQuan4100SkipAnimation(false)

## Do luong thuc te
- So sanh 15-30s va nhieu Boss: castAttempts, confirmed pairs/damage, DPS, disconnects. CastAttempt tang KHONG dong nghia DPS tang.
- Kiem tra mode thuong / TH, default native cooldown. Neu bi giat/lag disconnect, tat skip gate bang lenh tren.

## Test
- TEST_TQ4100_ANIMATION_10MS.cjs: TH & basics goi native combat khi animation dang play, van bi chan boi cooldown native, missing cooldown API, map/floor khac, manual off.
- TEST_TQ4100_BASIC_SOLO.cjs: startup TH+five basics 10ms, 0ms artificial gap, skip animation active at 4100; solo manual override van hoat dong.
- TEST_TQ_FIVE_BASICS.cjs: startup cadence 10ms; cac test cu ve selector va range giu nguyen.
- Tests mo phong PASS; CHUA chay full node test.cjs hay verify DPS tren game Windows. Khong thay ban dang chay neu chua xac minh.
