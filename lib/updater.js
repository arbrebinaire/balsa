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
            retVal = shell.exec('git pull')
            return retVal
        };

        console.log(run());
    }
  };
