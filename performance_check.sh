#!/bin/bash

echo "🔍 ANÁLISIS DE PERFORMANCE - PORTFOLIO"
echo "======================================"

# Verificar si el servidor está corriendo
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Servidor no está corriendo. Ejecuta: npm run dev"
    exit 1
fi

echo "✅ Servidor detectado en localhost:3000"
echo ""

echo "📊 ANÁLISIS DE RECURSOS:"
echo "------------------------"

# Tamaños de archivos estáticos
echo "🖼️  Imágenes:"
cd public/img
ls -lah *.webp | awk '{total += $5} {print "   " $9 ": " $5} END {print "   TOTAL: " total/1024 "KB"}'
cd ../..

echo ""
echo "📦 Bundle JavaScript:"
if [ -d ".next" ]; then
    find .next -name "*.js" -type f | head -5 | xargs ls -lah | awk '{print "   " $9 ": " $5}'
fi

echo ""
echo "🎨 CSS:"
if [ -d ".next" ]; then
    find .next -name "*.css" -type f | head -3 | xargs ls -lah | awk '{print "   " $9 ": " $5}'
fi

echo ""
echo "🔧 RECOMENDACIONES:"
echo "-------------------"
echo "1. Ejecuta: lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html"
echo "2. Abre Chrome DevTools > Network para análisis detallado"
echo "3. Usa: npm run build && npm run start para análisis de producción"
echo "4. Herramientas online:"
echo "   • https://pagespeed.web.dev/"
echo "   • https://gtmetrix.com/"
echo "   • https://www.webpagetest.org/"

echo ""
echo "⚡ OPTIMIZACIONES SUGERIDAS:"
echo "-----------------------------"
echo "• Imágenes >50KB: Reducir calidad/tamaño"
echo "• Lazy loading: Ya implementado con Next.js Image"
echo "• Compresión: Ya habilitada en next.config.mjs"
echo "• WebP/AVIF: Ya implementado"