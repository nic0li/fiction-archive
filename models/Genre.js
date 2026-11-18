module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre", {
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
    tableName: "genres",
    timestamps: true,
    underscored: true,
  }
  );

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Story, {
      through: "story_genres",
      foreignKey: "genreId",
      otherKey: "storyId",
    });
  };

  return Genre;
};
