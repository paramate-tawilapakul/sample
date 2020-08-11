const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const helmet = require('helmet')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const momentTimezone = require('moment-timezone')
const compression = require('compression')
//const config = require('config')
//const models = require('./models')
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
} else {
  if (process.env.SERVER_TYPE === 'dev_test') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
  }
}

const server = http.createServer(app)

const io = socketIo(server)
const clentArr = []

io.on('connection', socket => {
  console.log('New client connected', socket.id)
  clentArr.push(socket.id)
  console.log(clentArr)

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id)
    // remove id if disconnected
    clentArr.splice(clentArr.indexOf(socket.id), 1)
  })

  socket.on('FromAPI', msg => {
    //console.log('FromAPI', msg, socket.id)
    //io.to(clentArr[0]).emit('FromAPI', msg)
    controllerSocket(io, msg, clentArr[0])
  })

  // socket.emit('FromAPI', () => {
  //   io.to(clentArr[1]).emit('FromAPI', 'Hello from node.js')
  // })
})

function controllerSocket(io, { msg, user, socketId }, id) {
  io.to(id).emit('FromAPI', msg)
}

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// models.sequelize
//   .sync({ force: true })
//   .then(() =>
//     server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
//   )
