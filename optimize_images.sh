#!/bin/bash

# Script para optimizar imágenes WebP
echo "🚀 Optimizando imágenes para mejor performance..."

# Directorio de imágenes
IMG_DIR="/home/dvillagrans/Documentos/personal/portfolio/public/img"
cd "$IMG_DIR"

# Crear backup
echo "📁 Creando backup..."
mkdir -p backup_images
cp *.webp backup_images/ 2>/dev/null || true

# Optimizar imágenes grandes (>50KB)
echo "🔧 Optimizando imágenes grandes..."

for img in *.webp; do
    if [ -f "$img" ]; then
        size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img")
        if [ "$size" -gt 51200 ]; then  # 50KB
            echo "Optimizando: $img ($(echo "scale=1; $size/1024" | bc)KB)"
            convert "$img" -quality 80 -resize 1200x900\> "${img%.webp}_opt.webp"
            mv "${img%.webp}_opt.webp" "$img"
        fi
    fi
done

echo "✅ Optimización completada!"
echo "📊 Tamaños actuales:"
ls -lah *.webp | awk '{print $9 ": " $5}'