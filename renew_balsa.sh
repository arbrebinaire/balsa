#!/bin/bash

BALSADIR="$HOME"/.config/balsa/balsa
#BALSADIR="$HOME"/Desktop/.config/balsa/balsa
#mkdir -p "$BALSADIR"
#touch "$HOME"/Desktop/.config/balsa/balsa/somefile.txt

cd "$BALSADIR" 2>&1 && {
    cd .. 2>&1 && \
    rm -rf balsa 2>&1 && \
    mkdir balsa 2>&1 && \
    cd balsa 2>&1 && \
    git clone https://github.com/arbrebinaire/balsa.git . 2>&1 && \
    npm install -g 2>&1 && {
        echo "Succès: Balsa a été réinstallé de tout frais :-)"
        exit 0
    } || {
        echo "Échec de la réinstallation de Balsa: envoyer le fichier $(pwd)/renew_balsa_log.txt au diable de programmeur"
        exit 1
    }
} || {
    echo "Impossible de changer le répertoire actif pour ["$HOME"/.config/balsa/balsa].  Échec de la réinstallation de Balsa"
    exit 1
}