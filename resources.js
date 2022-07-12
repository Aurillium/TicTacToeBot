const { MessageEmbed } = require('discord.js');

exports.message_embed = function(description, colour="#FF0000") {
	return new MessageEmbed()
		.setColor(colour)
		.setDescription(description);
}
exports.sleep = ms => new Promise(r => setTimeout(r, ms));

exports.random_choice = function(array) {
	return array[Math.floor((Math.random()*array.length))];
}