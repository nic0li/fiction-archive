module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating", {
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
    tableName: "ratings",
    timestamps: true,
    underscored: true,
  }
  );

  Rating.associate = (models) => {
    Rating.hasMany(models.Story, {
      foreignKey: "ratingId",
    });
  };

  return Rating;
};
