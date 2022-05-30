import { DataTypes } from 'sequelize';

const makeRestauranteSchema = (sequelize) =>
  sequelize.define(
    'restaurante',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: { type: DataTypes.STRING, length: 50 },
      direccion: {
        type: DataTypes.STRING,
        length: 100,
      },
    },
    { underscored: true }
  );

export default makeRestauranteSchema;
