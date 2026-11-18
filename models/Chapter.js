module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define(
    "Chapter", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    initialNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    finalNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
  }, {
    tableName: "chapters",
    timestamps: true,
    underscored: true,
  }
  );

  Chapter.associate = (models) => {
    Chapter.belongsTo(models.Story, {
      foreignKey: "storyId",
    });
  };

  return Chapter;
};
