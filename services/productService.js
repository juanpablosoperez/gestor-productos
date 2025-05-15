/**
 * Servicio de Productos
 * Implementa la lógica de negocio para la gestión de productos
 */

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
 * Agrega un nuevo producto
 * @param {Object} producto - Datos del producto a agregar
 * @returns {Object|null} Producto agregado o null si hay error
 */
const agregarProducto = (producto) => {
    // Validaciones básicas
    if (!validarStringNoVacio(producto.nombre) || 
        !validarStringNoVacio(producto.categoria) ||
        !validarNumeroPositivo(producto.precio) ||
        !validarNumeroPositivo(producto.stock)) {
        return null;
    }

    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;
    const nuevoProducto = {
        id: nuevoId,
        ...producto
    };

    productos.push(nuevoProducto);
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