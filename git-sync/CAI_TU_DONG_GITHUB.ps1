# One-time setup: source must already be a clean Git checkout tracking origin/*.
$ErrorActionPreference = 'Stop'
$root = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$node = (Get-Command node -ErrorAction Stop).Source
$git = (Get-Command git -ErrorAction Stop).Source
$repo = & $git -C $root rev-parse --is-inside-work-tree 2>$null
if ($LASTEXITCODE -ne 0 -or $repo -ne 'true') { throw 'Chua co Git repository. Doc git-sync\HUONG_DAN.md de ket noi GitHub mot lan.' }
$origin = & $git -C $root remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0 -or -not $origin) { throw 'Chua co GitHub origin. Thiet lap origin va push repo truoc.' }
$upstream = & $git -C $root rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>$null
if ($LASTEXITCODE -ne 0 -or -not $upstream.StartsWith('origin/')) { throw 'Branch chua theo doi origin/main (hoac origin/branch). Git push -u origin main mot lan.' }
$startup = [Environment]::GetFolderPath('Startup')
$bootstrap = Join-Path $startup 'KVPV_GitHub_AutoSync.vbs'
$script = Join-Path $PSScriptRoot 'auto-pull.cjs'
# VBS avoids a persistent console window; only local Node.js is started.
$nodeEsc = $node.Replace('"','""')
$scriptEsc = $script.Replace('"','""')
$vb = @(
 'Set s = CreateObject("WScript.Shell")',
 ('s.Run Chr(34) & "{0}" & Chr(34) & " " & Chr(34) & "{1}" & Chr(34), 0, False' -f $nodeEsc,$scriptEsc)
) -join "`r`n"
Set-Content -LiteralPath $bootstrap -Value $vb -Encoding Unicode
$state = Join-Path $root '.kvpv-live'
New-Item -ItemType Directory -Path $state -Force | Out-Null
$running = $false
$pidFile = Join-Path $state 'git-auto-sync.pid'
if (Test-Path -LiteralPath $pidFile) {
 $oldPid = 0
 if ([int]::TryParse((Get-Content -LiteralPath $pidFile -Raw).Trim(),[ref]$oldPid)) {
   $p = Get-CimInstance Win32_Process -Filter "ProcessId=$oldPid" -ErrorAction SilentlyContinue
   $running = $p -and $p.CommandLine -and $p.CommandLine.Contains($script)
 }
}
if (-not $running) { Start-Process -FilePath $node -ArgumentList @(('"' + $script + '"')) -WorkingDirectory $root -WindowStyle Hidden }
Write-Host 'OK: bat tu dong kiem tra GitHub khi Windows khoi dong, moi ~60 giay.' -ForegroundColor Green
Write-Host ('GitHub source: ' + $origin)
Write-Host ('Trang thai: ' + (Join-Path $state 'git-auto-sync-status.json'))
Write-Host 'Extension se tu dong build/nap neu Native Host da duoc cai va tab game da duoc gan.'
