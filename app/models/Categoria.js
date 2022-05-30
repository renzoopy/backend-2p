import { DataTypes } from 'sequelize';

const makeCategoriaSchema = (sequelize) =>
  sequelize.define(
    'categoria',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: { type: DataTypes.STRING, length: 50 },
    },
    { underscored: true }
  );

export default makeCategoriaSchema;
