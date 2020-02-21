#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const install = require('./lib/installer').installBalsa;
const run = require('./lib/runner').run;
const update = require('./lib/updater').update;


clear();

console.log(
    chalk.yellow(
        figlet.textSync('Balsa', { horizontalLayout: 'full' })
    )
);

var argv = require('minimist')(process.argv.slice(2));

switch (argv._[0]) {
    case "install":
        if (argv._.length === 1) {
            install()
        } else {
            console.log(`Il n'est pas encore possible de lancer l'installation de [${argv._[1]}]`)
        }
        break;
    case "run":
        if (argv._.length > 1) {
            run(argv._[1])
        } else {
            console.log("Il faut au moins le nom du programme à lancer: balsa run [nom_du_programme]")
        }
        break;
    case "update":
        if (argv._.length === 1) {
            update()
        } else {
            console.log(`Il n'est pas encore possible de lancer la mise à jour de [${argv._[1]}]`)
        }
        break;
    default:
        console.log("Cette commande n'est pas reconnue")
        break;
}