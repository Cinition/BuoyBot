const fs = require("fs");
const Discord = require('discord.js');
const { prefix, token} = require('./settings.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  if(!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  if (command.args && !args.length) {
    return message.channel.send(`IM SOWWY ${message.author}, but you didnt PWOVIDE any arguments with that function`)
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('UwU We made a fucky wucky!! A wittle fucko boingo! The code monkey is working VEWY HAWD to fix this!');
  }
});

client.login(token);