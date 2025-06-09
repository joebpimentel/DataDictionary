

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
      id: {
        type: Sequelize.TEXT,
        primaryKey: true
      },
      cartitems: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      }
    },
    {
      timestamps: false,
    });

  User.sync();
  // User.sync( { force: true } ).then(() => {
  //   console.log("User table synchronized");
  // }).catch(() => {
  //   console.log("Error synchronizing User table");
  // })
  return User;
};