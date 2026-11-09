import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DATA_BASE, {
  dialect: 'postgres',
  logging: false, // cambia a console.log para ver queries
  define: {
    underscored: true,   // created_at, updated_at en snake_case
    timestamps: false,   // tus tablas no tienen createdAt/updatedAt de Sequelize
  },
});