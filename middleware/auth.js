require('dotenv').config()
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  // Get token from header
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1]
    //console.log(token)
    // Check if not token
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Access denied. No token provided.' })
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //console.log(decoded)

      req.user = decoded.user
      next()
    } catch (error) {
      console.log(error.message)
      res.status(400).json({ error: 'Invalid token.' })
    }
  } else {
    res.status(400).json({ error: 'Invalid token.' })
  }
}
