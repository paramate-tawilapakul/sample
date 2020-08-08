const express = require('express')
const router = express.Router()
const Joi = require('joi')

//const auth = require('../middleware/auth')
const validateWith = require('../middleware/validation')
const { signup } = require('../controllers/signup')

const signupSchema = {
  firstname: Joi.string().required().max(50),
  lastname: Joi.string().required().max(50),
  email: Joi.string().email().required().max(50),
  password: Joi.string().required().min(5)
}

// @route   POST api/users/signup
// @desc    Signup
// @access  Public
router.post('/signup', validateWith(signupSchema), signup)

module.exports = router
