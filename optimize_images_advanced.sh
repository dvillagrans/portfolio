#!/bin/bash

echo "🚀 OPTIMIZACIÓN AVANZADA DE IMÁGENES"
echo "===================================="

cd /home/dvillagrans/Documentos/personal/portfolio
IMG_DIR="public/img"

# Función para optimizar una imagen
optimize_image() {
    local input="$1"
    local filename=$(basename "$input" .webp)
    
    echo "🖼️  Optimizando: $filename"
    
    # Obtener tamaño original
    original_size=$(stat -c%s "$input" 2>/dev/null)
    
    # Crear versión optimizada
    convert "$input" -quality 75 -strip "${input}.temp" 2>/dev/null
    
    if [ -f "${input}.temp" ]; then
        new_size=$(stat -c%s "${input}.temp" 2>/dev/null)
        
        # Si la nueva imagen es más pequeña, usarla
        if [ "$new_size" -lt "$original_size" ]; then
            mv "${input}.temp" "$input"
            reduction=$(( (original_size - new_size) * 100 / original_size ))
            echo "   ✅ Reducido: $((original_size/1024))KB → $((new_size/1024))KB (-${reduction}%)"
        else
            rm "${input}.temp"
            echo "   ⚠️  Sin mejora significativa, manteniendo original"
        fi
    else
        echo "   ❌ Error al optimizar"
    fi
}

# Lista de imágenes grandes a optimizar
large_images=(
    "etl.webp"
    "dash-esperanzavida-mortalidad.webp" 
    "dash-population.webp"
    "melari.webp"
    "me.webp"
    "portfolio.webp"
    "batiz.webp"
    "codemaster.webp"
    "googlecloud.webp"
    "CursoGitHubActitions.webp"
    "docker.webp"
    "dash-videojuegos.webp"
)

echo "📊 Optimizando imágenes >50KB..."
for img in "${large_images[@]}"; do
    img_path="$IMG_DIR/$img"
    if [ -f "$img_path" ]; then
        optimize_image "$img_path"
    fi
done

# Limpiar archivo temporal que quedó
if [ -f "$IMG_DIR/etl_optimized.webp" ]; then
    echo "🧹 Limpiando archivo temporal..."
    rm "$IMG_DIR/etl_optimized.webp"
fi

echo ""
echo "📈 ANÁLISIS POST-OPTIMIZACIÓN:"
echo "-----------------------------"
total_size=0
for img in "$IMG_DIR"/*.webp; do
    if [ -f "$img" ]; then
        size=$(stat -c%s "$img" 2>/dev/null)
        total_size=$((total_size + size))
        size_kb=$((size / 1024))
        filename=$(basename "$img")
        printf "   %s: %dKB\n" "$filename" "$size_kb"
    fi
done

echo ""
echo "📊 TAMAÑO TOTAL DE IMÁGENES: $((total_size / 1024))KB"
echo "✅ Optimización completada!"