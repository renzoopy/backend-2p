import { Router } from 'express';
import UsuarioBusiness from '../business/usuario.business';

const usuarioRouter = Router();
usuarioRouter.get('/', async (req, res, next) => {
  console.log('Obteniendo lista de usuarios');
  try {
    const options = req.query.cedula
      ? { where: { cedula: req.query.cedula } }
      : {};
    res.json(await UsuarioBusiness.getAll(options));
  } catch (e) {
    next(e);
  }
});
usuarioRouter.post('/', async (req, res, next) => {
  console.log(`Guardando nuevo usuario: ${req.body.cedula}`);
  try {
    res.json(await UsuarioBusiness.create(req.body));
  } catch (e) {
    e.error = e;
    next(e);
  }
});
usuarioRouter.get('/:id', async (req, res, next) => {
  console.log(`Obteniendo usuario con ID: ${req.params.id}`);
  try {
    res.json(await UsuarioBusiness.findById(req.params.id));
  } catch (e) {
    next(e);
  }
});
usuarioRouter.put('/:id', async (req, res, next) => {
  console.log(`Editando usuario con ID: ${req.params.id}`);
  try {
    res.json(await UsuarioBusiness.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
});
usuarioRouter.delete('/:id', async (req, res, next) => {
  console.log(`Eliminando usuario con ID: ${req.params.id}`);
  try {
    res.json(await UsuarioBusiness.delete(req.params.id));
  } catch (e) {
    next(e);
  }
});
export default usuarioRouter;
