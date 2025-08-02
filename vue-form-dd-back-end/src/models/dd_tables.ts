import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Sequelize, ModelStatic } from "sequelize";
import { Json } from "sequelize/lib/utils";


// Define an interface for the model's attributes
export interface DDTablesAttributes extends Model<InferAttributes<DDTablesAttributes>, InferCreationAttributes<DDTablesAttributes>> {
  schema_name: string; // Optional for creation, but required for instances
  table_name: string;
  description: string;
  data_type: string;
  validation_rules: Json;
  relationships: Json;
};

export function createDDTables(sequelize: Sequelize): ModelStatic<DDTablesAttributes> {
  const DDTables = sequelize.define<DDTablesAttributes>("dd_tables", {
      schema_name: {
        type: DataTypes.TEXT,
        primaryKey: true
      },
      table_name: {
        type: DataTypes.TEXT,
        primaryKey: true
      },
      description: {
        type: DataTypes.TEXT
      },
      data_type: {
        type: DataTypes.TEXT
      },
      validation_rules: {
        type: DataTypes.JSONB
      },
      relationships: {
        type: DataTypes.JSONB
      }
    },
    {
      timestamps: false,
    }
  );

  return DDTables;
}

// Define an interface for the model's attributes
export interface DDTableColumnsAttributes extends Model<InferAttributes<DDTableColumnsAttributes>, InferCreationAttributes<DDTableColumnsAttributes>> {
  schema_name: string; // Optional for creation, but required for instances
  table_name: string;
  column_name: string;
  description: string;
  data_type: string;
  col_length: number;
  value_domain: Json;
  validation_rules: Json;
  relationships: Json;
};

export function createDDTableColumns(sequelize: Sequelize): ModelStatic<DDTableColumnsAttributes> {
  const DDTableColumns = sequelize.define<DDTableColumnsAttributes>("dd_table_columns", {
      schema_name: {
        type: DataTypes.TEXT,
        primaryKey: true
      },
      table_name: {
        type: DataTypes.TEXT,
        primaryKey: true
      },
      column_name: {
        type: DataTypes.TEXT,
        primaryKey: true
      },
      description: {
        type: DataTypes.TEXT,
      },
      data_type: {
        type: DataTypes.TEXT,
      },
      col_length: {
        type: DataTypes.INTEGER,
      },
      value_domain: {
        type: DataTypes.JSONB
      },
      validation_rules: {
        type: DataTypes.JSONB
      },
      relationships: {
        type: DataTypes.JSONB
      },
    },
    {
      timestamps: false,
    }
  );
  return DDTableColumns;
}

