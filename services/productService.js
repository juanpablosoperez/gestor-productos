/**
 * Servicio de Productos
 * Implementa la lógica de negocio para la gestión de productos
 */

const readlineSync = require("readline-sync");
const { productos } = require("../data/productos");
const {
  validarStringNoVacio,
  validarNumeroPositivo,
  validarId,
} = require("../utils/validaciones");

/**
 * Obtiene todos los productos
 * @returns {Array} Lista de productos
 */
const obtenerProductos = () => {
  return [...productos]; // Para lógica como forEach, reduce, etc.
};

const obtenerProductosFormateado = () => {
  return productos
    .map(
      (p, index) =>
        `ID: ${index + 1} | Nombre: ${p.nombre} | Precio: $${p.precio.toFixed(
          2
        )} | Categoría: ${p.categoria} | Stock: ${p.stock}`
    )
    .join("\n");
};

/**
 * Busca un producto por su ID
 * @param {number} id - ID del producto a buscar
 * @returns {Object|null} Producto encontrado o null
 */
const buscarProductoPorId = (id) => {
  if (!validarId(id)) return null;
  return productos.find((producto) => producto.id === id) || null;
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
  console.log("\n=== INGRESO DE NUEVO PRODUCTO ===");

  // Solicitar y validar nombre
  const nombre = readlineSync
    .question("Ingrese el nombre del producto: ")
    .trim();
  if (!validarStringNoVacio(nombre)) {
    console.log("\n❌ Error: El nombre no puede estar vacío.");
    return null;
  }

  // Solicitar y validar precio
  const precioStr = readlineSync.question("Ingrese el precio del producto: ");
  const precio = parseFloat(precioStr);
  if (!validarDecimal(precio)) {
    console.log("\n❌ Error: El precio debe ser un número válido mayor a 0.");
    return null;
  }

  // Solicitar y validar categoría
  const categoria = readlineSync
    .question("Ingrese la categoría del producto: ")
    .trim();
  if (!validarStringNoVacio(categoria)) {
    console.log("\n❌ Error: La categoría no puede estar vacía.");
    return null;
  }

  // Solicitar y validar stock
  const stockStr = readlineSync.question("Ingrese el stock del producto: ");
  const stock = parseInt(stockStr);
  if (!Number.isInteger(stock) || stock < 0) {
    console.log(
      "\n❌ Error: El stock debe ser un número entero mayor o igual a 0."
    );
    return null;
  }

  // Generar nuevo ID (máximo ID actual + 1)
  const nuevoId = Math.max(...productos.map((p) => p.id), 0) + 1;

  // Crear el nuevo producto
  const nuevoProducto = {
    id: nuevoId,
    nombre,
    precio,
    categoria,
    stock,
    descripcion: `${nombre} - ${categoria}`, // Descripción básica
  };

  // Agregar al array de productos
  productos.push(nuevoProducto);

  // Mostrar confirmación
  console.log("\n✅ Producto agregado exitosamente:");
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
  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) return false;

  productos.splice(index, 1);
  return true;
};

/**
 * Muestra un submenú de filtros y permite buscar productos según criterios seleccionados
 * @returns {Array} Lista de productos filtrados
 */
const buscarProductos = () => {
  console.log("\n=== BUSQUEDA DE PRODUCTOS ===");
  console.log("\nOpciones de filtrado:");
  console.log("1. Filtrar por categoría");
  console.log("2. Filtrar por rango de precio");
  console.log("3. Filtrar por disponibilidad (stock > 0)");
  console.log("4. Aplicar múltiples filtros");
  console.log("0. Volver al menú principal");

  const opcion = readlineSync.questionInt("\nSeleccione una opción: ");
  let productosFiltrados = [...productos];

  switch (opcion) {
    case 0:
      return null;

    case 1: // Filtrar por categoría
      const categorias = [...new Set(productos.map(p => p.categoria))];
      console.log("\nCategorías disponibles:");
      categorias.forEach((cat, index) => console.log(`${index + 1}. ${cat}`));
      
      const categoriaSeleccionada = readlineSync.question("\nIngrese el número de la categoría: ");
      const categoria = categorias[parseInt(categoriaSeleccionada) - 1];
      
      if (categoria) {
        productosFiltrados = productos.filter(p => p.categoria === categoria);
      }
      break;

    case 2: // Filtrar por rango de precio
      const precioMin = readlineSync.questionFloat("\nIngrese el precio mínimo: ");
      const precioMax = readlineSync.questionFloat("Ingrese el precio máximo: ");
      
      if (validarDecimal(precioMin) && validarDecimal(precioMax) && precioMin <= precioMax) {
        productosFiltrados = productos.filter(p => p.precio >= precioMin && p.precio <= precioMax);
      } else {
        console.log("\n❌ Error: Rango de precios inválido");
        return null;
      }
      break;

    case 3: // Filtrar por disponibilidad
      productosFiltrados = productos.filter(p => p.stock > 0);
      break;

    case 4: // Múltiples filtros
      console.log("\nSeleccione los filtros a aplicar (separados por coma):");
      console.log("1. Categoría");
      console.log("2. Rango de precio");
      console.log("3. Disponibilidad");
      
      const filtrosSeleccionados = readlineSync.question("\nIngrese los números de los filtros (ej: 1,2,3): ")
        .split(',')
        .map(f => f.trim())
        .filter(f => ['1', '2', '3'].includes(f));

      if (filtrosSeleccionados.length === 0) {
        console.log("\n❌ Error: Debe seleccionar al menos un filtro");
        return null;
      }

      // Aplicar filtros seleccionados
      if (filtrosSeleccionados.includes('1')) {
        const categorias = [...new Set(productos.map(p => p.categoria))];
        console.log("\nCategorías disponibles:");
        categorias.forEach((cat, index) => console.log(`${index + 1}. ${cat}`));
        const categoriaSeleccionada = readlineSync.question("\nIngrese el número de la categoría: ");
        const categoria = categorias[parseInt(categoriaSeleccionada) - 1];
        if (categoria) {
          productosFiltrados = productosFiltrados.filter(p => p.categoria === categoria);
        }
      }

      if (filtrosSeleccionados.includes('2')) {
        const precioMin = readlineSync.questionFloat("\nIngrese el precio mínimo: ");
        const precioMax = readlineSync.questionFloat("Ingrese el precio máximo: ");
        if (validarDecimal(precioMin) && validarDecimal(precioMax) && precioMin <= precioMax) {
          productosFiltrados = productosFiltrados.filter(p => p.precio >= precioMin && p.precio <= precioMax);
        } else {
          console.log("\n❌ Error: Rango de precios inválido");
          return null;
        }
      }

      if (filtrosSeleccionados.includes('3')) {
        productosFiltrados = productosFiltrados.filter(p => p.stock > 0);
      }
      break;

    default:
      console.log("\n❌ Opción inválida");
      return null;
  }

  // Mostrar resultados
  if (productosFiltrados.length === 0) {
    console.log("\n❌ No se encontraron productos que coincidan con los criterios de búsqueda");
    return null;
  }

  console.log("\n=== RESULTADOS DE LA BÚSQUEDA ===");
  console.log(productosFiltrados
    .map(p => `ID: ${p.id} | Nombre: ${p.nombre} | Precio: $${p.precio.toFixed(2)} | Categoría: ${p.categoria} | Stock: ${p.stock}`)
    .join("\n"));
  
  return productosFiltrados;
};

module.exports = {
  obtenerProductos,
  obtenerProductosFormateado,
  buscarProductoPorId,
  agregarProducto,
  eliminarProducto,
  buscarProductos
};
