import db from '../models';
const getAll = async (options) => db.usuarios.findAll(options);
const findById = async (id) => db.usuarios.findByPk(id);
const create = async (user) => db.usuarios.create(user);
const findOne = async (opts) => db.usuarios.findOne(opts);
const update = async (id, data) => {
  await db.usuarios.update(data, { where: { id } });
  return findById(id);
};
const deleteUsuario = async (id) => db.usuarios.destroy({ where: { id } });

const UsuarioController = {
  getAll,
  findById,
  create,
  findOne,
  update,
  delete: deleteUsuario,
};

export default UsuarioController;
