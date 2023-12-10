module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      room_no: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      hotel_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLowercase: true,
        },
      },
      bed_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLowercase: true,
        },
      },
      room_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLowercase: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      booked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      image: DataTypes.TEXT,
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isLowercase: true,
        },
      },
      owner_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    { tableName: 'rooms' }
  )

  return Room
}
