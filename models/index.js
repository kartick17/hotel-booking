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

db.User = require('./userModel')(sequelize, DataTypes)
db.Room = require('./roomModel')(sequelize, DataTypes)
db.Booking = require('./bookingModel')(sequelize, DataTypes)

db.User.hasMany(db.Room, {
  foreignKey: 'owner_id',
})
db.Room.belongsTo(db.User, {
  foreignKey: 'owner_id',
})

db.Room.hasOne(db.Booking,{
  foreignKey:'room_id',
})

db.Booking.belongsTo(db.Room, {
  foreignKey: 'room_id',
})

db.sequelize.sync({ force: false })

module.exports = db
