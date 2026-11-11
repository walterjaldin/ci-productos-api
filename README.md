# ci-productos-api

![CI](https://github.com/walterjaldin/ci-productos-api/actions/workflows/ci.yml/badge.svg)

API REST de gestión de **productos** (CRUD) desarrollada con **Node.js + Express 5**, con pruebas unitarias y de integración en **Jest + Supertest**, análisis estático con **ESLint** y un pipeline de **Integración Continua en GitHub Actions**.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/health` | Estado del servicio |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/:id` | Obtiene un producto por id |
| POST | `/productos` | Crea un producto |
| PUT | `/productos/:id` | Actualiza un producto |
| DELETE | `/productos/:id` | Elimina un producto |
| GET | `/productos-total` | Cantidad total de productos |

Ejemplo de cuerpo para `POST` / `PUT`:

```json
{ "nombre": "Laptop", "precio": 1200, "stock": 3 }
```

## Estructura del proyecto

```
.
├── .github/workflows/ci.yml   # Pipeline de CI
├── src/
│   ├── app.js                 # Rutas Express
│   ├── productos.service.js   # Lógica de negocio y validación
│   └── server.js              # Arranque del servidor
├── tests/
│   ├── productos.service.test.js  # Pruebas unitarias
│   └── productos.api.test.js      # Pruebas de integración
├── eslint.config.js
└── package.json
```

## Ejecución local

Requisitos: Node.js 22 o superior.

```bash
npm install
npm start               # http://localhost:3000
npm run build           # Verifica que la app carga
npm run lint            # Análisis estático con ESLint
npm test                # Pruebas
npm run test:coverage   # Pruebas + reporte de cobertura (mínimo 80 %)
```

## Pipeline de CI

El workflow `.github/workflows/ci.yml` se ejecuta en cada `push` y `pull_request` hacia `main`, en paralelo con **Node.js 22 y 24**:

1. Checkout del código
2. Configuración de Node.js (con caché de npm)
3. Instalación de dependencias (`npm ci`)
4. Build (`npm run build`)
5. Linting (`npm run lint`)
6. Pruebas unitarias e integración con cobertura (`npm run test:coverage`)
7. Resumen de cobertura en la ejecución y reporte como artifact

La rama `main` está protegida: solo se puede fusionar mediante Pull Request y cuando los checks `build-and-test (22)` y `build-and-test (24)` pasan.

## Documentación del Laboratorio

Puedes encontrar el informe completo con capturas de pantalla y evidencias en el siguiente enlace:

- [Ver informe del laboratorio](./INFORME.md)
