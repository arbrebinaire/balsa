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
            console.log("GIT fetch:")
            console.log(shell.exec('git fetch'))
            console.log("GIT reset:")
            console.log(shell.exec('git reset --hard'))
            console.log("chmod index.js:")
            shell.chmod('+x', path.join(shell.pwd().stdout, 'index.js'))
            //console.log(shell.chmod('+x', path.join(shell.pwd().stdout, 'index.js')))
            retVal = shell.exec('git pull --force')
            return retVal.stdout
        };
        console.log("GIT pull --force:")
        console.log(run());
    }
  };
