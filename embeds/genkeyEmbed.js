const { EmbedBuilder } = require("discord.js");

function genkeyEmbed(generatedKeys, message) {
    return new EmbedBuilder()
        .setColor("#f472b6")
        .setTitle("คีย์ที่ถูกสร้างใหม่")
        .setDescription(`\`\`\`\n${generatedKeys.join("\n")}\n\`\`\``)
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function genkeyEmbed_Error(message) {
    return new EmbedBuilder()
        .setColor("#f472b6")
        .setTitle("กรุณาระบุจำนวนคีย์ที่ต้องการสร้าง!")
        .setDescription("จำนวนคีย์ต้องเป็นตัวเลขที่มากกว่าศูนย์.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function genkeyEmbed_ADMIN(message) {
    return new EmbedBuilder()
        .setColor("#f472b6")
        .setTitle("คุณไม่มีสิทธิ์ใช้คำสั่งนี้!")
        .setDescription("คุณไม่ได้รับอนุญาตให้ใช้คำสั่งนี้.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

module.exports = { genkeyEmbed, genkeyEmbed_Error, genkeyEmbed_ADMIN };