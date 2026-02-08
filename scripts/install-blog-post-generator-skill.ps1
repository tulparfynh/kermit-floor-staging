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

function Assert-SkillSnapshot {
  param([string]$SkillRoot)

  $requiredPaths = @(
    (Join-Path $SkillRoot "SKILL.md"),
    (Join-Path $SkillRoot "agents/openai.yaml"),
    (Join-Path $SkillRoot "references/schema.md"),
    (Join-Path $SkillRoot "references/claim-sources.md"),
    (Join-Path $SkillRoot "references/writing-templates.md"),
    (Join-Path $SkillRoot "references/seo-rules.md"),
    (Join-Path $SkillRoot "references/media-workflow.md")
  )

  foreach ($requiredPath in $requiredPaths) {
    if (-not (Test-Path $requiredPath)) {
      throw "Missing required skill file: '$requiredPath'."
    }
  }

  $skillBody = Get-Content -Raw (Join-Path $SkillRoot "SKILL.md")
  if ($skillBody -notmatch 'content/blog/topics') {
    throw "SKILL.md is missing expected blog output path guidance."
  }
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$sourceSkillDir = Join-Path $repoRoot "tools/blog-post-generator-skill"
Assert-SkillSnapshot -SkillRoot $sourceSkillDir

$resolvedCodexHome = Resolve-CodexHome -OverrideHome $CodexHome
$skillsDir = Join-Path $resolvedCodexHome "skills"
$destinationDir = Join-Path $skillsDir "blog-post-generator"

New-Item -ItemType Directory -Path $skillsDir -Force | Out-Null

if (Test-Path $destinationDir) {
  if (-not $Force) {
    Write-Host "Blog post generator skill already exists at '$destinationDir'. Use -Force to overwrite."
    Assert-SkillSnapshot -SkillRoot $destinationDir
    Write-Host "Existing installation is valid."
    exit 0
  }
  Remove-Item -Recurse -Force $destinationDir
}

Copy-Item -Path $sourceSkillDir -Destination $destinationDir -Recurse
Assert-SkillSnapshot -SkillRoot $destinationDir

Write-Host "Installed blog-post-generator skill to '$destinationDir'."
Write-Host "Restart Codex to pick up new skills."
