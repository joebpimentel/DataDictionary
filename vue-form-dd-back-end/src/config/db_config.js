module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "post.gres",
  DB: "full_stack_vue",
  // HOST: "ep-lingering-cake-a58kfg3d-pooler.us-east-2.aws.neon.tech",
  // USER: "neondb_owner",
  // PASSWORD: "npg_I1nqvSp6yBmo",
  // DB: "neondb",

  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  }
};
