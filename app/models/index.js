import Sequelize from 'sequelize';
import config from '../../config';
import makeUserSchema from './Usuario';
import makeRestauranteSchema from './Restaurante';
import makeMesaSchema from './Mesa';
import makeReservaSchema from './Reserva';
import makeCategoriaSchema from './Categoria';
import makeProductoSchema from './Producto';
import makeConsumoSchema from './Consumo';
import makeDetalleConsumoSchema from './DetalleConsumo';

const sequelize = new Sequelize(
  config.dbConnection.db,
  config.dbConnection.user,
  config.dbConnection.password,
  {
    host: config.dbConnection.host,
    port: 5432,
    dialect: config.dbConnection.dialect,
    pool: {
      max: config.dbConnection.pool.max,
      min: config.dbConnection.pool.min,
      acquire: config.dbConnection.pool.acquire,
      idle: config.dbConnection.pool.idle,
    },
    logging: config.dbConnection.logging,
  }
);

const db = {};
db.sequelize = sequelize;
db.usuarios = makeUserSchema(sequelize);
db.restaurantes = makeRestauranteSchema(sequelize);
db.mesas = makeMesaSchema(sequelize);
db.reservas = makeReservaSchema(sequelize);
db.restaurantes.hasMany(db.mesas);
db.mesas.belongsTo(db.restaurantes);
db.mesas.hasMany(db.reservas);
db.reservas.belongsTo(db.mesas);
db.usuarios.hasMany(db.reservas);
db.reservas.belongsTo(db.usuarios);
db.categorias = makeCategoriaSchema(sequelize);
db.productos = makeProductoSchema(sequelize);
db.categorias.hasMany(db.productos);
db.productos.belongsTo(db.categorias);

db.consumo = makeConsumoSchema(sequelize);
db.detalleConsumo = makeDetalleConsumoSchema(sequelize);
db.consumo.hasMany(db.detalleConsumo);
db.detalleConsumo.belongsTo(db.consumo);
db.detalleConsumo.belongsTo(db.productos);
db.productos.hasMany(db.detalleConsumo);
db.consumo.belongsTo(db.usuarios);
db.usuarios.hasMany(db.consumo);
db.consumo.belongsTo(db.mesas);
db.mesas.hasMany(db.consumo);
export default db;
