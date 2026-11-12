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

De xem snapshot chi-doc cua inventory/cast observer, matched-damage metrics va cac controller skill/combat/PvP:
`KVPV_SKILL_ASYNC_OBSERVER.suiteStatus()`. `available:false` nghia la module do chua tao API;
loi status duoc ghi rieng tren tung controller va khong ngan cac controller khac duoc doc.
Truong `summary` dem so controller co san, chua san sang va gap loi. Observer doc skill rows qua
`role.getComponent(_d._Yct._Eet)` theo native component getter; no khong goi selector hay combat.
