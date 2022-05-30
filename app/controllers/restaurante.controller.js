import db from '../models';
const getAll = async (options) =>
  db.restaurantes.findAll({ ...options, include: db.mesas });
const findById = async (id) =>
  db.restaurantes.findOne({ where: { id }, include: db.mesas });
const create = async (data) => db.restaurantes.create(data);
const deleteRestaurante = async (id) =>
  db.restaurantes.destroy({ where: { id: id } });
const update = async (id, data) => {
  await db.restaurantes.update(data, { where: { id: id } });
  return findById(id);
};
const RestauranteController = {
  getAll,
  findById,
  create,
  delete: deleteRestaurante,
  update,
};

export default RestauranteController;
