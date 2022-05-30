import { Router } from 'express';
import ConsumoBusiness from '../business/consumo.business';
const ConsumoRouter = Router({ mergeParams: true });

ConsumoRouter.get('/', async (req, res, next) => {
  console.log('Obteniendo Consumo');
  try {
    const result = await ConsumoBusiness.getConsumoByMesaAbierta(
      req.params.mesaId
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
});
ConsumoRouter.put('/', async (req, res, next) => {
  console.log('Actualizando Consumo');
  try {
    const consumo = await ConsumoBusiness.getConsumoByMesaAbierta(
      req.params.mesaId
    );
    await ConsumoBusiness.update(consumo.id, {
      usuarioId: req.body.clienteId,
    });
    res.json(await consumo.reload());
  } catch (e) {
    next(e);
  }
});
ConsumoRouter.delete('/', async (req, res, next) => {
  console.log('Cerrando Consumo');
  try {
    const result = await ConsumoBusiness.cerrarConsumo(req.params.mesaId);
    res.json(result);
  } catch (e) {
    next(e);
  }
});
ConsumoRouter.post('/detalle', async (req, res, next) => {
  console.log('Agregando producto a detalle de consumo');
  try {
    const result = await ConsumoBusiness.addProducto(
      req.params.mesaId,
      req.body.productoId,
      req.body.cantidad
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
});
ConsumoRouter.post('/', async (req, res, next) => {
  console.log('Agregando nuevo consumo');
  try {
    const result = await ConsumoBusiness.create({
      ...req.body,
      mesaId: req.params.mesaId,
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

export default ConsumoRouter;
