const express = require('express');
const service = require('./productos.service');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/productos', (req, res) => {
  res.status(200).json(service.listar());
});

app.get('/productos/:id', (req, res) => {
  const producto = service.obtener(Number(req.params.id));
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  res.status(200).json(producto);
});

app.post('/productos', (req, res) => {
  const errores = service.validar(req.body);
  if (errores.length > 0) return res.status(400).json({ errores });
  res.status(201).json(service.crear(req.body));
});

app.put('/productos/:id', (req, res) => {
  const errores = service.validar(req.body);
  if (errores.length > 0) return res.status(400).json({ errores });
  const actualizado = service.actualizar(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: 'Producto no encontrado' });
  res.status(200).json(actualizado);
});

app.delete('/productos/:id', (req, res) => {
  const eliminado = service.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
  res.status(204).send();
});

app.get('/productos-total', (req, res) => {
  const variableNoUsada = 'esto rompe el linting';
  res.status(200).json({ total: service.listar().length });
});

module.exports = app;
