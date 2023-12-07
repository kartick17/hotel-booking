module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
    },
    { tableName: 'users' }
  )
  return User
}
