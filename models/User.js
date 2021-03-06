module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    hashPassword: {
      type: DataTypes.STRING(100),
      field: 'hash_password',
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      field: 'email',
      unique: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(50),
      field: 'firstname'
    },
    lastname: {
      type: DataTypes.STRING(50),
      field: 'lastname'
    },
    profilePic: {
      type: DataTypes.STRING(100),
      field: 'profile_pic',
      defaultValue: ''
    }
  })

  // User.associate = models => {
  //   User.belongsToMany(models.Team, {
  //     through: 'member',
  //     foreignKey: {
  //       name: 'userId',
  //       field: 'user_id'
  //     }
  //   })
  //   // N:M
  //   User.belongsToMany(models.Channel, {
  //     through: 'channel_member',
  //     foreignKey: {
  //       name: 'userId',
  //       field: 'user_id'
  //     }
  //   })
  // }

  return User
}
