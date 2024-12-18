const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Map();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", file));
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    const args = message.content.split(" ");

    if (!args[0] || typeof args[0] !== "string") return;

    const commandName = args[0].slice(1).toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply("เกิดข้อผิดพลาดในการประมวลผลคำสั่ง!");
    }
})

client.login(process.env.DISCORD_TOKEN ?? "");