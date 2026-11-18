"use strict";

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert("ratings", [
            {
                name: "General",
                created_at: now,
                updated_at: now,
            },
            {
                name: "Restrict",
                created_at: now,
                updated_at: now,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("ratings", {
            name: {
                [Sequelize.Op.in]: ["General", "Restrict"],
            },
        });
    },
};