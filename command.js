

const {prefix} = require('./config.json')

module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }

    client.on('message', message => {
        const {content} = message;
        const User = client.users.cache.get(`${message.author.id}`)
        aliases.forEach(alias => {
            const command = `${prefix}${alias}`

            if (content.startsWith(`${command}`) || content === command) {
                console.log(`Wykonano komendę ${command}, przez użytkownika ${User.tag}`)
                callback(message)
            }
        })
    })
}