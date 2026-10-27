$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$startup = Join-Path ([Environment]::GetFolderPath('Startup')) 'KVPV_GitHub_AutoSync.vbs'
if (Test-Path -LiteralPath $startup) { Remove-Item -LiteralPath $startup }
$pidFile = Join-Path $root '.kvpv-live/git-auto-sync.pid'
if (Test-Path -LiteralPath $pidFile) {
 $id = 0
 if ([int]::TryParse((Get-Content -LiteralPath $pidFile -Raw).Trim(),[ref]$id)) {
   $script = Join-Path $PSScriptRoot 'auto-pull.cjs'
   $p = Get-CimInstance Win32_Process -Filter "ProcessId=$id" -ErrorAction SilentlyContinue
   if ($p -and $p.CommandLine -and $p.CommandLine.Contains($script)) { Stop-Process -Id $id }
 }
}
Write-Host 'Da tat Git auto-sync. Khong can thiep extension va game dang chay.'
