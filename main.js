/**
 * Gestión de Productos con Filtrado Avanzado
 * Archivo principal que inicia la aplicación
 */

// Importaciones
const menuPrincipal = require('./menus/menuPrincipal');

// Función principal
const iniciarAplicacion = () => {
    console.clear();
    console.log('=== SISTEMA DE GESTIÓN DE PRODUCTOS ===\n');
    menuPrincipal.mostrarMenu();
};

// Iniciar la aplicación
iniciarAplicacion(); 