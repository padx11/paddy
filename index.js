const fs = require('fs');
const os = require('os');
const Discord = require('discord.js');
const googleTTS = require('google-tts-api');
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

client.once('ready', async () => {
    console.log('Ready!');
    const logChannel = (await client.channels.resolve(
        '712033733829591051'
    ));
    logChannel.send(
        `**Paddy's Bot Started** NodeJS ${process.version} running on ${os.type()} ${os.release()}\n__System Info__ ${os.cpus().length} Logical Cores - ${os.totalmem()}B RAM`
    );
});

client.on('message' , msg => {
    if (msg.content.indexOf(commandPrefix) !== 0) return;
    
    const sender = msg.author
    const command = msg.content.toLowerCase().split(' ')[0].substr(commandPrefix.length)
    const args = msg.content.split(' ').slice(1)

    const execute = commandList.get(command)
    if (!execute) return

    execute(client, sender, msg, args, command)

    client.on('voiceStateUpdate', async (oldState, voiceState) => {
        if (oldState.channel === voiceState.channel) return; // Didn't Leave/Join
        if (oldState.member.id ===  '707005983955877969') return; // REV0        
        if (client.user === oldState.member.user) return; // Is this bot
    
        const connection = await oldState.channel.join();
    
        const ttsURL = await googleTTS(
            `${oldState.member.user.username} has left`,
            'en',
            1.2
        );
    
        const dispatcher = connection.play(ttsURL);
    
        const disconnectTimeout = setTimeout(() => {
            if (connection.speaking) connection.disconnect();
        }, 15000);
    
        dispatcher.on('finish', () => {
            connection.disconnect();
            clearTimeout(disconnectTimeout);
        });
    });
    
    
})



client.login(process.env.TOKEN);