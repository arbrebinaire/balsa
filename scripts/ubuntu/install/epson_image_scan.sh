#!/bin/bash

echo
echo "Programme d'installation des drivers et programmes pour le scanner [GT-X820, Perfection V600 photo]"
echo
echo "Voir: http://download.ebz.epson.net/dsc/du/02/DriverDownloadInfo.do?LG2=EN&CN2=&DSCMI=97926&DSCCHK=65006f869474652dda84a6205776cce13679d820"
echo
sleep 3

TMPDIR="$(mktemp -d)"
FILE="$TMPDIR"/installer.deb.tar.gz
BUNDLEDIR="iscan-gt-x820-bundle-2.30.4.x64.deb"

wget -O "$FILE" https://download2.ebz.epson.net/iscan/plugin/gt-x820/deb/x64/iscan-gt-x820-bundle-2.30.4.x64.deb.tar.gz

cd "$TMPDIR"

tar -xvf installer.deb.tar.gz

cd "$BUNDLEDIR"

echo
echo "Tentative d'installation"
echo "Le mot de passe sudo sera peut-être nécessaire"
echo
sleep 3

./install.sh && {

    echo
    echo "L'installateur a terminé son travail"
    echo "Le programme devrait être fonctionnel ;-)"
    echo
    exit 0

 } || {

    echo
    echo "Horreur! L'installateur a échoué"
    echo "Suis à bout de ressource, désolé :-("
    echo "C'est pas ma phôte: se plaindre à grand bruit auprès du programmeur de malheur."
    echo
    exit 1

}