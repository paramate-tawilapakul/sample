const config = require('config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.get('DB_NAME'),
  config.get('DB_USERNAME'),
  config.get('DB_PASSWORD'),
  {
    host: config.get('DB_HOST'),
    dialect: config.get('DB_DIALECT'),
    timezone: 'Asia/Bangkok',
    dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
      timezone: 'Asia/Bangkok',
    },

    pool: {
      max: 30,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
  }
)

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.')
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err)
  })

module.exports = sequelize
