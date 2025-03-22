import express from "express";
import path from 'path';

function assembly_complex_query() {
  const complex_query = `
  SELECT
    -- Informações da tabela
    c.table_name,
    pgd_table.description AS table_comment,

    -- Informações gerais da coluna
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.is_nullable,
    c.column_default,
    c.udt_name AS user_defined_type,

    -- Comentários da coluna
    pgd_column.description AS column_comment,

    -- Informações de constraints (chaves primárias, CHECK, etc.)
    pk.constraint_type AS primary_key_constraint,
    pk.constraint_name AS primary_key_name,
    chk.constraint_type AS check_constraint,
    chk.constraint_name AS check_name,
    chk.check_clause -- Cláusula CHECK

    -- Informações de índices
    -- ic.indexname AS index_name,
    -- ic.indexdef AS index_definition

FROM
    information_schema.columns c
    LEFT JOIN pg_catalog.pg_statio_all_tables st ON c.table_schema = st.schemaname AND c.table_name = st.relname
    LEFT JOIN pg_catalog.pg_description pgd_column ON pgd_column.objoid = st.relid AND pgd_column.objsubid = c.ordinal_position
    LEFT JOIN pg_catalog.pg_description pgd_table ON pgd_table.objoid = st.relid AND pgd_table.objsubid = 0 -- Comentário da tabela (objsubid = 0)
    -- LEFT JOIN pg_catalog.pg_indexes ic ON c.table_name = ic.tablename AND c.table_schema = ic.schemaname

    -- Subconsulta para PRIMARY KEY
    LEFT JOIN (
        SELECT
            kcu.table_schema,
            kcu.table_name,
            kcu.column_name,
            tc.constraint_type,
            tc.constraint_name
        FROM
            information_schema.key_column_usage kcu
            JOIN information_schema.table_constraints tc ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema
        WHERE
            tc.constraint_type = 'PRIMARY KEY'
    ) pk ON c.table_schema = pk.table_schema AND c.table_name = pk.table_name AND c.column_name = pk.column_name

    -- Subconsulta para CHECK constraints
    LEFT JOIN (
        SELECT
            tc.table_schema,
            tc.table_name,
            ccu.column_name,
            tc.constraint_type,
            tc.constraint_name,
            chk.check_clause
        FROM
            information_schema.table_constraints tc
            JOIN information_schema.check_constraints chk ON tc.constraint_name = chk.constraint_name AND tc.table_schema = chk.constraint_schema
            JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name AND tc.table_schema = ccu.table_schema
        WHERE
            tc.constraint_type = 'CHECK'
    ) chk ON c.table_schema = chk.table_schema AND c.table_name = chk.table_name AND c.column_name = chk.column_name

WHERE
    c.table_schema = 'public' -- Esquema da tabela
    AND c.table_name = 'products' -- Nome da tabela
ORDER BY
    c.ordinal_position;
`;

return complex_query;
}

function assembly_complex_query_json() {
  const complex_query = `
SELECT
    json_build_object(
        'table_name', c.table_name,
        'table_comment', pgd_table.description,
        'columns', json_agg(
            json_build_object(
                'column_name', c.column_name,
                'data_type', c.data_type,
                'character_maximum_length', c.character_maximum_length,
                'is_nullable', c.is_nullable,
                'column_default', c.column_default,
                'user_defined_type', c.udt_name,
                'column_comment', pgd_column.description,
                'constraints', json_build_object(
                    'constraint_type', tc.constraint_type,
                    'constraint_name', kcu.constraint_name
                ),
                /* 'indexes', json_build_object(
                    'index_name', ic.indexname,
                    'index_definition', ic.indexdef
                ), */
                'foreign_keys', json_build_object(
                    'foreign_key_name', fk.constraint_name,
                    'foreign_table_name', fk.foreign_table_name,
                    'foreign_column_name', fk.foreign_column_name
                )
            )
        )
    ) AS table_metadata
FROM
    information_schema.columns c
    LEFT JOIN pg_catalog.pg_statio_all_tables st ON c.table_schema = st.schemaname AND c.table_name = st.relname
    LEFT JOIN pg_catalog.pg_description pgd_column ON pgd_column.objoid = st.relid AND pgd_column.objsubid = c.ordinal_position
    LEFT JOIN pg_catalog.pg_description pgd_table ON pgd_table.objoid = st.relid AND pgd_table.objsubid = 0 -- Comentário da tabela (objsubid = 0)
    LEFT JOIN information_schema.key_column_usage kcu ON c.table_schema = kcu.table_schema AND c.table_name = kcu.table_name AND c.column_name = kcu.column_name
    LEFT JOIN information_schema.table_constraints tc ON kcu.constraint_name = tc.constraint_name AND kcu.table_schema = tc.table_schema
    -- LEFT JOIN pg_catalog.pg_indexes ic ON c.table_name = ic.tablename AND c.table_schema = ic.schemaname
    LEFT JOIN (
        SELECT
            tc.constraint_name,
            ccu.table_name AS foreign_table_name,
            ccu.column_name AS foreign_column_name
        FROM
            information_schema.table_constraints tc
            JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
        WHERE
            tc.constraint_type = 'FOREIGN KEY'
    ) fk ON c.table_name = fk.foreign_table_name AND c.column_name = fk.foreign_column_name
WHERE
    c.table_schema = 'public' -- Substitua pelo nome do esquema
    AND c.table_name IN ('products', 'users') -- Lista das tabelas desejadas
GROUP BY
    c.table_name, pgd_table.description
ORDER BY
    c.table_name;
`;

return complex_query;
}

async function start() {

  const cors = require('cors');
  const express = require('express');
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173', // Permite apenas requisições do front-end
    // origin: 'http://localhost:8080', // Permite apenas requisições do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Headers permitidos
  }));
  
  app.use(express.json());

//   app.use('/images', express.static(path.join(__dirname, '../assets')));
  
//   app.use(express.static(
//     path.resolve(__dirname, '../dist'),
//     { maxAge: '1y', etag: false},
//   ))

  const db = require("./models");
  db.sequelize.sync();

  const Product = db.products;
  const User = db.users;

//   async function populateCartIds(ids) {
//     const Product = db.products;
//     return Promise.all(ids.map(productId => Product.findOne({ where: { id: productId } })));
//   };

  app.get('/api/products', async (req, res) => {
    let products_x;
    await Product.findAll({})
      .then(data => {
        products_x = data;
        res.send(products_x);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cart items."
        });
      });
  });

  app.get('/api/complex_query', async (req, res) => {
    const complex_query = assembly_complex_query_json();
    await db.sequelize.query(complex_query, {
      type: db.QueryTypes.SELECT,
    })
    .then (data => {
      let complex_query_response = data;
      res.json(complex_query_response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cart items."
      });
    });
  });

//   app.get('/api/products', async (req, res) => {
//     // var condition = id ? { id: { [Op.equals]: `%${title}%` } } : null;
//     let products_x;
//     await Product.findAll({})
//       .then(data => {
//         products_x = data;
//         res.send(products_x);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving cart items."
//         });
//       });
//   });

//   app.get('/api/users/:userId/cart', async (req, res) => {
//     const user = await User.findOne({ where: { id: req.params.userId } });
//     if (user) {
//       const populatedCart = await populateCartIds(user?.cartitems || []);
//       console.log("Before get user cart: ", populatedCart);
//       res.json(populatedCart);
//     } else {
//       res.json({});
//     }
//   });

//   app.get('/api/products/:productId', async (req, res) => {
//     const productId = req.params.productId;
//     const product = await Product.findOne({ where: { id: productId } });
//     console.log("Before get product: ", productId);
//     res.json(product);
//   });

//   app.post('/api/users/:userId/cart', async (req, res) => {
//     const userId = req.params.userId;
//     const productId = req.body.id;

//     let user = await User.findOne({ where: { id: req.params.userId } });
//     if (user == null) {
//       console.log("User does not exists, creating");
//       user = User.build({ id: userId, cartitems: [] });
//       console.log("User created: ", user);
//     } 
//     // console.log("Before add cart items: ", user );
//     if (!user.cartitems.includes(productId)) {
//       user.cartitems.push(productId);
//       user.changed('cartitems', true);
//       await user.save();
//       // console.log("After add cart items: ", user);
//     }
//     user = await User.findOne({ where: { id: req.params.userId } });
//     const populatedCart = await populateCartIds(user?.cartitems || []);
//     res.json(populatedCart);
//   });

//   app.delete('/api/users/:userId/cart/:productId', async (req, res) => {
//     const userId = req.params.userId;
//     const productId = parseInt(req.params.productId);
//     let user = await User.findOne({ where: { id: req.params.userId } });
//     const removable_index = user ? user.cartitems.indexOf(productId) : -1;
//     console.log("Before delete cart items: ", user?.cartitems || []);
//     console.log("Asked to remove:", productId);
//     console.log("Before delete removable index: ", removable_index);
//     if (removable_index >= 0) {
//       user?.cartitems.splice(removable_index, 1) || [].splice(removable_index, 1);
//       console.log("Removed: ", user?.cartitems || []);
//       user.changed('cartitems', true);
//     }
//     await user.save({ fields: ['cartitems'] });
//     user = await User.findOne({ where: { id: req.params.userId } });
//     const populatedCart = await populateCartIds(user?.cartitems || []);
//     res.json(populatedCart);
//   });

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../dist/index.html'));
//   })

  const port = process.env.PORT || 8080;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  });

}

console.log("Starting back_end_server")
start();