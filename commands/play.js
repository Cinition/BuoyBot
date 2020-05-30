module.exports = {
	name: 'play',
	description: 'Play a music',
	async execute(message, args) {
		if (message.member.voice.channel) {
			const ytdl = require('ytdl-core');
			const connection = await message.member.voice.channel.join();
			const dispatcher = connection.play(ytdl(args[0], {quality: 'highestaudio'}))
			dispatcher.setVolumeDecibels(5)
			dispatcher.on('start', () => {
				message.channel.send('Woof! Bork! Woof! (translation: "I am playing a song!")');
			});
			dispatcher.on('finish', () => {
				message.channel.send('Bork! Bork! Woof! (translation: "I am done playing a song!")');
				connection.disconnect();
			});
		} else {
			message.channel.send('Bork! Bork! Bork! (translation: "You are not in a voice channel")');
		}
	},
};