/**
 * Menú Principal
 * Implementa la interfaz de usuario en consola
 */

const readline = require('readline');
const productService = require('../services/productService');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Muestra el menú principal y maneja la selección del usuario
 */
const mostrarMenu = () => {
    console.log('\n=== MENÚ PRINCIPAL ===');
    console.log('1. Ver todos los productos');
    console.log('2. Buscar producto por ID');
    console.log('3. Agregar nuevo producto');
    console.log('4. Eliminar producto');
    console.log('5. Salir');

    rl.question('\nSeleccione una opción (1-5): ', (opcion) => {
        switch(opcion) {
            case '1':
                mostrarProductos();
                break;
            case '2':
                buscarProducto();
                break;
            case '3':
                agregarProducto();
                break;
            case '4':
                eliminarProducto();
                break;
            case '5':
                console.log('\n¡Gracias por usar el sistema!');
                rl.close();
                break;
            default:
                console.log('\nOpción no válida. Intente nuevamente.');
                mostrarMenu();
        }
    });
};

/**
 * Muestra la lista de todos los productos
 */
const mostrarProductos = () => {
    const productos = productService.obtenerProductos();
    console.log('\n=== LISTA DE PRODUCTOS ===');
    productos.forEach(producto => {
        console.log(`\nID: ${producto.id}`);
        console.log(`Nombre: ${producto.nombre}`);
        console.log(`Categoría: ${producto.categoria}`);
        console.log(`Precio: $${producto.precio}`);
        console.log(`Stock: ${producto.stock}`);
        console.log(`Descripción: ${producto.descripcion}`);
    });
    mostrarMenu();
};

// Las funciones buscarProducto, agregarProducto y eliminarProducto
// se implementarán en futuras iteraciones

module.exports = {
    mostrarMenu
}; 