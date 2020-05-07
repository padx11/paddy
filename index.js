const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const commandList = new Map()
const commandPrefix = '>'

fs.readdir('./commands/', (err, data) => {
    if (err) console.error(err);

    const files = data.filter(file => file.split('.').pop() === 'js');

    if (files.length <= 0) {
        return console.warn('No commands in ./commands/');
    }

    files.forEach((file) => {
        const command = require(`./commands/${file}`);
        for (const respond of command.responds) {
            commandList.set(respond, command.execute);
        }
        console.log('[+] ' + file + ' loaded');
    });
});

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message' , msg => {
    if (msg.content.indexOf(commandPrefix) !== 0) return;
    
    const sender = msg.author
    const command = msg.content.toLowerCase().split(' ')[0].substr(commandPrefix.length)
    const args = msg.content.split(' ').slice(1)

    const execute = commandList.get(command)
    if (!execute) return

    execute(client, sender, msg, args, command)

    
})



client.login('NzA3NDA3NDg3OTA4ODM5NTA2.XrIWyQ.N95HXr0oP9KQkTZYyRIGXh6n4X4');