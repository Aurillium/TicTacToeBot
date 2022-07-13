const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const { author_embed } = require('../resources');

exports.data = new SlashCommandBuilder()
	.setName('play')
	.setDescription('Play Tic Tac Toe!')
	.addUserOption(option =>
		option.setName("opponent")
			.setDescription("Who you wish to challenge")
			.setRequired(true)
	);

const action_row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId("challenge:accept")
			.setLabel("Accept!")
			.setStyle("SUCCESS"),
		new MessageButton()
			.setCustomId("challenge:deny")
			.setLabel("Deny.")
			.setStyle("DANGER")
	);

exports.response = async function(interaction) {
	const opponent = interaction.options.getUser("opponent");
	await interaction.reply({content: `<@${opponent.id}>! <@${interaction.user.id}> has challenged you to a game of Tic Tac Toe. Do you accept?`, components: [action_row]});
}

exports.doc = `Challenge someone to a game of Tic Tac Toe!`;
