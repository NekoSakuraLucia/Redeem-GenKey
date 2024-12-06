const { noKeysEmbed, noUnusedKeysEmbed, keyRemovedEmbed } = require("../embeds/checkListEmbed");
const { db } = require("../data");

module.exports = {
    data: {
        name: "remove-key"
    },
    execute: async (message, args) => {
        try {
            const keys = await new Promise((resolve, reject) => {
                db.all("SELECT * FROM keys", [], (err, rows) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    }
                    resolve(rows);
                });
            });

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

            // ลบคีย์ที่ไม่ได้ใช้งาน
            const removedKeys = [];
            for (const key of unusedKeys) {
                await new Promise((resolve, reject) => {
                    db.run("DELETE FROM keys WHERE id = ?", [key.id], (err) => {
                        if (err) {
                            console.error(err.message);
                            reject(err);
                        }
                        removedKeys.push(key);  // เก็บคีย์ที่ถูกลบ
                        resolve();
                    });
                });
            }

            // ส่งข้อความยืนยันว่าได้ลบคีย์แล้ว
            if (removedKeys.length > 0) {
                const embed = keyRemovedEmbed(message, removedKeys);
                return message.channel.send({ embeds: [embed] });
            } else {
                const embed = noUnusedKeysEmbed(message);
                return message.channel.send({ embeds: [embed] });
            }

        } catch (err) {
            console.error("เกิดข้อผิดพลาดในการดำเนินการ:", err);
            message.channel.send("เกิดข้อผิดพลาดในการดำเนินการ กรุณาลองใหม่อีกครั้ง.");
        }
    }
}
