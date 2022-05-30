import CategoriaController from '../controllers/categoria.controller';

const getAll = async () => CategoriaController.getAll();
const findById = async (id) => CategoriaController.findById(id);
const create = async (data) => {
  try {
    return await CategoriaController.create(data);
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};
const deleteCategoria = async (id) => {
  await CategoriaController.delete(id);
};
const update = async (id, data) => {
  await CategoriaController.update(id, data);
  return CategoriaController.findById(id);
};
const CategoriaBusiness = {
  getAll,
  findById,
  update,
  create,
  delete: deleteCategoria,
};

export default CategoriaBusiness;
