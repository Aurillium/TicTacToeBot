const fs = require('node:fs');

const modal_files = fs.readdirSync('./modals').filter(file => file.endsWith('.js'));

for (const file of modal_files) {
	exports[file.slice(0, -3)] = require("./modals/" + file).modal;
}