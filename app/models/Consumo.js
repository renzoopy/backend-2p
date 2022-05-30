import { DataTypes } from 'sequelize';
export const ESTADOS_CONSUMO = {
  ABIERTA: 'abierta',
  CERRADA: 'cerrada',
};
const makeConsumoSchema = (sequelize) =>
  sequelize.define(
    'consumo',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      estado: { type: DataTypes.STRING, length: 10 },
      fechaCierre: { type: DataTypes.DATE },
      total: { type: DataTypes.BIGINT, default: 0 },
      mesaId: {
        field: 'mesa_id',
        type: DataTypes.BIGINT,
        references: null,
        required: true,
        allowNull: false,
      },
      usuarioId: {
        field: 'usuario_id',
        type: DataTypes.BIGINT,
        references: null,
        required: true,
        allowNull: false,
      },
    },
    { underscored: true }
  );

export default makeConsumoSchema;
