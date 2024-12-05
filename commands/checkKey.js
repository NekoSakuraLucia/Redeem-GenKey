const { noKeysEmbed, unusedKeysEmbed, noUnusedKeysEmbed } = require("../embeds/checkListEmbed");
const { dataKey } = require("../data");

module.exports = {
    data: {
        name: "check-list"
    },
    execute: async (message, args) => {
        // ตรวจสอบว่า dataKey มีคีย์ไหม
        if (dataKey.length === 0) {
            const embed = noKeysEmbed(message);
            return message.channel.send({ embeds: [embed] });
        }

        // กรองคีย์ที่ไม่ได้ใช้งาน
        const unusedKeys = dataKey.filter(entry => !entry.isUsed);

        if (unusedKeys.length === 0) {
            const embed = noUnusedKeysEmbed(message);
            return message.channel.send({ embeds: [embed] });
        }

        const embed = unusedKeysEmbed(message, unusedKeys)
        message.channel.send({ embeds: [embed] });
    }
}