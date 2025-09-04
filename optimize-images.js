const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🖼️  Optimizando imágenes para responsive design...');

// Verificar si sharp está instalado
try {
  require('sharp');
} catch (error) {
  console.log('📦 Instalando sharp para optimización de imágenes...');
  try {
    execSync('npm install sharp', { stdio: 'inherit' });
    console.log('✅ Sharp instalado correctamente');
  } catch (installError) {
    console.error('❌ Error instalando sharp:', installError.message);
    process.exit(1);
  }
}

const sharp = require('sharp');

// Crear directorio para imágenes optimizadas
const outputDir = path.join('public', 'img', 'optimized');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Función para generar múltiples tamaños de una imagen
async function generateImageSizes(inputFile, baseName) {
  console.log(`📸 Procesando: ${inputFile}`);
  
  try {
    const image = sharp(inputFile);
    const metadata = await image.metadata();
    
    console.log(`   Dimensiones originales: ${metadata.width}x${metadata.height}`);
    
    // Tamaños para avatares y logos pequeños
    const avatarSizes = [48, 64, 96, 128];
    for (const size of avatarSizes) {
      await image
        .resize(size, size, { fit: 'cover', position: 'center' })
        .webp({ quality: 85 })
        .toFile(path.join(outputDir, `${baseName}-${size}.webp`));
    }
    
    // Tamaños para imágenes de proyectos (aspect ratio 16:9)
    const projectSizes = [
      { width: 320, height: 180, quality: 80 },
      { width: 640, height: 360, quality: 80 },
      { width: 1200, height: 675, quality: 75 }
    ];
    
    for (const { width, height, quality } of projectSizes) {
      await image
        .resize(width, height, { fit: 'cover', position: 'center' })
        .webp({ quality })
        .toFile(path.join(outputDir, `${baseName}-${width}.webp`));
    }
    
    console.log(`✅ Generados tamaños para ${baseName}`);
  } catch (error) {
    console.error(`❌ Error procesando ${baseName}:`, error.message);
  }
}

// Función principal
async function optimizeImages() {
  console.log('🎯 Procesando imágenes clave...');
  
  // Lista de imágenes a procesar
  const imagesToProcess = [
    { file: 'me.webp', name: 'me' },
    { file: 'melari.webp', name: 'melari' },
    { file: 'batiz.webp', name: 'batiz' },
    { file: 'escom.webp', name: 'escom' },
    { file: 'dash-videojuegos.webp', name: 'dash-videojuegos' },
    { file: 'portfolio.webp', name: 'portfolio' },
    { file: 'codemaster.webp', name: 'codemaster' },
    { file: 'etl.webp', name: 'etl' },
    { file: 'dash-population.webp', name: 'dash-population' },
    { file: 'dash-esperanzavida-mortalidad.webp', name: 'dash-esperanzavida-mortalidad' },
    { file: 'output-houses.webp', name: 'output-houses' }
  ];
  
  let processedCount = 0;
  
  for (const { file, name } of imagesToProcess) {
    const imagePath = path.join('public', 'img', file);
    if (fs.existsSync(imagePath)) {
      await generateImageSizes(imagePath, name);
      processedCount++;
    } else {
      console.log(`⚠️  No se encontró ${imagePath}`);
    }
  }
  
  // Estadísticas finales
  const originalImages = fs.readdirSync(path.join('public', 'img'))
    .filter(file => file.endsWith('.webp')).length;
  
  const optimizedImages = fs.existsSync(outputDir) 
    ? fs.readdirSync(outputDir).filter(file => file.endsWith('.webp')).length 
    : 0;
  
  console.log('');
  console.log('🎉 Optimización completada!');
  console.log('📊 Estadísticas:');
  console.log(`   - Imágenes procesadas: ${processedCount}`);
  console.log(`   - Imágenes originales: ${originalImages}`);
  console.log(`   - Imágenes optimizadas: ${optimizedImages}`);
  console.log('   - Ahorro estimado: ~60-80% en tamaño de descarga');
  console.log('');
  console.log('📝 Próximos pasos:');
  console.log('   1. Actualizar componentes para usar imágenes optimizadas');
  console.log('   2. Implementar srcSet responsive');
  console.log('   3. Probar performance con Lighthouse');
  console.log('');
  console.log('💡 Tip: Las imágenes optimizadas están en public/img/optimized/');
}

// Ejecutar optimización
optimizeImages().catch(console.error);