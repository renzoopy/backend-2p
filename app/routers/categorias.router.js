import { Router } from 'express';
import CategoriaBusiness from '../business/categoria.business';

const categoriaRouter = Router();
categoriaRouter.get('/', async (req, res, next) => {
  console.log('Obteniendo lista de categorías de productos');
  try {
    res.json(await CategoriaBusiness.getAll());
  } catch (e) {
    next(e);
  }
});
categoriaRouter.post('/', async (req, res, next) => {
  console.log(`Guardando nueva categoría de producto: ${req.body.nombre}`);
  try {
    res.json(await CategoriaBusiness.create(req.body));
  } catch (e) {
    e.error = e;
    next(e);
  }
});
categoriaRouter.get('/:id', async (req, res, next) => {
  console.log(`Obteniendo categoría con ID: ${req.params.id}`);
  try {
    res.json(await CategoriaBusiness.findById(req.params.id));
  } catch (e) {
    next(e);
  }
});
categoriaRouter.put('/:id', async (req, res, next) => {
  console.log(`Editando categoría con ID: ${req.params.id}`);
  try {
    res.json(await CategoriaBusiness.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
});
categoriaRouter.delete('/:id', async (req, res, next) => {
  console.log(`Eliminando categoría con ID: ${req.params.id}`);
  try {
    res.json(await CategoriaBusiness.delete(req.params.id));
  } catch (e) {
    next(e);
  }
});
export default categoriaRouter;
