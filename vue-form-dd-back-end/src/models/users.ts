import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, ModelStatic, Sequelize } from "sequelize";

// Define an interface for the model's attributes
export interface UserAttributes extends Model<InferAttributes<UserAttributes>, InferCreationAttributes<UserAttributes>> {
  id: CreationOptional<string>; // Optional for creation, but required for instances
  cartitems: Array<number>;
};

export function createUser(sequelize: Sequelize): ModelStatic<UserAttributes> {

  const User = sequelize.define<UserAttributes>("users", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    cartitems: {
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
  },
    {
      timestamps: false,
    }
  );
  
  return User;
}

// User.sync( { force: true } ).then(() => {
//   console.log("User table synchronized");
// }).catch(() => {
//   console.log("Error synchronizing User table");
// })