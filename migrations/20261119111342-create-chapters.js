"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("chapters", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            story_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "stories",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            initial_notes: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            final_notes: {
                type: Sequelize.TEXT,
                allowNull: true,
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
        await queryInterface.dropTable("chapters");
    },
};