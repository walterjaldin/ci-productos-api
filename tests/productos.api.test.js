const request = require('supertest');
const app = require('../src/app');
const service = require('../src/productos.service');

describe('API /productos (integracion)', () => {
  beforeEach(() => service.reset());

  test('GET /health retorna ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /productos crea un producto', async () => {
    const res = await request(app).post('/productos').send({ nombre: 'Laptop', precio: 1200, stock: 4 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ id: 1, nombre: 'Laptop' });
  });

  test('POST /productos con datos invalidos retorna 400', async () => {
    const res = await request(app).post('/productos').send({ nombre: '', precio: -5 });
    expect(res.statusCode).toBe(400);
    expect(res.body.errores.length).toBeGreaterThan(0);
  });

  test('GET /productos lista los productos', async () => {
    await request(app).post('/productos').send({ nombre: 'Laptop', precio: 1200 });
    const res = await request(app).get('/productos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  test('GET /productos/:id retorna el producto o 404', async () => {
    await request(app).post('/productos').send({ nombre: 'Laptop', precio: 1200 });
    expect((await request(app).get('/productos/1')).statusCode).toBe(200);
    expect((await request(app).get('/productos/99')).statusCode).toBe(404);
  });

  test('PUT /productos/:id actualiza, valida y retorna 404', async () => {
    await request(app).post('/productos').send({ nombre: 'Laptop', precio: 1200 });
    const ok = await request(app).put('/productos/1').send({ nombre: 'Laptop Pro', precio: 1500 });
    expect(ok.statusCode).toBe(200);
    expect(ok.body.nombre).toBe('Laptop Pro');
    expect((await request(app).put('/productos/1').send({})).statusCode).toBe(400);
    expect((await request(app).put('/productos/99').send({ nombre: 'X', precio: 1 })).statusCode).toBe(404);
  });

  test('DELETE /productos/:id elimina o retorna 404', async () => {
    await request(app).post('/productos').send({ nombre: 'Laptop', precio: 1200 });
    expect((await request(app).delete('/productos/1')).statusCode).toBe(204);
    expect((await request(app).delete('/productos/1')).statusCode).toBe(404);
  });

  test('GET /productos-total retorna la cantidad de productos', async () => {
    await request(app).post('/productos').send({ nombre: 'Laptop', precio: 1200 });
    const res = await request(app).get('/productos-total');
    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBe(1);
  });
});
