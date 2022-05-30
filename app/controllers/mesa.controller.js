import db from '../models';

const MesaController = {
  getAll: async (options) =>
    db.mesas.findAll({ include: [db.restaurantes], ...options }),
  findById: async (id) => db.mesas.findByPk(id),
  findOne: async (options) => db.mesas.findOne(options),
  create: async (data) => db.mesas.create(data),
  delete: async (id) => db.mesas.destroy({ where: { id: id } }),
  update: async (id, data) => db.mesas.update(data, { where: { id: id } }),
};

export default MesaController;
