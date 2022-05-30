import db from '../models';

const CategoriaController = {
  getAll: async () => db.categorias.findAll({ include: db.productos }),
  findById: async (id) => db.categorias.findByPk(id),
  create: async (data) => db.categorias.create(data),
  delete: async (id) => db.categorias.destroy({ where: { id: id } }),
  update: async (id, data) => db.categorias.update(data, { where: { id: id } }),
};

export default CategoriaController;
