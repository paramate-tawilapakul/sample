const express = require('express')
const helmet = require('helmet')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const momentTimezone = require('moment-timezone')
const compression = require('compression')
//const config = require('config')
// const db = require('./config/db')

// const { syncDB } = require('./dbTest')
// syncDB()

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(compression())

morgan.token('date', (req, res, tz) => {
  return momentTimezone().tz('Asia/Bangkok').format('DD/MM/YYYY HH:mm:ss')
})
morgan.format(
  'myformat',
  '[:date[Asia/Bangkok]] ":method :url" :status - :response-time ms'
)
app.use(morgan('myformat'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.raw({ limit: '5mb' }))
app.use(bodyParser.json({ limit: '100kb' }))

// Define Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/data', require('./routes/data'))

const PORT = 5000

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )

  app.listen(PORT, () =>
    console.log(`Production Server started on port ${PORT}`)
  )
} else {
  if (process.env.SERVER_TYPE === 'dev_test') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
  }
  app.listen(PORT, () =>
    console.log(`Development Server started on port ${PORT}`)
  )
}
