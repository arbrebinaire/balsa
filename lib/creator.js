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
            const repoBalsa = path.join(accountPath, 'balsa')
            const repo = path.join(repoBalsa, name)
            const progPath = path.join(pwd, name)
            const modulesPath = path.join(progPath, 'node_modules')
            const logsPath = path.join(progPath, 'logs')

            if(fs.existsSync(progPath)){
                chalk.red(`Le nom d'utilitaire à créér [${name}] existe déjà.`)
                chalk.yellow(`Répertoire existant [${progPath}]`)
                chalk.yellow(`Effacer [${progPath}] et redémarrer la création du programme`)
                //return 1;
            }

            if(!fs.existsSync(accountPath)){
                chalk.red(`Le répertoire du compte [${accountPath}] n'existe pas.` )
                //return 1;
            }

            if(fs.existsSync(repo)){
                chalk.red(`Le nom d'utilitaire à créér [${name}] existe déjà.`)
                chalk.yellow(`Répertoire existant [${repo}]`)
                chalk.yellow(`Effacer [${repo}] et redémarrer la création du programme`)
                //return 1;
            }

            let retVal = 0;
            
            console.log(`La création de la structure des répertoires d'utilitaire Balsa débute`)

            //local
            //fs.mkdirSync(progPath)
            shell.mkdir('-p', progPath)
            //fs.mkdirSync(modulesPath)
            shell.mkdir('-p', modulesPath)
            //fs.mkdirSync(logsPath)
            shell.mkdir('-p', logsPath)

            //Google account
            //fs.mkdirSync(repoBalsa)
            shell.mkdir('-p', repoBalsa)
            //fs.mkdirSync(repo)
            shell.mkdir('-p', repo)

            shell.cd(repo)
            shell.exec(`ln -s ../../../../.config/balsa/${name}/node_modules .`)
            shell.exec(`echo 'console.log("Exécution de ${name} terminée")' >index.js`)
            shell.exec(`npm init -y`)
            console.log(chalk.green(`Succès de la création du répertoire du programme [${name}]`))
            console.log(chalk.blue(`Fichier principal [index.js], se trouvant dans le répertoire [${repo}]`))
            console.log(chalk.blue(`Le programme peut être exécuté en tapant: balsa run ${name}`))
            return retVal
        };
        //console.log("GIT pull --force:")
        //console.log(run());
        run()
    }
  };
