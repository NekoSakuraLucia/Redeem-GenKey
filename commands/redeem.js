const { PermissionsBitField } = require("discord.js");
const { dataKey } = require("../data");
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

        const keyEntry = dataKey.find(entry => entry.key === redeemKey);

        if (!keyEntry) {
            const embed = invalidKeyEmbed(message);
            return message.channel.send({ embeds: [embed] });
        }

        if (keyEntry.isUsed) {
            const embed = usedKeyEmbed(message);
            return message.channel.send({ embeds: [embed] });
        }

        // อัพเดตสถานะของคีย์ก่อนการมอบ role
        keyEntry.isUsed = true;

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
    }
};
