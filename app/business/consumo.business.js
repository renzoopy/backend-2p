import ConsumoController from '../controllers/consumo.controller';
import { ESTADOS_CONSUMO } from '../models/Consumo';
import DetalleConsumoBusiness from './detalle-consumo.business';
import db from '../models';
import ProductoBusiness from './producto.business';

const getConsumoByMesaAbierta = async (mesaId) =>
  ConsumoController.getOne({
    where: { mesaId, estado: ESTADOS_CONSUMO.ABIERTA },
  });
const getAll = async () => ConsumoController.getAll();
const findById = async (id) => ConsumoController.findById(id);
const create = async (data) => {
  if (await getConsumoByMesaAbierta(data.mesaId))
    throw new Error('Ya existe un consumo abierto para esta mesa');

  try {
    return await ConsumoController.create({
      usuarioId: data.usuarioId,
      mesaId: data.mesaId,
      estado: ESTADOS_CONSUMO.ABIERTA,
      total: 0,
    });
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};
const update = async (id, data) => ConsumoController.update(id, data);
const addProducto = async (mesaId, productoId, cantidad) => {
  const consumo = await getConsumoByMesaAbierta(mesaId);
  const producto = await ProductoBusiness.findById(productoId);
  if (!producto) throw new Error('Producto no existente');
  if (!consumo) throw new Error('No existe un Consumo abierto para esta mesa');
  if (consumo.estado !== ESTADOS_CONSUMO.ABIERTA)
    throw new Error('Consumo ya Cerrado');
  try {
    consumo.total = Number(consumo.total || 0) + producto.precio * cantidad;
    await consumo.save();
    await DetalleConsumoBusiness.create({
      consumoId: consumo.id,
      cantidad,
      productoId,
    });
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
  return consumo.reload();
};
const cerrarConsumo = async (mesaId) => {
  const consumo = await getConsumoByMesaAbierta(mesaId);
  if (!consumo) throw new Error('No existe un Consumo abierto para esta mesa');
  consumo.estado = ESTADOS_CONSUMO.CERRADA;
  consumo.fechaCierre = new Date();
  return consumo.save();
};
const getById = async (id) => {
  return ConsumoController.getOne({
    where: { id },
    include: [
      db.usuarios,
      db.mesas,
      { model: db.detalleConsumo, include: db.productos },
    ],
  });
};
const ConsumoBusiness = {
  getAll,
  findById,
  create,
  getConsumoByMesaAbierta,
  addProducto,
  cerrarConsumo,
  update,
  getById,
};

export default ConsumoBusiness;
