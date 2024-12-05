const { dataKey } = require("../data");

module.exports = {
    data: {
        name: "redeem",
    },
    execute: async (message, args) => {
        if (args.length < 1) {
            return message.reply("กรุณาระบุคีย์ที่ต้องการใช้!")
        }

        const redeemKey = args[0];

        const keyEntry = dataKey.find(entry => entry.key === redeemKey);

        if (!keyEntry) {
            return message.reply("คีย์นี้ไม่ถูกต้อง!");
        }

        if (keyEntry.isUsed) {
            return message.reply("คีย์นี้ถูกใช้งานไปแล้ว");
        }

        keyEntry.isUsed = true;

        message.reply(`คุณได้ใช้คีย์: ${redeemKey} เรียบร้อยแล้ว!`)
    }
};