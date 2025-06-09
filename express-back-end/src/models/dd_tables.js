// import "sequelize/lib/model";

export default (sequelize, Sequelize) => {
  const DDTables = sequelize.define("dd_tables", {
    schema_name: {
      type: Sequelize.TEXT,
      primaryKey: true
    },
    table_name: {
      type: Sequelize.TEXT,
      primaryKey: true
    },
    description: {
      type: Sequelize.TEXT
    },
    data_type: {
      type: Sequelize.TEXT
    },
    validation_rules: {
      type: Sequelize.JSONB
    },
    relationships: {
      type: Sequelize.JSONB
    }
  },
    {
      timestamps: false,
    });

  return DDTables;
};

