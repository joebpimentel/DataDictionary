import cors from 'cors';
import express from 'express';

import { db } from './models'
import { query_database_schemas, query_table_json_schema } from "./tools/db_queries";
import { QueryTypes } from 'sequelize';

async function start() {

  // const cors = require('cors');
  // const express = require('express');
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173', // Permite apenas requisições do front-end
    // origin: 'http://localhost:8080', // Permite apenas requisições do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
  }));
  
  app.use(express.json());

//   app.use('/images', express.static(path.join(__dirname, '../assets')));
  
  // app.use(express.static(
  //   path.resolve(__dirname, '../dist'),
  //   { maxAge: '1y', etag: false},
  // ))

  // const db = require("./models");
  db.sequelize.sync();

  const Product = db.products;
  const User = db.users;
  const DDTables = db.dd_tables;
  const DDTableColumns = db.dd_table_columns;


  app.get('/api/get_db_schemas', async (req, res) => {
    let schema_x;
    const db_schemas_query = query_database_schemas();
    await db.sequelize.query(db_schemas_query, {
      type: QueryTypes.SELECT,
    })
      .then(data => {
        schema_x = data;
        res.send(schema_x);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving schemas."
        });
      });
  });

  app.get('/api/:schema/get_table_definitions', async (req, res) => {
    const schema = req.params.schema;
    const complex_query = query_table_json_schema(schema);
    await db.sequelize.query(complex_query, {
      type: QueryTypes.SELECT,
    })
    .then (data => {
      let complex_query_response = data;
      res.json(complex_query_response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving table definitions."
      });
    });
  });

  app.get('/api/get_dd_tables', async (req,res) => {
    let dd_tables_x;
    await DDTables.findAll({})
      .then(data => {
        dd_tables_x = data;
        res.send(dd_tables_x);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving dd_tables."
        });
      });
  });

  app.get('/api/get_dd_table/:schema_name/:table_name', async (req,res) => {
    const schema_name = req.params.schema_name;
    const table_name = req.params.table_name;
    console.log("Parametros schema_name: ", schema_name, ", table_name: ", table_name);
    let dd_tables_x;
    await DDTables.findOne({
      where: {
        schema_name: schema_name,
        table_name: table_name,
      },
    })
      .then(table => {
        console.log("Data: ", table);
        dd_tables_x = table;
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving dd_tables."
        });
      });

      let dd_table_columns_x;
      if (dd_tables_x) {
      await DDTableColumns.findAll({
        where: {
          schema_name: schema_name,
          table_name: table_name,
        },
      })
        .then(columns => {
          console.log("Columns: ", columns);
          dd_table_columns_x = columns;
        })
        .catch(err => {
            console.log("No columns on table: ", schema_name, ".", table_name);
            // res.status(500).send({
            // message:
            //   err.message || "Some error occurred while retrieving dd_tables."
        });
    }
    let table_definition = { 
      dd_tables_x,
      dd_table_columns_x
    }
    res.send(table_definition);
  });

  const port = process.env.PORT || 8081;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  });

}

console.log("Starting back_end_server")
start();