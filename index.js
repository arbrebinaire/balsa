#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const install = require('./lib/installer').install;
const installBalsa = require('./lib/installer').installBalsa;
const run = require('./lib/runner').run;
const update = require('./lib/updater').update;
const create = require('./lib/creator').create;


clear();

console.log(
    chalk.yellow(
        figlet.textSync('Balsa', { horizontalLayout: 'full' })
    )
);

var argv = require('minimist')(process.argv.slice(2));

update()

switch (argv._[0]) {
    case "install":
        if (argv._.length === 1) {
            installBalsa()
        } else {
            console.log(chalk.blue("Lancement du programme d'installation de [") + chalk.blue.inverse(argv._[2]) + chalk.blue("] pour l'OS [") + chalk.blue.inverse(argv._[1]) + chalk.blue("]"))
            if(typeof argv._[1] === 'string' && typeof argv._[2] === 'string'){
                install(argv._[2], argv._[1])
            } else {
                console.log(chalk.yellow("Il semble manquer un ou plusieurs arguments. Exemple: balsa install ubuntu nom_du_programme"))
            }
        }
        break;
    case "run":
        if (argv._.length > 1) {
            const progName = argv._[1]
            argv._.shift() //Remove "run"
            argv._.shift() //Remove name of prog
            run(progName, argv)
        } else {
            console.log(chalk.yellow("Il faut au moins le nom du programme à lancer: balsa run nom_du_programme"))
        }
        break;
    case "update":
        if (argv._.length > 1) {
            //update(argv._[1])
            console.log(chalk.yellow(`Il n'est pas encore possible de lancer la mise à jour de [${argv._[1]}]`))
        } /* else {
            console.log("Il faut au moins le nom du programme à mettre à jour: balsa update [nom_du_programme]")
        } */
        break;
    case "create":
        if (argv._.length > 1) {
            if(!argv.a){
                console.log(chalk.red(`Il est nécessaire de spécifier un compte Google valable avec l'option [-a compte_google]`))
                return 1
            }
            create(argv._[1], argv.a)
            //console.log(chalk.yellow(`Il n'est pas encore possible de lancer la mise à jour de [${argv._[1]}]`))
        } else {
            console.log(chalk.yellow(`Il faut au moins le nom du programme à mettre à créer: balsa create nom_du_programme -a compte_google`))

        }
        break;
    default:
        console.log("Cette commande n'est pas reconnue")
        break;
}