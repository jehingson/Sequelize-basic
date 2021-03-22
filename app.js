const express = require('express')
const app = express()
const sequelize = require('./database/db');
require('./database')

//setting
const PORT = process.env.PORT || 3000;

//middleware
// para poder rellenar el req.body
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Rutas
app.get('/', async (req, res) => {
  res.send('HOLA MUNDO')
})

app.use('/api/users', require('./routes/users.router'))
app.use('/api/posts', require('./routes/posts.router'))
app.use('/api/address', require('./routes/adress.router'))

// 
app.listen(PORT, async function(){
  console.log(`Is connection in port ${PORT}`)
  //conctarse a la base de datos
  try {
    //Force true: DROP TABLES
    await sequelize.sync({force: false});
    console.log('Connection in exit a sequealize.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})