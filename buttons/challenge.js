const { MessageActionRow, MessageButton } = require('discord.js');
const { message_embed, make_panel, sleep } = require('../resources');

const action_row = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId("challenge:accept")
			.setLabel("Accept!")
			.setStyle("SUCCESS")
            .setDisabled(true),
		new MessageButton()
			.setCustomId("challenge:deny")
			.setLabel("Deny.")
			.setStyle("DANGER")
            .setDisabled(true)
	);

exports.response = async function(interaction, arg_string) {
    var mention_id;
    for (let mention of interaction.message.mentions.users) {
        if (mention[1].id !== interaction.message.interaction.user.id) {
            mention_id = mention[1].id;
        }
    }
    if (mention_id === interaction.user.id) {
        await interaction.message.edit({content: interaction.message.content, components: [action_row]});
        if (arg_string === "accept") {
            var first, next;
            if (Math.random() < 0.5) {
                first = interaction.message.interaction.user.id;
                next = mention_id;
            } else {
                first = mention_id;
                next = interaction.message.interaction.user.id;
            }
            await interaction.reply({content: `Let's play! <@${first}> you're up![](_________:${first}:${next}:0)`, components: make_panel("_________")});
        } else {
            await interaction.reply("Challenge denied :(");
        }
        await sleep(2000);
        await interaction.message.delete();
    } else {
        await interaction.reply({embeds: [message_embed("Only the opponent may answer the challenge.")], ephemeral: true});
    }
}