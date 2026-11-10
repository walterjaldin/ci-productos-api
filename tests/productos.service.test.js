const service = require('../src/productos.service');

describe('Productos Service (unitarias)', () => {
  beforeEach(() => service.reset());

  test('validar retorna errores si faltan datos', () => {
    const errores = service.validar({});
    expect(errores).toHaveLength(2);
  });

  test('validar rechaza stock negativo', () => {
    const errores = service.validar({ nombre: 'Mouse', precio: 10, stock: -1 });
    expect(errores).toContain('El stock debe ser un entero mayor o igual a 0');
  });

  test('validar acepta un producto correcto', () => {
    expect(service.validar({ nombre: 'Mouse', precio: 10, stock: 5 })).toEqual([]);
  });

  test('crear asigna id incremental y stock por defecto', () => {
    const p1 = service.crear({ nombre: ' Teclado ', precio: 50 });
    const p2 = service.crear({ nombre: 'Monitor', precio: 300, stock: 2 });
    expect(p1).toEqual({ id: 1, nombre: 'Teclado', precio: 50, stock: 0 });
    expect(p2.id).toBe(2);
    expect(service.listar()).toHaveLength(2);
  });

  test('obtener retorna null si no existe', () => {
    expect(service.obtener(99)).toBeNull();
  });

  test('actualizar modifica un producto existente', () => {
    service.crear({ nombre: 'Mouse', precio: 10 });
    const actualizado = service.actualizar(1, { nombre: 'Mouse Gamer', precio: 25, stock: 3 });
    expect(actualizado).toEqual({ id: 1, nombre: 'Mouse Gamer', precio: 25, stock: 3 });
  });

  test('actualizar retorna null si no existe', () => {
    expect(service.actualizar(99, { nombre: 'X', precio: 1 })).toBeNull();
  });

  test('eliminar retorna true/false segun exista', () => {
    service.crear({ nombre: 'Mouse', precio: 10 });
    expect(service.eliminar(1)).toBe(true);
    expect(service.eliminar(1)).toBe(false);
  });
});
