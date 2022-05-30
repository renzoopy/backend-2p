import MesaController from '../controllers/mesa.controller';
import ReservaBusiness from './reserva.business';

const getAll = async (opts) => MesaController.getAll(opts);
const findById = async (id) => (await MesaController.findById(id)) || {};
const findOne = async (opts) => MesaController.findOne(opts);
const create = async (data) => {
  try {
    return await MesaController.create(data);
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};
const deleteMesa = async (id) => {
  const mesa = await ReservaBusiness.findOne({ where: { mesaId: id } });
  console.log(mesa);
  if (mesa) throw new Error('La mesa ya cuenta con reservas');
  await MesaController.delete(id);
};
const hasReservas = async (id) => {
  const reserva = await ReservaBusiness.findOne({ where: { mesaId: id } });
  return !!reserva;
};
const update = async (id, data) => {
  const mesa = await findOne({
    where: { id: id, restauranteId: data.restauranteId },
  });
  if (!mesa) throw new Error('Mesa no encontrada');
  if (await hasReservas(id)) throw new Error('La mesa ya cuenta con reservas');
  await MesaController.update(id, data);
  return MesaController.findById(id);
};
const getByRestaurante = async (id) => getAll({ where: { restauranteId: id } });
const MesaBusiness = {
  getAll,
  findById,
  create,
  delete: deleteMesa,
  update,
  getByRestaurante,
  findOne,
};

export default MesaBusiness;
