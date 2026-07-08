'use strict';

import { Sequelize } from 'sequelize';
import path from 'node:path';
import { UserModel } from './models/User.model';
import { ApplicationModel } from './models/Application.model';

export const sequelizeDB = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(import.meta.dirname, '../database/db.sqlite'),
  logging: false,
});

export const models = {
  UserModel,
  ApplicationModel,
};

Object.values(models).map((model) => {
    model.init(sequelizeDB);
    return model;
}).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate();
  }
});

export async function initializeDatabase() {
  try {
    await sequelizeDB.authenticate();
    console.log('Connection has been established successfully.');
    await sequelizeDB.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}