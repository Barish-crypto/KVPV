$ErrorActionPreference = 'Stop'
$env:KVPV_BROWSER = 'edge'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$stateDir = Join-Path $projectRoot '.kvpv-live'
$watchPath = Join-Path $PSScriptRoot 'watch.cjs'
$nodePath = (Get-Command node -ErrorAction Stop).Source
New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
$pidPath = Join-Path $stateDir 'watcher.pid'
if (Test-Path -LiteralPath $pidPath) {
  $watcherId = 0
  if ([int]::TryParse(([IO.File]::ReadAllText($pidPath).Trim()), [ref]$watcherId)) {
    $existing = Get-CimInstance Win32_Process -Filter "ProcessId=$watcherId" -ErrorAction SilentlyContinue
    if ($existing -and $existing.CommandLine -and $existing.CommandLine.Contains($watchPath)) {
      # Chi dung dung watcher cua du an nay; khong dong Edge/Chrome hoac game.
      Stop-Process -Id $watcherId -ErrorAction Stop
      Wait-Process -Id $watcherId -Timeout 5 -ErrorAction SilentlyContinue
      Write-Output 'Restarted the existing project watcher for Edge.'
    }
  }
}
Start-Process -FilePath $nodePath -ArgumentList @(('"' + $watchPath + '"')) -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $stateDir 'watcher.log') -RedirectStandardError (Join-Path $stateDir 'watcher-errors.log') | Out-Null
Write-Output 'KVPV live watcher started for Edge. Login in the dedicated Edge window. No Snippet/F5 required.'
