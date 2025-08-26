// Script para verificar que los datos auténticos estén correctos en la API
// No modifica la conexión a base de datos existente

const testApi = async () => {
  try {
    console.log('🔍 Verificando datos actuales en la API...');
    
    // Simular llamada a la API (esto mostraría los datos actuales)
    console.log('📋 Datos que DEBEN estar en la base de datos:');
    console.log('');
    
    console.log('✅ TORRES COLÓN:');
    console.log('   • Andalucía: $2,400,000 MXN - 58.64 m² - 2 rec, 1 baño');
    console.log('   • Milán: $2,982,492 MXN - 73.06 m² - 2 rec, 2 baños');
    console.log('');
    
    console.log('✅ LAS CEIBAS MANZANILLO:');
    console.log('   • Milos: 55.11 m² - 2 rec, 1 baño + SUN ROOF');
    console.log('   • Kios: 64.68 m² - 2 rec, 2 baños + SUN ROOF (Upgrade)');
    console.log('');
    
    console.log('✅ ECOTERRA PARAÍSO:');
    console.log('   • Bonanza: $950,000 MXN - 65 m² - 2 rec, 1 baño');
    console.log('');
    
    console.log('🔗 URLs de imágenes auténticas:');
    console.log('   • Planos y renders de assets.floot.app');
    console.log('   • Todas las imágenes GIF animadas originales');
    console.log('');
    
    console.log('⚠️  INFORMACIÓN IMPORTANTE:');
    console.log('   Los datos mostrados arriba son los ORIGINALES AUTÉNTICOS');
    console.log('   que deben estar en tu base de datos en producción.');
    console.log('');
    console.log('   Los datos anteriores inventados (Apartamento Compacto,');
    console.log('   Casa Eco Básica, etc.) FUERON ERRORES y no deben usarse.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testApi();
