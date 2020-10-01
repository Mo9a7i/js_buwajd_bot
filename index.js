const TwitchJs = require('twitch-js');
const Discord = require('discord.js');
const { twitch_token, discord_token } = require('./assets/config/config.json');

const client = new Discord.Client();
// const twitchJs = new TwitchJs({ username, token })


function getChannels(Guilds) {
	const GuilSubChannels = [];

	Guilds.forEach(oneGuild => {
		client.guilds.fetch(oneGuild.id).then(guild => {
			const myMembers = guild.channels.cache.map(channels => new Object({ name: channels.name, id: channels.id }));
			GuilSubChannels.push(myMembers);
		}).catch(console.error).finally(()=> {});
	});

	return GuilSubChannels;
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	// List All Guilds
	const Guilds = client.guilds.cache.map(guild => new Object({ name: guild.name, id: guild.id }));
	console.log(Guilds);

	// List All Channels
	const GuildChannels = getChannels(Guilds);

	

	console.log(GuildChannels);

	// List All Members
});


client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}
});

client.login(discord_token);