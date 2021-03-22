const User = require('./models/User')
const Address = require('./models/Address')
const Band = require('./models/Band')
const Post = require('./models/Post')
// Este archivo se llama asociaciones

// Uno a uno; hasOne
// añade un clave foranea userId a la tabla adresses
User.hasOne(Address, {
  as: "domicilio", foreignKey: "residente_id"
});

// Añade una clave userId a la tabla adresses
Address.belongsTo(User, {
  as: "residente", foreignKey: "residente_id"
});

// Uno a muchos o 1 a N : HasMany
// El Usuario va a tener muchos posts o publicaciones
// Se añade una clave userId a la tabla post
User.hasMany(Post, {as: "publicaciones", foreignKey: "autorId"});
// se añade una clave userID a la tabla posts
Post.belongsTo(User, {as: "autor"});


// N a N
// El usuario pertenezca a varias bandas
// Esto crea una nueva tabla en la base de datos llamada user_band
// Funciones magica : user.getBand user.addBand ...etc
User.belongsToMany(Band, {through: "user_band"})
Band.belongsToMany(User, {through: "user_band"})