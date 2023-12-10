module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      user_id: {
        type: DataTypes.INTEGER(10),
        allownull: false,
      },
      room_id: {
        type: DataTypes.INTEGER(10),
        allownull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      mobile_No: {
        type: DataTypes.INTEGER(20),
        allownull: false,
        validate: {
          min: 10,
          max: 10,
        },
      },
      email: {
        type: DataTypes.STRING,
        allownull: false,
        validate: {
          isEmail: true,
        },
      },
      checkin_date: {
        type: DataTypes.DATEONLY,
        allownull: false,
      },
      checkout_date: {
        type: DataTypes.DATEONLY,
        allownull: false,
      },
      price: {
        type: DataTypes.INTEGER(10),
        allownull: false,
      },
      payment_successful: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { tableName: 'bookings' }
  )
  return Booking
}
