const chalk = require('chalk');
const fs = require('fs')
const shell = require('shelljs')
const path = require('path')


module.exports = {
    create: (name, account) => {
      
        console.log(
            chalk.blue("Programme de création d'un utilitaire Balsa")
        )
        console.log(`${name}, ${account}`)
        const run = async () => {

            shell.cd()
            const home = shell.pwd().stdout
            const pwd = path.join(home, '.config', 'balsa')
            const cloud = path.join(home, 'cloud')
            const accountPath = path.join(cloud, account)
            const repoBalsa = path.join(accountPath, 'shared', 'balsa')
            const repo = path.join(repoBalsa, name)
            const progPath = path.join(pwd, name)
            const modulesPath = path.join(progPath, 'node_modules')
            const logsPath = path.join(progPath, 'logs')
            const outPath = path.join(progPath, 'out')
            const secretsPath = path.join(progPath, 'secrets')

            if(fs.existsSync(progPath)){
                chalk.red(`Le nom d'utilitaire à créér [${name}] existe déjà.`)
                chalk.yellow(`Répertoire existant [${progPath}]`)
                chalk.yellow(`Effacer [${progPath}] et redémarrer la création du programme`)
                return 1;
            }

            if(!fs.existsSync(accountPath)){
                chalk.red(`Le répertoire du compte [${accountPath}] n'existe pas.` )
                return 1;
            }

            if(fs.existsSync(repo)){
                chalk.red(`Le nom d'utilitaire à créér [${name}] existe déjà.`)
                chalk.yellow(`Répertoire existant [${repo}]`)
                chalk.yellow(`Effacer [${repo}] et redémarrer la création du programme`)
                return 1;
            }

            let retVal = 0;
            
            console.log(`La création de la structure des répertoires d'utilitaire Balsa débute`)

            //local
            shell.mkdir('-p', progPath)
            shell.mkdir('-p', modulesPath)
            shell.mkdir('-p', logsPath)
            shell.mkdir('-p', outPath)
            shell.mkdir('-p', secretsPath)

            //Google account
            shell.mkdir('-p', repoBalsa)
            shell.mkdir('-p', repo)

            shell.cd(repo)
            shell.exec(`ln -s ../../../../../.config/balsa/${name}/node_modules .`)
            shell.exec(`ln -s ../../../../../.config/balsa/${name}/logs .`)
            shell.exec(`ln -s ../../../../../.config/balsa/${name}/out .`)
            shell.exec(`ln -s ../../../../../.config/balsa/${name}/secrets .`)
            shell.exec(`echo 'console.log("Exécution de ${name} terminée")' >index.js`)
            shell.exec(`npm init -y`)
            shell.exec(`npm install shelljs chalk minimist`)
            console.log(chalk.green(`Succès de la création du répertoire du programme [${name}]`))
            console.log(chalk.blue(`Fichier principal [index.js], se trouvant dans le répertoire [${repo}]`))
            console.log(chalk.blue(`Le programme peut être exécuté en tapant: balsa run ${name}`))
            return retVal
        };

        run()
    }
  };
