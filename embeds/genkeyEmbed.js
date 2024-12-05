const { EmbedBuilder } = require("discord.js");

function genkeyEmbed(generatedKeys, message) {
    return new EmbedBuilder()
        .setColor("#ff80ff")
        .setTitle("คีย์ที่ถูกสร้างใหม่")
        .setDescription(`\`\`\`\n${generatedKeys.join("\n")}\n\`\`\``)
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

module.exports = { genkeyEmbed };