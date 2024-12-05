const { EmbedBuilder } = require("discord.js");

function noKeyEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("กรุณาระบุคีย์ที่ต้องการใช้!")
        .setDescription("โปรดระบุคีย์ที่คุณต้องการใช้ในการแลกสิทธิ์.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function invalidKeyEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("คีย์นี้ไม่ถูกต้อง!")
        .setDescription("คีย์ที่คุณระบุไม่ถูกต้องหรือไม่พบในระบบ.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function usedKeyEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("คีย์นี้ถูกใช้งานไปแล้ว")
        .setDescription("คีย์นี้ได้ถูกใช้งานแล้ว, คุณไม่สามารถใช้คีย์นี้อีกได้.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function errorEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("เกิดข้อผิดพลาดในการมอบ role")
        .setDescription("เกิดข้อผิดพลาดในการมอบ role.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function noRoleEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("ไม่พบ role ที่ต้องการมอบให้")
        .setDescription("ไม่พบ role ที่ต้องการมอบให้แก่คุณ.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function noPermissionEmbed(message) {
    return new EmbedBuilder()
        .setColor("#ff4d4d")
        .setTitle("บอทไม่มีสิทธิ์ในการมอบ role นี้")
        .setDescription("บอทไม่สามารถมอบ role นี้ได้ เนื่องจากไม่มีสิทธิ์.")
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function successEmbed(message, redeemKey, role) {
    return new EmbedBuilder()
        .setColor("#f472b6")
        .setTitle("การมอบ role สำเร็จ")
        .setDescription(`คุณได้รับ role "${role.name}" เรียบร้อยแล้ว!`)
        .addFields(
            { name: 'คีย์ที่ใช้', value: redeemKey, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

function redeemMessageEmbed(message, redeemKey) {
    return new EmbedBuilder()
        .setColor("#f472b6")
        .setDescription(`คุณได้ใช้คีย์: ${redeemKey} เรียบร้อยแล้ว!`)
        .setTimestamp()
        .setFooter({ text: `คำสั่งที่สร้างโดย ${message.author.username}`, iconURL: message.author.displayAvatarURL() });
}

module.exports = {
    noKeyEmbed,
    invalidKeyEmbed,
    usedKeyEmbed,
    errorEmbed,
    noRoleEmbed,
    noPermissionEmbed,
    successEmbed,
    redeemMessageEmbed
};