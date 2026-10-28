#Requires AutoHotkey v2.0
#SingleInstance Force
#Warn

; KVPV: clears the ACTUAL Chrome/Edge DevTools Network request log by
; clicking its Clear network log icon. It does not touch WebSocket traffic,
; remote server state, cooldowns or game RPC.
;
; F8: With mouse hovering OVER the Network Clear button, remember position.
; F9: Start / pause auto-clear every 3 seconds (while same browser window focused).
; F10: Exit and stop all automation.
;
; External UI automation is required: code running inside the page cannot
; access the DevTools Network panel. Keep the Network panel layout unchanged.
; This clicks the Network *requests* Clear button; the selected WS Messages
; connection row can disappear too. It does not selectively erase WS frames.

CoordMode("Mouse", "Screen")
clearX := -1
clearY := -1
browserHwnd := 0
running := false

F8::{
    global clearX, clearY, browserHwnd
    hwnd := WinGetID("A")
    if !hwnd
        return
    exe := StrLower(WinGetProcessName("ahk_id " hwnd))
    if exe != "chrome.exe" && exe != "msedge.exe" {
        clearX := -1
        ToolTip("Click the Chrome/Edge DevTools Network window first.")
        SetTimer(HideTip, -1800)
        return
    }
    browserHwnd := hwnd
    MouseGetPos(&clearX, &clearY)
    ToolTip("Saved Clear button at " clearX ", " clearY ". Press F9.")
    SetTimer(HideTip, -1800)
}

F9::{
    global running, clearX, browserHwnd
    if clearX < 0 || !browserHwnd {
        ToolTip("Hover the Network Clear icon and press F8 first.")
        SetTimer(HideTip, -1800)
        return
    }
    running := !running
    SetTimer(AutoClearNetwork, running ? 3000 : 0)
    ToolTip(running ? "Network auto-clear ON, every 3s (F9 pause, F10 exit)." : "Network auto-clear OFF.")
    SetTimer(HideTip, -1800)
}

F10::ExitApp()

HideTip(*) {
    ToolTip()
}

AutoClearNetwork() {
    global running, clearX, clearY, browserHwnd
    if !running
        return
    if !WinExist("ahk_id " browserHwnd) {
        running := false
        SetTimer(AutoClearNetwork, 0)
        return
    }
    ; Never click another window or take focus from another application.
    if WinActive("ahk_id " browserHwnd) != browserHwnd
        return
    ; Skip a cycle if the human was moving or typing in the last 1.2 seconds.
    if A_TimeIdlePhysical < 1200
        return
    MouseGetPos(&oldX, &oldY)
    try {
        MouseMove(clearX, clearY, 0)
        Click()
    } finally {
        MouseMove(oldX, oldY, 0)
    }
}
