import { Router } from 'express';
import MesaBusiness from '../business/mesa.business';
import ReservaBusiness from '../business/reserva.business';

const mesaRouter = Router({ mergeParams: true });
mesaRouter.get('/disponibles', async (req, res, next) => {
  console.log(
    `Obteniendo todas las mesas disponibles del restaurant con ID: ${req.params.restauranteId} para el ${req.query.fecha}`
  );
  try {
    const reservas = await ReservaBusiness.getReservasDisponibles(
      req.params.restauranteId,
      req.query.fecha,
      req.query.horaDesde,
      req.query.horaHasta,
      req.query.capacidad
    );
    res.json(reservas);
  } catch (e) {
    console.log(e);
    next(e);
  }
});
mesaRouter.get('/', async (req, res, next) => {
  console.log(
    `Retornando todas las mesas del restaurante: ${req.params.restauranteId}`
  );
  try {
    res.json(
      await MesaBusiness.getAll({
        where: { restauranteId: req.params.restauranteId },
      })
    );
  } catch (e) {
    console.log(e);
    next(e);
  }
});
mesaRouter.post('/', async (req, res, next) => {
  console.log(
    `Guardando nueva mesa en restaurante: ${req.params.restauranteId}`
  );
  try {
    res.json(
      await MesaBusiness.create({
        ...req.body,
        restauranteId: req.params.restauranteId,
      })
    );
  } catch (e) {
    e.error = e;
    next(e);
  }
});
mesaRouter.get('/:id', async (req, res, next) => {
  console.log(`Obtieniendo mesa con ID: ${req.params.id}`);
  try {
    res.json(
      await MesaBusiness.findOne({
        where: { id: req.params.id, restauranteId: req.params.restauranteId },
      })
    );
  } catch (e) {
    next(e);
  }
});
mesaRouter.delete('/:id', async (req, res, next) => {
  console.log(`Tratando de eliminar Mesa con ID: ${req.params.id}`);
  try {
    res.json(await MesaBusiness.delete(req.params.id));
  } catch (e) {
    next(e);
  }
});
mesaRouter.put('/:id', async (req, res, next) => {
  console.log(`Editando mesa con ID: ${req.params.id}`);
  try {
    res.json(
      await MesaBusiness.update(req.params.id, {
        ...req.body,
        restauranteId: req.params.restauranteId,
      })
    );
  } catch (e) {
    next(e);
  }
});
export default mesaRouter;
