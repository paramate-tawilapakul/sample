const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

exports.signin = async (req, res) => {
  const User = require('../models/User')
  const { password } = req.body
  const loginEmail = req.body.email
  try {
    const user = await User.findOne({
      where: {
        email: loginEmail
      }
    })
    if (!user)
      return res.status(400).json({
        error: 'Email not found'
      })

    const {
      id,
      email,
      firstname,
      lastname,
      profilePic,
      hashPassword,
      updatedAt
    } = user

    bcrypt.compare(password, hashPassword, function (err, result) {
      if (!result)
        return res.status(400).json({
          error: 'Wrong password!'
        })

      const user = {
        id,
        email,
        firstname,
        lastname,
        profilePic,
        updatedAt
      }

      createJwt(user, res)
    })
  } catch (error) {
    console.log(error)
  }
}

async function createJwt(user, res) {
  jwt.sign(
    { user },
    config.get('JWT_SECRET'),
    { expiresIn: '24h' }, // "120ms", "2 days", "10h", "7d"
    (err, token) => {
      return res.json({
        token
      })
    }
  )
}
