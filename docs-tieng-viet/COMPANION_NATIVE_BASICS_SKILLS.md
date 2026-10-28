# KVPV: Linh Thu, Phuc Oa, Ngu Thu — native basic and skills, default cooldown

## Co che
- Linh Thu = petContext (type 2), Phuc Oa = fuwaContext (type 9), Ngu Thu = rideContext (type 7).
- Tai THIEN_QUAN, LINH_LUNG, PHU_VAN, TRU_TIEN: scan moi 50ms; moi tro chien dung chinh selector.selectSkill() native va danh sach _rtt / _wet de chon ca danh thuong lan skill neu game san co.
- Khong can cho nhan vat chinh ra skill. Khi chu tan cong, event 1039 van trigger mot luot thu (kiem tra choi lap).
- Moi lan danh deu kiem tra animation (_jh.isPlaying), combat.isCooldown() === false, isValidTarget(), va isValidRange() neu co; khong sua cooldown/timestamp, khong tao skill ID va khong ep WebSocket.
- Duong Thi Luyen van ho tro ca ba tro chien nhung gio ton trong cooldown/animation native; khong con bo qua native cooldown o nhung 1ms poll.
- Dinh Thu tiep tuc theo cau hinh rieng, khong thuoc vong quet tro chien.
- Experimental isCooldown=false cua NHAN VAT CHINH tai TQ4100 la module rieng; khong ap dung cho tro chien.

## Kiem tra sau khi nap ban da build
Console: KVPV_COMPANION_COMBAT.status()
- perCompanion.pet / fuwa / ride: so lan native combat call, KHONG phai server-confirmed hit.
- nativeAutoAttempts: so lan do vong quet tu dong goi, khong can player cast.
- contexts: moi tro chien va cac ID/row native _rtt va _wet; target duoc chon.
- nativeAnimationGate, nativeRangeGate = true; clientSkillCooldownMs = null.

## Kiem thu
- TEST_COMPANION_NATIVE_DEFAULT.cjs: 3 tro chien tu danh basic + special native; row cooldown 150/300ms; combat cooldown, animation, native range, target, PvP exclusion, actor/death/stop.
- TEST_COMPANION_COMBAT.cjs: player follow, mansion, Road, reload, recursion, cooldown gates.
- TEST_BOOST.cjs: pet/fuwa/ride selectors vanilla; only cloak experiment keeps its previous selector behavior.
- TEST_COMBO_DEFAULT.cjs: native cooldown safety unchanged.
- Chua xac nhan server game truc tiep hoac chay full node test.cjs tren Windows; giu runtime hien tai cho den khi dong bo/build/kiem thu.
