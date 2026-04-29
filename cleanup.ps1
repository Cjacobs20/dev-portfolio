# cleanup.ps1 - Run from repo root: .\cleanup.ps1

Write-Host ""
Write-Host "-- CJ PORTFOLIO CLEANUP --" -ForegroundColor Cyan
Write-Host ""

$repoRoot    = Split-Path -Parent $MyInvocation.MyCommand.Path
$imageDir    = Join-Path $repoRoot "images"
$sourceExts  = @("*.html", "*.css", "*.js")
$imageExts   = @("*.jpg","*.jpeg","*.png","*.gif","*.svg","*.webp")
$skipFolders = @("photos", "Xenomorph")
$keepFiles = @(
    "cartoonMeExcite.svg",
    "cartoonMeGS.svg",
    "CB_Graphic.png",
    "GF-mockup.png",
    "DAS_graphic.png",
    "hg_graphic.png",
    "portrait.png",
    "Scotland_chris.png",
    "Wedding_me.png",
    "otherMe.png",
    "greenMe.jpg",
    "Yellow_Me.png"
)
Write-Host "Scanning source files..." -ForegroundColor DarkGray
$sourceFiles = Get-ChildItem $repoRoot -Recurse -Include $sourceExts -File |
    Where-Object { $_.FullName -notmatch "node_modules|\.git" }
$allSourceContent = ($sourceFiles | Get-Content -Raw) -join "`n"

Write-Host "Scanning image files..."
Write-Host ""

$allImages = Get-ChildItem $imageDir -Recurse -Include $imageExts -File |
    Where-Object {
        $skip = $false
        foreach ($f in $skipFolders) {
            if ($_.FullName -match [regex]::Escape($f)) { $skip = $true; break }
        }
        -not $skip
    }

$unreferenced = @()
$referenced   = @()

foreach ($img in $allImages) {
    if (($allSourceContent -match [regex]::Escape($img.Name)) -or ($keepFiles -contains $img.Name)) {
        $referenced += $img
    } else {
        $unreferenced += $img
    }
}

Write-Host "REFERENCED ($($referenced.Count)):" -ForegroundColor Green
foreach ($f in $referenced) {
    Write-Host "  [OK] $($f.Name)" -ForegroundColor DarkGreen
}

Write-Host ""
Write-Host "UNREFERENCED ($($unreferenced.Count)):" -ForegroundColor Yellow

if ($unreferenced.Count -eq 0) {
    Write-Host "  None -- you are clean!" -ForegroundColor DarkGray
} else {
    foreach ($f in $unreferenced) {
        $size = "{0:N0} KB" -f ($f.Length / 1KB)
        Write-Host "  [??] $($f.Name)  ($size)" -ForegroundColor Yellow
    }
    Write-Host ""
    $confirm = Read-Host "Delete all unreferenced images? (yes/no)"
    if ($confirm -eq "yes") {
        foreach ($f in $unreferenced) {
            Remove-Item $f.FullName -Force
            Write-Host "  Deleted: $($f.Name)" -ForegroundColor Red
        }
        Write-Host ""
        Write-Host "Done. $($unreferenced.Count) files removed." -ForegroundColor Cyan
    } else {
        Write-Host "No files deleted." -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "-- RESUME FILES --" -ForegroundColor Cyan
$resumes = Get-ChildItem $repoRoot -Filter "*.pdf" -File
foreach ($r in $resumes) {
    $size  = "{0:N0} KB" -f ($r.Length / 1KB)
    $inUse = $allSourceContent -match [regex]::Escape($r.Name)
    if ($inUse) {
        Write-Host "  [OK] $($r.Name)  ($size)  -- referenced" -ForegroundColor Green
    } else {
        Write-Host "  [??] $($r.Name)  ($size)  -- unreferenced" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "-- DONE --" -ForegroundColor Cyan
Write-Host ""
