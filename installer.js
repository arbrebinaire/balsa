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
console.log(
    chalk.blue("Programme d'installation de l'utilitaire Balsa")
)
console.log()

const run = async () => {
    let email = {}
    while(true){
        email = await inquirer.askGoogleAccount();
        if(email.value === 'q' || email.value === 'Q') break;
        console.log(email.value);
    }
    
};

run();
