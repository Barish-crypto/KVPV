# KVPV SAFE MERGE: Make an isolated copy of your CURRENT project, patch source,
# rebuild its manifest/addons, and run the Windows project's real tests.
# Original project and running browser session are not changed.
param(
  [string]$Project = "$env:USERPROFILE\Downloads\KVPV_TU_DONG_GITHUB_EXTENSION_FULL\KVPV_TU_DONG_GITHUB_EXTENSION"
)
$ErrorActionPreference='Stop'
$Project=[IO.Path]::GetFullPath($Project)
$patch=Join-Path $PSScriptRoot 'KVPV_MERGE_PATCH.cjs'
$selftest=Join-Path $PSScriptRoot 'KVPV_MERGE_SELFTEST.cjs'
foreach($p in @($Project,(Join-Path $Project 'build.cjs'),$patch,$selftest)) {
  if(!(Test-Path -LiteralPath $p)){ throw "Missing: $p" }
}
$stamp=Get-Date -Format 'yyyyMMdd_HHmmss'
$parent=Split-Path -Parent $Project
$stage=Join-Path $parent "KVPV_MERGE_STAGING_$stamp"
if(Test-Path -LiteralPath $stage){ throw "Staging path already exists: $stage" }
New-Item -ItemType Directory -Path $stage | Out-Null
Write-Host "STAGING: $stage" -ForegroundColor Cyan
# Copy current sources, tests, build scripts and dependencies; exclude volatile diagnostics.
& robocopy $Project $stage /E /XD (Join-Path $Project '.git') (Join-Path $Project '.kvpv-live') /R:1 /W:1 /NP /NFL /NDL /NJH /NJS | Out-Null
if($LASTEXITCODE -ge 8){ throw "Project copy failed: robocopy exit $LASTEXITCODE" }
New-Item -ItemType Directory -Path (Join-Path $stage '.kvpv-live') -Force | Out-Null
Set-Content -LiteralPath (Join-Path $stage '.kvpv-live\maintenance.lock') -Value "staged merge $stamp" -Encoding UTF8
Push-Location -LiteralPath $stage
try {
  & node $patch $stage
  if($LASTEXITCODE -ne 0){throw 'SOURCE PATCH FAILED'}
  foreach($f in @('src\04-engine.js','src\08-range-evidence.js','src\76-trutien-pvp.js')){
    & node --check $f
    if($LASTEXITCODE -ne 0){throw "SYNTAX FAILED: $f"}
  }
  & node build.cjs
  if($LASTEXITCODE -ne 0){throw 'BUILD FAILED'}
  & node $selftest (Join-Path $stage 'KVPV_V1_FULL.js')
  if($LASTEXITCODE -ne 0){throw 'MERGE SELFTEST FAILED'}
  foreach($f in @('TEST_COMBO_DEFAULT.cjs','TEST_TQ_TH_VISUAL99.cjs','test.cjs')){
    if(Test-Path -LiteralPath $f){
      Write-Host "RUNNING: $f" -ForegroundColor Cyan
      & node $f
      if($LASTEXITCODE -ne 0){throw "TEST FAILED: $f"}
    }
  }
  Write-Host "`nALL AVAILABLE TESTS PASSED" -ForegroundColor Green
  Write-Host "Merged project: $stage" -ForegroundColor Green
  Write-Host 'ORIGINAL PROJECT UNCHANGED. No browser F5 / no extension reload.'
} catch {
  Write-Host "`nSTAGED MERGE FAILED - ORIGINAL PROJECT UNCHANGED" -ForegroundColor Yellow
  Write-Host "Inspect staging folder: $stage"
  throw
} finally {
  Remove-Item -LiteralPath (Join-Path $stage '.kvpv-live\maintenance.lock') -Force -ErrorAction SilentlyContinue
  Pop-Location
}
