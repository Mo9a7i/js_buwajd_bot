const TwitchJs = require('twitch-js');
const Discord = require('discord.js');
const { twitch_token, discord_token } = require('./assets/config/config.json');

const client = new Discord.Client();
// const twitchJs = new TwitchJs({ username, token })

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);


	// List All Guilds
	const Guilds = client.guilds.cache.map(guild => new Object({ name: guild.name, id: guild.id }));
	console.log(Guilds);

	// List All Channels
	let GuildMembers = [];

	Guilds.forEach(oneGuild => {
		client.guilds.fetch(oneGuild.id).then(guild => {
			const myMembers = guild.channels.cache.map(members => new Object({ name: members.name, id: members.id }));
			GuildMembers.push(myMembers);
		}).catch(console.error).finally(()=> {
			console.log(GuildMembers);
		});
	});

	// List All Members
});


client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}
});

client.login(discord_token);