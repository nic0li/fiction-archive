"use strict";

module.exports = {
    async up(queryInterface) {
        const now = new Date();

        await queryInterface.bulkInsert("permissions", [
            {
                name: "Admin",
                created_at: now,
                updated_at: now,
            },
            {
                name: "Moderator",
                created_at: now,
                updated_at: now,
            },
            {
                name: "User",
                created_at: now,
                updated_at: now,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("permissions", {
            name: {
                [Sequelize.Op.in]: ["Admin", "Moderator", "User"],
            },
        });
    },
};