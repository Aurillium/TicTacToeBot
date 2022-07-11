const { SlashCommandBuilder } = require('@discordjs/builders');
const { sample_modal } = require("../modals.js");

exports.data = new SlashCommandBuilder()
	.setName('modal')
	.setDescription('Test out modals!');

exports.response = async function(interaction) {
	await interaction.showModal(sample_modal);
}

exports.doc = `Test out a modal!`;
