#!/bin/bash

BALSADIR="$HOME"/.config/balsa/balsa

cd "$BALSADIR" 2>&1 && {
    cd .. 2>&1 && \
    rm -rf balsa 2>&1 && \
    mkdir balsa 2>&1 && \
    cd balsa 2>&1 && \
    git clone https://github.com/arbrebinaire/balsa.git . 2>&1 && \
    npm install -g 2>&1 && {
        echo
        echo "Succès: Balsa a été réinstallé de tout frais :-)"
        exit 0
    } || {
        echo
        echo "Échec de la réinstallation de Balsa: envoyer le fichier $(pwd)/renew_balsa_log.txt au diable de programmeur"
        exit 1
    }
} || {
    echo
    echo "Impossible de changer le répertoire actif pour ["$HOME"/.config/balsa/balsa].  Échec de la réinstallation de Balsa"
    exit 1
}