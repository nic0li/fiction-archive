"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();

        const users = await queryInterface.sequelize.query(
            "SELECT id, username FROM users",
            {
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        const permissions = await queryInterface.sequelize.query(
            "SELECT id, name FROM permissions",
            {
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        const userIds = Object.fromEntries(
            users.map(user => [user.username, user.id])
        );

        const permissionIds = Object.fromEntries(
            permissions.map(permission => [permission.name, permission.id])
        );

        const assignments = [
            ["nicoli", "Admin"],
            ["nico", "Admin"],
            ["bev", "Moderator"],
            ["richie", "Moderator"],
            ["eddie", "Moderator"],
            ["stan", "Moderator"],
            ["mike", "Moderator"],
            ["ben", "Moderator"],
            ["bill", "Moderator"],
        ];

        const rows = assignments.map(([username, permission]) => {
            const userId = userIds[username];
            const permissionId = permissionIds[permission];

            if (!userId || !permissionId) {
                throw new Error(
                    `Usuário ou permissão não encontrado: ${username} / ${permission}`
                );
            }

            return {
                user_id: userId,
                permission_id: permissionId,
                created_at: now,
                updated_at: now,
            };
        });

        await queryInterface.bulkInsert("user_permissions", rows);
    },

    async down(queryInterface, Sequelize) {
        const users = await queryInterface.sequelize.query(
            "SELECT id, username FROM users",
            {
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        const permissions = await queryInterface.sequelize.query(
            "SELECT id, name FROM permissions",
            {
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        const userIds = Object.fromEntries(
            users.map(user => [user.username, user.id])
        );

        const permissionIds = Object.fromEntries(
            permissions.map(permission => [permission.name, permission.id])
        );

        const assignments = [
            ["nicoli", "Admin"],
            ["nico", "Admin"],
            ["bev", "Moderator"],
            ["richie", "Moderator"],
            ["eddie", "Moderator"],
            ["stan", "Moderator"],
            ["mike", "Moderator"],
            ["ben", "Moderator"],
            ["bill", "Moderator"],
        ];

        const conditions = assignments
            .filter(([username, permission]) =>
                userIds[username] && permissionIds[permission]
            )
            .map(([username, permission]) => ({
                user_id: userIds[username],
                permission_id: permissionIds[permission],
            }));

        if (conditions.length > 0) {
            await queryInterface.bulkDelete(
                "user_permissions",
                {
                    [Sequelize.Op.or]: conditions,
                }
            );
        }
    },
};