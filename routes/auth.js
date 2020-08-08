const express = require('express')
const router = express.Router()
const Joi = require('joi')

//const auth = require('../middleware/auth')
const validateWith = require('../middleware/validation')
const { signin } = require('../controllers/auth')

const loginSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5)
}

// @route   POST api/auth
// @desc    Login a user
// @access  Public
router.post('/signin', validateWith(loginSchema), signin)

module.exports = router
