import { Router } from 'express';
import ReservaBusiness from '../business/reserva.business';

const reservasRouter = Router({ mergeParams: true });

reservasRouter.get('/', async (req, res, next) => {
  console.log(
    `Buscando reservas del restaurante con ID: ${req.params.restauranteId}, con parametros: `,
    req.query
  );
  try {
    const result = await ReservaBusiness.findByUsuarioFecha({
      restauranteId: req.params.restauranteId,
      cedulaUsuario: req.query.usuario,
      fecha: req.query.fecha,
    });
    result.sort((a, b) => {
      if (a.horaDesde !== b.horaDesde) {
        return a.horaDesde - b.horaDesde;
      } else if (a.horaHasta !== b.horaHasta) {
        return a.horaHasta - b.horaHasta;
      } else if (a?.mesa.nombreMesa < b.mesa.nombreMesa) {
        return -1;
      } else if (a?.mesa.nombreMesa < b.mesa.nombreMesa) {
        return 1;
      }
      return 0;
    });
    res.json(result);
  } catch (e) {
    e.error = e.toString();
    next(e);
  }
});
reservasRouter.post('/', async (req, res, next) => {
  console.log(`Creando nueva reserva`);
  try {
    res.json(await ReservaBusiness.reservarMesa(req.body));
  } catch (e) {
    next(e);
  }
});
export default reservasRouter;
