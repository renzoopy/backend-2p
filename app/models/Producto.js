import { DataTypes } from 'sequelize';

const makeProductoSchema = (sequelize) =>
  sequelize.define(
    'producto',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      categoriumId: {
        field: 'categoria_id',
        type: DataTypes.BIGINT,
        references: null,
        required: true,
        allowNull: false,
      },
      nombre: { type: DataTypes.STRING, length: 100 },
      precio: { type: DataTypes.INTEGER },
    },
    { underscored: true }
  );
export default makeProductoSchema;
