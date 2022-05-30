import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from './config';
import db from './app/models';
import usuarioRouter from './app/routers/usuarios.router';
import reservasRouter from './app/routers/reservas.router';
import mesasRouter from './app/routers/mesas.router';
import restauranteRouter from './app/routers/restaurantes.router';
import categoriasRouter from './app/routers/categorias.router';
import productoRouter from './app/routers/productos.router';
import ConsumoRouter from './app/routers/consumo.router';
import FacturaRouter from './app/routers/factura.router';

db.sequelize.sync({ alter: true });
const app = express();
// Middleware definitions
app.use(bodyParser.json());
app.use(cors(config.corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// Route definitions
app.use('/usuarios', usuarioRouter);
app.use('/restaurantes', restauranteRouter);
app.use('/restaurantes/:restauranteId/reservas', reservasRouter);
app.use('/restaurantes/:restauranteId/mesas', mesasRouter);
app.use('/restaurantes/:restauranteId/mesas/:mesaId/consumo', ConsumoRouter);
app.use('/categorias-productos', categoriasRouter);
app.use('/productos', productoRouter);
app.use('/facturas', FacturaRouter);
// Error handler
app.use((error, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('[Error]: ', error.message || error.error);
  res.status(error.errorCode || 500);
  res.json({ error: error.error || error.message });
});

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server Started');
});
