module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category", {
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
    tableName: "categories",
    timestamps: true,
    underscored: true,
  }
  );

  Category.associate = (models) => {
    Category.belongsToMany(models.Story, {
      through: "story_categories",
      foreignKey: "categoryId",
      otherKey: "storyId",
    });
  };

  return Category;
};
