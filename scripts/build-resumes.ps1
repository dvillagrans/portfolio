# Requires latexmk in PATH
$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path $PSScriptRoot -Parent
$srcRoot = Join-Path $repoRoot 'resumes' 'src'
$publicResumes = Join-Path $repoRoot 'public' 'resumes'
if (!(Test-Path $publicResumes)) { New-Item -ItemType Directory -Path $publicResumes | Out-Null }

Write-Host "Building resumes..."

if (Test-Path $srcRoot) {
    Get-ChildItem -Path $srcRoot -Filter *.tex -Recurse | ForEach-Object {
        $tex = $_.FullName
        Write-Host " -> Compiling $tex"
        latexmk -pdf -silent $tex
        $pdf = [System.IO.Path]::ChangeExtension($tex, '.pdf')
        if (Test-Path $pdf) {
            Copy-Item $pdf $publicResumes -Force
        }
    }
}

Write-Host "Done. PDFs copied to public/resumes"