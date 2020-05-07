const execute = async (bot, sender, msg, args, command) => {
    const connection = await msg.member.voice.channel.join()
   
    const dispatcher = connection.play('./clips/tfg.mp3')

    const dispatchTimeout = setTimeout(() => {
        if (connection.speaking) connection.disconnect()
    }, 120000)
    dispatcher.on('finish', () => {
        connection.disconnect()
        clearTimeout(dispatchTimeout)
    })


}


const responds = ['tfg']

module.exports = { execute, responds }
