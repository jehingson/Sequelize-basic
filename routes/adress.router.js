const express = require('express')
const Address = require('../database/models/Address')
const User = require('../database/models/User')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
  const result = await Address.findAll({
    include: {
      model: User,
      as: "residente",
      attributes: ['name', 'age']
    },
    attributes: ['street']
  })
  res.json(result)
  } catch (error) {
    res.json(error)  
  }
})


module.exports = router;