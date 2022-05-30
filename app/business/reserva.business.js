import ReservaController from '../controllers/reserva.controller';
import db from '../models';
import MesaBusiness from './mesa.business';
import { Op } from 'sequelize';
import UsuarioBusiness from './usuario.business';

const getAll = async (opts) => ReservaController.getAll(opts);
const findById = async (id) => (await ReservaController.findById(id)) || {};
const create = async (data) => {
  try {
    return await ReservaController.create(data);
  } catch (e) {
    throw new Error(e.errors[0].message);
  }
};
const findOne = async (opts) => ReservaController.findOne(opts);
const findByUsuarioFecha = async ({ restauranteId, cedulaUsuario, fecha }) => {
  if (!fecha) throw new Error('Fecha no especificada');
  return await ReservaController.getAll({
    where: { fecha },
    include: [
      {
        model: db.mesas,
        where: { restauranteId },
        required: true,
      },

      {
        model: db.usuarios,
        ...(cedulaUsuario ? { where: { cedula: cedulaUsuario } } : {}),
        required: true,
      },
    ],
  });
};
const getReservasDisponibles = async (
  restauranteId,
  fecha,
  horaDesde,
  horaHasta,
  capacidad
) => {
  if (!fecha) throw new Error('Fecha no especifidada');
  const mesas = await MesaBusiness.getByRestaurante(restauranteId);
  const reservas = await getAll({
    where: {
      fecha,
      [Op.or]: [
        {
          [Op.and]: [
            { horaHasta: { [Op.gt]: horaDesde } },
            { horaHasta: { [Op.lte]: horaHasta } },
          ],
        },
        {
          [Op.and]: [
            { horaDesde: { [Op.lte]: horaDesde } },
            { horaDesde: { [Op.gt]: horaHasta } },
          ],
        },
      ],
    },
  });
  return mesas.filter((mesa) => {
    return (
      (!capacidad || mesa.capacidad >= capacidad) &&
      !reservas.some((reserva) => reserva.mesaId === mesa.id)
    );
  });
};
const verificarHorarioReserva = async (mesaId, fecha, horaDesde, horaHasta) => {
  const reservasCount = await ReservaController.findOne({
    where: {
      mesaId,
      fecha,
      [Op.or]: [
        {
          [Op.and]: [
            { horaHasta: { [Op.gt]: horaDesde } },
            { horaHasta: { [Op.lte]: horaHasta } },
          ],
        },
        {
          [Op.and]: [
            { horaDesde: { [Op.lte]: horaDesde } },
            { horaDesde: { [Op.gt]: horaHasta } },
          ],
        },
      ],
    },
  });
  return !reservasCount;
};
const reservarMesa = async (data) => {
  const usuario = await UsuarioBusiness.findOne({
    where: { id: data.usuarioId },
  });
  if (!usuario) throw new Error('Usuario no encontrado');
  const mesa = await MesaBusiness.findOne({ where: { id: data.mesaId } });
  if (!mesa) throw new Error('Mesa no encontrada');
  if (![12, 13, 14, 19, 20, 21, 22].includes(data.horaDesde))
    throw new Error('Hora de Inicio no valida');
  if (![13, 14, 15, 20, 21, 22, 23].includes(data.horaHasta))
    throw new Error('Hora de Fin no valida');
  if (data.horaDesde >= data.horaHasta)
    throw new Error('Hora de Fin debe ser mayor a la hora de inicio');
  if (data.horaDesde < 16) {
    if (data.horaHasta > 15)
      throw new Error(
        'No se puede realizar una reserva en el horario establecido'
      );
  }
  const isValid = await verificarHorarioReserva(
    data.mesaId,
    data.fecha,
    data.horaDesde,
    data.horaHasta
  );
  if (!isValid) throw new Error('La mesa ya esta reservada en este horario');
  return create(data);
};
const ReservaBusiness = {
  getAll,
  create,
  findById,
  getReservasDisponibles,
  findByUsuarioFecha,
  reservarMesa,
  findOne,
};
export default ReservaBusiness;
