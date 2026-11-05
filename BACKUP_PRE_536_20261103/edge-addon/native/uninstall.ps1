param([ValidateSet('Edge','Chrome','Both')][string]$Browser='Edge')
$ErrorActionPreference='Stop'
$expected=Join-Path $PSScriptRoot 'host-manifest.json'
$registrations=@{
  Edge='HKCU:\Software\Microsoft\Edge\NativeMessagingHosts\com.kvpv.localwatch'
  Chrome='HKCU:\Software\Google\Chrome\NativeMessagingHosts\com.kvpv.localwatch'
}
$targets=if($Browser -eq 'Both'){@('Edge','Chrome')}else{@($Browser)}
foreach($target in $targets){
  $key=$registrations[$target]
  if(Test-Path -LiteralPath $key){
    if((Get-Item -LiteralPath $key).GetValue('') -eq $expected){
      Remove-Item -LiteralPath $key
      Write-Output ('Removed KVPV native-host registration for '+$target)
    }
  }
}
Write-Output 'Remove/disable KVPV in the selected browser extensions page. Loaded game code stays running.'
