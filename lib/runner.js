const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const fs = require('fs')
const path = require('path')

const files = require('./files');
const inquirer = require('./inquirer');
const shell = require('shelljs');



module.exports = {
    run: (name, args) => {

        console.log(
            chalk.blue("Programme d'exécution de Balsa")
        )
        console.log()

        shell.cd()
        const home = shell.pwd().stdout
        const pwd = path.join(home, '.config', 'balsa')
        const progLocalPath = path.join(home, '.config', 'balsa', name)
        const progLocalModulePath = path.join(progLocalPath, 'node_modules')
        const progLocalLogPath = path.join(progLocalPath, 'logs')
        const cloud = path.join(home, 'cloud')
        //const repo = path.join(repoBalsa, name)

        shell.mkdir('-p', progLocalModulePath)
        shell.mkdir('-p', progLocalLogPath)


        const getDirectories = source =>
            fs.readdirSync(source, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name)

        const accountsPath = getDirectories(cloud)
        //const progPath = path.join(pwd, name)
        //const modulesPath = path.join(progPath, 'node_modules')
        //const logsPath = path.join(progPath, 'logs')

        const run = async () => {
            let found = '';
            console.log(`Exécution du programme [${name}]`)
            //console.log("Looking for it in all Google personal folders first")
            accountsPath.forEach(dir => {
                //console.log(path.join(cloud, dir, 'balsa', name))
                //console.log(fs.existsSync(path.join(cloud, dir, 'balsa', name)))
                if (fs.existsSync(path.join(cloud, dir, 'shared', 'balsa', name))) {
                    found = path.join(cloud, dir, 'shared', 'balsa', name)
                }
            });
            if (!found) {

                //console.log("Then looking for it in all Google shared")
                accountsPath.forEach(dir => {
                    //console.log(path.join(cloud, dir, '.shared', 'balsa', name))
                    //console.log(fs.existsSync(path.join(cloud, dir, '.shared', 'balsa', name)))

                    if (shell.ls(path.join(cloud, dir, '.shared')).code === 0) {
                        if (shell.ls(path.join(cloud, dir, '.shared', 'balsa')).code === 0) {
                            if (shell.ls(path.join(cloud, dir, '.shared', 'balsa', name)).code === 0) {
                                console.log(`Found in ${path.join(cloud, dir, '.shared', 'balsa', name)}`)
                                found = path.join(cloud, dir, '.shared', 'balsa', name)
                            }
                        }
                    }

                    //console.log(shell.ls(path.join(cloud, dir, '.shared', 'balsa', name)).code)
                });

            }
            //const accountPath = path.join(cloud, account)
            //const repoBalsa = path.join(accountPath, 'balsa')
            //Looking for it in all Google personal folders
            //console.log(`FOUND!: ${path.join(found, 'index.js')}`)
            if (found) {
                shell.cd(found)
                shell.exec('npm install --no-shrinkwrap')
                if (shell.exec(`node ${path.join(found, 'index.js')} json_args '${JSON.stringify(args)}'`).code === 0) {
                    console.log(chalk.green(`L'exécution de [${name}] a été un succès`))
                } else {
                    console.log(chalk.red(`Erreur: l'exécution de [${name}] ne s'est pas terminée normalement.`))
                }
            } else {
                console.log(chalk.yellow(`Erreur: le programme [${name}] n'a pas été trouvé'.`))
            }
            return true
        };

        run();
    }
};
