/**
 * Servicio de Productos
 * Implementa la lógica de negocio para la gestión de productos
 */

const readlineSync = require('readline-sync');
const { productos } = require('../data/productos');
const { validarStringNoVacio, validarNumeroPositivo, validarId } = require('../utils/validaciones');

/**
 * Obtiene todos los productos
 * @returns {Array} Lista de productos
 */
const obtenerProductos = () => {
    return [...productos];
};

/**
 * Busca un producto por su ID
 * @param {number} id - ID del producto a buscar
 * @returns {Object|null} Producto encontrado o null
 */
const buscarProductoPorId = (id) => {
    if (!validarId(id)) return null;
    return productos.find(producto => producto.id === id) || null;
};

/**
 * Valida que un número sea un decimal válido
 * @param {number} valor - Valor a validar
 * @returns {boolean} true si es válido, false si no
 */
const validarDecimal = (valor) => {
    return Number.isFinite(valor) && valor > 0;
};

/**
 * Agrega un nuevo producto solicitando los datos al usuario
 * @returns {Object|null} Producto agregado o null si hay error
 */
const agregarProducto = () => {
    console.log('\n=== INGRESO DE NUEVO PRODUCTO ===');

    // Solicitar y validar nombre
    const nombre = readlineSync.question('Ingrese el nombre del producto: ').trim();
    if (!validarStringNoVacio(nombre)) {
        console.log('\n❌ Error: El nombre no puede estar vacío.');
        return null;
    }

    // Solicitar y validar precio
    const precioStr = readlineSync.question('Ingrese el precio del producto: ');
    const precio = parseFloat(precioStr);
    if (!validarDecimal(precio)) {
        console.log('\n❌ Error: El precio debe ser un número válido mayor a 0.');
        return null;
    }

    // Solicitar y validar categoría
    const categoria = readlineSync.question('Ingrese la categoría del producto: ').trim();
    if (!validarStringNoVacio(categoria)) {
        console.log('\n❌ Error: La categoría no puede estar vacía.');
        return null;
    }

    // Solicitar y validar stock
    const stockStr = readlineSync.question('Ingrese el stock del producto: ');
    const stock = parseInt(stockStr);
    if (!Number.isInteger(stock) || stock < 0) {
        console.log('\n❌ Error: El stock debe ser un número entero mayor o igual a 0.');
        return null;
    }

    // Generar nuevo ID (máximo ID actual + 1)
    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;

    // Crear el nuevo producto
    const nuevoProducto = {
        id: nuevoId,
        nombre,
        precio,
        categoria,
        stock,
        descripcion: `${nombre} - ${categoria}` // Descripción básica
    };

    // Agregar al array de productos
    productos.push(nuevoProducto);

    // Mostrar confirmación
    console.log('\n✅ Producto agregado exitosamente:');
    console.log(`ID: ${nuevoProducto.id}`);
    console.log(`Nombre: ${nuevoProducto.nombre}`);
    console.log(`Precio: $${nuevoProducto.precio}`);
    console.log(`Categoría: ${nuevoProducto.categoria}`);
    console.log(`Stock: ${nuevoProducto.stock}`);

    return nuevoProducto;
};

/**
 * Elimina un producto por su ID
 * @param {number} id - ID del producto a eliminar
 * @returns {boolean} true si se eliminó, false si no
 */
const eliminarProducto = (id) => {
    if (!validarId(id)) return false;
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    productos.splice(index, 1);
    return true;
};

module.exports = {
    obtenerProductos,
    buscarProductoPorId,
    agregarProducto,
    eliminarProducto
}; 