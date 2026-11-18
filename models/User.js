module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
  );

  User.associate = (models) => {

    User.belongsToMany(models.Permission, {
      through: "user_permissions",
      foreignKey: "userId",
      otherKey: "permissionId",
    });

    User.belongsToMany(models.Story, {
      through: "user_stories",
      foreignKey: "userId",
      otherKey: "storyId",
    });

  };

  return User;
};
