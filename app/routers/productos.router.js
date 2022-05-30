import { Router } from 'express';
import ProductoBusiness from '../business/producto.business';

const productoRouter = Router();
productoRouter.get('/', async (req, res, next) => {
  console.log('Obteniendo lista de productos');
  try {
    res.json(await ProductoBusiness.getAll());
  } catch (e) {
    next(e);
  }
});
productoRouter.post('/', async (req, res, next) => {
  console.log(`Guardando nuevo producto: ${req.body.nombre}`);
  try {
    res.json(await ProductoBusiness.create(req.body));
  } catch (e) {
    e.error = e;
    next(e);
  }
});
productoRouter.get('/:id', async (req, res, next) => {
  console.log(`Obteniendo producto con ID: ${req.params.id}`);
  try {
    res.json(await ProductoBusiness.findById(req.params.id));
  } catch (e) {
    next(e);
  }
});
productoRouter.put('/:id', async (req, res, next) => {
  console.log(`Editando producto con ID: ${req.params.id}`);
  try {
    res.json(await ProductoBusiness.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
});
productoRouter.delete('/:id', async (req, res, next) => {
  console.log(`Eliminando producto con ID: ${req.params.id}`);
  try {
    res.json(await ProductoBusiness.delete(req.params.id));
  } catch (e) {
    next(e);
  }
});
export default productoRouter;
