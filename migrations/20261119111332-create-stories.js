"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("stories", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            rating_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "ratings",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },
            directory: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            cover: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            synopsis: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            is_completed: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            is_interactive: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false,
            },
            is_visible: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("stories");
    },
};