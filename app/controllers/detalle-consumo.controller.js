import db from '../models';

const DetalleConsumoController = {
  getAll: async () => db.detalleConsumo.findAll(),
  findById: async (id) => db.detalleConsumo.findByPk(id),
  create: async (data) => db.detalleConsumo.create(data),
  delete: async (id) => db.detalleConsumo.destroy({ where: { id: id } }),
  update: async (id, data) =>
    db.detalleConsumo.update(data, { where: { id: id } }),
};

export default DetalleConsumoController;
