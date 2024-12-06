const { db } = require("../data");
const { genkeyEmbed, genkeyEmbed_Error, genkeyEmbed_ADMIN } = require("../embeds/genkeyEmbed");

module.exports = {
    data: {
        name: "genkey",
    },
    execute: async (message, args) => {
        // กำหนด ADMIN IDs ที่สามารถใช้คำสั่งได้
        const adminIDS = ["ADMIN_1", "ADMIN_2"]; // ใส่เป็นไอดีผู้ใช้ของคุณ หรือ ของคนที่ต้องการอนุญาตให้ใช้คำสั่ง

        // ตรวจสอบว่าผู้ที่พิมพ์มาได้รับการอนุญาตหรือไม่
        if (!adminIDS.includes(message.author.id)) {
            const embed = genkeyEmbed_ADMIN(message);
            return message.channel.send({ embeds: [embed] });
        }

        // ตรวจสอบว่าได้ระบุจำนวนคีย์หรือยัง
        const numKeys = parseInt(args[1]);

        // ถ้าไม่มีการะบุจำนวน หรือจำนวนไม่ใช่ตัวเลข
        if (isNaN(numKeys) || numKeys < 1) {
            const embed = genkeyEmbed_Error(message);
            return message.channel.send({ embeds: [embed] });
        }

        // เก็บคีย์ไว้ใน Array สำหรับแสดงจำนวนคีย์
        const generatedKeys = [];

        // สร้างคีย์ตามจำนวนที่ระบุ
        for (let i = 0; i < numKeys; i++) {
            let newKey;
            let keyExists = true;

            // สร้างคีย์จนกว่าจะไม่ซ้ำกับที่มีอยู่ในฐานข้อมูล
            while (keyExists) {
                newKey = `Key-${Math.floor(Math.random() * 100000)}`;

                // ตรวจสอบว่า key นี้มีอยู่ในฐานข้อมูลแล้วหรือไม่
                const row = await new Promise((resolve, reject) => {
                    db.get('SELECT key FROM keys WHERE key = ?', [newKey], (err, row) => {
                        if (err) {
                            reject(err); // ถ้าเกิดข้อผิดพลาด
                        }
                        resolve(row); // คืนค่าผลลัพธ์
                    });
                });

                if (row) {
                    keyExists = true; // ถ้ามีคีย์ซ้ำ
                } else {
                    keyExists = false; // ถ้าไม่มีคีย์ซ้ำ
                }
            }

            // บันทึกคีย์ใหม่ลงในฐานข้อมูล
            await new Promise((resolve, reject) => {
                db.run('INSERT INTO keys (key, isUsed) VALUES (?, ?)', [newKey, false], (err) => {
                    if (err) {
                        reject(err); // ถ้าเกิดข้อผิดพลาด
                    }
                    resolve(); // ถ้าสำเร็จ
                });
            });

            generatedKeys.push(newKey);
        }

        // ส่งผลลัพธ์กลับ
        const embed = genkeyEmbed(generatedKeys, message);
        message.channel.send({ embeds: [embed] });
    }
};
