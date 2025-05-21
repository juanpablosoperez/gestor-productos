/**
 * Menú Principal
 * Implementa la interfaz de usuario en consola usando readline-sync
 */

const readlineSync = require("readline-sync");
const productService = require("../services/productService");

/**
 * Muestra el menú principal y maneja la selección del usuario
 */
const mostrarMenu = () => {
  let salir = false;

  while (!salir) {
    console.clear();
    console.log("\n=== MENÚ PRINCIPAL ===");
    console.log("1. Agregar producto");
    console.log("2. Listar productos");
    console.log("3. Buscar productos");
    console.log("4. Modificar producto");
    console.log("5. Eliminar producto");
    console.log("6. Calcular precio promedio");
    console.log("7. Salir");

    const opcion = readlineSync.questionInt("\nSeleccione una opción (1-7): ", {
      limitMessage: "Por favor, ingrese un número entre 1 y 7",
      min: 1,
      max: 7,
    });

    switch (opcion) {
      case 1:
        agregarProducto();
        break;
      case 2:
        listarProductos();
        break;
      case 3:
        buscarProductos();
        break;
      case 4:
        modificarProducto();
        break;
      case 5:
        eliminarProducto();
        break;
      case 6:
        calcularPrecioPromedio();
        break;
      case 7:
        salir = true;
        console.log("\n¡Gracias por usar el sistema!");
        break;
    }

    if (!salir) {
      readlineSync.question("\nPresione ENTER para continuar...");
    }
  }
};

/**
 * Función para agregar un nuevo producto
 */
const agregarProducto = () => {
  const producto = productService.agregarProducto();
  if (producto === null) {
    console.log(
      "\n❌ No se pudo agregar el producto. Por favor, intente nuevamente."
    );
  }
};

/**
 * Función para listar todos los productos
 */
const listarProductos = () => {
  console.log("\n=== LISTA DE PRODUCTOS ===");
  const productos = productService.obtenerProductos(); // devuelve un array
  if (productos.length === 0) {
    console.log("No hay productos registrados.");
    return;
  }
  productos.forEach((producto, i) => {
    console.log(`\nID: ${i + 1}`);
    console.log(`Nombre: ${producto.nombre}`);
    console.log(`Categoría: ${producto.categoria}`);
    console.log(`Precio: $${producto.precio}`);
    console.log(`Stock: ${producto.stock}`);
    if (producto.descripcion) {
      console.log(`Descripción: ${producto.descripcion}`);
    }
  });
};

/**
 * Función para buscar productos
 */
const buscarProductos = () => {
  console.log("\n=== BUSCAR PRODUCTOS ===");
  console.log("Función buscar productos");
  // TODO: Implementar lógica para buscar productos
};

/**
 * Función para modificar un producto
 */
const modificarProducto = () => {
  console.log("\n=== MODIFICAR PRODUCTO ===");
  const fueModificado = productService.modificarProducto();

  if (fueModificado) {
    console.log(`\n Productose modifico correctamente.`);
  } else {
    console.log(`\n No se pudo modificar el producto.`);
  }
  // TODO: Implementar lógica para modificar producto
};

/**
 * Función para eliminar un producto
 */
const eliminarProducto = () => {
  console.log("\n=== ELIMINAR PRODUCTO ===");
  console.log("Función eliminar producto");
  // TODO: Implementar lógica para eliminar producto
};

/**
 * Función para calcular el precio promedio
 */
const calcularPrecioPromedio = () => {
  console.log("\n=== CALCULAR PRECIO PROMEDIO ===");
  const productos = productService.calcularPrecioPromedio();
};

module.exports = {
  mostrarMenu,
};
