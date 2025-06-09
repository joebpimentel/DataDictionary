import dbConfig from "../config/db_config.js";
import Sequelize from 'sequelize';
import { QueryTypes } from 'sequelize';
import products from "./products.js" ;
import users from "./users.js";
import dd_tables from "./dd_tables.js";
import dd_table_columns from "./dd_table_columns.js";

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

export const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    QueryTypes: QueryTypes,
    products: products(sequelize, Sequelize),
    users: users(sequelize, Sequelize),
    dd_tables: dd_tables(sequelize, Sequelize),
    dd_table_columns: dd_table_columns(sequelize, Sequelize),
}

export default {
  db,
}