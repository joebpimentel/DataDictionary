import express from "express";
import path from 'path';

async function start() {

  const app = express();
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

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  });

}

console.log("Starting back_end_server")
start();