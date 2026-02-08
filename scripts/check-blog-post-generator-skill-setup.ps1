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

$skillRoot = Join-Path $repoRoot "tools/blog-post-generator-skill"
$requiredSnapshotPaths = @(
  (Join-Path $skillRoot "SKILL.md"),
  (Join-Path $skillRoot "agents/openai.yaml"),
  (Join-Path $skillRoot "references/schema.md"),
  (Join-Path $skillRoot "references/claim-sources.md"),
  (Join-Path $skillRoot "references/writing-templates.md"),
  (Join-Path $skillRoot "references/seo-rules.md"),
  (Join-Path $skillRoot "references/media-workflow.md")
)

foreach ($requiredPath in $requiredSnapshotPaths) {
  if (-not (Test-Path $requiredPath)) {
    Add-Failure $failures "Missing frozen skill snapshot file: '$requiredPath'."
  }
}

$skillFile = Join-Path $skillRoot "SKILL.md"
if (Test-Path $skillFile) {
  $skillContent = Get-Content -Raw $skillFile
  if ($skillContent -notmatch 'content/blog/topics') {
    Add-Failure $failures "SKILL.md does not include expected blog output path guidance."
  }
}

$scaffolderPath = Join-Path $repoRoot "scripts/new-blog-topic.mjs"
if (-not (Test-Path $scaffolderPath)) {
  Add-Failure $failures "Missing scaffolder script: 'scripts/new-blog-topic.mjs'."
} else {
  $scaffolderContent = Get-Content -Raw $scaffolderPath
  foreach ($field in @('searchIntent', 'targetAudience', 'funnelStage', 'sourceUrls')) {
    if ($scaffolderContent -notmatch $field) {
      Add-Failure $failures "Scaffolder missing required field '$field'."
    }
  }
}

$validatorPath = Join-Path $repoRoot "scripts/validate-blog-content.mjs"
if (-not (Test-Path $validatorPath)) {
  Add-Failure $failures "Missing validator script: 'scripts/validate-blog-content.mjs'."
} else {
  $validatorContent = Get-Content -Raw $validatorPath
  foreach ($field in @('searchIntent', 'targetAudience', 'funnelStage', 'sourceUrls')) {
    if ($validatorContent -notmatch $field) {
      Add-Failure $failures "Validator missing required field '$field'."
    }
  }
}

if (-not $RepoOnly) {
  $resolvedCodexHome = Resolve-CodexHome -OverrideHome $CodexHome
  $installedSkillRoot = Join-Path $resolvedCodexHome "skills/blog-post-generator"
  $installedSkillFile = Join-Path $installedSkillRoot "SKILL.md"

  if (-not (Test-Path $installedSkillFile)) {
    Add-Failure $failures "Installed skill missing: '$installedSkillFile'. Run scripts/install-blog-post-generator-skill.ps1."
  } else {
    $installedContent = Get-Content -Raw $installedSkillFile
    if ($installedContent -notmatch 'content/blog/topics') {
      Add-Failure $failures "Installed skill appears stale. Reinstall with scripts/install-blog-post-generator-skill.ps1 -Force."
    }
  }
}

if ($failures.Count -gt 0) {
  Write-Host "Blog post generator setup check failed:"
  foreach ($failure in $failures) {
    Write-Host " - $failure"
  }
  exit 1
}

Write-Host "Blog post generator setup check passed."
exit 0
