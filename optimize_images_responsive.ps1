# Script PowerShell para generar múltiples tamaños de imágenes para optimización responsive
# Requiere ImageMagick instalado

Write-Host "Optimizando imagenes para responsive design..." -ForegroundColor Cyan

# Crear directorio para imágenes optimizadas si no existe
$outputDir = "public\img\optimized"
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

# Función para generar múltiples tamaños de una imagen
function Generate-ImageSizes {
    param(
        [string]$InputFile,
        [string]$BaseName
    )
    
    Write-Host "Procesando: $InputFile" -ForegroundColor Yellow
    
    try {
        # Tamaños para avatares y logos pequeños
        & magick "$InputFile" -resize "48x48^" -gravity center -extent 48x48 -quality 85 "$outputDir\$BaseName-48.webp"
        & magick "$InputFile" -resize "64x64^" -gravity center -extent 64x64 -quality 85 "$outputDir\$BaseName-64.webp"
        & magick "$InputFile" -resize "96x96^" -gravity center -extent 96x96 -quality 85 "$outputDir\$BaseName-96.webp"
        & magick "$InputFile" -resize "128x128^" -gravity center -extent 128x128 -quality 85 "$outputDir\$BaseName-128.webp"
        
        # Tamaños para imágenes de proyectos
        & magick "$InputFile" -resize "320x180^" -gravity center -extent 320x180 -quality 80 "$outputDir\$BaseName-320.webp"
        & magick "$InputFile" -resize "640x360^" -gravity center -extent 640x360 -quality 80 "$outputDir\$BaseName-640.webp"
        & magick "$InputFile" -resize "1200x675^" -gravity center -extent 1200x675 -quality 75 "$outputDir\$BaseName-1200.webp"
        
        Write-Host "Generados tamanos para $BaseName" -ForegroundColor Green
    }
    catch {
        Write-Host "Error procesando $BaseName : $_" -ForegroundColor Red
    }
}

# Verificar si ImageMagick está instalado
try {
    & magick -version | Out-Null
}
catch {
    Write-Host "ImageMagick no esta instalado. Por favor instalalo primero:" -ForegroundColor Red
    Write-Host "   winget install ImageMagick.ImageMagick" -ForegroundColor Yellow
    Write-Host "   O descarga desde: https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    exit 1
}

# Procesar imágenes clave identificadas en el análisis de performance
Write-Host "Procesando imagenes clave..." -ForegroundColor Cyan

# Imagen principal del avatar (LCP element)
if (Test-Path "public\img\me.webp") {
    Generate-ImageSizes "public\img\me.webp" "me"
} else {
    Write-Host "No se encontro public\img\me.webp" -ForegroundColor Yellow
}

# Logos de empresas/organizaciones
$companyLogos = @("melari", "batiz", "escom")
foreach ($img in $companyLogos) {
    $imagePath = "public\img\$img.webp"
    if (Test-Path $imagePath) {
        Generate-ImageSizes $imagePath $img
    } else {
        Write-Host "No se encontro $imagePath" -ForegroundColor Yellow
    }
}

# Imágenes de proyectos
$projectImages = @(
    "dash-videojuegos", "portfolio", "codemaster", "etl", 
    "dash-population", "dash-esperanzavida-mortalidad", "output-houses"
)
foreach ($img in $projectImages) {
    $imagePath = "public\img\$img.webp"
    if (Test-Path $imagePath) {
        Generate-ImageSizes $imagePath $img
    } else {
        Write-Host "No se encontro $imagePath" -ForegroundColor Yellow
    }
}

# Estadísticas finales
$originalImages = (Get-ChildItem "public\img" -Filter "*.webp" -Exclude "optimized" | Measure-Object).Count
$optimizedImages = (Get-ChildItem "public\img\optimized" -Filter "*.webp" -ErrorAction SilentlyContinue | Measure-Object).Count

Write-Host ""
Write-Host "Optimizacion completada!" -ForegroundColor Green
Write-Host "Estadisticas:" -ForegroundColor Cyan
Write-Host "   - Imagenes originales: $originalImages" -ForegroundColor White
Write-Host "   - Imagenes optimizadas: $optimizedImages" -ForegroundColor White
Write-Host "   - Ahorro estimado: ~60-80% en tamano de descarga" -ForegroundColor White
Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Actualizar componentes para usar imágenes optimizadas" -ForegroundColor White
Write-Host "   2. Implementar srcSet responsive" -ForegroundColor White
Write-Host "   3. Probar performance con Lighthouse" -ForegroundColor White
Write-Host ""
Write-Host "Tip: Las imagenes optimizadas estan en public\img\optimized\" -ForegroundColor Yellow