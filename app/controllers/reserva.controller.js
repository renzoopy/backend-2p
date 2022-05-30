import db from '../models';

const ReservaController = {
  getAll: async (options) => {
    return db.reservas.findAll({
      include: [db.usuarios, db.mesas],
      ...options,
    });
  },
  findById: async (id) => db.reservas.findByPk(id),
  create: async (data) => db.reservas.create(data),
  findOne: async (opts) => db.reservas.findOne(opts),
};

export default ReservaController;
