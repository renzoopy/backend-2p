import DetalleConsumoController from '../controllers/detalle-consumo.controller';

const create = async (data) => DetalleConsumoController.create(data);
const DetalleConsumoBusiness = { create };
export default DetalleConsumoBusiness;
