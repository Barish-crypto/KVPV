$ErrorActionPreference = 'Stop'
$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$pidPath = Join-Path $projectRoot '.kvpv-live/watcher.pid'
$watchPath = Join-Path $PSScriptRoot 'watch.cjs'
if (Test-Path -LiteralPath $pidPath) {
  $watcherId = 0
  if ([int]::TryParse(([IO.File]::ReadAllText($pidPath).Trim()), [ref]$watcherId)) {
    $existing = Get-CimInstance Win32_Process -Filter "ProcessId=$watcherId" -ErrorAction SilentlyContinue
    if ($existing -and $existing.CommandLine -and $existing.CommandLine.Contains($watchPath)) {
      Stop-Process -Id $watcherId
      Write-Output 'Stopped KVPV watcher only. Browser and current game code stay running.'
      exit 0
    }
  }
}
Write-Output 'KVPV watcher is not running.'
