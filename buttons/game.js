const { message_embed, make_panel } = require("../resources");

function set_char(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

exports.response = async function(interaction, arg_string) {
    const index = parseInt(arg_string);
    const old_data = interaction.message.content.split("[](")[1].split(")")[0].split(":");
    var game = old_data[0];
    var player1 = old_data[1];
    var player2 = old_data[2];
    var turn = parseInt(old_data[3]);
    const correct_player = (turn === 0) ? player1 : player2;
    const other_player = (turn === 1) ? player1 : player2;
    const character = (turn === 0) ? "x" : "o";
    if (interaction.user.id !== correct_player) {
        await interaction.reply({embeds: [message_embed("It is not your turn.")], ephemeral: true});
        return;
    } else if (game[index] !== "_") {
        await interaction.reply({embeds: [message_embed("You can't place your marker in a spot that is already used.")], ephemeral: true});
        return;
    }
    game = set_char(game, index, character);
    var win = [];
    for (let i = 0; i < 3; i++) {
        if (game[i * 3] === game[i * 3 + 1] && game[i * 3] === game[i * 3 + 2] && game[i * 3] === character) {
            win = [i*3, i*3+1, i*3+2];
        } else if (game[i] === game[3 + i] && game[i] === game[6 + i] && game[i] === character) {
            win = [i, 3+i, 6+i];
        }
    }
    if (game[0] === game[4] && game[4] === game[8] && game[4] === character) {
        win = [0, 4, 8];
    }
    if (game[2] === game[4] && game[4] === game[6] && game[4] === character) {
        win = [2, 4, 6];
    }

    if (win.length > 0) {
        await interaction.message.edit({content: `Game over, <@${correct_player}> wins!`, components: make_panel(game, win=win)});
        await interaction.reply(`<@${correct_player}> wins!`);
    } else if (!game.includes("_")) {
        await interaction.message.edit({content: `Game over, it's a draw!`, components: make_panel(game, win=[-1])});
        await interaction.reply(`It's a draw!`);
    } else {
        const new_data = game + ":" + player1 + ":" + player2 + ":" + (1 - turn).toString();
        await interaction.message.edit({content: `Your turn <@${other_player}>[](${new_data})`, components: make_panel(game)});
        await interaction.deferReply();
        await interaction.deleteReply();
    }
}