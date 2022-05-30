import db from '../models';

const ConsumoController = {
  getAll: async (options) =>
    db.consumo.findAll({
      include: [db.detalleConsumo, db.usuarios],
      ...options,
    }),
  getOne: async (options) =>
    db.consumo.findOne({
      include: [db.detalleConsumo, db.usuarios],
      ...options,
    }),
  findById: async (id) =>
    db.consumo.findByPk(id, { include: [db.detalleConsumo, db.usuarios] }),
  create: async (data) => db.consumo.create(data),
  delete: async (id) => db.consumo.destroy({ where: { id: id } }),
  update: async (id, data) => db.consumo.update(data, { where: { id: id } }),
};

export default ConsumoController;
