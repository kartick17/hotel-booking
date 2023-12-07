module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    room_no: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    room_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    booking_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    checking_date: {
      type: DataTypes.DATEONLY,
    },
    checkout_date: {
      type: DataTypes.DATEONLY,
    },
  })

  return Room
}
