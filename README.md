# SlashCommandBase

A modular command system for Discord.js
The `/commands` command is automatically set up to show information about all registered commands using the description from each one, plus also the details of the arguments in the registry information.

# How to use it

Every interaction has its own JavaScript file in the folder that corresponds to the type of interaction; for example slash commands go in `commands`. The main bot imports all of this as Node.js modules on startup and registers everything that needs registering for you, then it listens out for interactions and calls the responses you've defined in your modules. The following sections outline how each module must look to work.

## Commands

Each command is a module in the `commands` folder.

### Module
* `exports.data`: The command builder; uses [`SlashCommandBuilder` from Discord.js](https://discordjs.guide/interactions/slash-commands.html#options)
* `exports.doc`: A simple string description of what the command does for the `/commands` command
* `exports.response`: An async function that responds to the slash command when it is run. It takes the interaction as an argument and must respond to it.

## Buttons

Buttons can also be added in the `buttons` folder, containing a function that responds to their press. If the button should contain any data, it can be placed after the button name separated by a colon (eg. `<name>:<argument/s>`) and this will be passed into the response function.

### Module
* `exports.response`: An async function that responds to the button press, taking the interaction as an argument. If there was any additional data on the button, this will be passed in as the second argument.

### Usage
To use buttons, simply create a button with the custom ID of `name:additional data` (or just `name` if there is no other data) and this response function will be called when it's pressed!

## Modals

You can add modals to the `modals` folder to create and process them. If the modal should contain any hidden data, it can be placed after the custom ID, separated by a colon (eg. `<name>:<argument/s>`), and this will be passed to the response function.

### Module
* `exports.modal`: [The modal builder from Discord.js](https://discordjs.guide/interactions/modals.html#building-and-responding-with-modals). Even if you don't plan on using this modal, the custom ID field needs to be set for the bot to locate the response function
* `exports.response`: An async function for responding to the interaction. The first argument is the interaction and the second is any additional hidden data if it exists

### Usage
You can get an instance of the modal that can be passed to `interaction.showModal` by importing it like so:
`const { modal_custom_id } = require("../modals.js");`
This is essentially more elegant code for finding the module in the folder, importing it, and getting the modal builder from it.

**Note**
The custom ID from the modal builder is what the bot uses to find the right response function, so if you plan on manually building a modal without using `exports.modal`, make sure to set the custom ID to the same one as is in `exports.modal`.

## Select Menus

Select menus go in the `selects` folder. Select menus can have either an overall response function, or one for each option. As with other interaction types, hidden data can be passed in after a colon in the custom ID, for example `<name>:<argument/s>`.

### Module
* `exports.items`: An object where each key is a possible value for the select menu and each value is another object containing a label, description, and, if there is no overall response function, a response function. For example:
```javascript
exports.items = {
    value_1: {
        label: "Option one",
        description: "I am a description!",
        response = async function(interaction) {
            ...
        }
    },
    another_value: {
        label: "Another option!",
        response = async function(interaction) {
            ...
        }
    }
}
```
The response functions are async functions that take the interaction as an argument. Any hidden data is passed in as a second argument
* `exports.response`: An async function that responds to the interaction if there aren't individual response functions attached to the items. It takes the interaction as the first argument, the list of selected values as the second, and any hidden data as the third
* `exports.min`: The minimum amount of items allowed to be selected
* `exports.max`: The maximum amount of items allowed to be selected

### Usage
You can get an instance of the select menu that can be used as a message component and added to an action from by importing it like this:
`const { select_menu_file_file } = require("../selects.js");`
This imports the select menu file and then builds a menu from `exports.items`, using the file name as the custom ID, and returns it to be used as a variable