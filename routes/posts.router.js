const express = require('express')
const router = express.Router();
const Post = require('../database/models/Post');
const User = require('../database/models/User');

router.get('/', async (req, res) => {
  const result = await Post.findAll({
    include: {
      model: User,
      as: "autor",
      attributes: ['name']
    },
    attributes: ['title', 'body']
  })
  res.json(result)
})

// CREATE
router.post('/', async (req, res) => {
  const {title, body} = req.body
  const result = await Post.create({
    title: title,
    body: body
  })
  res.json(result)
})

// READ /api/posts
router.get('/:id', async (req, res) => {
  const {id} = req.params
  const result = await Post.findByPk(id);
  res.json(result)
})

// UPDATE
router.patch('/:id', async (req, res) => {
  try {
    const {id} = req.params;
  const {title, body} = req.body
  const result = await Post.update({
    title: title,
    body: body,
  }, {
    where: {
      id: id
    }
  })
  res.json(result)
  } catch (error) {
    res.json(error)
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  const result = await Post.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(result)
})

module.exports = router;