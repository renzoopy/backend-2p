import { Router } from 'express';
import RestauranteBusiness from '../business/restaurante.business';

const restauranteRouter = Router();

restauranteRouter.get('/', async (req, res, next) => {
  console.log('Listando todos los Restaurantes');
  try {
    res.json(await RestauranteBusiness.getAll());
  } catch (e) {
    next(e);
  }
});
restauranteRouter.post('/', async (req, res, next) => {
  console.log('Registrando nuevo restaurante');
  try {
    res.json(await RestauranteBusiness.create(req.body));
  } catch (e) {
    next(e);
  }
});
restauranteRouter.get('/:id', async (req, res, next) => {
  console.log(`Buscando Restaurante con ID: ${req.params.id}`);
  try {
    res.json(await RestauranteBusiness.findById(req.params.id));
  } catch (e) {
    next(e);
  }
});
restauranteRouter.delete('/:id', async (req, res, next) => {
  console.log(`Eliminando Restaurante con ID: `, req.params.id);
  try {
    res.json(await RestauranteBusiness.delete(req.params.id));
  } catch (e) {
    next(e);
  }
});
restauranteRouter.put('/:id', async (req, res, next) => {
  console.log(`Editando restaurante con ID: ${req.params.id}`);
  try {
    console.log(req.body);
    res.json(await RestauranteBusiness.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
});
export default restauranteRouter;
