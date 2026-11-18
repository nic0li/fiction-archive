"use strict";

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert("genres", [
            {
                name: "Drama",
                created_at: now,
                updated_at: now,
            },
            {
                name: "Romance",
                created_at: now,
                updated_at: now,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("genres", {
            name: {
                [Sequelize.Op.in]: ["Drama", "Romance"],
            },
        });
    },
};