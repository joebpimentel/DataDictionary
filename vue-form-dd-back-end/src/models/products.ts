import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, Sequelize, ModelStatic } from "sequelize";

// Define an interface for the model's attributes
export interface ProductAttributes extends Model<InferAttributes<ProductAttributes>, InferCreationAttributes<ProductAttributes>> {
  id: CreationOptional<number>; // Optional for creation, but required for instances
  name: string;
  price: number;
  imageurl: string;
};

export function createProduct(sequelize: Sequelize): ModelStatic<ProductAttributes> {

  const Product = sequelize.define<ProductAttributes>("products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    imageurl: {
      type: DataTypes.STRING
    }
  },
    {
      timestamps: false,
    }
  );

  return Product;
}

