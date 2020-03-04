const chalk = require('chalk');

const shell = require('shelljs')
const path = require('path')
const exec = require('child_process').execSync;


module.exports = {
    update: () => {

        console.log(
            chalk.blue("Programme de mise à jour de Balsa")
        )
        console.log()

        const run = async () => {

            shell.cd()
            const pwd = path.join(shell.pwd().stdout, '.config', 'balsa', 'balsa')
            const oneUp = path.join(shell.pwd().stdout, '.config', 'balsa')

            let retVal = 0;

            console.log(`La mise à jour automatique de Balsa débute`)

            shell.cd(pwd)
            try {
                retVal = shell.exec('git fetch', { silent: true }).code || retVal
                retVal = shell.exec('git reset --hard', { silent: true }).code || retVal
                retVal = shell.chmod('+x', path.join(pwd, 'index.js')).code || retVal
                retVal = shell.exec('git pull --force', { silent: true }).code || retVal
            } catch (error) {
                retVal = 1
            }
            if (retVal > 0) {
                retVal = 0
                //Force clone
                shell.cd(oneUp)
                shell.exec(`rm -rf "${pwd}"`)
                try {
                    exec(`mkdir -p "${pwd}"`)
                    exec(`git clone https://github.com/arbrebinaire/balsa.git "${pwd}"`)
                    exec(`npm install -g "${pwd}"`)
                } catch (error) {
                    retVal = 1
                }
            }
            console.log(retVal === 0 ? chalk.green("Succès: mise à jour accomplie") : chalk.red("Erreur: mise à jour empêchée"))
            return retVal
        };
        run()
    }
};
