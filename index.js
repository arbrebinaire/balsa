#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const inquirer = require('./lib/inquirer');


clear();

console.log(
    chalk.yellow(
        figlet.textSync('Balsa', { horizontalLayout: 'full' })
    )
);

console.log('Prêt à exécuter une commande:')