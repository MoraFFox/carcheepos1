# Reorganize pages into subfolders
$root = Join-Path $PSScriptRoot 'src/pages'
$files = Get-ChildItem -Path $root -Recurse -File -Filter *.jsx
foreach ($file in $files) {
    $dir  = $file.Directory.FullName
    $base = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    # Make PascalCase (capitalize first letter only to preserve rest)
    $pascal = ($base.Substring(0,1).ToUpper() + $base.Substring(1))

    $folder = Join-Path $dir $pascal
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder | Out-Null
    }

    # Move JSX
    $destJsx = Join-Path $folder ("$pascal.jsx")
    Move-Item -Path $file.FullName -Destination $destJsx -Force

    # Move CSS if exists
    $cssOld = Join-Path $dir ("$base.css")
    if (Test-Path $cssOld) {
        $destCss = Join-Path $folder ("$pascal.css")
        Move-Item -Path $cssOld -Destination $destCss -Force
    }

    # Create stub file at original path to preserve imports
    $stubContent = "export { default } from './$pascal/$pascal.jsx';"
    Set-Content -Path $file.FullName -Value $stubContent -NoNewline
}
