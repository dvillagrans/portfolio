#!/bin/bash

# Script para generar múltiples tamaños de imágenes para optimización responsive
# Requiere ImageMagick instalado

echo "🖼️  Optimizando imágenes para responsive design..."

# Crear directorio para imágenes optimizadas si no existe
mkdir -p public/img/optimized

# Función para generar múltiples tamaños de una imagen
generate_sizes() {
    local input_file="$1"
    local base_name="$2"
    local output_dir="public/img/optimized"
    
    echo "📸 Procesando: $input_file"
    
    # Tamaños para avatares y logos pequeños
    magick "$input_file" -resize 48x48^ -gravity center -extent 48x48 -quality 85 "$output_dir/${base_name}-48.webp"
    magick "$input_file" -resize 64x64^ -gravity center -extent 64x64 -quality 85 "$output_dir/${base_name}-64.webp"
    magick "$input_file" -resize 96x96^ -gravity center -extent 96x96 -quality 85 "$output_dir/${base_name}-96.webp"
    magick "$input_file" -resize 128x128^ -gravity center -extent 128x128 -quality 85 "$output_dir/${base_name}-128.webp"
    
    # Tamaños para imágenes de proyectos
    magick "$input_file" -resize 320x180^ -gravity center -extent 320x180 -quality 80 "$output_dir/${base_name}-320.webp"
    magick "$input_file" -resize 640x360^ -gravity center -extent 640x360 -quality 80 "$output_dir/${base_name}-640.webp"
    magick "$input_file" -resize 1200x675^ -gravity center -extent 1200x675 -quality 75 "$output_dir/${base_name}-1200.webp"
    
    echo "✅ Generados tamaños para $base_name"
}

# Verificar si ImageMagick está instalado
if ! command -v magick &> /dev/null; then
    echo "❌ ImageMagick no está instalado. Por favor instálalo primero:"
    echo "   - Windows: winget install ImageMagick.ImageMagick"
    echo "   - macOS: brew install imagemagick"
    echo "   - Ubuntu: sudo apt install imagemagick"
    exit 1
fi

# Procesar imágenes clave identificadas en el análisis de performance
echo "🎯 Procesando imágenes clave..."

# Imagen principal del avatar (LCP element)
if [ -f "public/img/me.webp" ]; then
    generate_sizes "public/img/me.webp" "me"
else
    echo "⚠️  No se encontró public/img/me.webp"
fi

# Logos de empresas/organizaciones
for img in "melari" "batiz" "escom"; do
    if [ -f "public/img/${img}.webp" ]; then
        generate_sizes "public/img/${img}.webp" "$img"
    else
        echo "⚠️  No se encontró public/img/${img}.webp"
    fi
done

# Imágenes de proyectos
for img in "dash-videojuegos" "portfolio" "codemaster" "etl" "dash-population" "dash-esperanzavida-mortalidad" "output-houses"; do
    if [ -f "public/img/${img}.webp" ]; then
        generate_sizes "public/img/${img}.webp" "$img"
    else
        echo "⚠️  No se encontró public/img/${img}.webp"
    fi
done

echo ""
echo "🎉 Optimización completada!"
echo "📊 Estadísticas:"
echo "   - Imágenes originales: $(find public/img -name '*.webp' -not -path '*/optimized/*' | wc -l)"
echo "   - Imágenes optimizadas: $(find public/img/optimized -name '*.webp' | wc -l)"
echo "   - Ahorro estimado: ~60-80% en tamaño de descarga"
echo ""
echo "📝 Próximos pasos:"
echo "   1. Actualizar componentes para usar imágenes optimizadas"
echo "   2. Implementar srcSet responsive"
echo "   3. Probar performance con Lighthouse"
echo ""
echo "💡 Tip: Las imágenes optimizadas están en public/img/optimized/"