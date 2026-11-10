let productos = [];
let nextId = 1;

function validar(data = {}) {
  const errores = [];
  if (typeof data.nombre !== 'string' || data.nombre.trim() === '') {
    errores.push('El nombre es obligatorio');
  }
  if (typeof data.precio !== 'number' || data.precio < 0) {
    errores.push('El precio debe ser un numero mayor o igual a 0');
  }
  if (data.stock !== undefined && (!Number.isInteger(data.stock) || data.stock < 0)) {
    errores.push('El stock debe ser un entero mayor o igual a 0');
  }
  return errores;
}

function listar() {
  return productos;
}

function obtener(id) {
  return productos.find((p) => p.id === id) || null;
}

function crear(data) {
  const nuevo = {
    id: nextId++,
    nombre: data.nombre.trim(),
    precio: data.precio,
    stock: data.stock ?? 0,
  };
  productos.push(nuevo);
  return nuevo;
}

function actualizar(id, data) {
  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  productos[index] = {
    id,
    nombre: data.nombre.trim(),
    precio: data.precio,
    stock: data.stock ?? 0,
  };
  return productos[index];
}

function eliminar(id) {
  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) return false;
  productos.splice(index, 1);
  return true;
}

function reset() {
  productos = [];
  nextId = 1;
}

module.exports = { validar, listar, obtener, crear, actualizar, eliminar, reset };
