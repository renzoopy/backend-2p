import UsuarioController from '../controllers/usuario.controller';
import ReservaBusiness from './reserva.business';
const getAll = async (opt) => UsuarioController.getAll(opt);
const findById = async (id) => (await UsuarioController.findById(id)) || {};
const findOne = async (opts) => UsuarioController.findOne(opts);
const create = async (data) => {
  try {
    return await UsuarioController.create(data);
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};
const update = async (id, data) => UsuarioController.update(id, data);
const deleteUsuario = async (id) => {
  const reserva = await ReservaBusiness.findOne({ where: { usuarioId: id } });
  if (reserva) throw new Error('Usuario ya tiene reservas');

  return UsuarioController.delete(id);
};
const UsuarioBusiness = {
  getAll,
  findById,
  findOne,
  create,
  update,
  delete: deleteUsuario,
};

export default UsuarioBusiness;
