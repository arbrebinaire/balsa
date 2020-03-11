#!/bin/bash

echo "Programme d'installation des drivers et programmes pour le scanner [GT-X820, Perfection V600 photo]"
echo "Voir: http://download.ebz.epson.net/dsc/du/02/DriverDownloadInfo.do?LG2=EN&CN2=&DSCMI=97926&DSCCHK=65006f869474652dda84a6205776cce13679d820"
sleep 3

TMPDIR="$(mktemp -d)"
FILE="$TMPDIR"/installer.deb.tar.gz
BUNDLENAME="iscan-gt-x820-bundle-2.30.4.x64.deb"

wget -O "$FILE" https://download2.ebz.epson.net/iscan/plugin/gt-x820/deb/x64/iscan-gt-x820-bundle-2.30.4.x64.deb.tar.gz

cd "$TMPDIR"

tar -xvf installer.deb.tar.gz

echo
echo "Tentons d'installer au moyen de la méthode la plus appropriée"
echo "Le mot de passe sudo est nécessaire"

exit 0

sudo apt-get install "$BUNDLENAME" && {
    echo "SUCCÈS! La première méthode a fonctionné"
    echo "Le programme devrait être fonctionnel ;-)"
    exit 0
} || {
    echo "ÉCHEC :-("
    echo "Tentons une deuxième méthode dans 3 secondes"
    sleep 3
    sudo dpkg -i "$BUNDLENAME" && sudo apt-get install -f && {
        echo "SUCCÈS! La seconde méthode a fonctionné"
        echo "Le programme devrait être fonctionnel ;-)"
        exit 0
    } || {
        echo "Horreur! La première méthode a échoué aussi"
        echo "Suis à bout de ressource, désolé :-("
        exit 1
    }   
}