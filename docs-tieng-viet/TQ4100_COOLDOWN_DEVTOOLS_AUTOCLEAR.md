# TQ 4100: client isCooldown=false lien tuc + auto clear DevTools Network

## Pham vi
- Dieu khien moi: KVPV_TH300.startTianQuan4100CooldownExperiment(2000)
- Sau khi TH300 da chay trong Boss TQ 4100 BASIC SOLO, no bat ep isCooldown() tra ve false tren combat component dung nhan vat. Khong gioi han 10 hay 15 giay, chi dung khi tat thu cong, TH300 stop, doi Boss/scope/component, roi ai 4100.
- Giữ it nhat 80 ms giua hai lan dispatch combat cua TH300, khong bo animation gate, khong sua server cooldown hoac WebSocket payload.
- Test offline chi chung minh hook client, KHONG chung minh server tang sat thuong.
- Mac dinh OFF khi load. Tuyet doi khong tu override hook la.

## Console game sau khi build/nap code moi
  KVPV_TH300.startTianQuan4100CooldownExperiment(2000);
  KVPV_TH300.status(false).cooldown4100Trial;
  KVPV_TH300.status(false).localLogCleanup;

Tat ep cooldown:
  KVPV_TH300.setTianQuan4100CooldownOverride(false);

Tat don log cuc bo:
  KVPV_TH300.setLocalLogAutoClear(false);

Lenh 1 TU DON lich su debugger DO SCRIPT KVPV SO HUU moi 2000ms, khong tu xoa frame WS cua DevTools.

## Auto clear DUNG Network log cua Chrome/Edge DevTools tren Windows
JS chay trong game KHONG co quyen bo xoa bang Network/WS messages. Cong cu rieng:
  tools/KVPV_DEVTOOLS_NETWORK_AUTOCLEAR.ahk

Can cai AutoHotkey v2. Sau do:
1. Mo DevTools > Network, bo tick Preserve log.
2. Di chuot len NUT Clear network log (vong tron gach cheo phia tren goc trai). Nhan F8 de ghi vi tri nut.
3. Nhan F9 de bat/tat click Clear tu dong moi 3 giay, KHONG co gioi han thoi gian.
4. Nhan F10 de thoat.

Cong cu chi click neu cua so Chrome/Edge ghi nhan van dang foreground va ban khong go/di chuot trong 1.2 giay. Khong di chuyen/doi layout DevTools sau F8. Khong chon sai toa do: vi la mouse automation, neu layout thay doi, co the click nham nut.

Theo tai lieu Chrome: Clear network log xoa bang requests, BAO GOM dong WebSocket duoc chon; khong co API tu JS game de xoa rieng frame cua mot ket noi WS dang mo. Sau Clear, dong WS cu co the bien mat khoi Network cho den khi ket noi lai. KHONG co tac dung voi lich su server hay goi tin da gui.

## Xac minh
- 7 nhom test mo phong da PASS: TEST_TQ_LUOFENG, TEST_TQ_COSMIC, TEST_TQ_TH_GAP_BASIC, TEST_TQ_FIVE_BASICS, TEST_TQ4100_PILOT, TEST_TQ4100_BASIC_SOLO, TEST_TQ4100_COOLDOWN_TRIAL.
- Test moi xac nhan override qua 60s thoi gian mo phong, khong het han, khoi phuc native khi tat, gioi han toan scope, khong ghi de hook khac, xoa script-owned diagnostics khong xoa DPS.
- Chua chay full node test.cjs tren Windows; chua test direct Chrome/Edge actual UI; can test truoc khi thay runtime.
