const { EmbedBuilder } = require("discord.js");

function noKeysEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("ไม่มีคีย์ในระบบ")
        .setDescription("ยังไม่มีคีย์ในระบบ.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function noUnusedKeysEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("ไม่มีคีย์ที่ยังไม่ได้ใช้งาน")
        .setDescription("ไม่มีคีย์ที่ยังไม่ได้ใช้งานในระบบ.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function unusedKeysEmbed(message, unusedKeys) {
    return new EmbedBuilder()
        .setColor("#f472b6")
        .setTitle("คีย์ที่ยังไม่ได้ใช้งาน")
        .setDescription(`\`\`\`\n${unusedKeys.map(entry => `${entry.key}`).join("\n")}\n\`\`\``)
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

module.exports = { noKeysEmbed, noUnusedKeysEmbed, unusedKeysEmbed };