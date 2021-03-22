const express = require('express')
const Address = require('../database/models/Address')
const Band = require('../database/models/Band')
const Post = require('../database/models/Post')
const router = express.Router()
const User = require('../database/models/User')


//  /api/users/
router.get('/', async (req, res) => {
  try {
  const result = await User.findAll({
    include:[ 
      { 
        model: Address, 
        as: "domicilio", 
        attributes: ['street']
      },
      {
        model: Post, 
        as: "publicaciones",
        attributes: ['title', 'body'],
        // where: {
        //   title: 'foo'
        // }
      },
      {
        model: Band,
        attributes: ['name', 'type']
      }
  ],
    attributes: ['name', 'age', 'email']
  })
  res.json(result)
  } catch (error) {
    res.json(error)  
  }
})

router.get('/bandas', async (req, res) => {
   const result = await Band.findAll({
     include: [
       {
        model: User, 
        attributes: ['name', 'age', 'email'],
      }
      ],
     attributes: ['name', 'type']
   })
   res.json(result)
})

//Ver la direccione de usuario /api/users/:id/domicilio
router.get('/:id/domicilio', (req, res) => {
  User.findByPk(req.params.id).then(user => {
    user.getDomicilio().then(domicilio => {
      res.json(domicilio)
    })
  })
})
//Ver la publicaciones /api/users/:id/publicaciones
router.get('/:id/publicaciones', (req, res) => {
  User.findByPk(req.params.id).then(user => {
    user.getPublicaciones().then(publicaciones => {
      res.json(publicaciones)
    })
  })
})
//Ver las bandas de usuario /api/users/:id/bandas
router.get('/:id/bandas', (req, res) => {
  User.findByPk(req.params.id).then(user => {
    user.getBands({ attributes: ['name', 'type'] }).then(bands => {
      res.json(bands)
    })
  })
})

//CREATE /api/users
router.post('/', async (req, res) => {
  try {
  const {name, email, age, street} = req.body
  const result = await User.create({
    name: name,
    email: email,
    age: age,
    domicilio: {
      street: street
    }
  },{
    include: "domicilio"
  })
  res.json(result)
  } catch (error) {
    res.json(error.message)
  }
})

module.exports = router;