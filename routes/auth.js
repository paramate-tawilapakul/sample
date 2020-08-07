const express = require('express')
const router = express.Router()
const Joi = require('joi')

//const auth = require('../middleware/auth')
const validateWith = require('../middleware/validation')
const { login } = require('../controllers/auth')

const schema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
}

// @route   POST api/auth
// @desc    Login a user
// @access  Public
router.post('/login', validateWith(schema), login)

module.exports = router
