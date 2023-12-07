const { Sequelize, DataTypes } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    logging: false,
    dialect:
      'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
)

sequelize.authenticate().then(() => {
  console.log('Database connection successful')
})

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.user = require('./userModel')(sequelize, DataTypes)

db.sequelize.sync()

module.exports = db
