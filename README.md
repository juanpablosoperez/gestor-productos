# Gestión de Productos con Filtrado Avanzado

Sistema de gestión de productos desarrollado en Node.js que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre un catálogo de productos, incluyendo funcionalidades avanzadas de filtrado.

## Estructura del Proyecto

```
gestion-productos/
├── data/
│   └── productos.js       # Datos de productos
├── utils/
│   └── validaciones.js    # Funciones de validación
├── services/
│   └── productService.js  # Lógica de negocio
├── menus/
│   └── menuPrincipal.js   # Interfaz de usuario
└── main.js               # Punto de entrada de la aplicación
```

## Requisitos

- Node.js (versión 14 o superior)

## Instalación

1. Clonar el repositorio
2. Ejecutar `npm install` para instalar dependencias
3. Ejecutar `node main.js` para iniciar la aplicación

## Funcionalidades

- Gestión completa de productos (CRUD)
- Filtrado avanzado de productos
- Interfaz de consola interactiva
- Validaciones de datos
- Persistencia de datos en memoria 