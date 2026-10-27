param([switch]$BuildOnly,[ValidateSet('Edge','Chrome','Both')][string]$Browser='Edge')
$ErrorActionPreference='Stop'
$addonRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$projectRoot=[IO.Path]::GetFullPath((Join-Path $addonRoot '..'))
$nodePath=(Get-Command node -ErrorAction Stop).Source
& $nodePath (Join-Path $projectRoot 'build-edge-addon.cjs')
if($LASTEXITCODE -ne 0){throw 'Cannot build Edge addon'}
$manifest=Get-Content -LiteralPath (Join-Path $addonRoot 'manifest.json') -Raw | ConvertFrom-Json
$sha=[Security.Cryptography.SHA256]::Create()
$bytes=$sha.ComputeHash([Convert]::FromBase64String($manifest.key))
$extensionId=''
for($i=0;$i -lt 16;$i++){$extensionId+=[char](97+($bytes[$i] -shr 4));$extensionId+=[char](97+($bytes[$i] -band 15))}
$compiler=Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
if(-not(Test-Path -LiteralPath $compiler)){$compiler=Join-Path $env:WINDIR 'Microsoft.NET\Framework\v4.0.30319\csc.exe'}
$exePath=Join-Path $PSScriptRoot 'KvpvNativeHost.exe'
$launcherPath=Join-Path $PSScriptRoot 'Launcher.cs'
# Dung chung host; khong ghi de EXE dang phuc vu Edge khi them Chrome.
if($BuildOnly -or -not(Test-Path -LiteralPath $exePath) -or
   (Get-Item -LiteralPath $launcherPath).LastWriteTimeUtc -gt (Get-Item -LiteralPath $exePath).LastWriteTimeUtc){
  & $compiler /nologo /target:exe (('/out:'+$exePath)) $launcherPath
  if($LASTEXITCODE -ne 0){throw 'Cannot compile native host'}
}
[IO.File]::WriteAllText((Join-Path $PSScriptRoot 'node-path.txt'),$nodePath)
$hostManifest=Join-Path $PSScriptRoot 'host-manifest.json'
$data=@{name='com.kvpv.localwatch';description='KVPV local file watcher';path=$exePath;type='stdio';allowed_origins=@('chrome-extension://'+$extensionId+'/')}
[IO.File]::WriteAllText($hostManifest,($data|ConvertTo-Json -Depth 4),(New-Object Text.UTF8Encoding($false)))
if($BuildOnly){Write-Output 'Native host compiled; registry unchanged.';exit 0}
if($Browser -eq 'Edge' -or $Browser -eq 'Both'){& (Join-Path $projectRoot 'live\stop.ps1')}
$registrations=@{
  Edge='HKCU:\Software\Microsoft\Edge\NativeMessagingHosts\com.kvpv.localwatch'
  Chrome='HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.kvpv.localwatch'
}
$targets=if($Browser -eq 'Both'){@('Edge','Chrome')}else{@($Browser)}
foreach($target in $targets){
  $key=$registrations[$target]
  New-Item -Path $key -Force | Out-Null
  Set-Item -LiteralPath $key -Value $hostManifest
  Write-Output ('Installed native host for '+$target+' (current Windows user).')
  $page=if($target -eq 'Chrome'){'chrome://extensions'}else{'edge://extensions'}
  Write-Output ('Open '+$page+' -> Developer mode -> Load unpacked -> select edge-addon.')
}
Write-Output ('Extension folder: '+$addonRoot)
Write-Output ('Extension ID: '+$extensionId)
