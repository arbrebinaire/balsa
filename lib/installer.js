const chalk = require('chalk');
const shell = require('shelljs');
const path = require('path')

const inquirer = require('./inquirer');

const cloudDir = path.join(getHomeDir(), 'cloud')
const balsaDir = path.join(getHomeDir(), '.config', 'balsa')

function getHomeDir() {
    shell.cd()
    return shell.pwd().stdout
}

function initBalsaDir(){
    shell.mkdir('-p', balsaDir)
    shell.mkdir('-p', path.join(balsaDir, 'logs'))
}

function initCloudDir(){
    shell.mkdir('-p', cloudDir)
}

function createCloudDir(account){
    const accountPath = path.join(cloudDir, account)
    shell.mkdir('-p', accountPath)
    return accountPath
}

function writeMountConfig(){
    const dirsToMount = getDirsToMount()
    const homeDir = getHomeDir()
    const profile = path.join(homeDir, '.profile')
    const command = `automount_googledrive "${dirsToMount.join(' ')}" >${homeDir}/.config/balsa/logs/automount_googledrive.log 2>&1 &`
    
    shell.sed('-i', /^automount_googledrive .*/, "", profile)
    //shell.echo(command).toEnd(profile)
    shell.exec(`echo ${command}`, {silent:true}).toEnd(profile)

    dirsToMount.forEach(account => {
        shell.sed(
            '-i',
            /shared_with_me=false/,
            'shared_with_me=true',
            path.join(homeDir, '.gdfuse', account, 'config'))
    });
}

function getDirsToMount() {
    return shell.grep(
              '-l',               //Only list the file paths
              "refresh_token=.+", //that contain a valid refresh token and not empty space
              path.join(getHomeDir(), '.gdfuse','*', 'state') //within the .gdfuse dir (consider only the "state" files with glob *)
           ).stdout
    .split('\n') //split the result on new lines
    .filter((el) => el.length > 0 && el.indexOf('default') === -1) //filter out the "default" dir and any empty path
    .map(
        (el) => {
            return path.basename(path.dirname(el)) //then just return the basename of the directories containing the "state" files
        }
    );
}

module.exports = {
    installBalsa: () => {

        console.log(
            chalk.blue("Programme d'installation de l'utilitaire Balsa")
        )
        console.log()
        
        initBalsaDir()
        initCloudDir()

        const run = async () => {
            let email = {}, accountDir, accountsToMount = [], retVal = 1;
            while(true){
                email = await inquirer.askGoogleAccount();
                if(email.value === 'q' || email.value === 'Q') break;
                accountDir = createCloudDir(email.value)
                retVal = shell.exec(`google-drive-ocamlfuse -label ${email.value} "${accountDir}"`).code
                if(retVal === 0) {
                    console.log(`Connexion du répertoire [${accountDir}] au compte Google [${email.value}] réussie`)
                    accountsToMount.push(email.value)
                } else {
                    console.log(`Échec de la connexion au compte Google [${email.value}]`)
                    shell.rm('-rf', accountDir)
                }
            }

            if(accountsToMount.length > 0) writeMountConfig()

            console.log(
                chalk.green("Programme d'installation de l'utilitaire Balsa complété")
                chalk.blue(`Vous pouvez accéder au(x) compte(s) cloud sous: [${cloudDir}]`)
            )
            
        };
        
        run();
    }
  };
