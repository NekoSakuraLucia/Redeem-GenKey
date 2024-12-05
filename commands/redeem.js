const { PermissionsBitField } = require("discord.js");
const { dataKey } = require("../data");

module.exports = {
    data: {
        name: "redeem",
    },
    execute: async (message, args) => {
        if (args.length < 1) {
            return message.reply("กรุณาระบุคีย์ที่ต้องการใช้!");
        }

        const redeemKey = args[1]?.trim();

        const keyEntry = dataKey.find(entry => entry.key === redeemKey);

        if (!keyEntry) {
            return message.reply("คีย์นี้ไม่ถูกต้อง!");
        }

        if (keyEntry.isUsed) {
            return message.reply("คีย์นี้ถูกใช้งานไปแล้ว");
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
                            message.channel.send(`คุณได้รับ role "${role.name}" เรียบร้อยแล้ว!`);
                            message.channel.send(`คุณได้ใช้คีย์: ${redeemKey} เรียบร้อยแล้ว!`);
                        } catch (error) {
                            console.error(error);
                            message.reply("เกิดข้อผิดพลาดในการมอบ role..");
                        }
                    } else {
                        message.reply("บอทไม่มีสิทธิ์ในการมอบ role นี้.");
                    }
                } else {
                    message.reply("ไม่พบ role ที่ต้องการมอบให้");
                }
            } catch (error) {
                console.error(error);
                message.reply("เกิดข้อผิดพลาดในการมอบ role.");
            }
        }
    }
};
