const bcrypt = require('bcrypt')
const saltRounds = 10

exports.signup = async (req, res) => {
  const { User } = require('../models')
  const { firstname, lastname, email, password } = req.body
  bcrypt.hash(password, saltRounds, async (err, hashPassword) => {
    try {
      const isEmailTaken = await User.findOne({
        where: {
          email
        }
      })
      if (isEmailTaken)
        return res.status(400).json({
          error: 'Email is already taken'
        })

      const user = await User.create({
        firstname,
        lastname,
        email,
        hashPassword
      })

      delete user.dataValues['hashPassword']
      delete user.dataValues['updatedAt']
      delete user.dataValues['createdAt']

      res.status(201).json({
        user
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error: 'Something went wrong'
      })
    }
  })
}
