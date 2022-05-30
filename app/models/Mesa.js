import { DataTypes } from 'sequelize';

const makeMesaSchema = (sequelize) =>
  sequelize.define(
    'mesa',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: { type: DataTypes.STRING, length: 50 },
      restauranteId: {
        field: 'restaurante_id',
        type: DataTypes.BIGINT,
        references: null,
        required: true,
        allowNull: false,
      },
      posicion: { type: DataTypes.JSON },
      nroPiso: { type: DataTypes.INTEGER, defaultValue: 1 },
      capacidad: { type: DataTypes.INTEGER },
    },
    { underscored: true }
  );

export default makeMesaSchema;
