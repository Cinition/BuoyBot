module.exports = {
	name: 'stop',
	description: 'Stops music being played',
	execute(message, args) {
		if (message.member.voice.channel) {
			message.member.voice.channel.leave();
		} else {
			message.channel.send('Bork! Bork! Bork! (translation: "You are not in the same voice channel as me!")');
		}
	},
};