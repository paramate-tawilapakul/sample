require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'sample',
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    timezone: 'Asia/Bangkok',
    dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
      timezone: 'Asia/Bangkok'
    },

    pool: {
      max: 30,
      min: 5,
      acquire: 30000,
      idle: 10000
    },
    define: {
      underscored: true
    }
  }
)

const models = {
  // User: sequelize.import('./User'),
  User: require('./User')(sequelize, Sequelize.DataTypes)
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

//export default models
module.exports = models
