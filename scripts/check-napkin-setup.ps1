param(
  [string]$CodexHome,
  [switch]$RepoOnly,
  [switch]$SkipCodexBinaryCheck
)

$ErrorActionPreference = "Stop"

function Resolve-CodexHome {
  param([string]$OverrideHome)
  if ($OverrideHome -and $OverrideHome.Trim()) {
    return $OverrideHome
  }
  if ($env:CODEX_HOME -and $env:CODEX_HOME.Trim()) {
    return $env:CODEX_HOME
  }
  return Join-Path $HOME ".codex"
}

function Add-Failure {
  param(
    [System.Collections.Generic.List[string]]$Failures,
    [string]$Message
  )
  $Failures.Add($Message) | Out-Null
}

$failures = New-Object System.Collections.Generic.List[string]
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

if (-not $SkipCodexBinaryCheck) {
  $codexCmd = Get-Command codex -ErrorAction SilentlyContinue
  if (-not $codexCmd) {
    Add-Failure $failures "Codex CLI not found in PATH."
  }
}

$repoNapkin = Join-Path $repoRoot ".codex/napkin.md"
if (-not (Test-Path $repoNapkin)) {
  Add-Failure $failures "Missing repo napkin file: '.codex/napkin.md'."
}

$agentFile = Join-Path $repoRoot "AGENTS.md"
if (-not (Test-Path $agentFile)) {
  Add-Failure $failures "Missing AGENTS.md in repo root."
} else {
  $agentContent = Get-Content -Raw $agentFile
  if ($agentContent -notmatch '\.codex/napkin\.md') {
    Add-Failure $failures "AGENTS.md does not reference '.codex/napkin.md'."
  }
  if ($agentContent -notmatch '(?i)session start') {
    Add-Failure $failures "AGENTS.md missing explicit session-start rule for napkin usage."
  }
}

$snapshotSkill = Join-Path $repoRoot "tools/napkin-skill/SKILL.md"
if (-not (Test-Path $snapshotSkill)) {
  Add-Failure $failures "Missing frozen skill snapshot: 'tools/napkin-skill/SKILL.md'."
} else {
  $snapshotContent = Get-Content -Raw $snapshotSkill
  if ($snapshotContent -notmatch '\.codex/napkin\.md') {
    Add-Failure $failures "Frozen skill snapshot does not reference '.codex/napkin.md'."
  }
}

if (-not $RepoOnly) {
  $resolvedCodexHome = Resolve-CodexHome -OverrideHome $CodexHome
  $installedSkill = Join-Path $resolvedCodexHome "skills/napkin/SKILL.md"
  if (-not (Test-Path $installedSkill)) {
    Add-Failure $failures "Installed skill missing: '$installedSkill'. Run scripts/install-napkin-skill.ps1."
  } else {
    $installedContent = Get-Content -Raw $installedSkill
    if ($installedContent -notmatch '\.codex/napkin\.md') {
      Add-Failure $failures "Installed skill references wrong napkin path. Reinstall with scripts/install-napkin-skill.ps1 -Force."
    }
  }
}

if ($failures.Count -gt 0) {
  Write-Host "Napkin setup check failed:"
  foreach ($failure in $failures) {
    Write-Host " - $failure"
  }
  exit 1
}

Write-Host "Napkin setup check passed."
exit 0

