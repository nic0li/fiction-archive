"use strict";

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert("categories", [
            {
                name: "Original",
                created_at: now,
                updated_at: now,
            },
            {
                name: "Fanfic",
                created_at: now,
                updated_at: now,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("categories", {
            name: {
                [Sequelize.Op.in]: ["Original", "Fanfic"],
            },
        });
    },
};