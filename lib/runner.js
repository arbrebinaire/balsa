const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./files');
const inquirer = require('./inquirer');




module.exports = {
    run: (name) => {

        console.log(
            chalk.blue("Programme d'exécution de Balsa")
        )
        console.log()
        
        const run = async () => {
            console.log(`Exécution du programme [${name}]`)
            console.log(chalk.green("Succès"))
            return true
        };
        
        run();
    }
  };
