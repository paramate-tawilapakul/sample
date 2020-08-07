exports.syncDB = async () => {
  const User = require('./models/User')
  await User.sync()
  console.log(
    '**********************The table for the User model was just created!'
  )
}

exports.dropAll = async () => {
  const sequelize = require('../config/db')
  await sequelize.drop()
  console.log('All tables dropped!')
}

exports.createCategory = async () => {
  const Category = require('../models/Category')
  await Category.bulkCreate([
    {
      name: 'food',
    },
    {
      name: 'travel',
    },
    {
      name: 'programming',
    },
  ])
}

exports.createTag = async () => {
  const Tag = require('../models/Tag')
  await Tag.bulkCreate([
    {
      name: 'beer',
    },
    {
      name: 'sushi',
    },
    {
      name: 'javascript',
    },
    {
      name: 'react.js',
    },
    {
      name: 'node.js',
    },
  ])
}

exports.createLike = async (postId) => {
  const PostLike = require('../models/PostLike')
  await PostLike.bulkCreate([
    {
      postId,
      userId: 1,
    },
    {
      postId,
      userId: 2,
    },
    {
      postId,
      userId: 3,
    },
  ])
}

exports.createComment = async (postId) => {
  const Comment = require('../models/Comment')
  await Comment.bulkCreate([
    {
      postId,
      userId: 1,
      content: 'Hello 1 comment post id 13',
    },
    {
      postId,
      userId: 2,
      content: 'Hello 2 comment post id 13',
    },
  ])
}
