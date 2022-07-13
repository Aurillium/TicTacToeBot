const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
const config = require('./config.json');

exports.message_embed = function(description, colour="#FF0000") {
	return new MessageEmbed()
		.setColor(colour)
		.setDescription(description);
}
exports.sleep = ms => new Promise(r => setTimeout(r, ms));

exports.random_choice = function(array) {
	return array[Math.floor((Math.random()*array.length))];
}

exports.author_embed = function() {
	const colour = config.colour ?? config.color ?? null;
	if (colour !== null) {
		return new MessageEmbed().setAuthor(config.bot_author).setColor(colour);
	} else {
		return new MessageEmbed().setAuthor(config.bot_author);
	}
}

exports.make_panel = function(data, win=[]) {
	const game = data.replaceAll("_", " ").replaceAll("x", "❌").replaceAll("o", "⭕");
	var components = [];
	for (let i = 0; i < 3; i++) {
		var row = new MessageActionRow();
		for (let j = 0; j < 3; j++) {
			const index = i * 3 + j
			row.addComponents(
				new MessageButton()
					.setCustomId("game:" + index.toString())
					.setStyle(win.includes(index) ? "SUCCESS" : "SECONDARY")
					.setLabel(game[index])
					//.setDisabled(game[index] !== " ")
					.setDisabled(win.length !== 0)
			);
		}
		components.push(row);
	}
	return components
}