module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: "permissions",
    timestamps: true,
    underscored: true,
  }
  );

  Permission.associate = (models) => {
    Permission.belongsToMany(models.User, {
      through: "user_permissions",
      foreignKey: "permissionId",
      otherKey: "userId",
    });
  };

  return Permission;
};