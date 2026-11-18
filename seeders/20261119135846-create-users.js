"use strict";

const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface) {
        const now = new Date();
        const passwordHash = await bcrypt.hash("123", 10);

        await queryInterface.bulkInsert("users", [
            {
                username: "nicoli",
                email: "nicoli@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "nico",
                email: "nico@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "bev",
                email: "bev@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "richie",
                email: "richie@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "eddie",
                email: "eddie@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "stan",
                email: "stan@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "mike",
                email: "mike@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "ben",
                email: "ben@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
            {
                username: "bill",
                email: "bill@email.com",
                password: passwordHash,
                created_at: now,
                updated_at: now,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("users", {
            username: {
                [Sequelize.Op.in]: [
                    "nicoli",
                    "nico",
                    "bev",
                    "richie",
                    "eddie",
                    "stan",
                    "mike",
                    "ben",
                    "bill",
                ],
            },
        });
    },
};