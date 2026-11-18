module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "Story", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ratingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    directory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isInteractive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: "stories",
    timestamps: true,
    underscored: true,
  }
  );

  Story.associate = (models) => {

    Story.belongsToMany(models.User, {
      through: "user_stories",
      foreignKey: "storyId",
      otherKey: "userId",
    });

    Story.belongsToMany(models.Genre, {
      through: "story_genres",
      foreignKey: "storyId",
      otherKey: "genreId",
    });

    Story.belongsToMany(models.Category, {
      through: "StoryCategory",
      foreignKey: "storyId",
      otherKey: "categoryId",
    });

    Story.belongsTo(models.Rating, {
      foreignKey: "ratingId",
    });

    Story.hasMany(models.Chapter, {
      foreignKey: "storyId",
    });

  };

  return Story;
};
