const sequelize = require("./database/db");
const Post = require("./database/models/Post");
const User = require("./database/models/User");
const Address = require("./database/models/Address");
const Band = require("./database/models/Band");
require("./database");

// Usuarios
const users = [
  { name: "Anton", email: "azr@azr.es", age: 18, role: 0 },
  { name: "Pepe", email: "pepe@gmail.com", age: 38, role: 1 },
  { name: "Lucia", email: "lucia@hotmail.com", age: 88, role: 0 },
];

// Direcciones
const addresses = [
  { street: "Calle de la vida 2", residente_id: 1 },
  { street: "Debajo del puente s/n", residente_id: 2 },
  { street: "Isla de Tabarca, 5", residente_id: 3 },
];

// Entradas
const posts = [
  { title: "Foo", body: "Bar 1", autorId: 1 },
  { title: "Foo", body: "Bar 2", autorId: 1 },
  { title: "Title", body: "Bar 3", autorId: 1 },
  { title: "Yo que se", body: "Bar 4", autorId: 1 },
  { title: "Me da igual", body: "Bar 5", autorId: 2 },
  { title: "Todo", body: "Bar 6", autorId: 2 },
  { title: "Foo", body: "Bar 7", autorId: 3 },
];

const bands = [
  { name: "los picantes", type: "Death Metal" },
  { name: "caramelos de cianuro", types: "Rock pop" },
  { name: "JSON DEV", types: "Rock pop" },
];

sequelize
  .sync({ force: false })
  .then(() => {
    // Conexión establecida
    console.log("Conexión establecida...");
  })
  .then(async () => {
    // Rellenar usuarios
    let band1 = await Band.create({
      name: "Los Picateclas",
      type: "Death Metal",
    });
    let band2 = await Band.create({
      name: "Los Picateclas",
      type: "Death Metal",
    });

    users.forEach((users) => {
        User.create(users).then((user3) =>{
            user3.setBands([band1, band2])
        })
        
    });
  })
  .then(() => {
    // Rellenar direcciones
    addresses.forEach((addresses) => Address.create(addresses));
  })
  .then(() => {
    // Rellenar posts
    posts.forEach((posts) => Post.create(posts));
  })
//   .then(() => {
//     bands.forEach((band) => {
//       (async () => {
//         await Band.create({
//           name: band.name,
//           type: band.type,
//         });
//       })();
//     });
//   });

// .then(async () => {
//     // Rellenar tabla de Bandas
//     let band1 = await Band.create({
//         name: "Caramelos de cianuro",
//         type: "Rock Pop",
//         users: [
//             {name: "lucia", age: 88, email: "lucia@hotmail.com" },
//             {name: "Anton", age: 18, email: "azr@azr.es" }
//         ]
//     }, {
//         include: [User]
//     })

//     let user1 = await User.create({name: "Sergio", age: 38, email: "sergio@gmail.com"})
//     let user2 = await User.create({name: "Movistar", age: 44, email: "monica@kubo.co"})

//     let band2 = await Band.create({
//         name: "Los Picateclas",
//         type: "Death Metal"
//     })

//     //band2.addUser([user1, user2])
//     band2.addUser(user1)
//     band2.addUser(user2)

//     // let user3 = await User.create({name: "Paula", age: 26, email: "paula@gmail.com"})
//     // user3.setBands([band1, band2])

// });
