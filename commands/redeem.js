const { PermissionsBitField } = require("discord.js");
const { db } = require("../data");
const {
    usedKeyEmbed,
    noKeyEmbed,
    noPermissionEmbed,
    successEmbed,
    redeemMessageEmbed,
    errorEmbed,
    noRoleEmbed,
    invalidKeyEmbed
} = require("../embeds/redeemEmbed");

// ฟังก์ชันสำหรับใช้ db.get แบบ Promise
function getAsync(query, params) {
    return new Promise((resolve, reject) => {
        db.get(query, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

// ฟังก์ชันสำหรับใช้ db.run แบบ Promise
function runAsync(query, params) {
    return new Promise((resolve, reject) => {
        db.run(query, params, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    data: {
        name: "redeem",
    },
    execute: async (message, args) => {
        if (args.length < 1) {
            const embed = noKeyEmbed(message);
            return message.channel.send({ embeds: [embed] });
        }

        const redeemKey = args[1]?.trim();

        try {
            // ค้นหาคีย์ในฐานข้อมูล
            const row = await getAsync("SELECT * FROM keys WHERE key = ?", [redeemKey]);

            if (!row) {
                const embed = invalidKeyEmbed(message);
                return message.channel.send({ embeds: [embed] });
            }

            if (row.isUsed) {
                const embed = usedKeyEmbed(message);
                return message.channel.send({ embeds: [embed] });
            }

            // อัพเดตสถานะคีย์
            await runAsync("UPDATE keys SET isUsed = ? WHERE key = ?", [true, redeemKey]);

            // มอบ role ให้กับผู้ใช้
            const roleID = process.env.ROLE_ID;
            const member = message.guild.members.cache.get(message.author.id);

            if (member) {
                try {
                    const role = message.guild.roles.cache.get(roleID);
                    if (role) {
                        const botMember = message.guild.members.cache.get(message.client.user.id);
                        if (botMember.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
                            try {
                                await member.roles.add(role);
                                const embed = successEmbed(message, redeemKey, role);
                                const embedRedeem = redeemMessageEmbed(message, redeemKey);
                                message.channel.send({ embeds: [embed] });
                                message.channel.send({ embeds: [embedRedeem] });
                            } catch (error) {
                                console.error(error);
                                const embed = errorEmbed(message);
                                message.channel.send({ embeds: [embed] });
                            }
                        } else {
                            const embed = noPermissionEmbed(message);
                            message.channel.send({ embeds: [embed] });
                        }
                    } else {
                        const embed = noRoleEmbed(message);
                        message.channel.send({ embeds: [embed] });
                    }
                } catch (error) {
                    console.error(error);
                    const embed = errorEmbed(message);
                    message.channel.send({ embeds: [embed] });
                }
            }
        } catch (error) {
            console.error(error);
            const embed = errorEmbed(message);
            message.channel.send({ embeds: [embed] });
        }
    }
};
