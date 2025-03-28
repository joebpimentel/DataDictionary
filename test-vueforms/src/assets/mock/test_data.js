

export const tables = [
    {
      "table_metadata": {
        "table_name": "products",
        "table_comment": "Tabela de Produtos",
        "columns": [
          {
            "column_name": "id",
            "data_type": "integer",
            "character_maximum_length": null,
            "is_nullable": "NO",
            "column_default": null,
            "user_defined_type": "int4",
            "column_comment": null,
            "constraints": {
              "constraint_type": "PRIMARY KEY",
              "constraint_name": "products_pkey"
            },
            "foreign_keys": {
              "foreign_key_name": null,
              "foreign_table_name": null,
              "foreign_column_name": null
            }
          },
          {
            "column_name": "name",
            "data_type": "character varying",
            "character_maximum_length": 50,
            "is_nullable": "NO",
            "column_default": null,
            "user_defined_type": "varchar",
            "column_comment": null,
            "constraints": {
              "constraint_type": "UNIQUE",
              "constraint_name": "name_unique"
            },
            "foreign_keys": {
              "foreign_key_name": null,
              "foreign_table_name": null,
              "foreign_column_name": null
            }
          },
          {
            "column_name": "price",
            "data_type": "numeric",
            "character_maximum_length": null,
            "is_nullable": "NO",
            "column_default": null,
            "user_defined_type": "numeric",
            "column_comment": "Preço do Produto",
            "constraints": {
              "constraint_type": null,
              "constraint_name": null
            },
            "foreign_keys": {
              "foreign_key_name": null,
              "foreign_table_name": null,
              "foreign_column_name": null
            }
          },
          {
            "column_name": "imageurl",
            "data_type": "text",
            "character_maximum_length": null,
            "is_nullable": "YES",
            "column_default": null,
            "user_defined_type": "text",
            "column_comment": null,
            "constraints": {
              "constraint_type": null,
              "constraint_name": null
            },
            "foreign_keys": {
              "foreign_key_name": null,
              "foreign_table_name": null,
              "foreign_column_name": null
            }
          }
        ]
      }
    },
    {
      "table_metadata": {
        "table_name": "users",
        "table_comment": "Tabela de usuários",
        "columns": [
          {
            "column_name": "id",
            "data_type": "text",
            "character_maximum_length": null,
            "is_nullable": "NO",
            "column_default": null,
            "user_defined_type": "text",
            "column_comment": null,
            "constraints": {
              "constraint_type": "PRIMARY KEY",
              "constraint_name": "users_pkey"
            },
            "foreign_keys": {
              "foreign_key_name": null,
              "foreign_table_name": null,
              "foreign_column_name": null
            }
          },
          {
            "column_name": "cartitems",
            "data_type": "ARRAY",
            "character_maximum_length": null,
            "is_nullable": "YES",
            "column_default": null,
            "user_defined_type": "_int4",
            "column_comment": null,
            "constraints": {
              "constraint_type": null,
              "constraint_name": null
            },
            "foreign_keys": {
              "foreign_key_name": null,
              "foreign_table_name": null,
              "foreign_column_name": null
            }
          }
        ]
      }
    }
  ];
  