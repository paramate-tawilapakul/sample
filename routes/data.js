const express = require('express')
const router = express.Router()

//const auth = require('../middleware/auth')
const { getDummyData } = require('../controllers/data')

// @route   GET api/data/dummy/id
// @desc    Get one data
// @access  Public
router.get('/dummy/:id', getDummyData)

// @route   GET api/data/dummy
// @desc    Get many data
// @access  Public
router.get('/dummy', getDummyData)

module.exports = router
