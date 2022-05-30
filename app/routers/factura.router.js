import { Router } from 'express';
import ConsumoBusiness from '../business/consumo.business';
import pdf from 'html-pdf';
import factura from '../utils/factura';

const FacturaRouter = Router();

FacturaRouter.get('/:facturaId', async (req, res, next) => {
  try {
    const consumo = await ConsumoBusiness.getById(req.params.facturaId);
    console.log(JSON.stringify(consumo));
    pdf.create(factura(consumo)).toStream((err, stream) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        `Content-Disposition`,
        `attachment; filename=consumo_${consumo.id}.pdf`
      );
      stream.pipe(res);
    });
  } catch (e) {
    console.log(e);
  }
});

export default FacturaRouter;
