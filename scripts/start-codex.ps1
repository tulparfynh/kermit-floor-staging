param(
  [switch]$AutoInstall,
  [switch]$ForceInstall
)

$ErrorActionPreference = "Stop"

$checkScript = Join-Path $PSScriptRoot "check-napkin-setup.ps1"
$installScript = Join-Path $PSScriptRoot "install-napkin-skill.ps1"

& $checkScript
if ($LASTEXITCODE -ne 0) {
  if (-not $AutoInstall) {
    Write-Host "Napkin guardrails are not satisfied. Run:"
    Write-Host "  scripts/install-napkin-skill.ps1"
    Write-Host "or start with:"
    Write-Host "  scripts/start-codex.ps1 -AutoInstall"
    exit 1
  }

  Write-Host "Attempting automatic napkin installation..."
  if ($ForceInstall) {
    & $installScript -Force
  } else {
    & $installScript
  }
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Automatic installation failed."
    exit 1
  }

  & $checkScript
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Napkin check still failing after install."
    exit 1
  }
}

Write-Host "Launching Codex..."
codex @args

