const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const command = require('./command.js')
const antifakejoin = require('./antifakejoin.js')

var settingtimer = 30;
var data1 = 0;
var timer = 0;
var data2 = 0;
var timer2 = 0;
var data3 = 0;
var timer3 = 0;

client.on('ready', () => {
    // Informowanie o włączeniu bota
    console.log('Bit Bot włączony')


    
    // Testowa komenda
    command(client, 'ping', (message) => {
        message.channel.send(`Pong!`)
        const User = client.users.cache.get("558673956295540777")
    if (User) { // Checking if the user exists.
        message.channel.send(User.tag) // The user exists.
    }
    })

    // Fake join
    client.on('guildMemberAdd', (member) => {
        
        if (member.id == data1) {
            member.kick('Fakejoin')
            console.log(`Wyrzucono ${member.user.username} (ID: ${member.id}) z powodu Fakejoina`)
        } else if (data1 == 0){
            data1 = member.id
            timer = settingtimer
        } else if (member.id == data2) {
            member.kick('Fakejoin')
            console.log(`Wyrzucono ${member.user.username} (ID: ${member.id}) z powodu Fakejoina`)
        } else if (data2 == 0){
            data2 = member.id
            timer2 = settingtimer
        }
    })

    // Fakejoin - sprawdzanie danych
    command(client, 'check', (message) => {
        antifakejoin(client)
        
        if (data1 != 0) {
            const User = client.users.cache.get(`${data1}`)
            const usrname = User.tag
            if (data2 != 0) {
                const User2 = client.users.cache.get(`${data2}`)
                const usrname2 = User2.tag
            } else {
                usrname2 = "---"
                timer2 = "0"
            }
            if (data3 != 0) {
                const User3 = client.users.cache.get(`${data3}`)
                const usrname3 = User3.tag
            } else {
                usrname3 = "---"
                timer3 = "0"
            }
            

            const datacheck = new Discord.MessageEmbed()
	            .setColor('#0099ff')
	            .setTitle('Lista nowych użytkowników')
	            .addFields(
		            { name: `1. ${usrname}`, value: `Pozostały czas: ${timer} sekund.` },
                    { name: `2. ${usrname2}`, value: `Pozostały czas: ${timer2} sekund.` },
                    { name: `3. ${usrname3}`, value: `Pozostały czas: ${timer3} sekund.` }
	            )
            message.channel.send(datacheck)
        } else {
            const datacheckfail = new Discord.MessageEmbed()
	            .setColor('#0099ff')
	            .setTitle('W bazie nie ma żadnego nowego użytkownika')
            message.channel.send(datacheckfail)
        }
        
    })

    

    
})
// TIMER
const interval = setInterval(function() {
    timer = timer - 1;
    timer2 = timer2 - 1;
    timer3 = timer3 - 1;

    if (timer <= 0) {
        data1 = 0;
    }
    if (timer2 <= 0) {
        data2 = 0;
    }
    if (timer3 <= 0) {
        data3 = 0;
    }
  }, 1000);

/*
client.on("ready", function () { // Should do that when the client is ready.
    const User = client.users.fetch("558673956295540777");
    console.log(User); // Some user object.
});
*/

client.login(config.token)