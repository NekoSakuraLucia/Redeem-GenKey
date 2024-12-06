const { noKeysEmbed, unusedKeysEmbed, noUnusedKeysEmbed } = require("../embeds/checkListEmbed");
const { db } = require("../data");

module.exports = {
    data: {
        name: "check-list"
    },
    execute: async (message, args) => {
        // ตรวจสอบว่า dataKey มีคีย์ไหม
        const keys = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM keys", [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                }
                resolve(rows);
            });
        });

        // ตรวจสอบว่าในฐานข้อมูลมีคีย์หรือไม่
        if (keys.length === 0) {
            const embed = noKeysEmbed(message);
            return message.channel.send({ embeds: [embed] });
        }

        // กรองคีย์ที่ไม่ได้ใช้งาน
        const unusedKeys = keys.filter(entry => !entry.isUsed);

        if (unusedKeys.length === 0) {
            const embed = noUnusedKeysEmbed(message);
            return message.channel.send({ embeds: [embed] });
        }

        const embed = unusedKeysEmbed(message, unusedKeys)
        message.channel.send({ embeds: [embed] });
    }
}