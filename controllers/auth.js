const bcrypt = require('bcrypt')
const formidable = require('formidable')
const path = require('path')
const fs = require('fs')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const config = require('config')

exports.login = async (req, res) => {
  const User = require('../models/User')
  const { password } = req.body
  const loginEmail = req.body.email
  try {
    const user = await User.findOne({
      where: {
        email: loginEmail,
      },
    })
    if (!user)
      return res.status(404).json({
        error: 'Authentication failed, email not found',
      })

    const {
      id,
      email,
      firstname,
      lastname,
      profilePic,
      hashPassword,
      updatedAt,
    } = user

    bcrypt.compare(password, hashPassword, function (err, result) {
      if (!result)
        return res.status(401).json({
          error: 'Authentication failed, wrong password',
        })

      const user = {
        id,
        email,
        firstname,
        lastname,
        profilePic,
        updatedAt,
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
        token,
      })
    }
  )
}
