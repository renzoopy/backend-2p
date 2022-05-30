import db from '../models';

const ProductoController = {
  getAll: async (options) => db.productos.findAll(),
  findById: async (id) => db.productos.findByPk(id),
  create: async (data) => db.productos.create(data),
  delete: async (id) => db.productos.destroy({ where: { id: id } }),
  update: async (id, data) => db.productos.update(data, { where: { id: id } }),
};

export default ProductoController;
