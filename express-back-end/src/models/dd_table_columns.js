// import "sequelize/lib/model";

export default (sequelize, Sequelize) => {
    const DDTableColumns = sequelize.define("dd_table_columns", {
        schema_name: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        table_name: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        column_name: {
            type: Sequelize.TEXT,
            primaryKey: true
        },
        description: {
            type: Sequelize.TEXT,
        },
        data_type: {
            type: Sequelize.TEXT,
        },
        col_length: {
            type: Sequelize.INTEGER,
        },
        value_domain: {
            type: Sequelize.JSONB
        },
        validation_rules: {
            type: Sequelize.JSONB
        },
        relationships: {
            type: Sequelize.JSONB
        },
    },
        {
            timestamps: false,
        });

    return DDTableColumns;
};
  /*
      schema_name character varying COLLATE pg_catalog."default" NOT NULL,
      table_name character varying COLLATE pg_catalog."default" NOT NULL,
      description character varying COLLATE pg_catalog."default",
      data_type character varying COLLATE pg_catalog."default",
      validation_rules json,
      relationships json,
      CONSTRAINT dd_tables_pkey PRIMARY KEY (schema_name, table_name)
  
  */