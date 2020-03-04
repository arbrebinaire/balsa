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

            shell.cd()
            const pwd = path.join(shell.pwd().stdout, '.config', 'balsa', 'balsa')

            let retVal = 0;

            console.log(`La mise à jour automatique de Balsa débute`)

            shell.cd(pwd)
            try {
                //console.log("GIT fetch:")
                retVal = shell.exec('git fetch', { silent: true }).code || retVal
                //console.log(shell.exec('git fetch'))
                //console.log("GIT reset:")
                retVal = shell.exec('git reset --hard', { silent: true }).code || retVal
                //console.log(shell.exec('git reset --hard'))
                //console.log("chmod index.js:")
                retVal = shell.chmod('+x', path.join(pwd, 'index.js')).code || retVal
                //console.log(shell.chmod('+x', path.join(shell.pwd().stdout, 'index.js')))
                retVal = shell.exec('git pull --force', { silent: true }).code || retVal
            } catch (error) {
                retVal = 1
            }
            console.log(retVal === 0 ? chalk.green("Succès: mise à jour accomplie") : chalk.yellow("Erreur: mise à jour empêchée"))
            return retVal
        };
        //console.log("GIT pull --force:")
        //console.log(run());
        run()
    }
};
