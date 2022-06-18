const fs = require('fs');
const discord = require('discord.js');
const server = require('./server')

const client = new discord.Client({ disableMentions: 'everyone' });

const { Player } = require('discord-player');
//const prefix = require('./config/bot')


client.player = new Player(client, {
    ytdlDownloadOptions: {
        filter: "audioonly"
    }});
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.prefix = client.config.prefix;
client.commands = new discord.Collection();

client.on("ready", () => {
    server()
    client.user.setStatus('idle')
    let statuses = [
        `kewl music | K?help`,
        `music for you! | K?help`
 ]
  
 setInterval(function() {
 let status = statuses[Math.floor(Math.random() * statuses.length)];
 client.user.setActivity(status, { type: 'PLAYING'});
 }, 60000)
});

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    client.player.on(file.split(".")[0], event.bind(null, client));
};

client.login(process.env['token']);