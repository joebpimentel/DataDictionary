import { Sequelize, QueryTypes, Dialect, OperatorsAliases, ModelStatic } from 'sequelize';

import { dbConfig } from '../config/db_config'
import { createProduct, ProductAttributes } from "./products";
import { createUser, UserAttributes } from "./users";
import { DDTablesAttributes, createDDTables, createDDTableColumns } from "./dd_tables"; 
// const dbConfig = require("../config/db_config.js");

// const Sequelize = require("sequelize");
// const { QueryTypes } = require('sequelize');
export function createSequelize(): Sequelize {

  const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect:  dbConfig.dialect as Dialect,
    // operatorsAliases: false,
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

  return sequelize;
}
interface IDb {
  sequelize: Sequelize,
  products: ModelStatic<ProductAttributes>,
  users: ModelStatic<UserAttributes>,
  dd_tables: ModelStatic<DDTablesAttributes>,
  dd_table_columns: ModelStatic<DDTablesAttributes>,
}

export class Db implements IDb {
  sequelize: Sequelize;
  products: ModelStatic<ProductAttributes>;
  users: ModelStatic<UserAttributes>;
  dd_tables: ModelStatic<DDTablesAttributes>;
  dd_table_columns: ModelStatic<DDTablesAttributes>;

  constructor() {
    this.sequelize = createSequelize();
    this.products = createProduct(this.sequelize);
    this.users = createUser(this.sequelize);
    this.dd_tables = createDDTables(this.sequelize);
    this.dd_table_columns = createDDTableColumns(this.sequelize);
  }
};
  
export const db: Db = new Db();


