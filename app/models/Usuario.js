import { DataTypes } from 'sequelize';

const makeUserSchema = (sequelize) =>
  sequelize.define(
    'usuario',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      cedula: {
        type: DataTypes.STRING,
        unique: true,
      },
      nombre: { type: DataTypes.STRING },
      apellido: { type: DataTypes.STRING },
    },
    { underscored: true }
  );
export default makeUserSchema;
