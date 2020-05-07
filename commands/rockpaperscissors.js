const execute = (bot, sender, msg, args, command) => {
    const items = [
        'rock',
        'paper',
        'scissors'
    ]
    let randomThing = items[Math.floor(Math.random() * items.length)]
    if (sender.id === '524421333212332043') {
        let winIndex = items.indexOf(command) + 1
        if (winIndex > 2) winIndex = 0
        randomThing = items[winIndex]
    }
    msg.reply(randomThing)

}
const responds = ['rock', 'paper', 'scissors']

module.exports = { execute, responds }