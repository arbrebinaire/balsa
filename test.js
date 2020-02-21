const shell = require('shelljs');
const path = require('path')

function getHomeDir() {
    shell.cd()
    return shell.pwd().stdout
}

console.log(
    shell.grep('-l', "refresh_token=.+",  path.join(getHomeDir(), '.gdfuse','*', 'state'))
    .stdout.split('\n').filter((el) => el.length > 0 && el.indexOf('default') === -1).map((el) => {
       //console.log(path.basename(path.dirname(el)))
       return path.basename(path.dirname(el)) 
    }))