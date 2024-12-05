const { dataKey } = require("../data");

module.exports = {
    data: {
        name: "genkey",
    },
    execute: async (message, args) => {
        // ตรวจสอบว่าได้ระบุจำนวนคีย์หรือยัง
        const numKeys = parseInt(args[1]);

        // ถ้าไม่มีการะบุจำนวน หรือจำนวนไม่ใช่ตัวเลข
        if (isNaN(numKeys) || numKeys < 1) {
            return message.reply("กรุณาระบุจำนวนคีย์ที่ต้องการสร้าง (จำนวนต้องเป็นตัวเลขที่มากกว่าศูนย์)!");
        }

        // เก็บคีย์ไว้ใน Array สำหรับแสดงจำนวนคีย์
        const generatedKeys = [];

        // สร้างคีย์ตามจำนวนที่ระบุ
        for (let i = 0; i < numKeys; i++) {
            let newKey;
            let keyExists = true;

            // สร้างคีย์จนกว่าจะไม่ซ้ำกับที่มีอยู่ใน dataKey
            while (keyExists) {
                newKey = `Key-${Math.floor(Math.random() * 100000)}`;
                keyExists = dataKey.some(entry => entry.key === newKey);
            }

            dataKey.push({ key: newKey, isUsed: false });
            generatedKeys.push(newKey);
        }

        // ส่งผลลัพธ์กลับ
        message.channel.send(`คีย์ที่ถูกสร้างใหม่มีดังนี้: \n${generatedKeys.join("\n")}`);
    }
};