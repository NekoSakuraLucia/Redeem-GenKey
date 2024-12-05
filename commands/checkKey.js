const { EmbedBuilder } = require("discord.js");
const { dataKey } = require("../data");

module.exports = {
    data: {
        name: "check-list"
    },
    execute: async (message, args) => {
        // ตรวจสอบว่า dataKey มีคีย์ไหม
        if (dataKey.length === 0) return message.channel.send("ยังไม่มีคีย์ในระบบ.");

        // กรองคีย์ที่ไม่ได้ใช้งาน
        const unusedKeys = dataKey.filter(entry => !entry.isUsed);

        if (unusedKeys.length === 0) return message.channel.send("ไม่มีคีย์ที่ยังไม่ได้ใช้งานในระบบ.");

        message.channel.send(`คีย์ที่ยังไม่ได้ใช้งาน: \n${unusedKeys.map(entry => `${entry.key}`).join("\n")}`)
    }
}