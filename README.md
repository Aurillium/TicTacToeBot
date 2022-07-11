# SlashCommandBase

A modular command system for Discord.js

Each command is a file in the `commands` folder that contains:
* The information to register it
* The function to be called when it is run
* And a small description for when the `/commands` command is called

Buttons can also be added in the `buttons` folder, containing a function that responds to their press. If the button should contain any data, it can be placed after the button name separated by a colon (eg. `<name>:<argument/s>`) and this will be passed into the response function.

The `/commands` command is automatically set up to show information about all registered commands using the description from each one, plus also the details of the arguments in the registry information.
