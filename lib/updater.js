const chalk = require('chalk');

const shell = require('shelljs')
const path = require('path')





module.exports = {
    update: () => {
      
        console.log(
            chalk.blue("Programme de mise à jour de Balsa")
        )
        console.log()
        
        const run = async () => {
            let retVal;
            console.log(`La mise à jour automatique de Balsa débute`)
            shell.cd()
            shell.cd(path.join(shell.pwd().stdout, '.config', 'balsa', 'balsa'))
            shell.exec('git fetch origin master')
            shell.exec('git reset --hard origin/master')
            retVal = shell.exec('git pull origin master --force')
            return retVal.stdout
        };

        console.log(run());
    }
  };
