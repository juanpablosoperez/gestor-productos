/**
 * Datos de productos
 * Contiene el array inicial de productos y funciones para su gestión
 */

// Array inicial de productos
const productos = [
    {
        id: 1,
        nombre: "Laptop HP",
        categoria: "Electrónicos",
        precio: 899.99,
        stock: 15,
        descripcion: "Laptop HP 15.6 pulgadas, 8GB RAM, 256GB SSD"
    },
    {
        id: 2,
        nombre: "Monitor Dell",
        categoria: "Electrónicos",
        precio: 299.99,
        stock: 20,
        descripcion: "Monitor Dell 24 pulgadas Full HD"
    }
];

module.exports = {
    productos
}; 