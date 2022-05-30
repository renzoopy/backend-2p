export default (consumo) => {
  return `<div>
  <table style="width: 7in;font-size: 10px">
    <tr>
      <td style="font-weight:bold">Cliente</td>
      <td>${consumo.usuario.nombre} ${consumo.usuario.apellido}</td>
    </tr>
    <tr>
      <td style="font-weight:bold">Numero de Cedula</td>
      <td>${consumo.usuario.cedula}</td>
    </tr>
    <tr>
      <td style="font-weight:bold">Mesa</td>
      <td colspan="3">${consumo.mesa.nombre}</td>
    </tr>
    <tr>
      <td style="font-weight:bold">Fecha</td>
      <td colspan="3">${consumo.fechaCierre.toDateString()}</td>
    </tr>
  </table>
  <hr>
  <table style="width: 6in;font-size: 10px">
    <tr>
    <th>Producto</th>
    <th>Cantidad</th>
    <th>Total</th>
  </tr>
  ${consumo.detalle_consumos?.reduce((cadena, detalle) => {
    return (
      cadena +
      `<tr>
      <td>${detalle.producto.nombre}</td>
      <td style="text-align: center">${detalle.cantidad}</td>
      <td style="text-align: center">${
        detalle.cantidad * detalle.producto.precio
      } Gs.</td>
    </tr>`
    );
  }, '')}
  </table>
  <hr>
  <span style="font-size: 12px; font-weight: bold">Total: </span>
  <span style="font-size: 12px">${consumo.total}Gs.</span>
</div>`;
};
