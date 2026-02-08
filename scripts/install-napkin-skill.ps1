param(
  [switch]$Force,
  [string]$CodexHome
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

function Assert-SkillFile {
  param([string]$SkillFilePath)
  if (-not (Test-Path $SkillFilePath)) {
    throw "Missing SKILL.md at '$SkillFilePath'."
  }
  $content = Get-Content -Raw $SkillFilePath
  if ($content -notmatch '\.codex/napkin\.md') {
    throw "SKILL.md does not reference '.codex/napkin.md'."
  }
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$sourceSkillDir = Join-Path $repoRoot "tools/napkin-skill"
$sourceSkillFile = Join-Path $sourceSkillDir "SKILL.md"
Assert-SkillFile -SkillFilePath $sourceSkillFile

$resolvedCodexHome = Resolve-CodexHome -OverrideHome $CodexHome
$skillsDir = Join-Path $resolvedCodexHome "skills"
$destinationDir = Join-Path $skillsDir "napkin"
$destinationSkillFile = Join-Path $destinationDir "SKILL.md"

New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null

if (Test-Path $destinationDir) {
  if (-not $Force) {
    Write-Host "Napkin skill already exists at '$destinationDir'. Use -Force to overwrite."
    Assert-SkillFile -SkillFilePath $destinationSkillFile
    Write-Host "Existing installation is valid."
    exit 0
  }
  Remove-Item -Recurse -Force $destinationDir
}

Copy-Item -Path $sourceSkillDir -Destination $destinationDir -Recurse
Assert-SkillFile -SkillFilePath $destinationSkillFile

Write-Host "Installed napkin skill to '$destinationDir'."
Write-Host "Restart Codex to pick up new skills."

