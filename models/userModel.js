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
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.BIGINT(20),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
      },
    },
    { tableName: 'users' }
  )
  return User
}
