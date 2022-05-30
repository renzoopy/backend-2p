import ProductoController from '../controllers/producto.controller';

const getAll = async (opts) => ProductoController.getAll(opts);
const findById = async (id) => (await ProductoController.findById(id)) || {};
const create = async (data) => {
  try {
    return await ProductoController.create(data);
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};
const deleteProducto = async (id) => {
  await ProductoController.delete(id);
};

const update = async (id, data) => {
  await ProductoController.update(id, data);
  return ProductoController.findById(id);
};
const ProductoBusiness = {
  getAll,
  findById,
  create,
  delete: deleteProducto,
  update,
};

export default ProductoBusiness;
