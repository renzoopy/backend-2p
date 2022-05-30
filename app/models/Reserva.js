import { DataTypes } from 'sequelize';

const makeReservaSchema = (sequelize) =>
  sequelize.define(
    'reserva',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
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
      fecha: { type: DataTypes.DATEONLY },
      horaDesde: {
        type: DataTypes.SMALLINT,
      },
      horaHasta: {
        type: DataTypes.SMALLINT,
      },
    },
    { underscored: true }
  );
export default makeReservaSchema;
