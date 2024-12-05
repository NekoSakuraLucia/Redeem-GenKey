const { dataKey } = require("../data");

module.exports = {
    data: {
        name: "genkey",
    },
    execute: async (message, args) => {
        const newKey = `Key-${Math.floor(Math.random() * 100000)}`;

        const keyExists = dataKey.some(entry => entry.key === newKey);

        if (keyExists) {
            return message.reply("คีย์นี้มีอยู่แล้ว, กรุณาสร้างใหม่.");
        }

        dataKey.push({ key: newKey, isUsed: false });

        message.channel.send(`คีย์ใหม่ของคุณคือ: || ${newKey} ||`)
    }
};