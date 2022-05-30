import RestauranteController from '../controllers/restaurante.controller';
import MesaBusiness from './mesa.business';

const getAll = async () => RestauranteController.getAll();
const findById = async (id) => RestauranteController.findById(id);
const create = async (data) => {
  try {
    return await RestauranteController.create(data);
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};
const deleteRestaurante = async (id) => {
  const mesa = await MesaBusiness.findOne({ where: { restauranteId: id } });
  if (mesa) throw new Error('El restaurante ya tiene mesas');
  await RestauranteController.delete(id);
};
const update = async (id, data) => {
  await RestauranteController.update(id, data);
  return RestauranteController.findById(id);
};
const RestauranteBusiness = {
  getAll,
  findById,
  update,
  create,
  delete: deleteRestaurante,
};

export default RestauranteBusiness;
