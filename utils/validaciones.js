/**
 * Utilidades de validación
 * Contiene funciones para validar datos de productos
 */

/**
 * Valida que un string no esté vacío
 * @param {string} valor - Valor a validar
 * @returns {boolean} - true si es válido, false si no
 */
const validarStringNoVacio = (valor) => {
    return typeof valor === 'string' && valor.trim().length > 0;
};

/**
 * Valida que un número sea positivo
 * @param {number} valor - Valor a validar
 * @returns {boolean} - true si es válido, false si no
 */
const validarNumeroPositivo = (valor) => {
    return typeof valor === 'number' && valor > 0;
};

/**
 * Valida que un ID sea válido
 * @param {number} id - ID a validar
 * @returns {boolean} - true si es válido, false si no
 */
const validarId = (id) => {
    return Number.isInteger(id) && id > 0;
};

module.exports = {
    validarStringNoVacio,
    validarNumeroPositivo,
    validarId
}; 