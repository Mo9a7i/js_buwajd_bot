const TwitchJs = require('twitch-js');
const Discord = require('discord.js');
const { twitch_token, discord_token, prefix } = require('./assets/config/config.json');

const client = new Discord.Client();
// const twitchJs = new TwitchJs({ username, token })

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	// List All Guilds
	const Guilds = client.guilds.cache.map(guild => new Object({ object: guild, name: guild.name, id: guild.id }));

	// List All Channels
	const GuildChannels = [];

	Guilds.forEach(oneGuild => {

		let channelsaty = oneGuild.object.channels.cache.map(channels => new Object({ object: channels, name: channels.name, id: channels.id }));
		GuildChannels.push(channelsaty);
	});

	// List All Members
});


client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');
	}
	else if (command === 'beep') {
		message.channel.send('Boop.');
	}
	else if (command === 'mazen') {
		message.channel.send(':sadge: :TeaTime:');
	}
	else if (command === 'hello') {
		console.log(args);
		message.channel.send('Hala ' + args[0]);
	}
	else if (command === 'addstreamer') {
		if(!message.member.hasPermission('ADMINISTRATOR')) return;

		// Get Parameters
		const twitch_streamer_name = args[0];
		const discord_name = args[1];

		// Get the user object
		const discord_user = message.mentions.members.first();

		// Get all roles
		const some_roles = new Map();
		message.guild.roles.cache.map(roles => some_roles.set(roles.name, new Object({ object: roles, name: roles.name, id: roles.id })));

		// Add the user to the role
		discord_user.roles.add(some_roles.get('streamers').object);

		// Get all channels
		const some_channels = new Map();
		message.guild.channels.cache.map(channels => some_channels.set(channels.id, new Object({ object: channels, name: channels.name, id: channels.id })));

		// Create the new Channel
		message.guild.channels.create(args[0], { parent: some_channels.get('711828559588491348').object });
		message.channel.send('You are trying to follow ' + twitch_streamer_name + ' on twitch and add ' + discord_name + ' to streamers role and ' + 'create a channel called ' + discord_name + ' under /STREAMERS');

	}
	else if (command === 'أطلقشي') {
		message.channel.send(':flag_sa:');
	}
	// other commands...
});


client.login(discord_token);