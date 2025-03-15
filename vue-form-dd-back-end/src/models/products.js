const { primaryKeyAttribute } = require("sequelize/lib/model");


module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.DECIMAL(10, 2)
    },
    imageurl: {
      type: Sequelize.TEXT
    }
  },
  {
    timestamps: false,
  });

  return Product;
};