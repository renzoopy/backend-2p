import { DataTypes } from 'sequelize';

const makeDetalleConsumoSchema = (sequelize) =>
  sequelize.define(
    'detalle_consumo',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      productoId: {
        field: 'producto_id',
        type: DataTypes.BIGINT,
        references: null,
        required: true,
        allowNull: false,
      },
      cantidad: { type: DataTypes.INTEGER },
    },
    { underscored: true }
  );

export default makeDetalleConsumoSchema;
